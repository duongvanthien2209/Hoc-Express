const express = require('express');
const router = express.Router();

// Shortid
const shortid = require('shortid');

// Lowdb
const db = require('../db');

// Controllers
const userController = require('../controllers/user.controller');

// View all
router.get('/', userController.getIndex);

// Search
router.get('/search', userController.getSearch);

// Create
router.get('/create', userController.getCreate);

router.post('/create', userController.postCreate);

// View user
router.get('/view/:id', userController.getView);

module.exports = router;