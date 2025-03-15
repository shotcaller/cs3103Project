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


class Blogs(Resource):
    def get(self):
        sqlProc = 'getAllBlogs'
        sqlArgs = []
        try:
            rows = db_access(sqlProc, sqlArgs)
        except Exception as e:
            abort(500, message=str(e)) 
        return make_response(jsonify({'blogs': rows}), 200)

    def post(self):
        if not request.json or not 'title' in request.json or not 'content' in request.json:
            abort(400, message="Title and content are required")  

        title = request.json["title"]
        content = request.json["content"]

        sqlProc = 'createBlog'
        sqlArgs = [title, content]
        try:
            row = db_access(sqlProc, sqlArgs)
        except Exception as e:
            abort(500, message=str(e))  
        return make_response(jsonify({"message": "Blog created successfully", "blog": row}), 201)


class CommentAttributes(Resource):
    def get(self, blogId):
        sqlProc = 'getCommentsByBlog'
        sqlArgs = [blogId]
        try:
            rows = db_access(sqlProc, sqlArgs)
        except Exception as e:
            abort(500, message=str(e))  
        return make_response(jsonify({'comments': rows}), 200)

    def post(self, blogId):
        if not request.json or not 'userId' in request.json or not 'content' in request.json:
            abort(400, message="userId and content are required")  

        userId = request.json["userId"]
        content = request.json["content"]

        sqlProc = 'addComment'
        sqlArgs = [blogId, userId, content]
        try:
            row = db_access(sqlProc, sqlArgs)
        except Exception as e:
            abort(500, message=str(e)) 
        return make_response(jsonify({"message": "Comment added successfully", "comment": row}), 201)


class BlogAttributes(Resource):
    def get(self, blogId):
        sqlProc = 'getBlog'
        sqlArgs = [blogId]
        try:
            rows = db_access(sqlProc, sqlArgs)
        except Exception as e:
            abort(500, message=str(e)) 
        return make_response(jsonify({"blog": rows}), 200)

    def put(self, blogId):
        if not request.json:
            abort(400, message="No data provided") 

       
        if 'title' not in request.json and 'content' not in request.json:
            abort(400, message="At least one field (title or content) is required")

        title = request.json.get("title")
        content = request.json.get("content")

        sqlProc = 'editBlog'
        sqlArgs = [blogId, title, content]
        try:
            row = db_access(sqlProc, sqlArgs)
        except Exception as e:
            abort(500, message=str(e))  
        return make_response(jsonify({"message": "Blog updated successfully", "blog": row}), 200)

    def delete(self, blogId):
        sqlProc = 'deleteBlog'
        sqlArgs = [blogId]
        try:
            db_access(sqlProc, sqlArgs)
        except Exception as e:
            abort(500, message=str(e))  
        return make_response('', 204) 

# Resource for managing blogs by user
class BlogsByUser(Resource):
    def get(self, userId):
        sqlProc = 'getAllBlogsByUser'
        sqlArgs = [userId]
        try:
            rows = db_access(sqlProc, sqlArgs)
        except Exception as e:
            abort(500, message=str(e)) 
        return make_response(jsonify({"blogs": rows}), 200)

# Resource for managing likes
class Like(Resource):
    def post(self, blogId):
        if not request.json or not 'userId' in request.json:
            abort(400, message="userId is required")  

        userId = request.json["userId"]

        sqlProc = 'likeBlog'
        sqlArgs = [blogId, userId]
        try:
            row = db_access(sqlProc, sqlArgs)
        except Exception as e:
            abort(500, message=str(e))  
        return make_response(jsonify({"message": "Blog liked successfully", "like": row}), 201)


class Unlike(Resource):
    def post(self, blogId):
        if not request.json or not 'userId' in request.json:
            abort(400, message="userId is required")  

        userId = request.json["userId"]

        sqlProc = 'unlikeBlog'
        sqlArgs = [blogId, userId]
        try:
            row = db_access(sqlProc, sqlArgs)
        except Exception as e:
            abort(500, message=str(e))  
        return make_response(jsonify({"message": "Blog unliked successfully", "unlike": row}), 201)


api.add_resource(Blogs, "/blogs")
api.add_resource(BlogAttributes, "/blogs/<int:blogId>")
api.add_resource(CommentAttributes, "/blogs/<int:blogId>/comment")
api.add_resource(BlogsByUser, "/users/<int:userId>/blogs")
api.add_resource(Like, "/blogs/<int:blogId>/like")
api.add_resource(Unlike, "/blogs/<int:blogId>/unlike")


if __name__ == "__main__":
    app.run(host=settings.APP_HOST, port=settings.APP_PORT, debug=True)
