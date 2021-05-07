

var db = require('./../utils/database');
// var config = require('./../config/config');
var bcrypt = require('bcrypt');

module.exports = {

	async create(data) {
	    
	     
	await db.query(
	'INSERT INTO Customers VALUES ($1, $2, $3, $4, $5, $6, $7) returning id',
	[data.name, data.Name_FN, data.Name_MN, data.Name_LN, data.Gender, data.Age, data.Order_Frequency]);
	return Promise.resolve(0);
	    
  	},
	async authenticate_employee(uname,password){
		var name = password.split("_");
		return await db.query("Select * from staff where id=$1 and name_fn=$2 and name_ln=$3",[uname,name[0],name[1]])
				.then((res)=>{
					console.log(res);
					// return Promise.resolve(res);
					if(res.rowCount==0){
						return Promise.resolve(0);
					}
					else{
						return  Promise.resolve(res.rows[0].role=="owner"?4:res.rows[0].role=="chef"?3:2);
					}
					//user -1, waiter -2, chef - 3, owner - 4
		})

	},
	async authenticate_customer(uname, password){
		var name = password.split("_");
		console.log(uname,password);
		return await db.query("Select * from Customers where id=$1 and name_fn=$2 and name_ln=$3",[uname,name[0],name[1]])
		.then((res)=>{
			
			return Promise.resolve(res.rowCount);
		})
	},
	
}