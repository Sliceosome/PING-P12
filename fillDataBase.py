################# IMPORTS ################
import mysql.connector as mc
import os
import pydicom as pd
from pydicom import dcmread
##########################################

############### PARAMETERS ###############
# Database folder
contoursFolder = './DATABASE/'
##########################################

############### ALGORITHME ###############
try:
    # Database connection
    connector = mc.connect(host = 'localhost', database = 'contour_evaluation', user = 'root', password = '')
    cursor = connector.cursor()

    # Fill "organ" table
    organList = os.listdir(contoursFolder)

    # INSERT Request
    for organ in organList:
        request = "INSERT INTO `organ` (`name`) VALUES ('" + organ + "')"
        cursor.execute(request)


    # Fill "contour" table

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

    # Define a dictionnary in order to fill is_handcrafted
    # 0 : AI
    # 1 : handcrafted
    dictHandcrafted = {"LimbusAIInc": "0", "TheraPanacea": "1"}

    # INSERT Request
    for organ in organList:

        scanList = os.listdir(contoursFolder + organ + '/')

        for scan in scanList:

            rtList = os.listdir(contoursFolder + organ + '/' + scan + '/')

            for rt in rtList:
                
                contourPath = contoursFolder + organ + '/' + scan + '/' + rt
                isHandCrafted = dictHandcrafted[rt]

                # INSERT Request
                request = "INSERT INTO `contour` (`folder_path`, `is_handcrafted`, `manufacturer_name`, `id_organ`) VALUES ('" + contourPath + "', '" + isHandCrafted + "', '" + rt + "', '" + str(dictOrgan[organ]) + "')"
                cursor.execute(request)


    # Apply changes
    connector.commit()

except mc.Error as err:
    print(err)

finally:
    if(connector.is_connected()):
        cursor.close()
        connector.close()
##########################################