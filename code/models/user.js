var db = require("./../utils/database");
// var config = require('./../config/config');
var bcrypt = require("bcrypt");
const { promiseImpl } = require("ejs");

module.exports = {
  async getProfile(user_id) {
    var user_list = await db.query("SELECT * FROM customers where id = $1;", [
      user_id,
    ]);

    return user_list;
  },

  async getOrders(user_id) {
    var order_list = await db.query(
      "SELECT orders.order_id as order_id, CAST(work_date AS DATE), quantity as qty, review as review, dishes.cost as cost, dishes.name as dish  FROM  orders, dishes, ordered_dishes where id = $1 and ordered_dishes.dish_id=dishes.dish_id and orders.order_id=ordered_dishes.order_id order by order_id desc;",
      [user_id]
    );

    return order_list;
  },

  async getTopDishes(user_id) {
    var order_list = await db.query(
      "SELECT dishes.dish_id as dish_id, dishes.name as dish, SUM(quantity) as num_ordered FROM orders, dishes, ordered_dishes WHERE orders.id=$1 and dishes.dish_id=ordered_dishes.dish_id and ordered_dishes.order_id=orders.order_id GROUP BY dishes.dish_id, dish ORDER BY num_ordered DESC LIMIT 5",
      [user_id]
    );

    return order_list;
  },
  //	SELECT *  FROM  dishes where (cuisine in ("indian" , "chinese")) and  (category in ("main")) and (cost<=200);
  async getMenu(cuisine, category, cost) {
    if (cost != null) {
      cost = parseInt(cost);
    }
    var query = "SELECT *  FROM  dishes where";
    if (cuisine != null) {
      query += "(";
      for (var i in cuisine) {
        console.log(i, cuisine[i]);
        query += "cuisine='" + cuisine[i] + "' OR ";
      }
      console.log(cuisine);
      query = query.slice(0, -3) + ") and ";
      // cuisine = new Set(cuisine);//"'"+cuisine.join("' , '")+"'";
    }
    if (category != null) {
      query += " (";
      for (var i in category) {
        query += "category='" + category[i] + "' OR ";
      }
      query = query.slice(0, -3) + ") and ";
    }
    var order_list = await db.query(query + " (cost<= $1 or $1 is null);", [
      cost,
    ]);

    return order_list;
  },
  async getCountOfOrders() {
    var ord = await db.query("select count(*)+1 from orders");
    return ord;
  },
  async getcost(did) {
    return await db.query("SELECT cost from dishes where dish_id=$1", [did]);
  },
  async addOrder(id, dishes) {
    try {
      await db.query("BEGIN");
      const curr = new Date();
      const time = curr.toLocaleTimeString();
      const date = curr.toLocaleDateString();
      const day = curr.toLocaleTimeString('en-US', {weekday: 'long'}).split(' ')[0];
      const r = await db.query(
        `SELECT order_id FROM orders ORDER BY order_id DESC LIMIT 1`
      );
      const newId = r.rows[0].order_id + 1;
      const ids = dishes.map((e) => e.id);
      const costArray = await db.query(
        `SELECT dish_id, cost FROM dishes WHERE dish_id = ANY($1)`,
        [ids]
      );
      await db.query(`INSERT INTO orders VALUES($1,$2,$3,$4,$5,$6)`, [
        newId,
        id,
        date,
        time,
        day,
        null,
      ]);
      let costs = {};
      costArray.rows.forEach((e) => (costs[e.dish_id] = e.cost));
      for (const dish of dishes) {
        await db.query(`INSERT INTO ordered_dishes VALUES($1,$2,$3,$4)`, [
          newId,
          dish.id,
          costs[dish.id] * dish.quant,
          dish.quant,
        ]);
        await db.query(
          "UPDATE INGREDIENTS a SET QUANTITY = QUANTITY-$1*b.quantity_used FROM (select ingredient_id, quantity_used from contains where dish_id = $2) as b WHERE b.ingredient_id = a.ingredient_id",
          [dish.quant, dish.id]
        );
      }
      await db.query('COMMIT');
      return `Order Placed with id ${newId}`;
    } catch (e) {
      console.log(e);
      await db.query("ROLLBACK");
      throw "Order could not be processed. Please try again";
    }
  },
};
