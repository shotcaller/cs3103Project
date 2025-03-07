DELIMITER //
DROP PROCEDURE IF EXISTS unlikeBlog //
CREATE PROCEDURE unlikeBlog(IN blogId INT)
BEGIN
   IF NOT EXISTS (SELECT 1 FROM Blogs WHERE BlogId = blogId) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This Blog does not exist';
   END IF;
   
   UPDATE Blogs
   SET likeCount = GREATEST(likeCount - 1, 0)
   WHERE BlogId = blogId;
END //

DELIMITER ;
