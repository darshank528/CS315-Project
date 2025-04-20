CREATE OR REPLACE FUNCTION set_default_order_frequency()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.Order_Frequency IS NULL THEN
        NEW.Order_Frequency := 0;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER add_customer
BEFORE INSERT ON Customers
FOR EACH ROW
EXECUTE FUNCTION set_default_order_frequency();


CREATE OR REPLACE FUNCTION set_default_ingredient_quality()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.Quality IS NULL THEN
        NEW.Quality := 5;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER add_ingredient
BEFORE INSERT ON Ingredients
FOR EACH ROW
EXECUTE FUNCTION set_default_ingredient_quality();


CREATE OR REPLACE FUNCTION set_default_order_review()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.Review IS NULL THEN
        NEW.Review := 3;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER add_orders
BEFORE INSERT ON Orders
FOR EACH ROW
EXECUTE FUNCTION set_default_order_review();


CREATE OR REPLACE FUNCTION fill_dish_defaults()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.Cuisine IS NULL THEN
        NEW.Cuisine := 'please enter Dish Cuisine type';
    END IF;

    IF NEW.Category IS NULL THEN
        NEW.Category := 'please enter Dish Category type';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_dish_insert
BEFORE INSERT ON Dishes
FOR EACH ROW
EXECUTE FUNCTION fill_dish_defaults();


CREATE OR REPLACE FUNCTION fill_customer_defaults()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.Gender IS NULL THEN
        NEW.Gender := 'please enter your Gender';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_customer_insert
BEFORE INSERT ON Customers
FOR EACH ROW
EXECUTE FUNCTION fill_customer_defaults();


CREATE OR REPLACE FUNCTION fill_order_day()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.Day IS NULL THEN
        NEW.Day := 'please enter day of order';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_order_insert
BEFORE INSERT ON Orders
FOR EACH ROW
EXECUTE FUNCTION fill_order_day();
