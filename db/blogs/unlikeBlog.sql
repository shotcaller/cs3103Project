DELIMITER //
DROP PROCEDURE IF EXISTS unlikeBlog //
CREATE PROCEDURE unlikeBlog(IN blogIdIn INT, IN userIdIn INT)
BEGIN
   IF NOT EXISTS (SELECT 1 FROM Blogs WHERE Blogs.blogId = blogIdIn) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This Blog does not exist';
   END IF;

   IF NOT EXISTS (SELECT 1 FROM Users WHERE Users.userId = userIdIn) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This User does not exist';
   END IF;

   IF NOT EXISTS (SELECT 1 FROM Likes WHERE (Likes.userId = userIdIn AND Likes.blogId = blogIdIn)) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Blog is not liked by the user';
   END IF;
   
   DELETE FROM Likes WHERE (Likes.blogId = blogIdIn AND Likes.userId = userIdIn);

END //

DELIMITER ;
