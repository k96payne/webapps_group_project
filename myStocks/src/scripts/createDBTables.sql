SHOW TABLES;
DROP TABLE IF EXISTS products, customers, carts, cartItems;
SHOW TABLES;
CREATE TABLE customers(id SERIAL PRIMARY KEY, fname VARCHAR(255), lname VARCHAR(255), username VARCHAR(255),email VARCHAR(255), UNIQUE(id, username));
CREATE TABLE products(itemId SERIAL, name VARCHAR(255), msrp DECIMAL(6,2), salePrice DECIMAL(8,2), upc INT, shortDescription VARCHAR(255), brandName VARCHAR(255), size VARCHAR(255), color VARCHAR(255), gender VARCHAR(255), UNIQUE(itemId));
CREATE TABLE carts(id SERIAL, username VARCHAR(255));	
CREATE TABLE cartItems(cartId INT, username VARCHAR(255), itemId INT, itemName VARCHAR(255));
SHOW TABLES;