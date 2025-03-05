DELIMITER //
DROP PROCEDURE IF EXISTS likeBlog //
CREATE PROCEDURE likeBlog(IN blogId INT)
BEGIN
   IF NOT EXISTS (SELECT 1 FROM Blogs WHERE BlogId = blogId) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This Blog does not exist';
   END IF;
   
   UPDATE Blogs
   SET likeCount = likeCount + 1
   WHERE BlogId = blogId;
END //

DELIMITER ;
