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
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground ({
          // MY author ID 
            author: '666cd317d499984fa4c844b0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, accusantium nihil quibusdam quaerat sequi atque suscipit voluptatum beatae ea quae consequatur ullam fugiat libero mollitia eos molestias blanditiis nemo fuga! Amet, eius aut. Dicta optio nisi dolores molestiae maiores eveniet eos nihil quae amet, aperiam suscipit similique fugiat minus totam illo. Odit.",
            price,
            geometry: {
              type: 'Point', 
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ] 
            },
            
            images: [
                {
                  url: 'https://res.cloudinary.com/dlarslo8z/image/upload/v1720837574/YelpCamp/amcka6c1j7nldeoskp5m.jpg',
                  filename: 'YelpCamp/amcka6c1j7nldeoskp5m'
                },
                {
                  url: 'https://res.cloudinary.com/dlarslo8z/image/upload/v1720837451/YelpCamp/tsmvas11lfbawzbuebpv.jpg',
                  filename: 'YelpCamp/tsmvas11lfbawzbuebpv'
                }
              ],        
        })
        await camp.save();
    }
} 

seedDB().then(() => {
    mongoose.connection.close();
})