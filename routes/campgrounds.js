const express = require('express');
const router = express.Router();

const Campground = require('../models/campground');
const Review = require('../models/review');

const catchAsync = require('../utils/catchAsync');

const { campgroundSchema } = require('../schemas');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');



// index of all campgrounds
router.get('/', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
}))

// form to create a new campground
router.get('/new', isLoggedIn, (req, res) => {    
    res.render('campgrounds/new');
})

// post request creating a new campground
router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
    // if (!req.body.campground) throw new ExpressError(400, "Invalid Campground Data");    
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save()
    req.flash('success', 'Successfully made a new campground!')
    res.redirect(`/campgrounds/${campground._id}`)
}))

// show route
router.get('/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({ 
        path: 'reviews',
        populate: {
            path: 'author'
        } 
    }).populate('author');
    // console.log(campground)
    if(!campground) {
        req.flash('error', 'Cannot find that campground!')
        res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground } );
}))

// form to edit a campground
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if(!campground) {
        req.flash('error', 'Cannot find that campground!')
        res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
}))

// put request to edit/update the campground
router.put('/:id', validateCampground, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;    
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    req.flash('success', 'Successfully updated campground!')
    res.redirect(`/campgrounds/${campground._id}`)
}))

// delete request to delete the campground
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground!')
    res.redirect('/campgrounds');
}))


module.exports = router;