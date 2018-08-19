const mongoose = require('mongoose');

const BlurbsSchema = new mongoose.Schema({
  category: String,
  name: String,
  content: String,
  date: { type: Date, default: Date.now },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model('Blurb', BlurbsSchema);