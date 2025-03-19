from flask import request, make_response, jsonify, session, abort

from flask_restful import Resource
from db_util import db_access
import bcrypt
import uuid
import settings
import smtplib
from email.mime.text import MIMEText


class Login(Resource):
    def post(self):
        data = request.json
        username, password = data['username'], data['password']
        if not username or not password:
            abort(400, "Missing required fields.")
        
        sqlProcGetUser = 'getUserByUsername'
        sqlProcCheckUserVerified = 'checkUserVerified'

        try:
            #Checking use exists
            userObj = db_access(sqlProcGetUser, [username])
            #before logging in check if verified
            db_access(sqlProcCheckUserVerified, [userObj[0]['userId']])
            print(userObj)
            #If no exception, verified. Compare password and login
            if bcrypt.checkpw(password.encode('utf-8'), userObj[0]['passwordHash'].encode('utf-8')):
                #login success, create session
                sessionUserId = session.get('userId')
                if not sessionUserId:
                    session['userId'] = userObj[0]['userId']
                return make_response(jsonify({"message": "Successful Login", "userId": userObj[0]['userId']}),200)
            else:
                abort(400, "Incorrect Password.")
        except Exception as e:
            abort(500, str(e))
        
class Logout(Resource):
    def post(self):
        
        if 'userId' in session:
           session.pop('userId',None)
           return make_response(jsonify({"message": "Successfully logged out."}), 200)
        else:
           abort(500, "Error while logging out. User might not be logged in.")


class Register(Resource):
    def post(self):
        data = request.json
        print(data)
        username = data['username']
        password = data['password']
        email = data['email']

        if not username or not password or not email:
            abort(400,"Missing required fields.")

        #Hashing the password
        passwordHash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt());

        #Creating verification hash
        verifcationHash = str(uuid.uuid4());
        
        sqlProc = 'addUser'

        try:
            result = db_access(sqlProc, [username, passwordHash, email, verifcationHash])
            #Returning the last inserted row ID (userId)
            userId = result[0]['LAST_INSERT_ID()']

            self.send_verification_email(userId, email, verifcationHash)


            return make_response(jsonify({ "message": f"User registered. Please check your email to verify your account." }), 201)
        except Exception as e:
            abort(400,str(e))
        


    def send_verification_email(self, userId, email, verificationHash):
        verificationLink = f"http://{settings.APP_HOST}:{settings.APP_PORT}/verify-email?userId={userId}&verificationHash={verificationHash}"
        subject = f"Verify your {settings.APP_NAME} account."
        body = f"Hi there, Click the following link to verify your account: {verificationLink}"

        msg = MIMEText(body)
        msg["Subject"] = subject
        msg["From"] = settings.SENDER_EMAIL
        msg["To"] = email

        s = smtplib.SMTP(settings.SMTP_SERVER,25)
        #s.debuglevel(1)
        res = s.sendmail(settings.SENDER_EMAIL, email, msg.as_string())
        print(res)
        s.quit()
       

class VerifyEmail(Resource):
    def get(self):
        userId = request.args.get('userId')
        verificationHash = request.args.get('verificationHash')

        sqlProcCheckVerify = 'checkVerification'
        sqlProcVerifyUser = 'verifyUser'

        try:
            sqlProcResult = db_access(sqlProcCheckVerify, [userId])

            dbVerificationHash = sqlProcResult[0]['verificationHash']

            if verificationHash == dbVerificationHash:
                #user verified. delete user entry from Verification table and insert into VerifiedUsers and create UserProfile record
                sqlProcResult = db_access(sqlProcVerifyUser, [userId])

                return make_response(jsonify({"message": "User verified and account activated. Please login again."}), 200)
            else:
                abort(500, "Unable to verify user. Please register again.")
        except Exception as e:
            abort(400, str(e))



        
