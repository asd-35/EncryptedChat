CREATE DATABASE beesDB;

USE beesDB; 

CREATE TABLE Users (
    user_id int NOT NULL,
    username varchar(255) NOT NULL,
    user_password varchar(255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE Chat_Log (
    text_id int NOT NULL,
    text_msg varchar(255),
    sender_id int,
    text_date datetime,
    PRIMARY KEY (text_id),
    FOREIGN KEY (sender_id) REFERENCES Users(user_id)
);

CREATE TABLE Session (
    session_id int NOT NULL,
    user_id int,
    PRIMARY KEY (session_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
); 

CREATE TABLE Receivers (
    text_id int,
    receiver_id int,
    FOREIGN KEY (text_id) REFERENCES Chat_Log(text_id),
    FOREIGN KEY (receiver_id) REFERENCES Users(user_id)
); 

INSERT INTO Users (user_id, username, user_password)
VALUES (1,"example@bees.com","6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b");