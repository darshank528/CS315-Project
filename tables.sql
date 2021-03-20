DROP TABLE IF EXISTS Accounts;
-- DROP TABLE IF EXISTS Chef;
DROP TABLE IF EXISTS Contains;
DROP TABLE IF EXISTS Cooks;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Customers_Contact;
DROP TABLE IF EXISTS Delivers;
DROP TABLE IF EXISTS Dishes;
DROP TABLE IF EXISTS Ingredients;
-- DROP TABLE IF EXISTS Manager;
DROP TABLE IF EXISTS Non_waiting_customer;
DROP TABLE IF EXISTS Orders;
-- DROP TABLE IF EXISTS Owners;
DROP TABLE IF EXISTS Pay_By;
DROP TABLE IF EXISTS Payment;
-- DROP TABLE IF EXISTS Receptionist;
DROP TABLE IF EXISTS Sitting;
DROP TABLE IF EXISTS Sit_Table;
DROP TABLE IF EXISTS Staff;
DROP TABLE IF EXISTS Staff_Contact;
DROP TABLE IF EXISTS Tracks;
-- DROP TABLE IF EXISTS Waiter;
DROP TABLE IF EXISTS Waiting_customer;

CREATE Table Accounts(
	Work_Date Date PRIMARY KEY,
	Restaurant_profit int,
	expenditure int CHECK(expenditure>=0),
	Total_food_wasted real CHECK(Total_food_wasted>=0)
);

-- CREATE Table Chef (
-- 	ID int PRIMARY KEY CHECK(ID>=1),
-- 	Salary bigint CHECK(Salary>=1),
-- 	Experience int CHECK(Experience>=0),
-- 	TCDM int CHECK(TCDM>=1),
-- 	Occupied bit
-- );

CREATE Table Dishes (
	Dish_ID int PRIMARY KEY,
	Cuisine varchar(50),
	Category varchar(50),
	Cost int CHECK(Cost>=0),
	Name varchar(50)
);

CREATE Table Ingredients (
	Ingredient_ID int PRIMARY KEY,
	Ingredient_Name varchar(50)
	-- Quality int CHECK(Quality>=1 and Quality<=10)
);

CREATE Table Contains (
	Ingredient_ID int CHECK(Ingredient_ID>=1),
	Dish_ID int CHECK(Dish_ID>=1),
	Quantity_used int,
	PRIMARY KEY (Ingredient_ID, Dish_ID),
	foreign key (Dish_ID) references Dishes on delete set null,
	foreign key (Ingredient_ID) references Ingredients on delete set null
);

CREATE Table Cooks (
	ID int,
	Order_ID int,
	Dish_ID int,
	PRIMARY KEY (ID, Dish_ID, Order_ID),
	foreign key (ID) references Staff on delete set null,
	foreign key (Order_ID, Dish_ID) references Orders on delete set null
);

-- CREATE Table Customers (
	-- ID int PRIMARY KEY,
	-- Order_Frequency int
-- );
CREATE Table Customers (
	ID int PRIMARY KEY CHECK(ID>=1),
	Name_FN varchar(100),
	Name_MN varchar(100),
	Name_LN varchar(100),
	Gender varchar(20),
	Age int CHECK(Age>=1),
	Order_Frequency int CHECK(Order_Frequency>=0)
);

CREATE Table Customers_Contact(
	Contact bigint PRIMARY KEY CHECK(Contact>=1000000000 and Contact<=9999999999),
	ID int,
	foreign key(ID) references Customers on delete set null
);



CREATE Table Payment (
	Bill_ID int PRIMARY KEY,
	Work_Date Date,
	Discount_offered varchar(4)
);


-- CREATE Table Manager (
-- 	ID int PRIMARY KEY,
-- 	Salary bigint not null CHECK(Salary>=0)
-- );

CREATE Table Non_waiting_customer (
	ID int PRIMARY KEY,
	Amount_Spent int CHECK(Amount_Spent>=0),
	Payment_Method varchar(20)
);

CREATE Table Orders (
	Order_ID int,
	ID int,
	Dish_ID int,
	Work_Date Date,
	Work_Time Time,
	Day varchar(9),
	Quantity_Ordered int,
	Review int CHECK(Review>=1 and Review<=5),
	Cost int CHECK(Cost>=0)
	PRIMARY KEY (Order_ID, Dish_ID),
	foreign key (ID) references Non_waiting_customer on delete set null,
	foreign key (Dish_ID) references Dishes on delete set null
);

-- CREATE Table Owners (
-- 	ID int PRIMARY KEY
-- );

CREATE Table Pay_By (
	ID int,
	Bill_ID int,
	Payment_mode varchar(50),
	Invoice_ID int,
	Invoice_description varchar(50),
	Status varchar(50),
	PRIMARY KEY (ID, Bill_ID), -- will only Bill_ID work ?
	foreign key (ID) references Non_waiting_customer on delete set null,
	foreign key (Bill_ID) references Payment on delete set null
);


-- CREATE Table Receptionist (
-- 	ID int PRIMARY KEY,
-- 	Salary bigint CHECK(Salary>=0)
-- );

CREATE Table Sit_Table (
	Table_ID int PRIMARY KEY,
	Size int,
	Status varchar(20),
	Location varchar(50)
);

CREATE Table Sitting (
	ID int PRIMARY KEY,
	Table_ID int CHECK(Table_ID>=0),
	foreign key (ID) references Non_waiting_customer on delete set null,
	foreign key (Table_ID) references Sit_Table on delete set null
);


CREATE Table Staff (
	ID int PRIMARY KEY CHECK(ID>=1),
	Name_FN varchar(100),
	Name_MN varchar(100),
	Name_LN varchar(100),
	Gender varchar(20),
	Age int CHECK(Age>=1),
	Salary bigint CHECK(Salary>=0),
	Experience int CHECK(Experience>=0),
	Occupied bit CHECK(Occupied<=1 and Occupied>=0),
	TCDM int CHECK(TCDM>=1),
	Role varchar(20)
);

CREATE Table Staff_Contact(
	Contact bigint PRIMARY KEY CHECK(Contact>=1000000000 and Contact<=9999999999),
	ID int,
	foreign key(ID) references Staff on delete set null
);

CREATE Table Tracks (
	ID int,
	Work_Date Date,
	PRIMARY KEY (ID, Work_Date),
	foreign key (ID) references Staff on delete set null,
	foreign key (Work_Date) references Accounts on delete set null
);

-- CREATE Table Waiter (
-- 	ID int PRIMARY KEY,
-- 	Salary bigint CHECK(Salary>=0),
-- 	Occupied bit
-- );

CREATE Table Delivers (
	ID int,
	Order_ID int,
	Dish_ID int,
	PRIMARY KEY (ID, Dish_ID, Order_ID),
	foreign key (ID) references Staff on delete set null,
	foreign key (Order_ID, Dish_ID) references Orders on delete set null
);

CREATE Table Waiting_customer (
	ID int PRIMARY KEY,
	Waiting_customer int CHECK(Waiting_Number>=0)
);
