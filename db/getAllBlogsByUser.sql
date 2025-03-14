DELIMITER //
DROP PROCEDURE IF EXISTS getAllBlogsByUSer //
CREATE PROCEDURE getUserID(IN userIdIn int)
    BEGIN
        SELECT * FROM blogs NATURAL JOIN comments NATURAL JOIN likes NATURAL join users WHERE userId = userIdIn 

END //
DELIMITER 