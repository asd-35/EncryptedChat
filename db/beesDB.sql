CREATE DATABASE beesDB;

USE beesDB; 

CREATE TABLE Users (
    user_id int NOT NULL,
    Fname varchar(255) NOT NULL,
    Lname varchar(255) NOT NULL,
    mail varchar(255) NOT NULL,
    user_password varchar(255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE  ROOM_ID(
    text_id int NOT NULL AUTO_INCREMENT,
    text_msg varchar(255),
    PRIMARY KEY (text_msg)
);

CREATE TABLE Rooms (
    mail varchar(255) NOT NULL,
    room_name varchar(255) NOT NULL
    
); 

CREATE TABLE Receivers (
    text_id int,
    receiver_id int,
    FOREIGN KEY (text_id) REFERENCES Chat_Log(text_id),
    FOREIGN KEY (receiver_id) REFERENCES Users(user_id)
); 

INSERT INTO Users (user_id,Fname,Lname, mail, user_password)
VALUES (1,"Jim","Hello","jim@bees.com","6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b");
INSERT INTO Users (user_id,Fname,Lname, mail, user_password)
VALUES (2,"Pam","Hello","pam@bees.com","6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b");
INSERT INTO Users (user_id,Fname,Lname, mail, user_password)
VALUES (3,"Taylor","Hello","taylor@bees.com","6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b");

INSERT INTO Rooms (mail,room_name)
VALUES (,);
INSERT INTO ROOM_ID (text_msg) VALUES(text_msg);
