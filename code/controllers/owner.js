const { get_all } = require('./../models/owner');
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
    
    Owner
    .get_inv_all()
    .then((value1)=>{
      a = value1;
      return get_all();
    })
    .then((value2)=> {
      res.render('./includes/owner' , {
        pageTitle: 'Owner\'s page',
        path: '/includes/owner',
        editing:false,
        empl: value2.rows,
        invs: a.rows          

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

  AllotOrderToChef: function(req,res){

  },

  AllotOrderToWaiter: function(req,res){

  },

  UpdateInventory: function(req,res){
    
  }
}
