// Lowdb
const db = require('../db');
// Shortid
const shortid = require('shortid');

module.exports.getIndex = function (req, res) {
    var users = db.get('users').value();
    res.render('users/index', {users});
}

module.exports.getSearch = function (req, res) {
    var q = req.query.q.toLowerCase();
    var users = db.get('users').value();
    var user = users.filter(function (item) {
        return item.name.toLowerCase().indexOf(q) !== -1;
    });
    res.render('users/index', { users: user });
}

module.exports.getCreate = function (req, res) {
    res.render('users/create');
}

module.exports.postCreate = function (req, res) {
    // console.log(req.body);
    // users.push(req.body);
    db.get('users').push({ id: shortid.generate(), name: req.body.name, age: req.body.age }).write();
    res.redirect('/users');
}

module.exports.getView = function (req, res) {
    // console.log(req.params);
    var id = req.params.id;
    var user = db.get('users').find({ id }).value();
    res.render('users/viewUser', { user });
}