var express = require('express');
var path = require('path');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const bookRoutes = require("./routes/book");

const app = express();
app.use(cors());
const mongodbURI = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));


app.use('/books', bookRoutes.routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

mongoose
  .connect(mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;