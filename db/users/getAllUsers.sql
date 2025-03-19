DELIMITER //
DROP PROCEDURE IF EXISTS getAllUsers //
CREATE PROCEDURE getAllUsers()
BEGIN
   SELECT u.userId, u.userName, u.email, p.profilePhoto 
   FROM Users u JOIN UserProfile p on u.userId = p.userId;

END //

DELIMITER ;
