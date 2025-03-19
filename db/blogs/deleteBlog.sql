DELIMITER //
DROP PROCEDURE IF EXISTS deleteBlog //
CREATE PROCEDURE deleteBlog(
    IN blogIdIn INT)
    
BEGIN
   IF NOT EXISTS (SELECT 1 FROM Blogs WHERE Blogs.blogId = blogIdIn) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This blog does not exist';
   END IF;
   
   DELETE FROM Blogs WHERE Blogs.blogId = blogIdIn;
   DELETE FROM Comments WHERE Comments.blogId = blogIdIn;
   DELETE FROM Likes WHERE Likes.blogId = blogIdIn;

END //

DELIMITER ;
