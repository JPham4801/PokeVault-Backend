const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Binder = require('../models/Binder.js');
const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  try {
    req.body.author = req.user._id;

    const binder = await Binder.create(req.body);
    binder._doc.author = req.user;
    res.status(201).json(binder);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  
})

module.exports = router;
