import pymysql
import pymysql.cursors
import settings



dbConnection = pymysql.connect(host=settings.DB_HOST,
                               user=settings.DB_USER,
                               passwd=settings.DB_PASSWORD,
                               database=settings.DB_DATABASE,
                               charset='utf8mb4',
                               cursorclass=pymysql.cursors.DictCursor)

#params is an array of args

def execProc(sqlProc, params):
    try:
        with dbConnection:
            with dbConnection.cursor() as cursor:

                cursor.callproc(sqlProc, params)
                result = cursor.fetchall()
                dbConnection.commit()

                return result

    except pymysql.MySQLError as e:
        return e
       
    except Exception as e:
        return e
    


