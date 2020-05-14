var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;

// Tao chuoi ID ngau nhien
var shortid = require('shortid');

// Setup lowdb
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync('db.json');
var db = low(adapter);

// Mac dinh cho database
db.defaults({ todoList: [], users: [] })
  .write();

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
    var todoList = db.get('todoList').value();
    res.render('todoList/index', {todoList});
});

// var users = [
//     {name: 'Thien', age: 24},
//     {name: 'Thao', age: 24},
//     {name: 'Huy', age: 21}
// ];

app.get('/users', function(req,res) {
    var users = db.get('users').value();
    res.render('users/index', {users});
});

app.get('/users/search', function(req,res) {
    var q = req.query.q.toLowerCase();
    var users = db.get('users').value();
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
    // users.push(req.body);
    db.get('users').push({id: shortid.generate(), name: req.body.name, age: req.body.age}).write();
    res.redirect('/users');
});

app.get('/users/view/:id', function(req,res) {
    // console.log(req.params);
    var id = req.params.id;
    var user = db.get('users').find({id}).value();
    res.render('users/viewUser', {user});
});

app.listen(port, function() {
    console.log('App da duoc khoi tai tai cong ' + port);
});