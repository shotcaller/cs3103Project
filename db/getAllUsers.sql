DELIMITER //
DROP PROCEDURE IF EXISTS getAllUsers //
CREATE PROCEDURE getAllUsers()
BEGIN
   SELECT userId, username
   FROM Users;

END //

DELIMITER ;
