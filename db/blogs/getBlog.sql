DELIMITER //
DROP PROCEDURE IF EXISTS getBlog //
CREATE PROCEDURE getBlog(IN blogIdIn int)
    BEGIN
        SELECT * FROM Blogs WHERE Blogs.blogId = blogIdIn; 

END //
DELIMITER 
