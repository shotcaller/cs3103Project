DELIMITER //
DROP PROCEDURE IF EXISTS likeBlog //
CREATE PROCEDURE likeBlog(IN blogId INT, IN userId INT)
BEGIN
   IF NOT EXISTS (SELECT 1 FROM Blogs WHERE Blogs.blogId = blogId) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This Blog does not exist';
   END IF;

   IF NOT EXISTS (SELECT 1 FROM Users WHERE Users.userId = blogId) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This User does not exist';
   END IF;
   
   INSERT INTO Likes(blogId, userId)
   VALUES(blogID, userID);
   

END //

DELIMITER ;
