

var db = require('./../utils/database');
// var config = require('./../config/config');
var bcrypt = require('bcrypt');

module.exports = {

	async get_all()
	{	
		var employee_list = await db.query('SELECT * FROM Staff;');
		
		return employee_list;
	},

	async get_inv_all()
	{	
		var inv_list = await db.query('SELECT * FROM ingredients;');
		
		return inv_list;
	},

	async get_orders_all()
	{	
		var inv_list = await db.query('SELECT name, count(*) as num_orders FROM orders, dishes where dishes.dish_id = orders.dish_id group by dishes.dish_id;');
		
		return inv_list;
	},

	async add_inv(id, aname)
	{	
		await db.query('INSERT INTO INGREDIENTS VALUES ($1, $2);', [id, aname]);
		
		return Promise.resolve(0);
	},

	async add_empl(aname, gender, age, salary, role, exp, occ, tcdm)
	{	
		await db.query('INSERT INTO STAFF (NAME_fn, gender, age, salary, role, experience, occupied, tcdm) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning id;', [aname, gender, age, salary, role, exp, occ, tcdm]);
		
		return Promise.resolve(0);
	},

	create: function(data) {
	    return new Promise(function(resolve, reject) {
	      validateUserData(data)
	        .then(function() {
	          return hashPassword(data.password);
	        })
	        .then(function(hash) {
	          return db.query(
	            'INSERT INTO Staff (name, email, password) VALUES ($1, $2, $3) returning id',
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