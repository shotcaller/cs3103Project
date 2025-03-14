DELIMITER //
DROP PROCEDURE IF EXISTS createBlog //
CREATE PROCEDURE createBlog(
    IN titleIn VARCHAR(255), 
    IN contentIn TEXT, 
    IN userIDIn VARCHAR(100)
    IN timeIn NOW()
)
    BEGIN 
        INSERT INTO blogs (userId, title, content, createdAt) VALUES (userIDIn, titleIn, contentIn, timeIn) 
END //
DELIMITER ;
