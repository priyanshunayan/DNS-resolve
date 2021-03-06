const express = require("express");
const router = express.Router();
const dns = require("dns");



router.get("/", (req, res, next) => {
  const url = req.query.url;
  dns.resolve(url, (err, records) => {
    if (!err) {
      res.status(200).json({
        ip: records
      });
    } else {
      res.status(500).json({
        message: "An error occurred",
        error: err
      });
    }
  });
});


module.exports = router;
