DELIMITER //
DROP PROCEDURE IF EXISTS likeBlog //
CREATE PROCEDURE likeBlog(IN blogIdIn INT, IN userIdIn INT)
BEGIN
   IF NOT EXISTS (SELECT 1 FROM Blogs WHERE Blogs.blogId = blogIdIn) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This Blog does not exist';
   END IF;

   IF NOT EXISTS (SELECT 1 FROM Users WHERE Users.userId = blogIdIn) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This User does not exist';
   END IF;

   IF EXISTS (SELECT 1 FROM Likes WHERE (Likes.userId = userIdIn AND Likes.blogId = blogIdIn)) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Blog is already liked by the user';
   END IF;
   
   INSERT INTO Likes(blogId, userId) VALUES (blogIdIn, userIdIn);

END //

DELIMITER ;
