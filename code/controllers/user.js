var User = require('./../models/login');
var User1 = require('./../models/user');
var employee = require('./../models/user');
var moment = require('moment');
const { request } = require('express');

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
  
        var uname = req.cookies.user;
        if(!uname){
          return res.redirect("/login");
        }
        console.log("isAuth",req.cookies.isAuth);
        var cuisine = !req.body.cui? null: req.body.cui;
        var category = !req.body.cat? null: req.body.cat;
        var cost = !req.body.cost? null: req.body.cost;
        console.log(cuisine,category,cost);
        
        User1.getProfile(uname)
        .then((proff)=>{
        User1.getTopDishes(uname)
        .then((topd)=>{
        User1.getOrders(uname)
        .then((value)=> {
          console.log("ORDERS",value.rows);
          User1.getMenu(cuisine,category,cost)
          .then((menu)=> {
              console.log("homemenu", menu.rows);
              return res.render('./includes/home' , {
                pageTitle: 'My Profile',
                path: '/includes/home',
                editing:false,
                orders: value.rows,
                menu: menu.rows,
                topds: topd.rows,
                prof: proff.rows,
                isAuth: req.cookies.isAuth  
              });
          }).catch(err=>console.log(err));
        })
        .catch(err=>console.log(err));
      })
      .catch(err=>console.log(err));
    })
    .catch(err=>console.log(err));
      
  },
  loadhome2: function(req,res){
    console.log("pqrs",req.body,req.body.cui,req.body.cost,req.body.cat);
    var uname = req.cookies.user;
    if(!uname){
      return res.redirect("/login");
    }
    console.log("isAuth",req.cookies.isAuth);
    var cuisine = !req.body.cui? null: req.body.cui.split(",");
    var category = !req.body.cat? null: req.body.cat.split(",");
    var cost = !req.body.cost? null: req.body.cost;
    console.log(cuisine,category,cost);
    
    User1.getProfile(uname)
    .then((proff)=>{
    User1.getTopDishes(uname)
    .then((topd)=>{
    User1.getOrders(uname)
    .then((value)=> {
      // console.log("ORDERS",value.rows);
      User1.getMenu(cuisine,category,cost)
      .then((menu)=> {
          console.log("homemenu", menu.rows);
          return res.render('./includes/home' , {
            pageTitle: 'My Profile',
            path: '/includes/home',
            editing:false,
            orders: value.rows,
            menu: menu.rows,
            topds: topd.rows,
            prof: proff.rows,
            isAuth: req.cookies.isAuth  
          });
      }).catch(err=>console.log(err));
    })
    .catch(err=>console.log(err));
  })
  .catch(err=>console.log(err));
})
.catch(err=>console.log(err))
      
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
    
    User.authenticate_customer(uname,passwd).then((val)=>{
      val1 = val;
        return User.authenticate_employee(uname,passwd);
    })
    .then((ret)=>{
      console.log(ret, val1);
      
        isAuth = Math.max(ret,val1);
        console.log("isAuth", isAuth);
        res.cookie('isAuth', isAuth, {expire: 360000 + Date.now()}); 

        if(isAuth==1){
            
            res.cookie('user', uname, {expire: 360000 + Date.now()}); 
            return res.redirect("/");
            
           
        }
        else if(isAuth==2 || isAuth==3){
          res.cookie('user', uname, {expire: 360000 + Date.now()}); 
          return res.redirect("/employee");
          
        }
        else if(isAuth==4){
          res.cookie('user', uname, {expire: 360000 + Date.now()}); 
          return res.redirect("/owner");
          
        }
        else {console.log("Invalid email id/passwd");
        res.render('./includes/login');
      }
    })
  },
  PlaceOrder: function(req, res){
    const dish_id=req.body.id;
    console.log("ABCD",req.body);
    const quantity = req.body.quantity;
    console.log(quantity);
    var curr = new Date();
    var time = curr.toLocaleTimeString();
    var date = curr.toLocaleDateString();
    console.log(date,time);
    var day = curr.getDay();
    var id = req.cookies.user; //req.body.user_id
    var cost1, ord_id1;
    User1.getcost(dish_id)
    .then((cost)=>{
        cost1 = cost;
			 return User1.getCountOfOrders();
		})
    .then((ord_id)=>{
      
      ord_id1 = parseInt(ord_id.rows[0]['?column?']);
      console.log(cost1,ord_id1);
      return User1.addOrder(id, dish_id,date,time, day, quantity, cost1, ord_id1)
      .then((val)=>{
        setTimeout(function(){ res.redirect('/'); }, 1000);  
      })
    })
   

  },
  logout: function(req,res){
    res.clearCookie('user');
    res.clearCookie('isAuth');
    return res.redirect("/login");
    return Promise.resolve(0);
  },
  user_prof_get: function(req, res){



  },

  OrderHistory: function(req, res){

  }
}
