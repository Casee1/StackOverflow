drop schema stackoverflow;
create schema stackoverflow;

use stackoverflow;

create table user (
                      user_id int primary key AUTO_INCREMENT,
                      last_name varchar(255),
                      first_name varchar(255),
                      city varchar(255),
                      country varchar(255),
                      email varchar(255),
                      password varchar(255),
                      username varchar(255),
                      score int,
                      role varchar(255),
                      ban varchar(255)
);

create table question (
                          question_id int primary key AUTO_INCREMENT,
                          author int,
                          foreign key (author) references user(user_id),
                          title varchar(255),
                          text varchar(255),
                          date date,
                          time time,
                          image varchar(255),
                          tags varchar(255),
                          likes int,
                          dislikes int

);

create table answer (
                        answer_id int primary key AUTO_INCREMENT,
                        author int,
                        foreign key (author) references user(user_id),
                        questions int,
                        foreign key (questions) references question(question_id),
                        text varchar(255),
                        date date,
                        time time,
                        image varchar(255),
                        likes int,
                        dislikes int

);


insert into user values
    (1, 'Casian', 'Cristian', 'Baia Mare', 'Romania', 'casiancristian96@gmail.com', 'HatzJohnule', 'casi',0, 'MODERATOR', 'UNBANNED');

insert into user values
    (2, 'Denis', 'Cristian', 'Baia Mare', 'Romania', 'deniscristian96@gmail.com', 'KidvsCat', 'denis',0, 'USER', 'UNBANNED');

insert into user values
    (3, 'Bogdan', 'Bindea', 'Jibou', 'Romania', 'bogdanb93@gmail.com', 'BoschBoy123', 'bogdi',0,'USER','UNBANNED');

insert into user values
    (4, 'Raul', 'Moldovan', 'Arad', 'Romania', 'raulica96@gmail.com', 'UtaArad12', 'rauli',0,'USER','UNBANNED');

insert into question
VALUES (1, 1, 'Database', 'I cannot open mysql server it says is on port 3300. How I change it to be on port 3306?', NOW(), NOW(), 'C:\\Users\\casia\\eu.jpg', 'Java',0,0);

insert into question
VALUES (2, 2, 'Malloc', 'How can you create malloc() in C++?', NOW(), NOW(), 'C:\\Users\\casia\\eu.jpg', 'C++',0,0);
insert into question
VALUES (3, 3, 'FOL', 'How can you transform from natural speaking in FOL?', NOW(), NOW(), 'C:\\Users\\casia\\eu.jpg', 'Artificial Intelligence',0,0);

insert into question
VALUES (4,3,'DA', 'ESTI PE INVERS', NOW(), NOW(), 'C:\\Users\\casia\\eu.jpg', 'C++',0,0);


insert into answer values
    (1, 1, 1, 'Go to setting and then change it...', NOW(), NOW(), 'C:\\Users\\casia\\eu.jpg',0,0);

insert into answer values
    (2, 2, 2, 'byte nr = malloc()', NOW(), NOW(), 'C:\\Users\\casia\\eu.jpg',0,0);

insert into answer values
    (3, 4, 3, 'There are 6 rules, find them on google, lazy boy', NOW(), NOW(), 'C:\\Users\\casia\\eu.jpg',0,0);

insert into answer values
    (4, 3, 3, 'Ronaldo', NOW(), NOW(), 'C:\\Users\\casia\\eu.jpg',0,0);