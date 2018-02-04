CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(50),
department_name VARCHAR(50),
price DECIMAL(10,2),
stock_quantity INT,
product_sales DECIMAL(10,2),
PRIMARY KEY (item_id)
);

CREATE TABLE departments (
department_id INT NOT NULL AUTO_INCREMENT,
department_name VARCHAR(50),
over_head_costs DECIMAL(10,2),
product_sales DECIMAL(10,2),
PRIMARY KEY (department_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("jeans", "clothing", 29.95, 7),
("bananas", "food", 0.49, 12),
("DVD", "media", 5.30, 10),
("book", "media", 7.95, 22),
("batteries", "electronics", 10, 32),
("beanie", "clothing", 3.59, 15),
("whiskey", "food", 17, 10),
("skateboard", "toys", 33.99, 5),
("sugar", "food", 2.99, 12),
("pencils", "supplies", 1.79, 28);

INSERT INTO departments (department_name, over_head_costs, product_sales)
VALUES ("clothing", 224.80, 0),
("food", 320.30, 0),
("media", 200.00, 0),
("electronics", 250.00, 0),
("toys", 184.65, 0),
("supplies", 192.15, 0);
