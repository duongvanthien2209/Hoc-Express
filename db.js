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

module.exports = db;