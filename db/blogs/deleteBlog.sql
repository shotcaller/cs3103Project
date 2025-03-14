DELIMITER //
DROP PROCEDURE IF EXISTS deleteBlog //
CREATE PROCEDURE deleteBlog(
    IN blogId INT)
    
BEGIN
   IF NOT EXISTS (SELECT 1 FROM Blogs WHERE Blogs.blogId = blogId) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This blog does not exist';
   END IF;
   
   DELETE FROM Blogs WHERE Blog.blogId = blogId;

END //

DELIMITER ;
