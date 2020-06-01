const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://mongo:27017/server', { useNewUrlParser: true });
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => res.send('Hello World!'));

const port = 8080;

app.listen(port, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log(`SERVER running on localhost:${port}`);
  }
});
