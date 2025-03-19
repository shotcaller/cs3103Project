DELIMITER //
DROP PROCEDURE IF EXISTS editUser //
CREATE PROCEDURE editUser(
    IN userIdIn INT, 
    IN newUsername VARCHAR(50), 
    IN newPasswordHash VARCHAR(255)
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Users WHERE userId = userIdIn) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'User not found';
    END IF;
    
    IF newUsername IS NOT NULL AND EXISTS (SELECT 1 FROM Users WHERE userName = newUsername AND userId != userIdIn) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Username already taken';
    END IF;

    UPDATE Users
    SET 
        userName = COALESCE(newUsername, userName),
        passwordHash = COALESCE(newPasswordHash, passwordHash)
    WHERE userId = userIdIn;
END //
DELIMITER ;
