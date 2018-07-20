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

router.post('/api/blurbs', (req, res) => {
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
//   router.post('/api/account/signup', (req, res) => {
//     console.log('in post');
//     const { body } = req;
//     const { password } = body;
//     let { email } = body;

//     if (!email) {
//         return res.send({
//             success: false,
//             message: 'Error: Email cannot be blank.'
//         });
//     }
//     if (!password) {
//         return res.send({
//             success: false,
//             message: 'Error: Password cannot be blank.'
//         });
//     }
//     email = email.toLowerCase();
//     email = email.trim();

//     User.find({
//         email: email
//     }, (err, previousUsers) => {
//         if (err) {
//             return res.send({
//                 success: false,
//                 message: 'Error: Server error'
//             });
//         } else if (previousUsers.length > 0) {
//             return res.send({
//                 success: false,
//                 message: 'Error: Account already exist.'
//             });
//         }
//         // Save the new user
//         const newUser = new User();
//         newUser.email = email;
//         newUser.password = newUser.generateHash(password);
//         newUser.save((err, user) => {
//             if (err) {
//                 return res.send({
//                     success: false,
//                     message: 'Error: Server error'
//                 });
//             }
//             return res.send({
//                 success: true,
//                 message: 'Signed up'
//             });
//         });
//     });
// });