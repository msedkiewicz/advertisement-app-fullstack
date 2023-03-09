const mongoose = require('mongoose');

const advertSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 10, maxlength: 50 },
  description: { type: String, required: true, minlength: 20, maxlength: 1000 },
  date: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  localization: { type: String, required: true },
  user: { type: String, required: true, ref: 'User' },
});

module.exports = mongoose.model('Advert', advertSchema);
