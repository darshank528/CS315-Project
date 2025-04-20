DROP TABLE IF EXISTS Contains CASCADE;
DROP TABLE IF EXISTS Cooks CASCADE;
DROP TABLE IF EXISTS Customers CASCADE;
DROP TABLE IF EXISTS Customers_contact CASCADE;
DROP TABLE IF EXISTS Delivers CASCADE;
DROP TABLE IF EXISTS Dishes CASCADE;
DROP TABLE IF EXISTS Ingredients CASCADE;
DROP TABLE IF EXISTS Orders CASCADE;
DROP TABLE IF EXISTS Payment CASCADE;
DROP TABLE IF EXISTS Staff CASCADE;
DROP TABLE IF EXISTS Staff_contact CASCADE;

CREATE Table Staff (
	ID int PRIMARY KEY CHECK(ID>=1),
	Name_FN varchar(100),
	Name_MN varchar(100),
	Name_LN varchar(100),
	Gender varchar(20),
	Age int CHECK(Age>=1),
	Salary bigint CHECK(Salary>=0),
	Occupied int CHECK(Occupied<=1 and Occupied>=0),
	Role varchar(20)
);

CREATE TABLE Staff_contact (
    Contact_number varchar(10),
    ID int, 
	PRIMARY KEY (Contact_number, ID),
	foreign key (ID) references Staff on delete cascade
);

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
);

CREATE Table Contains (
	Ingredient_ID int CHECK(Ingredient_ID>=1),
	Dish_ID int CHECK(Dish_ID>=1),
	Quantity_used int,
	PRIMARY KEY (Ingredient_ID, Dish_ID),
	foreign key (Dish_ID) references Dishes on delete cascade,
	foreign key (Ingredient_ID) references Ingredients on delete cascade
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

CREATE TABLE Customers_contact (
    Contact_number varchar(10),
    ID int, 
	PRIMARY KEY (Contact_number, ID),
	foreign key (ID) references Customers on delete cascade
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

CREATE Table Payment (
	Bill_ID int PRIMARY KEY,
	Work_Date Date,
	Discount_offered int CHECK(Discount_offered<=100 and Discount_offered>=0)
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

CREATE INDEX Order_Serial_Number on Orders(Order_ID, Dish_ID);
