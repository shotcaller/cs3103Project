DELIMITER //
DROP PROCEDURE IF EXISTS editUser //
CREATE PROCEDURE editBlog(
    IN blogIdIn INT, 
    IN newTitle VARCHAR(50), 
    IN newContent VARCHAR(255)
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM users WHERE blogId = blogIdIn) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Blog not found';
    END IF;

    UPDATE blogs
    SET 
        title = COALESCE(newTitle, title),
        content = COALESCE(newContent, content)
    WHERE blogId = blogIdIn;
END //
DELIMITER ;