const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');

const Campground = require('../models/campground');
const Review = require('../models/review');

const catchAsync = require('../utils/catchAsync');

const { campgroundSchema } = require('../schemas');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });


router.route('/')
    // index of all campgrounds

    .get(
        catchAsync(campgrounds.index))
    // post request creating a new campground
    .post(
        isLoggedIn, 
        upload.array('image'),
        validateCampground, 
        catchAsync(campgrounds.createCampground))
    

// form to create a new campground
router.get('/new', 
    isLoggedIn, 
    campgrounds.renderNewForm)

router.route('/:id')
    // show route
    .get( 
    catchAsync(campgrounds.showCampground))
    // put request to edit/update the campground
    .put(         
        isAuthor, 
        upload.array('image'),
        validateCampground, 
        catchAsync(campgrounds.updateCampground))
    // delete request to delete the campground
    .delete(
        isLoggedIn, 
        isAuthor, 
        catchAsync(campgrounds.deleteCampground))

// form to edit a campground
router.get('/:id/edit', 
    isLoggedIn, 
    isAuthor, 
    catchAsync(campgrounds.renderEditForm))




module.exports = router;