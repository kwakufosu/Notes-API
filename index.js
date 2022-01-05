const express = require('express');
require('dotenv').config();
require('./db/mongoose');
const userRouter = require('./routes/userRoute');

const app = express();
app.use(express.json());

app.use(userRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
