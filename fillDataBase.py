import mysql.connector as mc
import os

try:
    connector = mc.connect(host = 'localhost', database = 'contour_evaluation', user = 'root', password = '')
    cursor = connector.cursor()

    organList = os.listdir('./Dicom_Files/Contours/')
    # print(organList)

    for organ in organList:
        request = "INSERT INTO `organ` (`name`) VALUES ('" + organ + "')"
        cursor.execute(request)

    connector.commit()

except mc.Error as err:
    print(err)

finally:
    if(connector.is_connected()):
        cursor.close()
        connector.close()