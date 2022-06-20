# import pydicom as pd

# ds = pd.dcmread('D:\Télécom\FISE\Semestre 8\PING-P12\Initial_Files\TESTS\$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1\RT_2.dcm')

# ds.StructureSetROISequence[0].ROINumber = 1
# ds.ROIContourSequence[0].ReferencedROINumber = 1
# ds.RTROIObservationsSequence[0].ReferencedROINumber = 1

# ds.save_as('D:\Télécom\FISE\Semestre 8\PING-P12\Initial_Files\TESTS\$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1\RT_B.dcm')

i = 3
while i > 0:
    try:
        x = int(input("Please enter a number: "))
        i = i - 1
    except ValueError:
        print("Oops!  That was no valid number.  Try again...")
        i = i - 1