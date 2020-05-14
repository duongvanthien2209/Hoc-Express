const express = require('express');
const router = express.Router();

// Lowdb
const db = require('../db');

// Controllers
const todoController = require('../controllers/todo.controller');

router.get('/', todoController.getIndex);

module.exports = router;