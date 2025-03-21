DELIMITER //
DROP PROCEDURE IF EXISTS getAllBlogs //
CREATE PROCEDURE getAllBlogs(
    IN userIdIn INT
)
    BEGIN
    SELECT 
        b.blogId,
        b.title,
        b.content,
        b.createdAt,
        u.userId AS authorId,
        u.userName AS authorUsername,
        COUNT(DISTINCT c.commentId) AS commentCount,
        COUNT(DISTINCT l.userId) AS likeCount,
        CASE 
            WHEN userIdIn IS NOT NULL AND EXISTS (
                SELECT 1 FROM Likes l2 
                WHERE l2.blogId = b.blogId AND l2.userId = userIdIn
            ) THEN TRUE 
            ELSE FALSE 
        END AS userLiked -- Returns TRUE if userIdIn liked the blog, else FALSE
    FROM Blogs b
    JOIN Users u ON b.userId = u.userId
    LEFT JOIN Comments c ON b.blogId = c.blogId
    LEFT JOIN Likes l ON b.blogId = l.blogId
    GROUP BY b.blogId, u.userId
    ORDER BY b.createdAt DESC;
END //
DELIMITER ;
