DELIMITER //
DROP PROCEDURE IF EXISTS getAllBlogs //
CREATE PROCEDURE getAllBlogs()
    BEGIN
        SELECT * FROM blogs NATURAL JOIN comments NATURAL JOIN likes NATURAL join users 

END //
DELIMITER 
