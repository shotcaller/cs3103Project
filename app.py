from flask import Flask, request
from flask_restful import Resource, Api

from api.authenticator import Login

app = Flask(__name__)
api = Api(app)

class Root(Resource):
    def get(self):
        return "{'title': 'Welcome to Bloggster'}"
    
api.add_resource(Root, '/')
api.add_resource(Login, '/login')

if __name__ == '__main__':
    app.run(debug=True)