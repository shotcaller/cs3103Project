DELIMITER //
DROP PROCEDURE IF EXISTS likeBlog //
CREATE PROCEDURE likeBlog(IN blogID INT, IN userID INT)
BEGIN
   IF NOT EXISTS (SELECT 1 FROM Blogs WHERE blogId = blogID) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This Blog does not exist';
   END IF;
   
   INSERT INTO Likes(blogId, userId)
   VALUES(blogID, userID);
END //

DELIMITER ;
