var msg='Hello World';
console.log(msg);
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pool =  require('./utils/database');

const userRo = require('./routes/user');
const empRo = require('./routes/employee');
const ownRo = require('./routes/owner');
const invRo = require('./routes/invent');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/',userRo);
app.use('/employee',empRo);
app.use('/owner',ownRo);
app.use('/invent',invRo);

app.listen(3000);