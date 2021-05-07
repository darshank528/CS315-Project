

var db = require('./../utils/database');
// var config = require('./../config/config');
var bcrypt = require('bcrypt');

module.exports = {

	async get_all()
	{	
		var employee_list = await db.query('SELECT * FROM Staff order by id;');
		
		return employee_list;
	},
	async ing_to_be_ordered(){
		return await db.query('select * from ingredients where quantity<10');
	},
	async getinfo(id)
	{	
		var employee = await db.query('SELECT * FROM Staff where id=$1;', [id]);
		
		return employee;
	},

	async get_inv_all()
	{	
		var inv_list = await db.query('SELECT * FROM ingredients order by ingredient_id;');
		
		return inv_list;
	},

	async get_orders_all()
	{	
		var inv_list = await db.query('SELECT name, count(*) as num_orders FROM orders, dishes where dishes.dish_id = orders.dish_id group by dishes.dish_id ORDER BY Num_orders desc;');
		
		return inv_list;
	},

	async get_orders_by_date(s,e)
	{	
		var orders_list_by_date = await db.query('SELECT work_date, name, sum(quantity_ordered) as qty, cast(avg(review) as decimal(4,2)) as rev from orders, dishes where orders.dish_id=dishes.dish_id and $1<=work_date and work_Date<=$2 group by work_date, orders.dish_id, dishes.name order by work_date desc;',[s,e]);
		return orders_list_by_date;
	},

	async get_cooks_all()
	{	
		var inv_list = await db.query('SELECT staff.name_FN as name, count(*) as num_orders FROM orders, cooks, staff where cooks.dish_id = orders.dish_id and cooks.order_id = orders.order_id and cooks.id = staff.id group by staff.name_FN order by num_orders DESC;');
		
		return inv_list;
	},

	async get_serves_all()
	{	
		var inv_list = await db.query('SELECT staff.name_FN as name, count(*) as num_orders FROM orders, delivers, staff where delivers.dish_id = orders.dish_id and delivers.order_id = orders.order_id and delivers.id = staff.id group by staff.name_FN order by num_orders DESC;');
		
		return inv_list;
	},

	async get_users_all()
	{	
		var inv_list = await db.query('SELECT customers.name_FN as name, count(*) as num_orders FROM orders, customers where customers.id = orders.id group by customers.id order by num_orders desc limit 20;');
		
		return inv_list;
	},

	async get_orders_left()
	{	
		var inv_list = await db.query('SELECT order_ID as order_id, dishes.dish_ID as dish_id, name as dish, quantity_ordered as qty, dishes.cost as cost FROM orders, dishes where dishes.dish_id = orders.dish_id and (order_ID, dishes.dish_ID) not in (select order_id, dishes.dish_ID from cooks) order by order_id, dishes.dish_ID;');
		
		return inv_list;
	},

	async get_orders_to_serve()
	{	
		var inv_list = await db.query('SELECT orders.order_ID as order_id, name as dish, orders.dish_ID as dish_id, quantity_ordered as qty FROM orders,cooks, dishes where dishes.dish_id = orders.dish_id and (orders.order_ID, orders.dish_ID) = (cooks.order_ID,cooks.dish_ID) and cooks.completed = 1 and (orders.order_ID, orders.dish_ID) not in (select order_id, dish_ID from delivers) order by order_id, dish_ID;');
		
		return inv_list;
	},

	async get_order_history()
	{	
		var inv_list = await db.query('SELECT work_date, name, sum(quantity_ordered) as qty, cast(avg(review) as decimal(4,2)) as rev from orders, dishes where orders.dish_id=dishes.dish_id group by work_date, orders.dish_id, dishes.name order by work_date desc;');
		
		return inv_list;
	},

	async get_acc_info()
	{	
		var inv_list = await db.query('SELECT * from accounts order by work_date desc;');
		
		return inv_list;
	},

	async get_acc_range_info(s,e)
	{	
		var inv_list = await db.query('SELECT * from accounts where $1 <= work_date AND work_date<=$2 order by work_date asc;',[s,e]);
		
		return inv_list;
	},

	async insert_into_cooks(cook_id,cook_name,order_id,dish_id){
		await db.query('INSERT into cooks values ($1, $2, $3, 0);', [cook_id, order_id, dish_id]);
		
		return Promise.resolve(0);
	},

	async insert_into_delivers(waiter_id,waiter_name,order_id,dish_id){
		await db.query('INSERT into delivers values ($1, $2, $3, 0);', [waiter_id, order_id, dish_id]);
		
		return Promise.resolve(0);
	},

	async add_inv(id, aname)
	{	
		await db.query('INSERT INTO INGREDIENTS VALUES ($1, $2, 1);', [id, aname]);
		
		return Promise.resolve(0);
	},

	async del_inv(id)
	{	
		await db.query('DELETE FROM INGREDIENTS WHERE ingredient_ID=$1;', [id]);
		
		return Promise.resolve(0);
	},

	async inc_inv(id)
	{	
		await db.query('UPDATE INGREDIENTS SET QUANTITY = QUANTITY+1 WHERE ingredient_ID=$1;', [id]);
		
		return Promise.resolve(0);
	},

	async delete_emp(id)
	{	
		await db.query('DELETE FROM STAFF WHERE ID=$1;', [id]);
		
		return Promise.resolve(0);
	},

	async getid()
	{	
		var idd = await db.query('SELECT MAX(ID)+1 as id FROM STAFF;');
		
		return idd;
	},

	async get_inv_id()
	{	
		var idd = await db.query('SELECT MAX(ingredient_ID)+1 as id FROM ingredients;');
		
		return idd;
	},

	

	async add_empl(id, aname, gender, age, salary, role, exp, occ, tcdm)
	{	
		await db.query('INSERT INTO STAFF (id, NAME_fn, gender, age, salary, role, experience, occupied, tcdm) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);', [id, aname, gender, age, salary, role, exp, occ, tcdm]);
		
		return Promise.resolve(0);
	},

	async up_empl(id, aname, gender, age, salary, role, exp, occ, tcdm)
	{	
		await db.query('UPDATE STAFF SET NAME_fn=$2, gender=$3, age=$4, salary=$5, role=$6, experience=$7, occupied=$8, tcdm=$9 WHERE ID=$1;', [id, aname, gender, age, salary, role, exp, occ, tcdm]);
		
		return Promise.resolve(0);
	},

	async get_max_exp()
	{
		var expmax = await db.query('SELECT * from accounts where expenditure in (select max(expenditure) from accounts);');
		return expmax;
	},

	async get_min_exp()
	{
		var expmax = await db.query('SELECT * from accounts where expenditure in (select min(expenditure) from accounts);');
		return expmax;
	},

	async get_avg_exp()
	{
		var expmax = await db.query('SELECT cast(avg(expenditure) as decimal(8,2)) as avg_exp, cast(stddev(expenditure) as decimal(8,2)) as sd_exp from accounts;');
		return expmax;
	},

	async get_max_prof()
	{
		var expmax = await db.query('SELECT * from accounts where restaurant_profit in (select max(restaurant_profit) from accounts);');
		return expmax;
	},

	async get_min_prof()
	{
		var expmax = await db.query('SELECT * from accounts where restaurant_profit in (select min(restaurant_profit) from accounts);');
		return expmax;
	},


	async get_avg_prof()
	{
		var expmax = await db.query('SELECT cast(avg(restaurant_profit) as decimal(8,2)) as avg_prof, cast(stddev(restaurant_profit) as decimal(8,2)) as sd_prof from accounts;');
		return expmax;
	},

	async get_max_waste()
	{
		var expmax = await db.query('SELECT * from accounts where Total_food_wasted in (select max(Total_food_wasted) from accounts);');
		return expmax;
	},

	async get_min_waste()
	{
		var expmax = await db.query('SELECT * from accounts where Total_food_wasted in (select min(Total_food_wasted) from accounts);');
		return expmax;
	},


	async get_avg_waste()
	{
		var expmax = await db.query('SELECT cast(avg(Total_food_wasted) as decimal(8,2)) as avg_waste, cast(stddev(Total_food_wasted) as decimal(8,2)) as sd_waste from accounts;');
		return expmax;
	},

	async get_cook_id()
	{
		var cook_id = await db.query('SELECT distinct cooks.ID as id, name_fn, name_ln from staff, cooks where cooks.id = staff.id;');
		return cook_id;
	},

	async get_waiter_id()
	{
		var waiter_id = await db.query('SELECT distinct delivers.ID as id, name_fn, name_ln from staff, delivers where delivers.id = staff.id;');
		return waiter_id;
	}
}
