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

  Add_Empl: function(req, res){
    res.render('./includes/add_empl' , {
      pageTitle: 'Add Employee',
      path: '/includes/add_empl',
      editing: false         
    });
  },

  Add_Inv: function(req, res){
    res.render('./includes/add_inv' , {
      pageTitle: 'Add Inventory',
      path: '/includes/add_inv',
      editing: false          
    });
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
