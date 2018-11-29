const Blurb = require("../../models/Blurb");
const Router = require("express");

const router = (module.exports = new Router());

// gets all blurbs from all users
router.get("/api/blurbs", (req, res) => {
  Blurb.find((err, blurbs) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: blurbs });
  });
});

// gets the specified user's blurbs sorted by created date
router.get("/api/blurbs/:id", (req, res) => {
  Blurb.find({ author: req.params.id })
    .sort({ _id: -1 })
    .exec((err, blurbs) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: blurbs });
    });
});

// gets the specified user's blurbs filtered by category, sorted by created date
router.get("/api/blurbs/:id/:category", (req, res) => {
  Blurb.find({ author: req.params.id, category: req.params.category })
    .sort({ _id: -1 })
    .exec((err, blurbs) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: blurbs });
    });
});

// updates a blurb for a specified user
router.put("/api/blurbs/:userId/:blurbId", (req, res) => {
  const { userId, blurbId } = req.params;
  if (!userId || !blurbId) {
    return res.json({
      success: false,
      error: "No blurb id or user id provided"
    });
  }

  Blurb.findById(blurbId, (error, blurb) => {
    if (error) return res.json({ success: false, error });

    const { category, name, content, date, user } = req.body;
    if (userId !== new String(blurb.author._id).valueOf())
      return res.json({ success: false, error: "Invalid user" });

    if (!category || !name || !content || !date) {
      return res.json({
        success: false,
        error: "You must provide a category, name, and date"
      });
    }

    blurb.category = category;
    blurb.name = name;
    blurb.content = content;
    blurb.date = date;
    blurb.author = user;
    blurb.save(error => {
      if (error) return res.json({ success: false, error });
      return res.json({ success: true });
    });
  });
});

// deletes a blurb for a specified user
router.delete("/api/blurbs/:userId/:blurbId", (req, res) => {
  const { userId, blurbId } = req.params;
  if (!userId || !blurbId) {
    return res.json({
      success: false,
      error: "No blurb id or user id provided"
    });
  }
  Blurb.remove({ _id: blurbId }, (error, blurb) => {
    if (error) return res.json({ success: false, error });
    return res.json({ success: true });
  });
});
