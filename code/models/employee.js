var db = require("./../utils/database");
// var config = require('./../config/config');
var bcrypt = require("bcrypt");
const { promiseImpl } = require("ejs");

module.exports = {
  async getProfile(staff_id) {
    var employee_list = await db.query("SELECT * FROM Staff where id = $1;", [
      staff_id,
    ]);

    return employee_list;
  },

  async getOrders(staff_id, cook) {
    if (cook) {
      var order_list = await db.query(
        "SELECT cooks.id as id, order_id, cooks.dish_id as dish_id, completed, dishes.name as dish FROM cooks, dishes where id = $1 and dishes.dish_id = cooks.dish_id order by order_id desc, dish_id ;",
        [staff_id]
      );

      return order_list;
    } else {
      var order_list = await db.query(
        "SELECT delivers.id as id, order_id, delivers.dish_id as dish_id, completed, dishes.name as dish FROM Delivers, dishes where id = $1 and dishes.dish_id = delivers.dish_id order by order_id desc, dish_id;",
        [staff_id]
      );

      return order_list;
    }
  },

  async get_pending_payments() {
    const order_list = await db.query(
      `SELECT orders.order_id as order_id, SUM(cost) FROM ordered_dishes, orders WHERE ordered_dishes.order_id=orders.order_id and orders.order_id not in (SELECT order_id FROM payment) 
      GROUP BY orders.order_id HAVING (SELECT COUNT(*) as c FROM delivers WHERE completed=1 and delivers.order_id=orders.order_id)=COUNT(DISTINCT ordered_dishes.dish_id)`
    );
    return order_list;
  },

  async update_cookserve(staff_id, order_id, dish_id, cook) {
    //var order_list = await db.query('SELECT order_id, delivers.dish_id as dish_id, completed, dishes.name as dish  FROM Delivers, dishes where id = $1 and dishes.dish_id = delivers.dish_id;', [staff_id]);
    if (cook) {
      return await db.query(
        "UPDATE cooks set completed = 1 where id=$1 and order_id=$2 and dish_id=$3;",
        [staff_id, order_id, dish_id]
      );
    } else {
      return await db.query(
        "UPDATE DELIVERs set completed = 1 where id=$1 and order_id=$2 and dish_id=$3;",
        [staff_id, order_id, dish_id]
      );
    }
  },

  async paymentConfirm(order_id, remarks, waiter_id, mode_of_payment){
    const d = new Date().toLocaleDateString();
    return await db.query(`INSERT INTO payment VALUES($1,$2,$3,$4,$5)`, [order_id, d, waiter_id, remarks, mode_of_payment]);
  }
};
