DELIMITER //
DROP PROCEDURE IF EXISTS unlikeBlog //
CREATE PROCEDURE unlikeBlog(IN blogID INT, IN userID INT)
BEGIN
   IF NOT EXISTS (SELECT 1 FROM Blogs WHERE blogId = blogID) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This Blog does not exist';
   END IF;
   
   DELETE FROM Likes
   WHERE blogId = blogID AND userId = userID;
END //

DELIMITER ;
