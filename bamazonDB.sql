DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  product_sales DECIMAL(10,2) NULL,
  PRIMARY KEY (item_id)
);

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NULL,
  over_head_costs DECIMAL(10,2) NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name,over_head_costs)
VALUES ("Snow",1000);

INSERT INTO departments (department_name,over_head_costs)
VALUES ("Clothes",1000);

INSERT INTO departments (department_name,over_head_costs)
VALUES ("Run",1000);

INSERT INTO departments (department_name,over_head_costs)
VALUES ("Sale",1000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Volkl Flair Skis", "Snow", 598.93, 20, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Icelantic Skis Maiden", "Snow", 699.00, 12, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Patagonia Zip Jacket", "Clothes", 123.30, 45, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Patagonia Blue Jacket", "Clothes", 89.99, 10, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Burton Snowboard Jacket", "Clothes", 214.59, 20, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Outdoor Athletes Socks", "Run", 9.99, 3, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Hidden Comfort Socks", "Run", 13.00, 14, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Quick Wax", "Sale", 19.99, 70, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Smartwool Tights", "Run", 97.99, 10, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Black Duffel", "Sale", 58.93, 21, 0);

SELECT * FROM products;

SELECT * FROM departments;