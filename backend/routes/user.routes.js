const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/me", auth, (req, res) => {
  res.json({ user: req.user });
});

router.put("/me", auth, async (req, res) => {
  req.user.name = req.body.name || req.user.name;
  await req.user.save();
  res.json({ user: req.user });
});

module.exports = router;
