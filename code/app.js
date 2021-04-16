var msg='Hello World';
console.log(msg);
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pool =  require('./utils/database');

const userRo = require('./routes/user');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/',userRo);

app.listen(3000);