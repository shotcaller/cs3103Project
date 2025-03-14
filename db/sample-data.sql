INSERT INTO Users (userName, passwordHash, email) VALUES 
('alice123', 'hashed_password1', 'alice@example.com'),
('bob456', 'hashed_password2', 'bob@example.com'),
('charlie789', 'hashed_password3', 'charlie@example.com');

INSERT INTO UserProfile (userId, profilePhoto, createdAt) VALUES
(1, 'alice_profile.jpg', NOW()),
(2, 'bob_profile.jpg', NOW()),
(3, 'charlie_profile.jpg', NOW());

INSERT INTO Blogs (userId, title, content, createdAt) VALUES
(1, 'My First Blog', 'This is Alice’s first blog post!', NOW()),
(2, 'Bob’s Travel Journey', 'I love traveling. Here are my experiences...', NOW()),
(3, 'Tech Innovations', 'Latest trends in technology...', NOW());


INSERT INTO Likes (blogId, userId) VALUES
(1, 2),  -- Bob likes Alice’s blog
(1, 3),  -- Charlie likes Alice’s blog
(2, 1),  -- Alice likes Bob’s blog
(3, 2);  -- Bob likes Charlie’s blog


INSERT INTO Comments (blogId, userId, content, createdAt) VALUES
(1, 2, 'Great post, Alice!', NOW()),
(1, 3, 'Very insightful!', NOW()),
(2, 1, 'Nice travel tips, Bob!', NOW()),
(3, 2, 'This was very helpful!', NOW());


INSERT INTO VerifiedUsers (userId) VALUES
(1),  -- Alice is verified
(3);  -- Charlie is verified


INSERT INTO Verification (userId, verificationHash, verifiedAt) VALUES
(1, 'hash_for_alice', NOW()),
(3, 'hash_for_charlie', NOW());
