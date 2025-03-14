from Flask import Flask, request
from flask_restful import Resource, Api

import pymysql.cursors
import json

import cgitb
import cgi
import sys
cgitb.enable()

from db_util import db_access
import settings

app = Flask(__name)
app = Api(app)

@app.errorhandler(400)  # decorators to add to 400 response
def not_found(error):
    return make_response(jsonify({"status": "Bad request"}), 400)
    
    
class Blogs(Resource):
   def get(self):
   sqlProc = 'getAllBlogs'
   sqlArgs = []
   try:
      rows = db_access(sqlProc, sqlArgs)
   except Exception as e:
      abort(500, message=e)  
   return make_response(jsonify({'blogs': rows}), 200)  
   
   
   def post(self):
   if not request.json or not 'title' in request.json:
            abort(400)
            
            
   title = request.json["title"]
   content = request.json["content"]
   
   sqlProc = 'createBlog'
   sqlArgs = [title, content]
   try:
      row = db_access(sqlProc, sqlArgs)
   except Exception as e:
      abort(500, message=e)  # server error
   return make_response(jsonify({"blogs": rows}), 200)

class CommentAttributes(Resource):
   def get(self):
   sqlProc = 'getCommentsByBlog'
   sqlArgs = [blogId,]
   try:
      rows = db_access(sqlProc, sqlArgs)
   except Exception as e:
      abort(500, message=e)
   return make_response(jsonify({'blogs':rows}), 200)
   
   def post(self):
   if not request.json or not 'blogId' in request.json or not 'userId' in request.json or not 'content' in request.json:
      abort(400)
      
   blogId = request.json["blodId"]
   userId = request.json["userId"]
   content = request.json["content"]
   
   sqlProc = 'addComment'
   sqlArgs = [blodId, userId, content]
   try:
      row = db_access(sqlProc, sqlArgs)
   except Exception as e:
      abort(500, message=e)
   return make_reponse
      


api.add_resource(Blogs, "/blogs")
api.add_resource(CommentAttributes, "/blogs/{blogId}/comment")
