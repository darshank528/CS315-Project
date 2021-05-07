

var db = require('./../utils/database');
// var config = require('./../config/config');
var bcrypt = require('bcrypt');
const { promiseImpl } = require('ejs');

module.exports = {

	async getProfile(user_id)
	{	
		var user_list = await db.query('SELECT * FROM customers where id = $1;', [user_id]);
		
		return user_list;
	},

	async getOrders(user_id)
	{	
		
		var order_list = await db.query('SELECT order_id as order_id, CAST(work_date AS DATE), quantity_ordered as qty, review as review, dishes.cost as cost ,dishes.name as dish  FROM  orders,dishes where id = $1 and dishes.dish_id = orders.dish_id order by order_id desc;', [user_id]);
		
		return order_list;
	},

	async getTopDishes(user_id)
	{
		var order_list = await db.query('SELECT dishes.dish_id, dishes.name as dish, sum(orders.quantity_ordered) as num_ordered  FROM  orders,dishes where id = $1 and dishes.dish_id = orders.dish_id group by dishes.dish_id, dishes.name order by num_ordered desc limit 5;', [user_id]);
		
		return order_list;
	},
//	SELECT *  FROM  dishes where (cuisine in ("indian" , "chinese")) and  (category in ("main")) and (cost<=200);
	async getMenu(cuisine, category, cost)
	{	
		if(cost!=null){
			cost=parseInt(cost);
		}
		var query = "SELECT *  FROM  dishes where";
		if(cuisine!=null)
			{
				query+="(";
				for( var i in cuisine){
					console.log(i, cuisine[i]);
					query+="cuisine=\'"+cuisine[i]+"\' OR ";
				}
				console.log(cuisine);
				query = query.slice(0,-3)+") and ";
				// cuisine = new Set(cuisine);//"'"+cuisine.join("' , '")+"'";
		}
		if(category!=null){
			query+=" (";
			for(var i in category){
				query+="category=\'"+category[i]+"\' OR ";
			}
			query = query.slice(0,-3)+") and ";

		}
		
		
		console.log(query);
		
		var order_list = await db.query( query+' (cost<= $1 or $1 is null);',[(cost)]);
		
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