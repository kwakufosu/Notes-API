const mongoose = require('mongoose');
const User = require('./user');

const Notes = mongoose.model('Notes', {
  note: {
    type: String,
    required: true,
  },
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = Notes;
