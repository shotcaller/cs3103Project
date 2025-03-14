DELIMITER //
DROP PROCEDURE IF EXISTS getCommentsByBlog //
CREATE PROCEDURE getCommentsByBlog(IN blogId INT)
BEGIN
   IF NOT EXISTS (SELECT 1 FROM Blogs WHERE Blogs.blogId = blogId) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This Blog does not exist';
   END IF;
   
   -- Need to join Users to get userName from Comments.userId

   SELECT c.commentId, c.blogId, c.userId, u.userName, c.content, c.createdAt
   FROM Comments c JOIN Users u ON c.userId = u.userId
   WHERE c.blogId = blogId;

END //

DELIMITER ;
