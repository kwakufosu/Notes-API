const Note = require('../models/notes');
const auth = require('../middleware/auth');
const router = require('express').Router();

router.post('/note', auth, async (req, res) => {
  try {
    const note = new Note({
      ...req.body,
      owner_id: req.user._id,
    });

    await note.save();
    res.send(note);
  } catch (e) {
    res.status(201).send(e);
  }
});

module.exports = router;
