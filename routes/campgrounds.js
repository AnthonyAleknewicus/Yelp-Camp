const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');

const Campground = require('../models/campground');
const Review = require('../models/review');

const catchAsync = require('../utils/catchAsync');

const { campgroundSchema } = require('../schemas');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');



// index of all campgrounds
router.get('/', 
    catchAsync(campgrounds.index));

// form to create a new campground
router.get('/new', 
    isLoggedIn, 
    campgrounds.renderNewForm);

// post request creating a new campground
router.post('/', 
    isLoggedIn, 
    validateCampground, 
    catchAsync(campgrounds.createCampground));

// show route
router.get('/:id', 
    catchAsync(campgrounds.showCampground));

// form to edit a campground
router.get('/:id/edit', 
    isLoggedIn, 
    isAuthor, 
    catchAsync(campgrounds.renderEditForm));

// put request to edit/update the campground
router.put('/:id', 
    validateCampground, 
    isAuthor, 
    catchAsync(campgrounds.updateCampground));

// delete request to delete the campground
router.delete('/:id', 
    isLoggedIn, 
    isAuthor, 
    catchAsync(campgrounds.deleteCampground));


module.exports = router;