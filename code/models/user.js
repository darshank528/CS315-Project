

var db = require('./../utils/database');
// var config = require('./../config/config');
var bcrypt = require('bcrypt');
const { promiseImpl } = require('ejs');

module.exports = {

	async getOrders(user_id)
	{	
		var order_list = await db.query('SELECT order_id, quantity_ordered as qty, review, dishes.cost as cost ,dishes.name as dish,Work_Date  FROM  orders,dishes where id = $1 and dishes.dish_id = orders.dish_id;', [user_id]);
		
		return order_list;
	},

}