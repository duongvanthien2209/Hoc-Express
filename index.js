var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;

// Setup lowdb
const db = require('./db');

// Setup template engine
app.set('view engine', 'pug');
app.set('views', './views');

// Đọc dữ liệu từ client gởi lên qua method POST
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Khai báo route
const userRoute = require('./routes/user.route');
const todosRoute = require('./routes/todos.route');

app.get('/', function(req,res) {
    res.render('index', {name: 'Thien'});
});

app.use('/todos', todosRoute);

app.use('/users', userRoute);

app.listen(port, function() {
    console.log('App da duoc khoi tai tai cong ' + port);
});