var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;

// Setup template engine
app.set('view engine', 'pug');
app.set('views', './views');

// Đọc dữ liệu từ client gởi lên qua method POST
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function(req,res) {
    res.render('index', {name: 'Thien'});
});

app.get('/todos', function(req,res) {
    res.render('todoList/index', {todoList: ['Đi chợ', 'Nấu cơm', 'Học code trên codersX']});
});

var users = [
    {name: 'Thien', age: 24},
    {name: 'Thao', age: 24},
    {name: 'Huy', age: 21}
];

app.get('/users', function(req,res) {
    res.render('users/index', {users: users});
});

app.get('/users/search', function(req,res) {
    var q = req.query.q.toLowerCase();
    var user = users.filter(function(item) {
        return item.name.toLowerCase().indexOf(q) !== -1;
    });
    res.render('users/index', {users: user});
});

app.get('/users/create', function(req,res) {
    res.render('users/create');
});

app.post('/users/create', function(req,res) {
    // console.log(req.body);
    users.push(req.body);
    res.redirect('/users');
});

app.listen(port, function() {
    console.log('App da duoc khoi tai tai cong ' + port);
});