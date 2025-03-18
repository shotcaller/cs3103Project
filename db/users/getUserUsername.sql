DELIMITER //
DROP PROCEDURE IF EXISTS getUserbyUsername //
CREATE PROCEDURE getUserID(userNameIn VARCHAR(50))
    BEGIN
        IF NOT EXISTS (SELECT * FROM Users WHERE Users.userName = userNameIn) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User does not exists.';
        ELSE
            SELECT * FROM Users where Users.userName = userNameIn;
        END IF;

END //
DELIMITER 

