// Lowdb
const db = require('../db');

module.exports.getIndex = function (req, res) {
    var todoList = db.get('todoList').value();
    res.render('todoList/index', { todoList });
}