const router = require('express').Router();
const User = require('../models/user');
const auth = require('../middleware/auth');

router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    const inputs = Object.keys(req.body);
    const allowedFields = ['name', 'email', 'password'];

    if (!inputs.every((input) => allowedFields.includes(input))) {
      return res.status(400).send({ error: 'Invalid field detected' });
    }
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.login(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    console.log(e);
    res.status(403).send();
  }
});

router.get('/users/me', auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    res.send(user);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.patch('/users', auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedFields = ['name', 'email', 'password'];

    if (!updates.every((update) => allowedFields.includes(update))) {
      return res.status(400).send({ error: 'Invalid field detected' });
    }

    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        ...req.body,
      },
      { new: true, runValidators: true }
    );
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/users/me', auth, async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.user._id });
    res.send(user);
  } catch (e) {
    res.status(400).send();
  }
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((tokens) => {
      return tokens.token !== req.token;
    });
    await req.user.save();
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
