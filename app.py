from flask import Flask, make_response, jsonify, render_template
from flask_session import Session
from flask_restful import Resource, Api
from app.blogs import *
from settings.settings import *
from app.authenticator import *
from flask_cors import CORS
from app.users import *


app = Flask(__name__, static_url_path='', static_folder='bloggster-client/dist', template_folder='bloggster-client/dist')
app.secret_key = SECRET_KEY
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_COOKIE_NAME'] = 'bloggsterCookie'
app.config['SESSION_COOKIE_DOMAIN'] = APP_HOST
app.config['SESSION_COOKIE_SAMESITE'] = None
Session(app)
api = Api(app)

CORS(app, supports_credentials=True)
@app.errorhandler(400)
def bad_request(error):
    return make_response(jsonify({"status": "Bad request", "message": str(error)}), 400)

@app.errorhandler(404)
def not_found(e):
    return make_response(render_template('index.html'))

@app.errorhandler(500)
def internal_server_error(error):
    return make_response(jsonify({"status": "Internal server error", "message": str(error)}), 500)


class Root(Resource):
    def get(self):
        return make_response(render_template('index.html'))
    

api.add_resource(Root, '/')
#Auth
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Register, '/register')
api.add_resource(VerifyEmail, '/verify-email')

#Users
api.add_resource(Users, '/users')
api.add_resource(UsersById, "/users/<int:userId>")
api.add_resource(UsersByUsername, "/users/<string:username>")

#Blogs
api.add_resource(Blogs, '/blogs')
api.add_resource(CommentAttributes, "/blogs/<int:blogId>/comment")
api.add_resource(BlogAttributes, "/blogs/<int:blogId>")
api.add_resource(BlogsByUser, "/users/<int:userId>/blogs")
api.add_resource(Like, "/blogs/<int:blogId>/like")
api.add_resource(Unlike, "/blogs/<int:blogId>/unlike")
api.add_resource(LoggedInUser, '/getUserId')




if __name__ == '__main__':
    app.run(debug=APP_DEBUG)
