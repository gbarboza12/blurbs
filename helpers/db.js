const config = require('config.json');
const mongoose = require('mongoose');
var url = process.env.MONGOLAB_URI;

mongoose.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', url);
    }
   });
mongoose.Promise = global.Promise;
 
module.exports = {
    User: require('../models/User')
};