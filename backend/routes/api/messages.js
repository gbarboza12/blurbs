import Blurb from '../../models/blurbs';
import User from '../../models/User';
import { Router } from 'express';

const router = module.exports = new Router();

router.get('/api', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

router.get('/api/blurbs', (req, res) => {
    Blurb.find((err, blurbs) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: blurbs });
    });
});

router.get('/api/blurbs/:id', (req, res) => {
  Blurb.find({'author.id': req.user._id}, (err, blurbs) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: blurbs });
  });
});

router.post('/api/blurbs', (req, res) => {
    const { category, name, content, date, user } = req.body;
    if (!category || !name || !content || !date || !user) {
      return res.json({
        success: false,
        error: 'You must provide a category, name, and date'
      });
    }
    const blurb = new Blurb();
    blurb.category = category;
    blurb.name = name;
    blurb.content = content;
    blurb.date = date;
    blurb.author = user
    blurb.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });