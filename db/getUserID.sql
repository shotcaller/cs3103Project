DELIMITER //
DROP PROCEDURE IF EXISTS getUser //
CREATE PROCEDURE getUserID(userIdIn int)
    BEGIN
        SELECT * FROM users where userIdIn = userId

END //
DELIMITER 