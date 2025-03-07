CREATE TABLE Users (
	userId int auto_increment,
    userName varchar(50) not null unique,
    passwordHash varchar(255),
    email varchar(100) unique,
    primary key(userId)
);

CREATE TABLE Blogs (
	blogId int auto_increment,
    userId int not null,
    title varchar(255),
    content text,
    createdAt timestamp,
    primary key(blogId),
    foreign key(userId) references Users(userId)
);

CREATE TABLE Likes (
	blogId int not null,
    userId int not null,
    primary key(userId, blogId),
    foreign key(userId) references Users(userId),
    foreign key(blogId) references Blogs(blogId)
);

CREATE TABLE Comments (
	commentId int auto_increment,
    blogId int not null,
    userId int not null,
    content text not null,
    createdAt timestamp,
    primary key(commentId),
    foreign key(blogId) references Blogs(blogId),
    foreign key(userId) references Users(userId)
);

CREATE TABLE UserProfile (
	userId int not null,
    profilePhoto varchar(255),
    createdAt timestamp,
    primary key(userId),
    foreign key(userId) references Users(userId)
);

CREATE TABLE VerifiedUsers (
	userId int not null primary key,
    foreign key(userId) references Users(userId)
);

CREATE TABLE Verification (
	userId int not null primary key,
    verificationHash varchar(255),
    verifiedAt timestamp,
    foreign key(userId) references Users(userId)
);

