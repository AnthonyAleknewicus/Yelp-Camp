const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String
});

//exports the basic model Campground from the CampgroundSchema
module.exports = mongoose.model('Campground', CampgroundSchema);