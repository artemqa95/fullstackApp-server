create table users
(
    id             int auto_increment
        primary key,
    username       varchar(30)  not null,
    password       varchar(100) not null,
    email          varchar(30)  not null,
    expirationDate varchar(100) null,
    token          varchar(100) null,
    constraint users_email_uindex
        unique (email),
    constraint users_username_uindex
        unique (username)
);

INSERT INTO website.users (id, username, password, email, expirationDate, token) VALUES (9, 'administrator', 'a3090f99d2ce0958fa0939e99861203510fe54958a937abaa0bae06d', 'sl1d3z0r@gmail.com', '05.06.2021, 23:44:29', '76c0a71b11d655d70521b67e452e30055e591bb7127f376a75c151c4');
INSERT INTO website.users (id, username, password, email, expirationDate, token) VALUES (11, 'artem', 'f8cdb04495ded47615258f9dc6a3f4707fd2405434fefc3cbf4ef4e6', 'www.artek-cj.ru@mail.ru', '05.06.2021, 23:29:34', '22592cf3e888088672d98da687c9f15157b79f245f1ea8daff5b0abf');