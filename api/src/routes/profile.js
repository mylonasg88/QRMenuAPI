"use strict";
var express = require("express");
var router = express.Router();

router.get("/:id", (req, res) => {
  res.ok({
    username: "hungrybird",
    emai: "hungrybird@example.com",
  });
});

router.patch("/", (req, res) => {
  const { username, email, password } = req.body;

  return res.ok({
    username: username,
    email: email,
    password: password ? "encrypted" : null,
  });
});

module.exports = router;
