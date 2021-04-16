create trigger Add_Customer before INSERT on Customers for each row 
BEGIN
	IF(Customers.Order_Frequency IS NULL) THEN
		set Customers.Order_Frequency = 0;
	END IF;
END$$

create trigger Add_Chef before INSERT on Staff for each row 
BEGIN
	IF(Staff.TCDM IS NULL) THEN
		set Staff.TCDM = 0;
	END IF;
END$$

-- create trigger Add_Ingredient before INSERT on Ingredients for each row 
-- BEGIN
-- 	IF(Ingredients.Quality IS NULL) THEN
-- 		set Ingredients.Quality = 5;
-- 	END IF;
-- END$$

create trigger Add_Orders before INSERT on Orders for each row 
BEGIN
	IF(Orders.Review IS NULL) THEN
		set Orders.Review = 3;
	END IF;
END$$

create trigger Add_Table_Status before INSERT on Sit_Table for each row 
BEGIN
	IF(Sit_Table.Status IS NULL) THEN
		set Sit_Table.Status = "Ordering";
	END IF;
END$$

create trigger after_dish_insert after INSERT on Dishes 
Referencing Old As "OLD" New As "NEW" for each row
BEGIN
    IF NEW.Cuisine IS NULL THEN
        INSERT INTO Dishes(Dish_id, Cuisine, Category, Cost, Name)
        VALUES(NEW.Dish_id, "please enter Dish Cuisine type", NEW.Category, NEW.Cost, NEW.Name);
    ELSE
    	INSERT INTO Dishes(Dish_id, Cuisine, Category, Cost, Name)
        VALUES(NEW.Dish_id, NEW.Cuisine, NEW.Category, NEW.Cost, NEW.Name);
    END IF;

    IF NEW.Category IS NULL THEN
        INSERT INTO Dishes(Dish_id, Cuisine, Category, Cost, Name)
        VALUES(NEW.Dish_id, NEW.Cuisine, "please enter Dish Category type", NEW.Cost, NEW.Name);
    ELSE
    	INSERT INTO Dishes(Dish_id, Cuisine, Category, Cost, Name)
        VALUES(NEW.Dish_id, NEW.Cuisine, NEW.Category, NEW.Cost, NEW.Name);
    END IF;
END$$

create trigger after_customer_insert after INSERT on Customers 
Referencing Old As "OLD" New As "NEW" for each row
BEGIN
    IF NEW.Gender IS NULL THEN
        INSERT INTO Customers(ID, Name_FN, Name_MN, Name_LN, Gender, Age, Order_Frequency)
        VALUES(NEW.ID, NEW.Name_FN, NEW.Name_MN, NEW.Name_LN, "please enter your Gender", NEW.Age, NEW.Order_Frequency);
    ELSE
    	INSERT INTO Customers(ID, Name_FN, Name_MN, Name_LN, Gender, Age, Order_Frequency)
        VALUES(NEW.ID, NEW.Name_FN, NEW.Name_MN, NEW.Name_LN, NEW.Gender, NEW.Age, NEW.Order_Frequency);
    END IF;
END$$

create trigger after_nw_customer_insert after INSERT on Non_waiting_customer 
Referencing Old As "OLD" New As "NEW" for each row
BEGIN
    IF NEW.Payment_Method IS NULL THEN
        INSERT INTO Non_waiting_customer(ID, Amount_Spent, Payment_Method)
        VALUES(NEW.ID, NEW.Amount_Spent, "please enter your mode of payment");
    ELSE
    	INSERT INTO Non_waiting_customer(ID, Amount_Spent, Payment_Method)
        VALUES(NEW.ID, NEW.Amount_Spent, NEW.Payment_Method);
    END IF;
END$$

create trigger after_order_insert after INSERT on Orders 
Referencing Old As "OLD" New As "NEW" for each row
BEGIN
    IF NEW.Day IS NULL THEN
        INSERT INTO Orders(ID, Dish_id, Work_Date, Work_Time, Day, Quantity_Ordered, Review, Cost)
        VALUES(NEW.ID, NEW.Dish_id, NEW.Work_Date, NEW.Work_Time, "please enter day of order", NEW.Quantity_Ordered, NEW.Review, NEW.Cost);
    ELSE
    	INSERT INTO Orders(ID, Dish_id, Work_Date, Work_Time, Day, Quantity_Ordered, Review, Cost)
        VALUES(NEW.ID, NEW.Dish_id, NEW.Work_Date, NEW.Work_Time, NEW.Day, NEW.Quantity_Ordered, NEW.Review, NEW.Cost);
    END IF;
END$$