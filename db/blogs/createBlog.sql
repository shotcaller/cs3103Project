DELIMITER //
DROP PROCEDURE IF EXISTS createBlog //
CREATE PROCEDURE createBlog(
    IN titleIn VARCHAR(255), 
    IN contentIn TEXT, 
    IN userIDIn VARCHAR(100)
)
    BEGIN 
        INSERT INTO Blogs (userId, title, content, createdAt) VALUES (userIDIn, titleIn, contentIn, NOW());
        SELECT LAST_INSERT_ID();
END //
DELIMITER ;
