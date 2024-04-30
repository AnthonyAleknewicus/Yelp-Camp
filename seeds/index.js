const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
    await console.log('Database CONNECTED!')
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground ({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, accusantium nihil quibusdam quaerat sequi atque suscipit voluptatum beatae ea quae consequatur ullam fugiat libero mollitia eos molestias blanditiis nemo fuga! Amet, eius aut. Dicta optio nisi dolores molestiae maiores eveniet eos nihil quae amet, aperiam suscipit similique fugiat minus totam illo. Odit.",
            price
        })
        await camp.save();
    }
} 

seedDB().then(() => {
    mongoose.connection.close();
})