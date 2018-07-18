import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import { getSecret } from './dburi';
import Blurb from './models/blurbs';

const app = express();
const router = express.Router();

const API_PORT = process.env.API_PORT || 3001;

mongoose.connect(getSecret('dbUri'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

router.get('/blurbs', (req, res) => {
    Blurb.find((err, blurbs) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: blurbs });
    });
});

router.post('/blurbs', (req, res) => {
    const blurb = new Blurb();
    const { category, name, content, date } = req.body;
    if (!category || !name || !content || !date) {
      return res.json({
        success: false,
        error: 'You must provide a category, name, and date'
      });
    }
    blurb.category = category;
    blurb.name = name;
    blurb.content = content;
    blurb.date = date;
    blurb.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });

app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));