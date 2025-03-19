DELIMITER //
DROP PROCEDURE IF EXISTS getUserByID //
CREATE PROCEDURE getUserByID(userIdIn int)
    BEGIN
        IF NOT EXISTS (SELECT * FROM Users WHERE Users.userId = userIdIn) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User does not exists.';
        ELSE
            SELECT * FROM Users where Users.userId = userIdIn;
        END IF;

END //
DELIMITER 
