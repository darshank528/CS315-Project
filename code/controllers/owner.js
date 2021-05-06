const { get_all, get_orders_all, get_cooks_all, get_serves_all, get_users_all, get_orders_left, get_orders_to_serve } = require('./../models/owner');
var Owner = require('./../models/owner');

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
      return get_orders_to_serve();
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
        orders_to_serve: value8.rows
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
  }
}
