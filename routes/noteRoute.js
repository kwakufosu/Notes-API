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

router.get('/note/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const note = await Note.findOne({ id: _id, owner_id: req.user._id });
    if (!note) {
      return res.status(404).send();
    }
    res.send(note);
  } catch (e) {
    res.status(404).send();
  }
});

router.get('/note', auth, async (req, res) => {
  try {
    const note = await Note.find({ owner_id: req.user._id });
    if (!note) {
      return res.status(404).send();
    }
    res.send(note);
  } catch (e) {
    res.status(404).send();
  }
});

router.delete('/note/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const note = await Note.findOneAndDelete({
      id: _id,
      owner_id: req.user._id,
    });
    if (!note) {
      return res.status(401).send();
    }
    res.send(note);
  } catch (e) {
    res.status(401).send();
  }
});

module.exports = router;
