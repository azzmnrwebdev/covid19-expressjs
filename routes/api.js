// import express, router and route patient
const express = require("express");
const router = express.Router();
const patient = require("./patient");
const user = require("./user");

// route default
router.get("/", (req, res) => {
  res.send("Final Project UAS - Good Luck");
});

// use route patient
router.use("/api", patient);

// use route user
router.use("/api", user);

// Export router
module.exports = router;
