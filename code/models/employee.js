

var db = require('./../utils/database');
// var config = require('./../config/config');
var bcrypt = require('bcrypt');
const { promiseImpl } = require('ejs');

module.exports = {

	async getProfile(staff_id)
	{	
		var employee_list = await db.query('SELECT * FROM Staff where id = $1;', [staff_id]);
		
		return employee_list;
	},

	async getOrders(staff_id, cook)
	{	
		if(cook){
			var order_list = await db.query('SELECT cooks.id as id, order_id, cooks.dish_id as dish_id, completed, dishes.name as dish FROM cooks, dishes where id = $1 and dishes.dish_id = cooks.dish_id order by order_id desc, dish_id ;', [staff_id]);
		
			return order_list;
		}
		else{
			var order_list = await db.query('SELECT delivers.id as id, order_id, delivers.dish_id as dish_id, completed, dishes.name as dish FROM Delivers, dishes where id = $1 and dishes.dish_id = delivers.dish_id order by order_id desc, dish_id;', [staff_id]);
		
			return order_list;
		}
	},

	async update_cookserve(staff_id, order_id, dish_id, cook)
	{	
		//var order_list = await db.query('SELECT order_id, delivers.dish_id as dish_id, completed, dishes.name as dish  FROM Delivers, dishes where id = $1 and dishes.dish_id = delivers.dish_id;', [staff_id]);
		if(cook){
			return await db.query('UPDATE cooks set completed = 1 where id=$1 and order_id=$2 and dish_id=$3;', [staff_id, order_id, dish_id]);
		}
		else{
			return await db.query('UPDATE DELIVERs set completed = 1 where id=$1 and order_id=$2 and dish_id=$3;', [staff_id, order_id, dish_id]);
		}
		
		//return order_list;
	},

}