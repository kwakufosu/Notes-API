const mongoose = require('mongoose');

const MONGO_URL =
  'mongodb+srv://kwaks:<password>@cluster0.cxw0w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(MONGO_URL, { useNewUrlParser: true }, () => {
  console.log('connected to db');
});
