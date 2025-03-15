from Flask import Flask, request, make_response, abort
from flask_restful import Resource, Api

import pymysql.cursors
import json


import settings
from db_util import db_access

import cgitb
import cgi
import sys
cgitb.enable()

from db_util import db_access
import settings


app = Flask(__name)
app = Api(app)

@app.errorhandler(400)  
def not_found(error):
    return make_response(jsonify({"status": "Bad request"}), 400)

@app.errorhandler(500)  
def not_found(error):
    return make_response(jsonify({"status": "Internal server error"}), 500)
    
    
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
   return make_response(jsonify({"message": "Blog was created", "blogs": rows}), 200)
   
   
   

class CommentAttributes(Resource):
   def get(self):
   sqlProc = 'getCommentsByBlog'
   sqlArgs = [blogId,]
   try:
      rows = db_access(sqlProc, sqlArgs)
   except Exception as e:
      abort(500, message=e)
   return make_response(jsonify({'comments':rows}), 200)
   
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
   return make_reponse(jsonify({"message": "Comment was created", 'comments':rows}), 200)
   

class BlogAttributes(Resource):
   def get(self):
   sqlProc = 'getBlog'
   sqlArgs = [blodId,]
   try:
      rows = db_access(sqlProc, sqlArgs)
   except Exception as e:
      abort(500, message=e)
   return make_response(jsonify({"blogs": rows}), 200)
   
   def put(self, blogId):
      if not request.json:
         abort(400, message="Invalid data")
      
      if 'title' not in request.json and 'content' not in request.json:
         abort(400, message="One of title or conent must be provided")
      
      title = request.json.get("newTitle")
      content = request.json.get("newContent")
      
      sqlProc = 'editBlog'
      sqlArgs = [blogId, newTitle, newContent]
      try:
         rows = db_access(sqlProc, sqlArgs)
      except Exception as e:
         abort(500, message=e)
      return make_response(jsonify({"message":"Blog updated", "blogs":rows}), 200)
   
   def delete(self):
   sqlProc = 'deleteBlog'
   sqlArgs = [blogId]
   try:
      rows = db_access(sqlProc, sqlArgs)
   except Exception as e:
      abort(500, message=e)
   return make_response('', 200)
   

class BlogByUser:
   def get(self):
   sqlProc = 'getAllBlogsByUser'
   sqlArgs = [userId]
   try:
      rows = db_access(sqlProc, sqlArgs)
   except Exception as e:
      abort(500, message=e)
   return make_response(jsonify({"blogs":rows}), 200)
   

class Like:
   def post(self):
   if not request.json or not 'blogId' in request.json or not 'userId' in request.json:
      abort(400)
      
   blogId = request.json["blodId"]
   userId = request.json["userId"]
   
   
   sqlProc = 'likeBlog'
   sqlArgs = [blodId, userId]
   try:
      row = db_access(sqlProc, sqlArgs)
   except Exception as e:
      abort(500, message=e)
   return make_reponse(jsonify({"message": "Blog was liked", 'likes':rows}), 200)
   
class Unlike:
   def post(self):
   if not request.json or not 'blogId' in request.json or not 'userId' in request.json:
      abort(400)
      
   blogId = request.json["blodId"]
   userId = request.json["userId"]
   
   
   sqlProc = 'unlikeBlog'
   sqlArgs = [blodId, userId]
   try:
      row = db_access(sqlProc, sqlArgs)
   except Exception as e:
      abort(500, message=e)
   return make_reponse(jsonify({"message": "Blog was unliked", 'likes':rows}), 200)
   
   
      
        
api.add_resource(Like, "/blogs/{blogId}/like")
api.add_resource(BlogsByUser, "/blogs")
api.add_resource(Unlike, "blogs/{blogId}/like")
api.add_resource(BlogAttributes, "/blogs/{blogId}")
api.add_resource(Blogs, "/blogs")
api.add_resource(CommentAttributes, "/blogs/{blogId}/comment")

if __name__ == "__main__":
   app.run(host=settings.APP_HOST, port=settings.APP_PORT, debug=True)
