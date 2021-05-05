const { getOrders } = require('./../models/employee');
var Employee = require('./../models/employee');

module.exports = {
  createEmployee: function(req, res) {
    Employee.create(req.body)
      .then(function(result) {
        return res.status(200).json({
          message: 'success! created account for new Employee',
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
  	//res.render('./includes/home',{'pageTitle':"Home"});
    var a = 0;

    Employee.getProfile(10)
      .then((value1)=> {
        a = value1;
        return getOrders(10);
      })
      .then((value2)=>{
        res.render('./includes/employee' , {
          pageTitle: 'My Details',
          path: '/includes/employee',
          editing:false,
          prof: a.rows,
          orders: value2.rows          

        });
      })
      .catch(err=>console.log(err));

  },
  GetProfile: function(req,res){

    Employee.getProfile(20)
      .then((value)=> {
        res.render('./includes/employee' , {
          pageTitle: 'My Profile',
          path: '/includes/employee',
          editing:false,
          prof: value.rows          

        });
      })
      .catch(err=>console.log(err));

  },
  CookOrServeDish: function(req,res){
      
  }
}
