const express = require('express');
const router = express.Router();

// Lowdb
const db = require('../db');

router.get('/', function(req,res) {
    var todoList = db.get('todoList').value();
    res.render('todoList/index', {todoList});
});

module.exports = router;