from flask import Flask, make_response, jsonify
from flask_session import Session
from flask_restful import Resource, Api
import settings

from api.authenticator import Login, Register, VerifyEmail, Logout

app = Flask(__name__)
app.secret_key = settings.SECRET_KEY
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_COOKIE_NAME'] = 'bloggsterCookie'
app.config['SESSION_COOKIE_DOMAIN'] = settings.APP_HOST
Session(app)
api = Api(app)

@app.errorhandler(400)
def bad_request(error):
    return make_response(jsonify({"status": "Bad request"}), 400)

@app.errorhandler(500)
def internal_server_error(error):
    return make_response(jsonify({"status": "Internal server error"}), 500)


class Root(Resource):
    def get(self):
        return "{'title': 'Welcome to Bloggster'}"
    
api.add_resource(Root, '/')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Register, '/register')
api.add_resource(VerifyEmail, '/verify-email')

if __name__ == '__main__':
    app.run(debug=settings.APP_DEBUG)