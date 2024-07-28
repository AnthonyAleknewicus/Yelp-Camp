const mongoose = require('mongoose');
const { campgroundSchema } = require('../schemas');
const Review = require('./review');
const Schema = mongoose.Schema;

// https://res.cloudinary.com/dlarslo8z/image/upload/v1720284452/YelpCamp/ck3xgzp4iubcsw8vrzow.jpg

const ImageSchema = new Schema({
        url: String,
        filename: String
});

ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/h_100,w_200');
})

const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);

CampgroundSchema.virtual('properties.popUpMarkup').get(function() {
    return `<strong>
            <a href="/campgrounds/${this._id}"                      style="text-decoration: none; color: black;">
                ${this.title}
            </a>
            </strong>
            <p>${this.location}</p>
            <p><strong>$${this.price} per night</strong></p>`;
})

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if(doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
});

//exports the basic model Campground from the CampgroundSchema
module.exports = mongoose.model('Campground', CampgroundSchema);