import pydicom as pd
from pydicom import dcmread
import matplotlib.pyplot as plt
import numpy as np
import os

def load_data(sample):
    data=dict()
    # dcms data
    dcms_data=dict()
    for dcm_file in sample['dcm_files']:
        # print(dcm_file)
        ds = pd.dcmread(dcm_file)
        array = ds.pixel_array
        origin = ds.ImagePositionPatient
        spacing = ds.PixelSpacing
        uid = ds.SOPInstanceUID
        dcms_data[uid] = {'dcmSpacing': spacing, 'dcmOrigin': origin, 'array': array}
    data['dcms_data']=dcms_data

    # rt data
    rt_data = dict()
    ds = pd.dcmread(sample['rt_file'])
    sequences = ds.ROIContourSequence[0].ContourSequence
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

dicomFolder = '.\Initial_Files\TESTS'

scanList =  [dicomFolder + "\\" + s for s in os.listdir(dicomFolder)]

for scan in scanList:

    fileList = os.listdir(scan)

    ctPathList = []
    rtPathList = []
    for file in fileList:
        if file[:2] == "CT":
            ctPathList.append(scan + '\\' + file)
        else:
            rtPathList.append(scan + '\\' + file)
    # print(ctRootList)
    # print(ctPathList)
    # print(rtPathList)

    for rtPath in rtPathList:

        dictDicomFiles = {"dcm_files" : ctPathList, "rt_file" : rtPath}
        # print(dictDicomFiles)
        data = load_data(dictDicomFiles)
        dataPoint = convert_global_aix_to_net_pos(data)
        for key in dataPoint.keys():
            listDataPoint = list(dataPoint[key])

            imgRGB = np.zeros([512, 512, 3], dtype=np.uint8)

            ctFile = scan + '\\CT_' + key + '.dcm'
            ds = dcmread(ctFile)
            img = ds.pixel_array
            # print("min : ", np.min(img),"max : ", np.max(img))
            imgRGB[:,:,0] = (img + 300) / 10
            imgRGB[:,:,1] = (img + 300) / 10
            imgRGB[:,:,2] = (img + 300) / 10

            R = 255
            G = 0
            B = 255

            for point in listDataPoint:
                x = point[1]
                y = point[0]
                imgRGB[x][y][0] = R
                imgRGB[x][y][1] = G
                imgRGB[x][y][2] = B

            plt.imshow(imgRGB)
            plt.axis('off')
            plt.savefig('./test2/' + str(key).replace('.',"_") + '.jpg' ,bbox_inches='tight', pad_inches=0, dpi=138.7)
        





# foldersList = os.listdir(dicomFolder)
# ctPathList = []
# for file in foldersList:
#     if file[:2] == "CT":
#         ctPathList.append(ctPath + "\\" + file)
# print(ctPathList))









# ctFile = 'D:\Télécom\FISE\Semestre 8\PING-P12\Initial_Files\CT+2RTS\$$$38200460_1.2.840.113704.7.1.0.672206377134184.1648538072.1\CT_1.2.840.113704.7.1.0.672206377134184.1648538074.245.dcm'
# ctPath = 'D:\Télécom\FISE\Semestre 8\PING-P12\Initial_Files\CT+2RTS\$$$38200460_1.2.840.113704.7.1.0.672206377134184.1648538072.1'
# rtPath = 'D:\Télécom\FISE\Semestre 8\PING-P12\Initial_Files\CT+2RTS\$$$38200460_1.2.840.113704.7.1.0.672206377134184.1648538072.1\RTSTRUCT_1.2.276.0.7230010.3.1.4.346818816.1878.1648539627.475662.dcm'

# foldersList = os.listdir(ctPath)
# ctPathList = []
# for file in foldersList:
#     if file[:2] == "CT":
#         ctPathList.append(ctPath + "\\" + file)
# # print(ctPathList)

# dictDicomFiles = {"dcm_files" : ctPathList, "rt_file" : rtPath}
# # print(dictDicomFiles)

# data = load_data(dictDicomFiles)
# dataPoint = convert_global_aix_to_net_pos(data)
# # print(dataPoint) 
# listDataPoint = list(dataPoint['1.2.840.113704.7.1.0.672206377134184.1648538074.245'])
# # print(listDataPoint)

# imgRGB = np.zeros([512, 512, 3], dtype=np.uint8)

# ds = dcmread(ctFile)
# img = ds.pixel_array
# # print("min : ", np.min(img),"max : ", np.max(img))
# imgRGB[:,:,0] = (img + 300) / 10
# imgRGB[:,:,1] = (img + 300) / 10
# imgRGB[:,:,2] = (img + 300) / 10

# ds = dcmread(rtPath)
# array = np.array(ds.ROIContourSequence[0].ContourSequence[247].ContourData).astype(int)
# splitArray = np.reshape(array, (int(len(array)/3),3))
# # print(splitArray)

# R = 255
# G = 0
# B = 255

# for point in listDataPoint:
#     x = point[1]
#     y = point[0]
#     imgRGB[x][y][0] = R
#     imgRGB[x][y][1] = G
#     imgRGB[x][y][2] = B

# plt.imshow(imgRGB)
# plt.axis('off')
# plt.savefig('./test' ,bbox_inches='tight', pad_inches=0, dpi=138.7)