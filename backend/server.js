require('rootpath')();
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
// import mongoose from 'mongoose';
// import { getSecret } from './dburi';
const cors = require('cors');
const jwt = require('./helpers/jwt');
const errorHandler = require('./helpers/errorhandler');

const app = express();
// const router = express.Router();

const API_PORT = process.env.API_PORT || 3001;

// mongoose.connect(getSecret('dbUri'));
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));

app.use(jwt());

app.use(require('./routes/api/messages'));
app.use(require('./routes/api/users'));

app.use(errorHandler);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));