// const config = require('config.json');
const mongoose = require('mongoose');
var url = process.env.MONGOLAB_URI;

mongoose.connect(url);
mongoose.Promise = global.Promise;
 
module.exports = {
    User: require('../models/User')
};