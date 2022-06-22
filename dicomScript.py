################# IMPORTS ################
import pydicom as pd
from pydicom import dcmread
import matplotlib.pyplot as plt
import numpy as np
import os
from bresenham import bresenham
##########################################

############### PARAMETERS ###############
# Path of your scans folder
dicomFolder = '.\Initial_Files\TESTS'
# Path of DATABASE
destinationFolder = 'C:\DATABASE'
# Enable : True | Disable : False the parameters  window and level
activateWindowLevel = True
window = 1500
level = -600
# PNG folder's name
folderJPGName = 'classic'
##########################################

############### ALGORITHME ###############
def load_data(sample, roiNumber):
    data=dict()
    dcms_data=dict()
    for dcm_file in sample['dcm_files']:
        ds = pd.dcmread(dcm_file)
        array = ds.pixel_array
        origin = ds.ImagePositionPatient
        spacing = ds.PixelSpacing
        uid = ds.SOPInstanceUID
        dcms_data[uid] = {'dcmSpacing': spacing, 'dcmOrigin': origin, 'array': array}
    data['dcms_data']=dcms_data

    rt_data = dict()
    ds = pd.dcmread(sample['rt_file'])
    sequences = ds.ROIContourSequence[roiNumber].ContourSequence
    for sequence in sequences:
        ruid = sequence.ContourImageSequence[0].ReferencedSOPInstanceUID
        array = sequence.ContourData
        num = sequence.NumberOfContourPoints
        rt_data[ruid] = {'pointNumber': num, 'array': array}
    data['rt_data']=rt_data
    return data

def convert_global_aix_to_net_pos(data):
    point_data = {}
    for uid, value in data['rt_data'].items():
        num = value['pointNumber']
        label_data = value['array']
        dcm_origin = data['dcms_data'][uid]['dcmOrigin']
        dcm_spacing = data['dcms_data'][uid]['dcmSpacing']

        point = []
        for i in range(0, len(label_data), 3):
            x = label_data[i]
            y = label_data[i + 1]
            X = int((float(x) - float(dcm_origin[0])) / float(dcm_spacing[0]))
            Y = int((float(y) - float(dcm_origin[1])) / float(dcm_spacing[1]))
            point.append((X, Y))
        point_data[uid] = point
    return point_data

def setDicomWinWidthWinCenter(img_data, winwidth, wincenter, rows, cols):
    img_temp = img_data
    img_temp.flags.writeable = True
    min = (2 * wincenter - winwidth) / 2.0 + 0.5
    max = (2 * wincenter + winwidth) / 2.0 + 0.5
    dFactor = 255.0 / (max - min)

    for i in np.arange(rows):
        for j in np.arange(cols):
            img_temp[i, j] = int((img_temp[i, j]-min)*dFactor)

    min_index = img_temp < 0
    img_temp[min_index] = 0
    max_index = img_temp > 255
    img_temp[max_index] = 255

    return img_temp

scanList =  [dicomFolder + "\\" + s for s in os.listdir(dicomFolder)]

for scan in scanList:

    fileList = os.listdir(scan)

    ctPathList = []
    rtPathList = []
    for file in fileList:
        if file[:2] != "CT":
            rtPathList.append(scan + '\\' + file)

    for rtPath in rtPathList:

        dsRT = pd.dcmread(rtPath)

        temp = rtPath.rsplit('\\',1)
        temp2 = temp[0].rsplit('\\',1)
        scanFolder = temp2[1]

        rtFolderTemp = rtPath.rsplit('\\',1)
        rtFolderTemp2 = rtFolderTemp[1].rsplit('.',1)
        rtFolder = rtFolderTemp2[0]

        for structureSetROISequence in dsRT.StructureSetROISequence:
            if not os.path.isdir(destinationFolder + '\\' + structureSetROISequence.ROIName):
                os.makedirs(destinationFolder + '\\' + structureSetROISequence.ROIName)
            if not os.path.isdir(destinationFolder + '\\' + structureSetROISequence.ROIName + '\\' + scanFolder):       
                os.makedirs(destinationFolder + '\\' + structureSetROISequence.ROIName + '\\' + scanFolder)
            if not os.path.isdir(destinationFolder + '\\' + structureSetROISequence.ROIName + '\\' + scanFolder + '\\' + rtFolder):  
                os.makedirs(destinationFolder + '\\' + structureSetROISequence.ROIName + '\\' + scanFolder + '\\' + rtFolder)
            if not os.path.isdir(destinationFolder + '\\' + structureSetROISequence.ROIName + '\\' + scanFolder + '\\' + rtFolder + '\\' + folderJPGName):  
                os.makedirs(destinationFolder + '\\' + structureSetROISequence.ROIName + '\\' + scanFolder + '\\' + rtFolder + '\\' + folderJPGName)

        for ROIContourSequence in dsRT.ROIContourSequence:
            try:
                ctPathList = []
                for ContourSequence in ROIContourSequence.ContourSequence:
                    ctPathList.append(scan + '\\CT_' + ContourSequence.ContourImageSequence[0].ReferencedSOPInstanceUID + '.dcm')

                dictDicomFiles = {"dcm_files" : ctPathList, "rt_file" : rtPath}
                roiNumber = ROIContourSequence.ReferencedROINumber - 1
                data = load_data(dictDicomFiles, roiNumber)
                dataPoint = convert_global_aix_to_net_pos(data)

                for key in dataPoint.keys():

                    listDataPoint = list(dataPoint[key])

                    listDataPoint.append(listDataPoint[0])
                    i = 0
                    listDataPointTemp = []
                    while i < len(listDataPoint) - 1:
                        listDataPointTemp = listDataPointTemp + list(bresenham(listDataPoint[i][0], listDataPoint[i][1], listDataPoint[i+1][0], listDataPoint[i+1][1]))
                        i = i + 1

                    listDataPointFinal = []
                    
                    for element in listDataPointTemp:
                        if element not in listDataPointFinal:
                            listDataPointFinal.append(element)

                    ctFile = scan + '\\CT_' + key + '.dcm'
                    ds = dcmread(ctFile)
                    image = ds.pixel_array * ds.RescaleSlope + ds.RescaleIntercept

                    if activateWindowLevel == True:
                        image = setDicomWinWidthWinCenter(image, window, level, len(image), len(image))

                    for item in listDataPointFinal:
                        plt.plot(item[0], item[1], marker='o', color="magenta", markersize=0.25) 
                    plt.imshow(image, 'gray')
                    plt.axis('off')

                    organName = ''
                    for structureSetROISequence in dsRT.StructureSetROISequence:
                            if structureSetROISequence.ROINumber == ROIContourSequence.ReferencedROINumber:
                                organName = structureSetROISequence.ROIName
                    try:
                        plt.savefig(destinationFolder + '\\' + organName + '\\' + scanFolder + '\\' + rtFolder + '\\' + folderJPGName + '\\' + str(key).replace('.',"_") + '.png', bbox_inches='tight', pad_inches=0, dpi=138.7)
                        plt.close()
                    except:
                        print("ERROR")
            except:
                print("ERROR")
##########################################