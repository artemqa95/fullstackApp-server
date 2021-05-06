create table products
(
    id          int auto_increment
        primary key,
    name        varchar(30)  not null,
    description varchar(100) null,
    price       varchar(30)  null,
    picture     varchar(100) null,
    constraint products_picture_uindex
        unique (picture)
);

INSERT INTO website.products (id, name, description, price, picture) VALUES (1, 'Cheese', 'Delicious yellow cheese', '10', 'Cheese.png');
INSERT INTO website.products (id, name, description, price, picture) VALUES (37, 'Banana', 'Very fresh and big', '2', 'Banana.png');
INSERT INTO website.products (id, name, description, price, picture) VALUES (38, 'Burger', 'With no meat, only for you', '5', 'Burger.png');
INSERT INTO website.products (id, name, description, price, picture) VALUES (39, 'Soda', 'A lot of CO2', '10', 'Soda.png');
INSERT INTO website.products (id, name, description, price, picture) VALUES (45, 'Почтиготово', '😀', '1', '90e2ae90476336aa3e9ae079e01e57587e8d16202414233521087783076203715094.jpg');