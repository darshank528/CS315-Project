

var db = require('./../utils/database');
// var config = require('./../config/config');
var bcrypt = require('bcrypt');
const { promiseImpl } = require('ejs');

module.exports = {

	async getOrders(user_id)
	{	
		
		var order_list = await db.query('SELECT order_id as order_id, CAST(work_date AS DATE), quantity_ordered as qty, review as review, dishes.cost as cost ,dishes.name as dish  FROM  orders,dishes where id = $1 and dishes.dish_id = orders.dish_id order by order_id desc;', [user_id]);
		
		return order_list;
	},

	async getTopDishes(user_id)
	{
		var order_list = await db.query('SELECT dishes.dish_id, dishes.name as dish, count(*) as num_ordered  FROM  orders,dishes where id = $1 and dishes.dish_id = orders.dish_id group by dishes.dish_id, dishes.name order by num_ordered desc limit 5;', [user_id]);
		
		return order_list;
	},
	
	async getMenu(cuisine, category, cost)
	{	
		if(cost!=null){
			cost=parseInt(cost);
		}
		console.log("abc",cuisine,category,cost);
		var order_list = await db.query('SELECT *  FROM  dishes where ( (cuisine=$1) or ($1 is null)) and ( (category=$2) or ($2 is null) ) and (cost<=$3 or $3 is null);',[cuisine,category,(cost)]);
		
		return order_list;
	},
	async getCountOfOrders(){
		var ord = await db.query('select count(*)+1 from orders');
		return ord;
	},
	async getcost(did){
		return await db.query("SELECT cost from dishes where dish_id=$1",[did]);
	},
	async addOrder(uid,did,date,time,day,quant, cost, ord_id)
	{
				
		await db.query('UPDATE INGREDIENTS SET QUANTITY = QUANTITY-$1 WHERE ingredient_id in (select ingredient_id from contains where dish_id = $2);',[quant, did])
		//.then(()=>{
		await db.query('INSERT INTO orders( order_id, id ,dish_id,work_date,work_time,day,quantity_ordered,review,cost ) VALUES ($1, $2, $3, $4, $5,$6,$7, $8, $9);', [ord_id,uid, did,date,time,day,quant,1,cost.rows[0].cost*quant])
		//})
		//.catch(err=>console.log(err));
		
		return  Promise.resolve(0);
	}

}