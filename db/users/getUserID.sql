DELIMITER //
DROP PROCEDURE IF EXISTS getUserById //
CREATE PROCEDURE getUserByID(userIdIn int)
    BEGIN
        SELECT * FROM Users where userId = userIdIn;

END //
DELIMITER 
