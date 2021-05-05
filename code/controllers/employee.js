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
  	res.render('./includes/home',{'pageTitle':"Home"});
  },
  GetProfile: function(req,res){

    Employee.getProfile()
      .then((value)=> {
        res.render('employee' , {
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
