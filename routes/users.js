const express = require('express')
const router = express.Router();
const users = require('../controllers/users');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');


router.route('/register')
    // Register Routes
    .get( 
        users.renderRegister)
    .post(
        catchAsync(users.register))

router.route('/login')
    // Login Routes
    .get( 
        users.renderLogin)
    .post( 
        storeReturnTo, 
        passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), 
        users.login)

router.get('/logout', 
    users.logout); 

module.exports = router;