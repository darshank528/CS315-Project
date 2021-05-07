const { getinfo, get_acc_range_info, get_all, get_inv_all,
get_orders_all, get_cooks_all, get_serves_all, 
get_users_all, get_orders_left, get_orders_to_serve, 
get_acc_info, get_order_history, get_orders_by_date, get_max_prof, get_min_prof, get_avg_prof, get_max_waste, get_min_waste , get_min_exp, get_avg_exp, get_avg_waste, get_max_exp, ing_to_be_ordered} = require('./../models/owner');

var Owner = require('./../models/owner');
var moment = require('moment');

module.exports = {
  createOwner: function(req, res) {
    Owner.create(req.body)
      .then(function(result) {
        return res.status(200).json({
          message: 'success! created account for new Owner',
          id: result.id
        });
      })
      .catch(function(err) {
        return res.status(400).json({
          message: err
        });
      });
  },
  loadhome: function(req,res){
    var a=0;
    var b=0;
    var c=0;
    var d=0;
    var e=0;
    var f=0;
    var g=0;
    var h=0;
    var uname = req.cookies.user;
    if(!uname){
      return res.redirect("/login");
    }
    Owner
    .get_inv_all()
    .then((value1)=>{
      a = value1;
      return get_all();
    })
    .then((value2)=>{
      b = value2;
      return get_orders_all();
    })
    .then((value3)=>{
      c = value3;
      return get_cooks_all();
    })
    .then((value4)=>{
      d = value4;
      return get_serves_all();
    })
    .then((value5)=>{
      e = value5;
      return get_users_all();
    })
    .then((value6)=>{
      f = value6;
      return get_orders_left();
    })
    .then((value7)=>{
      g = value7;
      return get_order_history();
    })
    .then((value10)=>{
      m = value10;
      return get_acc_info();
    })
    .then((value9)=>{
      h = value9;
      return get_orders_to_serve();
    })
    .then((value11)=>{
      orders_to_serve = value11;
      return ing_to_be_ordered();
    })
    .then((value8)=> {
      res.render('./includes/owner' , {
        pageTitle: 'Owner\'s page',
        path: '/includes/owner',
        editing:false,
        empl: b.rows,
        invs: a.rows,          
        orders_all: c.rows,
        cooks_all: d.rows,
        serves_all: e.rows,
        users_all: f.rows,
        orders_left: g.rows,
        accs: h.rows,
        hist: m.rows,
        orders_to_serve: orders_to_serve.rows,
        ing_to_order: value8.rows,
        moment: moment,
        isAuth: req.cookies.isAuth  

      });
    })
    .catch(err=>console.log(err));

  },

  ShowEmployeeInformation: function(req,res){

  },

  Analytics: function(req,res){

  },

  OrderHistory: function(req,res){

  },
  UpdateEmpl: function(req, res){

    const id = req.body.id;
    const name = req.body.name;
    const gender = req.body.gender;
    const age = req.body.age;
    const salary = BigInt(req.body.salary);
    const role = req.body.role;
    const exp = req.body.exp;
    const occ = req.body.occ;
    const tcdm = req.body.tcdm;


    Owner
    .add_empl(id, name, gender, age, salary, role, exp, occ, tcdm)
    .then(()=>{
      setTimeout(function(){ res.redirect('/owner'); }, 1000);      
    })
    .catch(err=>console.log(err));

  },

  Add_Empl: function(req, res){
    
    Owner
    .getid()
    .then((value)=>{
    res.render('./includes/add_empl' , {
      pageTitle: 'Add Employee',
      path: '/includes/add_empl',
      editing: false,  
      idd:value.rows       
    });
  })
  .catch(err=>console.log(err));

  },

  upemp_post: function(req, res){

    console.log(req.body);
    const id = req.body.id;
    const name = req.body.name[0];
    const gender = req.body.gender[0];
    const age = req.body.age[0];
    const salary = BigInt(req.body.salary[0]);
    const role = req.body.role[0];
    const exp = req.body.exp[0];
    const occ = req.body.occ[0];
    const tcdm = req.body.tcdm[0];


    Owner
    .up_empl(id, name, gender, age, salary, role, exp, occ, tcdm)
    .then(()=>{
      setTimeout(function(){ res.redirect('/owner'); }, 1000);      
    })
    .catch(err=>console.log(err));

  },

  upemp_get: function(req, res){
    
    const id = req.body.id;
    console.log(id);

    Owner
    .getinfo(id)
    .then((value)=>{
    res.render('./includes/up_empl_get' , {
      pageTitle: 'Update Employee',
      path: '/includes/up_empl_get',
      editing: false,  
      info:value.rows       
    });
  })
  .catch(err=>console.log(err));

  },

  uppemp_post: function(req, res){
    
    const id = req.body.id;
    console.log(id);

    Owner
    .getinfo(id)
    .then((value)=>{
    res.render('./includes/up_empl_get' , {
      pageTitle: 'Update Employee',
      path: '/includes/up_empl_get',
      editing: false,  
      info:value.rows       
    });
  })
  .catch(err=>console.log(err));

  },

  // Cook
  upallotcook1_get: function(req, res){
    
    const id = req.body.id;
    console.log(id);

    Owner
    .getinfo(id)
    .then((value)=>{
    res.render('./includes/up_empl_get' , {
      pageTitle: 'Update Employee',
      path: '/includes/up_empl_get',
      editing: false,  
      info:value.rows       
    });
  })
  .catch(err=>console.log(err));

  },

  uppallotcook1_post: function(req, res){
    
    const order_id = req.body.order_id;
    const dish_id = req.body.dish_id;
    console.log(order_id);

    Owner.get_cook_id()
    .then((value)=>{
      res.render('./includes/allotcook1' , {
        pageTitle: 'Allot Order to Chef',
        path: '/includes/allotcook1',
        editing: false,  
        // info:value.rows,
        o_id: order_id,
        d_id: dish_id,
        cooks:value.rows      
      });
    })
    // Owner
    // .getinfo(id)
    // .then((value)=>{
 
  // })
  .catch(err=>console.log(err));

  },

  allotcook1_get: function(req, res){
    
    const id = req.body.id;
    console.log(id);

    Owner
    .getinfo(id)
    .then((value)=>{
      res.render('./includes/allotcook1' , {
        pageTitle: 'Allot Order to Chef',
        path: '/includes/allotcook1',
      editing: false,  
      info:value.rows       
    });
  })
  .catch(err=>console.log(err));

  },

  allotcook1_post: function(req, res){
    
    const cook_id = req.body.id;
    const cook_name = req.body.name;
    const order_id = req.body.o_id;
    const dish_id = req.body.d_id;
    // const id = req.body.id;
    console.log(req.body);

    Owner
    .insert_into_cooks(cook_id, cook_name, order_id, dish_id)
    .then(()=>{
      setTimeout(function(){ res.redirect('/owner'); }, 1000);      
    })
    .catch(err=>console.log(err));

  },

  delemp_post: function(req, res){
    
    const id = req.body.id;
    console.log(id);

    Owner
    .delete_emp(id)
    .then(()=>{
      setTimeout(function(){ res.redirect('/owner'); }, 1000);  
    })
  .catch(err=>console.log(err));
    

  },

  delinv_post: function(req, res){
    
    const id = req.body.id;
    console.log(id);

    Owner
    .del_inv(id)
    .then(()=>{
      setTimeout(function(){ res.redirect('/owner'); }, 1000);  
    })
  .catch(err=>console.log(err));
    

  },


  incinv_post: function(req, res){
    
    const id = req.body.id;
    console.log(req.body);

    Owner
    .inc_inv(id)
    .then(()=>{
      setTimeout(function(){ res.redirect('/owner'); }, 1000);  
    })
  .catch(err=>console.log(err));
    

  },
  // Waiter
  upallotwaiter1_get: function(req, res){
    
    const id = req.body.id;
    console.log(id);

    Owner
    .getinfo(id)
    .then((value)=>{
      res.render('./includes/allotwaiter1' , {
        pageTitle: 'Allot Order to Waiter',
        path: '/includes/allotwaiter1',
      editing: false,  
      info:value.rows       
    });
  })
  .catch(err=>console.log(err));

  },

  uppallotwaiter1_post: function(req, res){
    
    const order_id = req.body.order_id;
    const dish_id = req.body.dish_id;
    console.log(order_id);

    Owner
    .get_waiter_id()
    .then((value)=>{
    res.render('./includes/allotwaiter1' , {
      pageTitle: 'Allot Order to Waiter',
      path: '/includes/allotwaiter1',
      editing: false,  
      // info:value.rows,
      o_id: order_id,
      d_id: dish_id,
      waiters: value.rows    
    });
  })
  .catch(err=>console.log(err));

  },

  allotwaiter1_get: function(req, res){
    
    const id = req.body.id;
    console.log(id);

    Owner
    .getinfo(id)
    .then((value)=>{
    res.render('./includes/up_empl_get' , {
      pageTitle: 'Update Employee',
      path: '/includes/up_empl_get',
      editing: false,  
      info:value.rows       
    });
  })
  .catch(err=>console.log(err));

  },

  allotwaiter1_post: function(req, res){
    
    const waiter_id = req.body.id;
    const waiter_name = req.body.name;
    const order_id = req.body.o_id;
    const dish_id = req.body.d_id;
    // const id = req.body.id;
    console.log(order_id);

    Owner
    .insert_into_delivers(waiter_id, waiter_name, order_id, dish_id)
    .then(()=>{
      setTimeout(function(){ res.redirect('/owner'); }, 1000);      
    })
    .catch(err=>console.log(err));

  },

  Add_Inv: function(req, res){
    
    Owner
    .get_inv_id()
    .then((value)=>{
    
    res.render('./includes/add_inv' , {
      pageTitle: 'Add Inventory',
      path: '/includes/add_inv',
      editing: false,
      idd:value.rows   
    });
  })
  .catch(err=>console.log(err));
  },

  AllotOrderToChef: function(req,res){

  },

  AllotOrderToWaiter: function(req,res){

  },

  UpdateInventory: function(req,res){
    
    const id = req.body.id;
    const name = req.body.name;

    Owner
    .add_inv(id, name)
    .then(()=>{
      setTimeout(function(){ res.redirect('/owner'); }, 1000);      
    })
    .catch(err=>console.log(err));
  },
  OrderRangeInfo: function(req,res){
    const s_date = req.body.range_start;
    const e_date = req.body.range_end;

    var a=0;
    var b=0;
    var c=0;
    var d=0;
    var e=0;
    var f=0;
    var g=0;
    var h=0;
    var orders_to_serve;
    Owner
    .get_inv_all()
    .then((value1)=>{
      a = value1;
      return get_all();
    })
    .then((value2)=>{
      b = value2;
      return get_orders_all();
    })
    .then((value3)=>{
      c = value3;
      return get_cooks_all();
    })
    .then((value4)=>{
      d = value4;
      return get_serves_all();
    })
    .then((value5)=>{
      e = value5;
      return get_users_all();
    })
    .then((value6)=>{
      f = value6;
      return get_orders_left();
    })
    .then((value7)=>{
      g = value7;
      return get_orders_by_date(s_date, e_date);
    })
    .then((value10)=>{
      m = value10;
      return get_acc_info();
    })
    .then((value9)=>{
      h = value9;
      return get_orders_to_serve();
    })
    .then((value11)=>{
      orders_to_serve = value11;
      return ing_to_be_ordered();
    })
    .then((value8)=> {
      res.render('./includes/owner' , {
        pageTitle: 'Owner\'s page',
        path: '/includes/owner',
        editing:false,
        empl: b.rows,
        invs: a.rows,          
        orders_all: c.rows,
        cooks_all: d.rows,
        serves_all: e.rows,
        users_all: f.rows,
        orders_left: g.rows,
        accs: h.rows,
        hist: m.rows,
        ing_to_order: value8.rows,
        orders_to_serve: orders_to_serve.rows,
        moment: moment
      });
    })
    .catch(err=>console.log(err));
  },

  RestRangeInfo: function(req,res){
    const s_date = req.body.range_start;
    const e_date = req.body.range_end;

    var a=0;
    var b=0;
    var c=0;
    var d=0;
    var e=0;
    var f=0;
    var g=0;
    var h=0;
    var orders_to_serve;
    Owner
    .get_inv_all()
    .then((value1)=>{
      a = value1;
      return get_all();
    })
    .then((value2)=>{
      b = value2;
      return get_orders_all();
    })
    .then((value3)=>{
      c = value3;
      return get_cooks_all();
    })
    .then((value4)=>{
      d = value4;
      return get_serves_all();
    })
    .then((value5)=>{
      e = value5;
      return get_users_all();
    })
    .then((value6)=>{
      f = value6;
      return get_orders_left();
    })
    .then((value7)=>{
      g = value7;
      return get_order_history();
    })
    .then((value10)=>{
      m = value10;
      return get_acc_range_info(s_date, e_date);
    })
    .then((value9)=>{
      h = value9;
      return get_orders_to_serve();
    })
    .then((value11)=>{
      orders_to_serve = value11;
      return ing_to_be_ordered();
    })
    .then((value8)=> {
      res.render('./includes/owner' , {
        pageTitle: 'Owner\'s page',
        path: '/includes/owner',
        editing:false,
        empl: b.rows,
        invs: a.rows,          
        orders_all: c.rows,
        cooks_all: d.rows,
        serves_all: e.rows,
        users_all: f.rows,
        orders_left: g.rows,
        accs: h.rows,
        hist: m.rows,
        ing_to_order: value8.rows,
        orders_to_serve: orders_to_serve.rows,
        moment: moment
      });
    })
    .catch(err=>console.log(err));
  },

  dispReport1: function(req,res){

    var max_exp=0;
    var min_exp=0;
    var avg_exp=0;
    var max_prof=0;
    var min_prof=0;
    var avg_prof=0;
    var max_waste=0;
    var min_waste=0;
    var avg_waste=0;

    Owner
    .get_max_exp()
    .then((value1)=>{
      max_exp = value1;
      return get_min_exp();
    })
    .then((value2)=>{
      min_exp = value2;
      return get_avg_exp();
    })
    .then((value3)=>{
      avg_exp = value3;
      return get_max_prof();
    })
    .then((value4)=>{
      max_prof = value4;
      return get_min_prof();
    })
    .then((value5)=>{
      min_prof = value5;
      return get_avg_prof();
    })
    .then((value6)=>{
      avg_prof = value6;
      return get_max_waste();
    })
    .then((value7)=>{
      max_waste = value7;
      return get_min_waste();
    })
    .then((value10)=>{
      min_waste = value10;
      return get_avg_waste();
    })
    .then((avg_waste)=> {
      res.render('./includes/report1' , {
        pageTitle: 'Report page',
        path: '/includes/report1',
        editing:false,
        max_exp: max_exp.rows, 
        min_exp: min_exp.rows, 
        avg_exp: avg_exp.rows, 
        max_prof: max_prof.rows, 
        min_prof: min_prof.rows, 
        avg_prof: avg_prof.rows, 
        max_waste: max_waste.rows, 
        min_waste: min_waste.rows, 
        avg_waste: avg_waste.rows, 
        moment:moment
      });
    })
    .catch(err=>console.log(err));
  }
}
