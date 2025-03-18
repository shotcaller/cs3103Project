DELIMITER //
DROP PROCEDURE IF EXISTS checkUserVerified //
CREATE PROCEDURE checkUserVerified(
    IN userIdIn VARCHAR(50)
)
    BEGIN 
        IF NOT EXISTS (SELECT userId FROM VerifiedUsers WHERE VerifiedUsers.userId = userIdIn) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Account is not verified. Please verify using your email.'; 
        END IF;
END //
DELIMITER ;
