const request = require("request");
const express = require("express");
const app = express();

const router = express.Router();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

/* IP HERE */
const ip = require('./ip');
app.use('/', ip);



//routes which don't match the above routes will pass through this and give error.

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

//Errors like Database query failed will pass through this.
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(port, () => {
  console.log(`port listening on${port}`);
});

module.exports = app;
