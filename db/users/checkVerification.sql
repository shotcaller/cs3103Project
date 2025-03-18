DELIMITER //
DROP PROCEDURE IF EXISTS checkVerification //
CREATE PROCEDURE checkVerification(
    IN userIdIn VARCHAR(50)
)
    BEGIN 
        IF EXISTS (SELECT userId FROM VerifiedUsers WHERE VerifiedUsers.userId = userIdIn) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Account is already verified';
        ELSE
            SELECT * from Verification WHERE Verification.userId = userIdIn; 
        END IF;
END //
DELIMITER ;
