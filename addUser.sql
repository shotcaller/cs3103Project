DELIMITER //
DROP PROCEDURE IF EXISTS addUser //
CREATE PROCEDURE addUser(
    IN usernameIn VARCHAR(50), 
    IN passwordHashIn VARCHAR(255), 
    IN emailIn VARCHAR(100)
)
    BEGIN 
        IF EXISTS (SELECT 1 FROM users WHERE users.username = usernameIn) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Username Taken/Account already exists';
        ELSEIF EXISTS (SELECT 1 FROM users WHERE email = emailIn) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Email already in use';
        ELSE
            INSERT INTO users (username, passwordHash, email) VALUES (usernameIn, passwordHashIn, emailIn) 
        END IF;
END //
DELIMITER ;