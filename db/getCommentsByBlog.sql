DELIMITER //
DROP PROCEDURE IF EXISTS getCommentsByBlog //
CREATE PROCEDURE getCommentsByBlog(IN blogID INT)
BEGIN
   IF NOT EXISTS (SELECT 1 FROM Blogs WHERE blogId = blogID) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This Blog does not exist';
   END IF;
   
   SELECT commentId, userId, content, createdAt
   FROM Comments
   WHERE blogId = blogID
   ORDER BY createdAt DESC;

END //

DELIMITER ;
