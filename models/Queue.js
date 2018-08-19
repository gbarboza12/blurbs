const mongoose = require('mongoose');

const QueueSchema = new mongoose.Schema({
   item: String,
   category: {type: String, default: null},
   completed: Boolean,
   date: { type: Date, default: Date.now },
   author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
 });
 
 module.exports = mongoose.model('Queue', QueueSchema);