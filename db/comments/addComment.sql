DELIMITER //
DROP PROCEDURE IF EXISTS addComment //
CREATE PROCEDURE addComment(IN blogId INT, IN userId INT, IN content TEXT)
BEGIN
   IF NOT EXISTS (SELECT 1 FROM Blogs WHERE Blogs.blogId = blogId) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This Blog does not exist';
   END IF;
   
   INSERT INTO Comments (blogId, userId, content)
   VALUES (blogId, userId, content);
   
   -- UPDATE Blogs
   -- SET commentCount = commentCount + 1
   -- WHERE BlogId = blogId;
END //

DELIMITER ;
