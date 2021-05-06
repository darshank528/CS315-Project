const { get_all, get_orders_all } = require('./../models/owner');
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
    var a =0;
    var b = 0;

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
    .then((value3)=> {
      res.render('./includes/owner' , {
        pageTitle: 'Owner\'s page',
        path: '/includes/owner',
        editing:false,
        empl: b.rows,
        invs: a.rows,          
        orders_all: value3.rows
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
