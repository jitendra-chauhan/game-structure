const express = require("express");

const router = express.Router();

router.get("/name", (req, res) => {
  console.log("=====> call name <====");
  res.send("ok");
});

module.exports = router;
