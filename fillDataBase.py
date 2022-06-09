import mysql.connector as mc

try:
    connector = mc.connect(host = 'localhost', database = 'test', user = 'root', password = '')
    cursor = connector.cursor()

    request = 'SELECT * FROM user'
    cursor.execute(request)

    userList = cursor.fetchall()

    for user in userList:
        print('Name : {}'.format(user[0]))

except mc.Error as err:
    print(err)

finally:
    if(connector.is_connected()):
        cursor.close()
        connector.close()