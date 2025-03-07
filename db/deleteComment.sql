DELIMITER //
DROP PROCEDURE IF EXISTS deleteComment //
CREATE PROCEDURE deleteComment(IN commentID INT)
BEGIN
   IF NOT EXISTS (SELECT 1 FROM Comments WHERE commentId = commentID) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This Comment does not exist';
   END IF;
 
   DELETE FROM Comments
   WHERE commentId = commentID;
END //

DELIMITER ;
