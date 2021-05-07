var User = require('./../models/login');
var User1 = require('./../models/user');
module.exports = {
  createUser: function(req, res) {
    User.create(req.body)
      .then(function(result) {
        return res.status(200).json({
          message: 'success! created account for new user',
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
    
        console.log(req.method,req.body);
        var cuisine = !req.body.cui? null: req.body.cui;
        var category = !req.body.cat? null: req.body.cat;
        var cost = !req.body.cost? null: req.body.cost;
        console.log(cuisine,category,cost);
        User1.getOrders(20)
        .then((value)=> {
          User1.getMenu(cuisine,category,cost)
          .then((menu)=> {
              console.log("homemenu", menu.rows);
              res.render('./includes/home' , {
                pageTitle: 'My Profile',
                path: '/includes/home',
                editing:false,
                orders: value.rows,
                menu: menu.rows    
              });
          }).catch(err=>console.log(err));
        })
        .catch(err=>console.log(err));
      
  },
  loadhome2: function(req,res){
  	//res.render('./includes/home',{'pageTitle':"Home"});
    
        console.log(req.method,req.body);
        var cuisine = !req.body.cui? null: req.body.cui;
        var category = !req.body.cat? null: req.body.cat;
        var cost = !req.body.cost? null: req.body.cost;
        console.log(cuisine,category,cost);
        User1.getOrders(20)
        .then((value)=> {
          User1.getMenu(cuisine,category,cost)
          .then((menu)=> {
              console.log("homemenu", menu.rows);
              res.render('./includes/home' , {
                pageTitle: 'My Profile',
                path: '/includes/home',
                editing:false,
                orders: value.rows,
                menu: menu.rows    
              });
          }).catch(err=>console.log(err));
        })
        .catch(err=>console.log(err));
      
  },
  loginPage: function(req,res){
    res.render("./includes/login",{
      pageTitle: "home",
    });
  },
  login: function(req,res){
    var uname = req.body.username;
    var passwd = req.body.password;
    var isAuth = -1; var val1;
    var id = 1;
    User.authenticate_customer(uname,passwd).then((val)=>{
      val1 = val;
        return User.authenticate_employee(uname,passwd);
    })
    .then((ret)=>{
      console.log(ret, val1);
      
        isAuth = Math.max(ret,val1);
        console.log("isAuth", isAuth);
        if(isAuth==1){
            User1.getOrders(id)
            .then((value)=> {
              console.log("VALUEE", value.rows);
              User1.getMenu(null,null,null)          
              .then((menu)=> {
                  console.log("homemenu", menu.rows);
                  res.render('./includes/home' , {
                    pageTitle: 'My Profile',
                    path: '/includes/home',
                    editing:false,
                    orders: value.rows,
                    menu: menu.rows,
                    user_id : uname, 
                  });
              }).catch(err=>console.log(err));
            })
            .catch(err=>console.log(err));
        }
        else if(isAuth==2){

        }
        else if(isAuth==3){

        }
        else {console.log("Invalid email id/passwd");
        res.render('./includes/login');}
    })
  },
  PlaceOrder: function(req, res){
    const dish_id=req.body.id;
    const quantity = req.body.quantity;
    console.log(quantity);
    var curr = new Date();
    var time = curr.toLocaleTimeString();
    var date = curr.toLocaleDateString();
    console.log(date,time);
    var day = curr.getDay();
    var id = 236; //req.body.user_id
    var cost1, ord_id1;
    User1.getcost(dish_id)
    .then((cost)=>{
        cost1 = cost;
			 return User1.getCountOfOrders();
		})
    .then((ord_id)=>{
      console.log(ord_id);
      ord_id1 = parseInt(ord_id.rows[0]['?column?']);
      console.log(cost1,ord_id1);
      return User1.addOrder(id, dish_id,date,time, day, quantity, cost1, ord_id1)
      .then((val)=>{
        console.log("ABCD",val);

       User1.getOrders(id)
        .then((value)=> {
          console.log("VALUEE", value.rows);
          User1.getMenu(null,null,null)          
          .then((menu)=> {
              console.log("homemenu", menu.rows);
              res.render('./includes/home' , {
                pageTitle: 'My Profile',
                path: '/includes/home',
                editing:false,
                orders: value.rows,
                menu: menu.rows    
              });
          }).catch(err=>console.log(err));
        })
        .catch(err=>console.log(err));
        return res;
      })
    })
   

  },

  GetProfile: function(req, res){

  },

  OrderHistory: function(req, res){

  }
}
