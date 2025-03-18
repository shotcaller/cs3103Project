DELIMITER //
DROP PROCEDURE IF EXISTS addUser //
CREATE PROCEDURE addUser(
    IN usernameIn VARCHAR(50), 
    IN passwordHashIn VARCHAR(255), 
    IN emailIn VARCHAR(100),
    IN verificationHashIn VARCHAR(255)
)
    BEGIN 
        IF EXISTS (SELECT 1 FROM Users WHERE Users.userName = usernameIn) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Username Taken/Account already exists';
        ELSEIF EXISTS (SELECT 1 FROM Users WHERE email = emailIn) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Email already in use';
        ELSE
            INSERT INTO Users (userName, passwordHash, email) VALUES (usernameIn, passwordHashIn, emailIn);
            INSERT INTO Verification(userId, verificationHash, verifiedAt) VALUES (LAST_INSERT_ID(), verificationHashIn, NOW());
            SELECT LAST_INSERT_ID(); 
        END IF;
END //
DELIMITER ;
