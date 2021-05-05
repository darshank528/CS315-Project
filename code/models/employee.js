

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

	async getOrders(staff_id)
	{	
		var order_list = await db.query('SELECT delivers.id as id, order_id, delivers.dish_id as dish_id, completed, dishes.name as dish  FROM Delivers, dishes where id = $1 and dishes.dish_id = delivers.dish_id;', [staff_id]);
		
		return order_list;
	},

	async update_cookserve(staff_id, order_id, dish_id)
	{	
		//var order_list = await db.query('SELECT order_id, delivers.dish_id as dish_id, completed, dishes.name as dish  FROM Delivers, dishes where id = $1 and dishes.dish_id = delivers.dish_id;', [staff_id]);
		
		db.query('UPDATE DELIVERs set completed = 1 where id=$1 and order_id=$2 and dish_id=$3;', [staff_id, order_id, dish_id]);
		
		return Promise.resolve(0);
		
		//return order_list;
	},

	create: function(data) {
	    return new Promise(function(resolve, reject) {
	      validateUserData(data)
	        .then(function() {
	          return hashPassword(data.password);
	        })
	        .then(function(hash) {
	          return db.query(
	            'INSERT INTO Staff (name, email, password) VALUES ($1, $2, $3) returning id;',
	            [data.name, data.email, hash]);
	        })
	        .then(function(result) {
	          resolve(result.rows[0]);
	        })
	        .catch(function(err) {
	          reject(err);
	        });
	    });
  	},
	authenticate: function(data) {
    return new Promise(function(resolve, reject) {
      if (!data.email || !data.password) {
        reject('error: email and/or password missing')
      }
      else {
        // change all of this to one transaction?
        findOneByEmail(data.email)
          .then(function(user) {
            return verifyPassword(data.password, user);
          })
          .then(function(result) {
            resolve({ isAuthorized: result.isValid, id: result.id });
          })
          .catch(function(err) {
            reject(err);
          });
      
		      }
		});
		},




	hashPassword: function(password) {
	  return new Promise(function(resolve, reject) {
	    bcrypt.genSalt(10, function(err, salt) {
	      if (err) {
	        reject(err);
	      }
	      else {
	        bcrypt.hash(password, salt, function(err, hash) {
	          if (err) {
	            reject(err);
	          }
	          else {
	            resolve(hash);
	          }
	        });
	      }
	    });
	  });
	},

	verifyPassword: function(password, user) {
	  return new Promise(function(resolve, reject) {
	    bcrypt.compare(password, user.password, function(err, result) {
	      if (err) {
	        reject(err);
	      }
	      else {
	        resolve({ isValid: result, id: user.id });
	      }
	    });
	  });
	}

}