DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Macbook", "electronics", 2000, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple Watch", "electronics", 500, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Spikeball", "sports equip", 50, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shampoo", "cosmetics", 20, 400);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Basketball", "sports equip", 25, 5000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bowling Shoes", "shoes", 50, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Martin & Co", "guitar", 1000, 20);

SELECT * FROM products;