DELIMITER //
DROP PROCEDURE IF EXISTS unlikeBlog //
CREATE PROCEDURE unlikeBlog(IN blogId INT, IN userId INT)
BEGIN
   IF NOT EXISTS (SELECT 1 FROM Blogs WHERE Blogs.blogId = blogId) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This Blog does not exist';
   END IF;

   IF NOT EXISTS (SELECT 1 FROM Users WHERE Users.userId = userId) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This User does not exist';
   END IF;
   
   DELETE from Likes where Likes.userId=userId AND Likes.blogId=blogId;

   -- UPDATE Blogs
   -- SET likeCount = GREATEST(likeCount - 1, 0)
   -- WHERE Blogs.blogId = blogId;
END //

DELIMITER ;
