const express = require('express')
const router = express.Router();
const users = require('../controllers/users');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');

// Register Routes
router.get('/register', 
    users.renderRegister);

router.post('/register', 
    catchAsync(users.register));

// Login Routes
router.get('/login', 
    users.renderLogin)

router.post('/login', 
    storeReturnTo, 
    passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), 
    users.login)

router.get('/logout', 
    users.logout); 

module.exports = router;