DROP TABLE IF EXISTS Accounts CASCADE;
DROP TABLE IF EXISTS Contains CASCADE;
DROP TABLE IF EXISTS Cooks CASCADE;
DROP TABLE IF EXISTS Customers CASCADE;
DROP TABLE IF EXISTS Customers_Contact CASCADE;
DROP TABLE IF EXISTS Delivers CASCADE;
DROP TABLE IF EXISTS Dishes CASCADE;
DROP TABLE IF EXISTS Ingredients CASCADE;
DROP TABLE IF EXISTS Non_waiting_customer CASCADE;
DROP TABLE IF EXISTS Orders CASCADE;
DROP TABLE IF EXISTS Pay_By CASCADE;
DROP TABLE IF EXISTS Payment CASCADE;
DROP TABLE IF EXISTS Sitting CASCADE;
DROP TABLE IF EXISTS Sit_Table CASCADE;
DROP TABLE IF EXISTS Staff CASCADE;
DROP TABLE IF EXISTS Staff_Contact CASCADE;
DROP TABLE IF EXISTS Tracks CASCADE;
DROP TABLE IF EXISTS Waiting_customer CASCADE;

CREATE Table Accounts(
	Work_Date Date PRIMARY KEY,
	Restaurant_profit int,
	expenditure int CHECK(expenditure>=0),
	Total_food_wasted real CHECK(Total_food_wasted>=0)
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
	Occupied int CHECK(Occupied<=1 and Occupied>=0),
	TCDM int CHECK(TCDM>=1),
	Role varchar(20)
);

CREATE Table Staff_Contact(
	Contact bigint PRIMARY KEY CHECK(Contact>=1000000000 and Contact<=9999999999),
	ID int,
	foreign key(ID) references Staff on delete cascade
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
	Ingredient_Name varchar(50),
	Quantity int CHECK(Quantity>=0)
	-- Quality int CHECK(Quality>=1 and Quality<=10)
);

CREATE Table Contains (
	Ingredient_ID int CHECK(Ingredient_ID>=1),
	Dish_ID int CHECK(Dish_ID>=1),
	Quantity_used int,
	PRIMARY KEY (Ingredient_ID, Dish_ID),
	foreign key (Dish_ID) references Dishes on delete cascade,
	foreign key (Ingredient_ID) references Ingredients on delete cascade
);

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
	Cost int CHECK(Cost>=0),
	PRIMARY KEY (Order_ID, Dish_ID),
	foreign key (ID) references Customers on delete cascade,
	foreign key (Dish_ID) references Dishes on delete cascade
);

CREATE Table Cooks (
	ID int,
	Order_ID int,
	Dish_ID int,
	Completed int CHECK(Completed>=0 and Completed<=1),
	PRIMARY KEY (ID, Dish_ID, Order_ID),
	foreign key (ID) references Staff on delete cascade,
	foreign key (Order_ID, Dish_ID) references Orders on delete cascade
);

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
	foreign key(ID) references Customers on delete cascade
);

CREATE Table Payment (
	Bill_ID int PRIMARY KEY,
	Work_Date Date,
	Discount_offered int CHECK(Discount_offered<=100 and Discount_offered>=0)
);

CREATE Table Pay_By (
	ID int,
	Bill_ID int,
	Payment_mode varchar(50),
	Invoice_ID int,
	Invoice_description varchar(50),
	Status varchar(50),
	PRIMARY KEY (ID, Bill_ID), -- will only Bill_ID work ?
	foreign key (ID) references Non_waiting_customer on delete cascade,
	foreign key (Bill_ID) references Payment on delete cascade
);

CREATE Table Sit_Table (
	Table_ID int PRIMARY KEY,
	Size int,
	Status varchar(20),
	Location varchar(50)
);

CREATE Table Sitting (
	ID int PRIMARY KEY,
	Table_ID int CHECK(Table_ID>=0),
	foreign key (ID) references Non_waiting_customer on delete cascade,
	foreign key (Table_ID) references Sit_Table on delete cascade
);

CREATE Table Tracks (
	ID int,
	Work_Date Date,
	PRIMARY KEY (ID, Work_Date),
	foreign key (ID) references Staff on delete cascade,
	foreign key (Work_Date) references Accounts on delete cascade
);

CREATE Table Delivers (
	ID int,
	Order_ID int,
	Dish_ID int,
	Completed int CHECK(Completed>=0 and Completed<=1),
	PRIMARY KEY (ID, Dish_ID, Order_ID),
	foreign key (ID) references Staff on delete cascade,
	foreign key (Order_ID, Dish_ID) references Orders on delete cascade
);

CREATE Table Waiting_customer (
	ID int PRIMARY KEY,
	Waiting_Number int CHECK(Waiting_Number>=0)
);


CREATE INDEX Order_Serial_Number on Orders(Order_ID, Dish_ID);
