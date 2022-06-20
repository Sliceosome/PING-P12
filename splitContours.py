import pydicom as pd
from pydicom import dcmread
import os

# Paths
initialFolder = './Initial_Files/CT+2RTS/'
destinationFolder = './CT/'

# Folder management
foldersList = os.listdir(initialFolder)
for n, f in enumerate(foldersList):
    n = str(n)
    for file in os.listdir(initialFolder + f):
        if file[:2] != "CT":

            # Dicom extraction
            ds = dcmread(initialFolder + f + '/' + file)
            nbContours = len(ds.StructureSetROISequence)
            IA = ds.Manufacturer
            i = 0
            while i < nbContours:

                dstemp = dcmread(initialFolder + f + '/' + file)

                tempStructureSetROISequence = dstemp.StructureSetROISequence[i]
                tempROIContourSequence = dstemp.ROIContourSequence[i]
                tempRTROIObservationsSequence = dstemp.RTROIObservationsSequence[i]
                j = 0
                while j < nbContours:
                    del dstemp.StructureSetROISequence[0]
                    del dstemp.ROIContourSequence[0]
                    del dstemp.RTROIObservationsSequence[0]
                    j = j + 1
                dstemp.StructureSetROISequence.append(tempStructureSetROISequence)
                dstemp.ROIContourSequence.append(tempROIContourSequence)
                dstemp.RTROIObservationsSequence.append(tempRTROIObservationsSequence)

                fileName = dstemp.StructureSetROISequence[0].ROIName

                if not os.path.exists(destinationFolder + fileName):
                    os.makedirs(destinationFolder + fileName)
                if not os.path.exists(destinationFolder + fileName + '/patient_' + n):
                    os.makedirs(destinationFolder + fileName + '/patient_' + n)
                if not os.path.exists(destinationFolder + fileName + '/patient_' + n + '/' + IA):
                    os.makedirs(destinationFolder + fileName + '/patient_' + n + '/' + IA)

                i = i + 1




