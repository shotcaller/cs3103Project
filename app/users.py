from flask import Flask, request, make_response, jsonify, abort, session
from flask_restful import Resource, Api
from app.db_util import db_access
import bcrypt


class Users(Resource):
    def get(self):
        sqlProc = 'getAllUsers'
        sqlArgs = []
        try:
            rows = db_access(sqlProc, sqlArgs)
        except Exception as e:
            abort(500, str(e))
        return make_response(jsonify({'users': rows, 'userId': session.get('userId')}), 200)
    

    #--------This is register endpoint and not needed here. ---
    # def post(self):
    #     if not request.json or not 'username' in request.json or not 'passwordHash' in request.json or not 'email' in request.json:
    #         abort(400, message = 'Username, password and email are required')

    #     username = request.json['username']
    #     password = request.json['passwordHash']
    #     email = request.json['email']

    #     sqlProc = 'addUser'
    #     sqlArgs = [username, password, email]
    #     try:
    #         row = db_access(sqlProc, sqlArgs)
    #     except Exception as e:
    #         abort(500, message=str(e))
    #     return make_response(jsonify({"mesage": "User creates succesfully", "user": row}), 201)

    def put(self):
        if 'userId' not in session:
            abort(401, "Please sign in to update user details.")
        if not request.json:
            abort(400, "Atleast one field is required to update")

        userId = session["userId"]
        if "username" in request.json:
            newUsername = request.json["username"]
        else:
            newUsername = None

        if "newPassword" in request.json: 

            newPasswordHash = bcrypt.hashpw(request.json["newPassword"].encode('utf-8'), bcrypt.gensalt());
            #Checking current password of user and matching
            sqlProc = 'getUserByID'
            sqlArgs = [userId]

            try:
                row = db_access(sqlProc, sqlArgs)
                oldPwdHash = row[0].get('passwordHash')
                if bcrypt.checkpw(request.json['currentPassword'].encode('utf-8'), oldPwdHash.encode('utf-8')):
                    pass
                else:
                    abort(400, "Incorrect current password")

            except Exception as e:
                abort(500, "Error while updating details")
        else:
            newPasswordHash = None

        

        sqlProc = 'editUser'
        sqlArgs = [userId, newUsername, newPasswordHash]

        try:
            row = db_access(sqlProc, sqlArgs)
        except Exception as e:
            abort(500, str(e))
        return make_response(jsonify({"message": "User successfully updated", "user": row, 'userId': session.get('userId')}), 201)
    

class UsersById(Resource):
    def get(self, userId):
        sqlProc = 'getUserByID'
        sqlArgs = [userId]
        try:
            rows = db_access(sqlProc, sqlArgs)
            rows[0].pop('passwordHash', None)
        except Exception as e:
            abort(500, str(e))
        return make_response(jsonify({"users": rows, 'userId': session.get('userId')}), 200)

class UsersByUsername(Resource):
    def get(self, username):
        sqlProc = 'getUserByUsername'
        sqlArgs = [username]
        try:
            rows = db_access(sqlProc, sqlArgs)
        except Exception as e:
            abort(500, str(e))
        return make_response(jsonify({"users": rows, 'userId': session.get('userId')}), 200)
    
class LoggedInUser(Resource):
    def get(self):
        return make_response(jsonify({'userId': session.get('userId')}))


