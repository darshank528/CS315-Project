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
    var uname = req.cookies.user;
    if(!uname){
      return res.redirect("/login");
    }
    var isAuth = req.cookies.isAuth ;
    Employee.getProfile(uname)
      .then((value1)=> {
        a = value1;
        return getOrders(uname,(isAuth==3));
      })
      .then((value2)=>{
        res.render('./includes/employee' , {
          pageTitle: 'My Details',
          path: '/includes/employee',
          editing:false,
          prof: a.rows,
          orders: value2.rows,
          isAuth: req.cookies.isAuth  
       

        });
      })
      .catch(err=>console.log(err));

  },
  GetProfile: function(req,res){

    Employee.getProfile(14)
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

    const order_id = req.body.order_id;
    const id = req.body.id;
    const dish_id = req.body.dish_id;
    var isAuth = req.cookies.isAuth;
    Employee
    .update_cookserve(id, order_id, dish_id, (isAuth==3))
    .then(()=> {
      setTimeout(function(){ res.redirect('/employee'); }, 1000);      

    }).catch(err=>console.log(err));

  }
}
