import mysql.connector as mc
import os

try:
    ## Database connection ##
    connector = mc.connect(host = 'localhost', database = 'contour_evaluation', user = 'root', password = '')
    cursor = connector.cursor()

    ## Folders ##
    contoursFolder = './Dicom_Files/Contours/'
    scansFolder = './Dicom_Files/Scans/'

    ## Fill "organ" table ##
    organList = os.listdir(contoursFolder)

    # INSERT Request
    for organ in organList:
        request = "INSERT INTO `organ` (`name`) VALUES ('" + organ + "')"
        cursor.execute(request)


    # Fill "contour" table ##
    organList = os.listdir(contoursFolder)

    # Create dictionnary in order to fill id_organ
    request = "SELECT `id_organ` FROM organ"
    cursor.execute(request)
    idOrganList = [item[0] for item in cursor.fetchall()]
    # print(idOrganList)

    request = "SELECT `name` FROM organ"
    cursor.execute(request)
    nameList = [item[0] for item in cursor.fetchall()]
    # print(nameList)

    dictOrgan = dict(zip(nameList, idOrganList))
    # print(dictOrgan)

    # INSERT Request
    for organ in organList:

        scanList = os.listdir(contoursFolder + organ + '/')

        for scan in scanList:

            rtStructList = os.listdir(contoursFolder + organ + '/' + scan + '/')

            for rtStruct in rtStructList:

                contourPath = contoursFolder + organ + '/' + scan + '/' + rtStruct
                contourScanPath = scansFolder + scan + '/'

                request = "INSERT INTO `contour` (`path`, `scan_path`, `id_organ`) VALUES ('" + contourPath + "', '" + contourScanPath + "', '" + str(dictOrgan[organ]) + "')"
                cursor.execute(request)

    # Apply changes
    connector.commit()

except mc.Error as err:
    print(err)

finally:
    if(connector.is_connected()):
        cursor.close()
        connector.close()