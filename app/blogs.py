from flask import Flask, request, make_response, jsonify, abort, session
from flask_restful import Resource, Api
from app.db_util import db_access

class Blogs(Resource):
    #Open endpoint
    def get(self):
        sqlProc = 'getAllBlogs'
        if 'userId' not in session:
            sqlArgs = [None]
        else:
            sqlArgs = [session["userId"]]
        try:
            rows = db_access(sqlProc, sqlArgs)
        except Exception as e:
            abort(500, str(e)) 
        return make_response(jsonify({'blogs': rows, 'userId': session.get('userId')}), 200)


    def post(self):
        #Only let signed in user make changes
        if 'userId' not in session:
            abort(401, "Please sign in to create or update blogs.")

        if not request.json or not 'title' in request.json or not 'content' in request.json:
            abort(400, "Title and content are required")  

        resMsg = "Blog created successfully."

        title = request.json["title"]
        content = request.json["content"]

        sqlArgs = [title, content, session["userId"]]
        try:
            row = db_access('createBlog', sqlArgs)
        except Exception as e:
            abort(500, str(e))  
        return make_response(jsonify({"message": resMsg, "blog": row, 'userId': session.get('userId')}), 201)


class CommentAttributes(Resource):
    def get(self, blogId):
        sqlProc = 'getCommentsByBlog'
        sqlArgs = [blogId]
        try:
            rows = db_access(sqlProc, sqlArgs)
        except Exception as e:
            abort(500, str(e))  
        return make_response(jsonify({'comments': rows, 'userId': session.get('userId')}), 200)

    def post(self, blogId):
        #Only let signed in user make changes
        if 'userId' not in session:
            abort(401, "Please sign in to add comment.")

        if not request.json or not 'content' in request.json:
            abort(400, "Comment content is required")  

        content = request.json["content"]

        sqlProc = 'addComment'
        sqlArgs = [blogId, session['userId'], content]
        try:
            row = db_access(sqlProc, sqlArgs)
        except Exception as e:
            abort(500, str(e)) 
        return make_response(jsonify({"message": "Comment added successfully", "comment": row, 'userId': session.get('userId')}), 201)


class BlogAttributes(Resource):
    def get(self, blogId):
        sqlProc = 'getBlog'
        sqlArgs = [blogId]
        try:
            rows = db_access(sqlProc, sqlArgs)
        except Exception as e:
            abort(500, str(e)) 
        return make_response(jsonify({"blog": rows, 'userId': session.get('userId')}), 200)

    def put(self, blogId):
        if 'userId' not in session:
            abort(401, "Please sign in to edit blogs.")

        if not request.json:
            abort(400, "No data provided") 

       
        if 'title' not in request.json and 'content' not in request.json:
            abort(400, "At least one field (title or content) is required")

        if 'title' not in request.json:
            title = None
        else:
            title = request.json["title"]
        
        if 'content' not in request.json:
            content = None
        else:
            content = request.json["content"]

        sqlProc = 'editBlog'
        sqlArgs = [blogId, title, content]
        try:
            row = db_access(sqlProc, sqlArgs)
        except Exception as e:
            abort(500, str(e))  
        return make_response(jsonify({"message": "Blog updated successfully", "blog": row, 'userId': session.get('userId')}), 200)

    def delete(self, blogId):
        if 'userId' not in session:
            abort(401, "Please sign in to delete blogs.")

        sqlProc = 'deleteBlog'
        sqlArgs = [blogId]
        try:
            db_access(sqlProc, sqlArgs)
        except Exception as e:
            abort(500, str(e))  
        return make_response(jsonify({"message": "Blog deleted successfully.", 'userId': session.get('userId')}), 204) 

# Resource for managing blogs by user
class BlogsByUser(Resource):
    def get(self, userId):
        sqlProc = 'getBlogsByUser'
        authorId = userId
        if 'userId' not in session:
            currentUserId = None
        else:
            currentUserId = session["userId"]

        sqlArgs = [authorId, currentUserId]
        try:
            rows = db_access(sqlProc, sqlArgs)
        except Exception as e:
            abort(500, str(e)) 
        return make_response(jsonify({"blogs": rows, 'userId': session.get('userId')}), 200)

# Resource for managing likes
class Like(Resource):
    def post(self, blogId):
        if not 'userId' in session:
            abort(400, "Please login to interact with blogs.")  

        sqlProc = 'likeBlog'
        sqlArgs = [blogId, session['userId']]
        try:
            db_access(sqlProc, sqlArgs)
        except Exception as e:
            abort(500, str(e))  
        return make_response(jsonify({"message": "Blog liked successfully", 'userId': session.get('userId')}), 201)


class Unlike(Resource):
    def post(self, blogId):
        if not 'userId' in session:
            abort(400, "Please login to interact with blogs.")  

        sqlProc = 'unlikeBlog'
        sqlArgs = [blogId, session['userId']]

        try:
            db_access(sqlProc, sqlArgs)
        except Exception as e:
            abort(500, str(e))  
        return make_response(jsonify({"message": "Blog unliked successfully", 'userId': session.get('userId')}), 201)


