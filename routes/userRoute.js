const router = require('express').Router();
const User = require('../models/user');

router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    const inputs = Object.keys(req.body);
    const allowedFields = ['name', 'email', 'password'];

    if (!inputs.every((input) => allowedFields.includes(input))) {
      return res.status(400).send({ error: 'Invalid field detected' });
    }
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.login(req.body.email, req.body.password);

    res.send(user);
  } catch (e) {
    res.status(403).send();
  }
});

// router.patch('/users/update', async (req, res) => {
//   try {
//     const updates = Object.keys(req.body);
//     const allowedFields = ['name', 'email', 'password'];

//     if (!updates.every((update) => allowedFields.includes(update))) {
//       return res.status(400).send({ error: 'Invalid field detected' });
//     }
//     const user= User.findOneAndUpdate()
//     await user.save();
//     res.status(201).send(user);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

module.exports = router;
