const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require( 'morgan');
const cors = require('cors');
const jwt = require('./helpers/jwt');
const errorHandler = require('./helpers/errorhandler');
const path = require("path")

const API_PORT = process.env.PORT || 3001;
const url = process.env.MONGOLAB_URI;

// mongoose setup
mongoose.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', url);
    }
   });
mongoose.Promise = global.Promise;

// express setup
const app = express();
app.use(express.static(path.join(__dirname, "client", "build")))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));
app.use(jwt());
app.use(errorHandler);

// API routes
app.use(require('./routes/api/messages'));
app.use(require('./routes/api/signin'));
app.use(require('./routes/api/users'));
app.use(require('./routes/api/queueentries'));


app.get("*", (req, res) => {  
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));