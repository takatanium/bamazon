DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
  item_id INT(10) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NOT NULL,
  department_name VARCHAR(255) NOT NULL,
  price float(10, 2) NOT NULL,
  stock_quantity INT(10),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Table", "Furniture", 350.99, 10),
("HDTV", "Electronics", 799.99, 50),
("Lamp", "Furniture", 19.99, 100),
("Ukulele", "Musical Instrument", 220.49, 15),
("Shoes", "Apparel", 149.99, 30),
("Printer", "Electronics", 199.99, 20),
("Headphones", "Electronics", 99.99, 30),
("Saxophone", "Musical Instrument", 550.89, 5),
("Pants", "Apparel", 49.99, 50),
("Hoodie", "Apparel", 74.99, 75);

