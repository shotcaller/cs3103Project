DELIMITER //
DROP PROCEDURE IF EXISTS getCommentsByBlog //
CREATE PROCEDURE getCommentsByBlog(IN blogId INT)
BEGIN
   IF NOT EXISTS (SELECT 1 FROM Blogs WHERE BlogId = blodId) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This Blog does not exist';
   END IF;
   
   SELECT CommentId, Content
   FROM Comments
   WHERE BlogId = blodId;

END //

DELIMITER ;
