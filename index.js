var express = require('express');
var app = express();
var port = 3000;

// Setup template engine
app.set('view engine', 'pug');
app.set('views', './views');

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

app.listen(port, function() {
    console.log('App da duoc khoi tai tai cong ' + port);
});