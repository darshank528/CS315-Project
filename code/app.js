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
const emp_maRo = require('./routes/empl');
const upemp = require('./routes/up_empl');
const uppemp = require('./routes/upp_empl');
const allotcook1 = require('./routes/allotcook1');
const uppallotcook1 = require('./routes/upp_allotcook1');
const allotwaiter1 = require('./routes/allotwaiter1');
const uppallotwaiter1 = require('./routes/upp_allotwaiter1');


const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/',userRo);
app.use('/employee',empRo);
app.use('/owner',ownRo);
app.use('/invent',invRo);
app.use('/empl',emp_maRo);
app.use('/up_empl',upemp);
app.use('/upp_empl',uppemp);
app.use('/allotcook1',allotcook1);
app.use('/upp_allotcook1', uppallotcook1);
app.use('/allotwaiter1',allotwaiter1);
app.use('/upp_allotwaiter1', uppallotwaiter1);

app.listen(3000);