DELIMITER //
DROP PROCEDURE IF EXISTS verifyUser //
CREATE PROCEDURE verifyUser(
    IN userIdIn VARCHAR(50)
)
    BEGIN 
        IF NOT EXISTS (SELECT userId FROM Verification WHERE Verification.userId = userIdIn) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User not registered or already verified.';
         ELSE
            DELETE FROM Verification WHERE Verification.userId = userIdIn;
            INSERT INTO VerifiedUsers(userId, verifiedAt) VALUES (userIdIn, NOW());
            INSERT INTO UserProfile(userId, profilePhoto, createdAt) VALUES (userIdIn, "", NOW()); 
        END IF;
END //
DELIMITER ;
