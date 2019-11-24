DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
	id INTEGER(50) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NULL,
	quantity INT NULL,
    PRIMARY KEY (id)
    );
    
INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("42in Samsung TV", "Electronics", 499.99, 25), ("55in Samsung TV", "Electronics", 599.99, 25), ("60in Samsung TV", "Electronics", 699.99, 25);
INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Bath towel", "Home Goods", 25.99, 50), ("Bathroom Rug", "Home Goods", 19.75, 50), ("Shower Mat", "Home Goods", 15.99, 75);
INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Basketball", "Sporting Goods", 29.99, 50), ("Baseball", "Sporting Goods", 5.99, 100), ("Football", "Sporting Goods", 24.99, 75), ("Soccer Ball", "Sporting Goods", 19.99, 50);