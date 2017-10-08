DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
  item_id INT(10) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NOT NULL,
  department_name VARCHAR(255) NOT NULL,
  price float(10, 2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  product_sales FLOAT(10,2) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Table", "Furniture", 350.99, 100, 0.00),
("HDTV", "Electronics", 799.99, 500, 0.00),
("Lamp", "Furniture", 19.99, 100, 0.00),
("Ukulele", "Musical Instrument", 220.49, 150, 0.00),
("Shoes", "Apparel", 149.99, 300, 0.00),
("Printer", "Electronics", 199.99, 200, 0.00),
("Headphones", "Electronics", 99.99, 300, 0.00),
("Saxophone", "Musical Instrument", 550.89, 50, 0.00),
("Pants", "Apparel", 49.99, 500, 0.00),
("Hoodie", "Apparel", 74.99, 750, 0.00);

CREATE TABLE departments(
  department_id INT(10) NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(255) NOT NULL,
  over_head_costs FLOAT(10,2) NOT NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Furniture","2000"),
("Electronics","1000"),
("Musical Instrument","800"),
("Apparel","500");
