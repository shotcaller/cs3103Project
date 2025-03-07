DELIMITER //
DROP PROCEDURE IF EXISTS getCommentsByBlog //
CREATE PROCEDURE getCommentsByBlog(IN blogId INT)
BEGIN
   IF NOT EXISTS (SELECT 1 FROM Blogs WHERE Blogs.blogId = blogId) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This Blog does not exist';
   END IF;
   
   -- Need to join Users to get userName from Comments.userId

   SELECT commentId, content
   FROM Comments
   WHERE Comments.blogId = blogId;

END //

DELIMITER ;
