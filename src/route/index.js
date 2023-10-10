const express = require("express");

const router = express.Router();

router.get("/name", (req, res) => {
  console.log("=====> call name <====", new Date());
  res.send("ok");
});

module.exports = router;
