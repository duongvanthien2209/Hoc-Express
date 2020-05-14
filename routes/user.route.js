const express = require('express');
const router = express.Router();

// Shortid
const shortid = require('shortid');

// Lowdb
const db = require('../db');

router.get('/', function(req,res) {
    var users = db.get('users').value();
    res.render('users/index', {users});
});

router.get('/search', function(req,res) {
    var q = req.query.q.toLowerCase();
    var users = db.get('users').value();
    var user = users.filter(function(item) {
        return item.name.toLowerCase().indexOf(q) !== -1;
    });
    res.render('users/index', {users: user});
});

router.get('/create', function(req,res) {
    res.render('users/create');
});

router.post('/create', function(req,res) {
    // console.log(req.body);
    // users.push(req.body);
    db.get('users').push({id: shortid.generate(), name: req.body.name, age: req.body.age}).write();
    res.redirect('/users');
});

router.get('/view/:id', function(req,res) {
    // console.log(req.params);
    var id = req.params.id;
    var user = db.get('users').find({id}).value();
    res.render('users/viewUser', {user});
});

module.exports = router;