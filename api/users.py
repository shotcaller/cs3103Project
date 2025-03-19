from flask import Flask, request, make_response, jsonify, abort
from flask_restful import Resource, Api
import pymysql.cursors
import settings
from db_util import db_access

app = Flask(__name__)
api = Api(app)

@app.errorhandler(400)
def bad_request(error):
    return make_response(jsonify({"status": "Bad request"}), 400)

@app.errorhandler(500)
def internal_server_error(error):
    return make_response(jsonify({"status": "Internal server error"}), 500)

class Users(Resource):
    def get(self):
        sqlProc = 'getAllUsers.sql'
        sqlArgs = []
        try:
            rows = db_access(sqlProc, sqlArgs)
        except Exception as e:
            abort(500, message = str(e))
        return make_response(jsonify({'blogs': rows}), 200)

    def post(self):
        if not request.json or not 'username' in request.json or not 'passwordHash' in request.json or not 'email' in request.json:
            abort(400, message = 'Username, password and email are required')

        username = request.json['username']
        password = request.json['passwordHash']
        email = request.json['email']

        sqlProc = 'addUser'
        sqlArgs = [username, password, email]
        try:
            row = db_access(sqlProc, sqlArgs)
        except Exception as e:
            abort(500, message=str(e))
        return make_response(jsonify({"mesage": "User creates succesfully", "user": row}), 201)

    def put(self, userId):
        if not request.json or not 'userId' in request.json:
            abort(400, message="userId is required")

        userId = request.json["usedId"]
        username = request.json["username"]
        password = request.json["password"]

        sqlProc = 'editUser'
        sqlArgs = [userId, username, password]

        try:
            row = db_access(sqlProc, sqlArgs)
        except Exception as e:
            abort(500, message=str(e))
        return make_response(jsonify({"nessage": "User successfully updated", "user": row}), 200)

class UsersById(Resource):
    def get(self, userId):
        sqlProc = 'getUserID'
        sqlArgs = [userId]
        try:
            rows = db_access(sqlProc, sqlArgs)
        except Exception as e:
            abort(500, message=str(e))
        return make_response(jsonify({"users": rows}), 200)

class UsersByUsername(Resource):
    def get(self, username):
        sqlProc = 'getUserUsername'
        sqlArgs = [username]
        try:
            rows = db_access(sqlProc, sqlArgs)
        except Exception as e:
            abort(500, message=str(e))
        return make_response(jsonify({"users": rows}), 200)

api.add_resource(Users, "/users")
api.add_resource(UsersById, "users/<int:userId>")
api.add_resource(UsersByUsername, "users/<int:username>")

if __name__ == "__main__":
    app.run(host=settings.APP_HOST, port=settings.APP_PORT, debug=True)
