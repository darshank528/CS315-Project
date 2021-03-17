DROP TABLE IF EXISTS Accounts;
DROP TABLE IF EXISTS Chef;
DROP TABLE IF EXISTS Contains;
DROP TABLE IF EXISTS Cooks;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Dishes;
DROP TABLE IF EXISTS Ingredients;
DROP TABLE IF EXISTS Manager;
DROP TABLE IF EXISTS Non_waiting_customer;
DROP TABLE IF EXISTS Order;
DROP TABLE IF EXISTS Owners;
DROP TABLE IF EXISTS Pay_By;
DROP TABLE IF EXISTS Payment;
DROP TABLE IF EXISTS People;
DROP TABLE IF EXISTS Receptionist;
DROP TABLE IF EXISTS Sitting;
DROP TABLE IF EXISTS Sit_Table;
DROP TABLE IF EXISTS Tracks;
DROP TABLE IF EXISTS Waiter;
DROP TABLE IF EXISTS Waiting_customer;

CREATE Table Accounts(
	Work_Date Date PRIMARY KEY,
	Restaurant_profit int,
	expenditure int CHECK(expenditure>=0),
	Total_food_wasted real CHECK(Total_food_wasted>=0)
);

CREATE Table Chef (
	ID int PRIMARY KEY,
	Salary bigint,
	Experience int,
	TCDM int
);

CREATE Table Contains (
	Ingredient_ID int,
	dish_ID int,
	Quantity_used int,
	PRIMARY KEY (Ingredient_ID, dish_ID)
);

CREATE Table Cooks (
	ID int,
	dish_ID int,
	PRIMARY KEY (ID, dish_ID)
);

CREATE Table Customers (
	ID int PRIMARY KEY,
	Order_Frequency int
);

CREATE Table Dishes (
	dish_ID int PRIMARY KEY,
	cuisine varchar(50),
	Category varchar(50)
);

CREATE Table Ingredients (
	Ingredient_ID int PRIMARY KEY,
	Quality int
);

CREATE Table Manager (
	ID int PRIMARY KEY,
	Salary bigint
);

CREATE Table Non_waiting_customer (
	ID int PRIMARY KEY,
	Amount_Spent int,
	Payment_Method varchar(20)
);

CREATE Table Order (
	ID int,
	Dish_ID int,
	Work_Date Date,
	Work_Time Time,
	Day varchar(9),
	PRIMARY KEY (ID, dish_ID, Work_Date, Work_Time)
);

CREATE Table Owners (
	ID int PRIMARY KEY
);

CREATE Table Pay_By (
	ID int,
	Bill_ID int,
	Payment_mode varchar(50),
	Invoice_ID int,
	Invoice_description varchar(50),
	Status varchar(50),
	PRIMARY KEY (ID, Bill_ID) -- will only Bill_ID work ?
);

CREATE Table Payment (
	Bill_ID int PRIMARY KEY,
	Work_Date Date,
	Discount_offered varchar(4),

);

CREATE Table People (
	ID int PRIMARY KEY,
	name.FN varchar(100),
	name.MN varchar(100),
	name.LN varchar(100),
	gender varchar(20),
	Age int
);

CREATE Table Receptionist (
	ID int PRIMARY KEY,
	Salary bigint
);

CREATE Table Sitting (
	ID int PRIMARY KEY,
	Table_ID int
);

CREATE Table Sit_Table (
	Table_ID int PRIMARY KEY,
	Size int,
	Status varchar(20)
);

CREATE Table Tracks (
	ID int,
	Work_Date Date,
	PRIMARY KEY (ID, Work_Date)
);

CREATE Table Waiter (
	ID int PRIMARY KEY,
	Salary bigint

);

CREATE Table Waiting_customer (
	ID int PRIMARY KEY,
	Waiting_customer int
);
