from flask import Flask, request
from flask_restful import Resource
import os

class Login(Resource):
    def post(self):
        data = request.json
        username, password = data
        return {username, password}

