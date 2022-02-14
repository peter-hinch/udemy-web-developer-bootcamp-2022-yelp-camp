const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('./../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  //useCreateIndex: true, // Should be omitted in mongoose 6 upward
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: 'https://source.unsplash.com/collection/483251',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus nisi suscipit odio, unde a ex rem, maxime molestias odit deserunt, impedit nesciunt minus? Perspiciatis qui eius deleniti aliquid ratione. Amet numquam sequi a ipsa consectetur iusto quae beatae expedita corporis autem maiores sit esse est eveniet, qui provident debitis accusantium quod obcaecati possimus quisquam incidunt quidem! Molestiae veritatis doloremque, culpa perspiciatis esse explicabo error soluta amet laborum illo maiores, cupiditate, ullam dolor id facilis commodi labore magni! Repudiandae, perferendis. Repellendus, culpa magnam neque velit totam, reprehenderit inventore placeat, minima illum iure aliquam odit earum maiores expedita aliquid repellat autem. Soluta!',
      price
    });
    await camp.save();
  }
}

seedDB().then( () => {
  mongoose.connection.close();
});