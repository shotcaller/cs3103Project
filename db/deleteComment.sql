DELIMITER //
DROP PROCEDURE IF EXISTS deleteComment //
CREATE PROCEDURE deleteComment(IN commentId INT)
BEGIN
   IF NOT EXISTS (SELECT 1 FROM Comments WHERE CommentId = commentId) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This Comment does not exist';
   END IF;
   
   DECLARE blogId INT;
   
   SELECT BlogId INTO blogId
   FROM Comments
   WHERE CommentId = commentId;
   
   DELETE FROM Comments
   WHERE CommentId = commentId;
   
   UPDATE Blogs
   SET commentCount = GREATEST(commentCount - 1, 0);
   WHERE BlogId = blogId;

END //

DELIMITER ;
