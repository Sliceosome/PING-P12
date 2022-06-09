import mysql.connector as mc
import os

try:
    connector = mc.connect(host = 'localhost', database = 'contour_evaluation', user = 'root', password = '')
    cursor = connector.cursor()

    # # Fill "organ" table
    # organList = os.listdir('./Dicom_Files/Contours/')
    # # print(organList)

    # for organ in organList:
    #     request = "INSERT INTO `organ` (`name`) VALUES ('" + organ + "')"
    #     cursor.execute(request)


    # Fill "contour" table
    organList = os.listdir('./Dicom_Files/Contours/')

    for organ in organList:

        scanList = os.listdir('./Dicom_Files/Contours/' + organ + '/')

        for scan in scanList:

            rtStructList = os.listdir('./Dicom_Files/Contours/' + organ + '/' + scan + '/')

            for rtStruct in rtStructList:

                contourPath = './Dicom_Files/Contours/' + organ + '/' + scan + '/' + rtStruct
                contourScanPath = './Dicom_Files/Scans/' + scan + '/'
                
                request = "INSERT INTO `contour` (`path`, `scan_path`) VALUES ('" + contourPath + "', '" + contourScanPath + "')"
                cursor.execute(request)



    connector.commit()

except mc.Error as err:
    print(err)

finally:
    if(connector.is_connected()):
        cursor.close()
        connector.close()