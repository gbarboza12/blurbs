const Queue = require("../../models/Queue");
const Router = require("express");

const router = (module.exports = new Router());

// get specified users queue entries
router.get("/api/queue/:id", (req, res) => {
  Queue.find({ author: req.params.id }, (err, queue) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: queue });
  });
});

// get specified users queue entries by category
router.get("/api/queue/:id/:category", (req, res) => {
  Queue.find(
    { author: req.params.id, category: req.params.category },
    (err, queue) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: queue });
    }
  );
});

// post a new entry to queue
router.post('/api/queue', (req, res) => {
  const { item, category, completed, date, user } = req.body;

  if (!item || !date || !user) {
    return res.json({
      success: false,
      error: 'You must provide an item'
    });
  }
  const queue = new Queue();
  queue.item = item;
  queue.category = category;
  queue.completed = completed;
  queue.date = date;
  queue.author = user
  queue.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// updates a queue for a specified user
router.put("/api/queue/:userId/:queueId", (req, res) => {
  const { userId, queueId } = req.params;
  if (!userId || !queueId) {
    return res.json({
      success: false,
      error: "No queue id or user id provided"
    });
  }

  Queue.findById(queueId, (error, queue) => {
    if (error) return res.json({ success: false, error });

    const { completed, user } = req.body;
    if (userId !== new String(queue.author._id).valueOf())
      return res.json({ success: false, error: "Invalid user" });

    queue.completed = completed;
    queue.save(error => {
      if (error) return res.json({ success: false, error });
      return res.json({ success: true });
    });
  });
});

// deletes a queue entry for a specified user
router.delete("/api/queue/:userId/:queueId", (req, res) => {
  const { userId, queueId } = req.params;
  if (!userId || !queueId) {
    return res.json({
      success: false,
      error: "No queue id or user id provided"
    });
  }
  Queue.remove({ _id: queueId }, (error, queue) => {
    if (error) return res.json({ success: false, error });
    return res.json({ success: true });
  });
});
