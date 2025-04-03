const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Binder = require('../models/Binder.js');
const router = express.Router();

// CREATE Binder
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

// READ (Show) Binder
router.get('/:binderId', verifyToken, async (req, res) => {
  try {
    const binder = await Binder.findById(req.params.binderId).populate('author');
    res.status(200).json(binder);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// UPDATE Binder
router.put('/:binderId', verifyToken, async (req, res) => {
  try {
    // find binder
    const binder = await Binder.findById(req.params.binderId);

    // check permissions
    if (!binder.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    // update binder
    const updatedBinder = await Binder.findByIdAndUpdate(req.params.binderId, req.body, { new: true });

    // append req.user to the author property
    updatedBinder._doc.author = req.user;

    // issue JSON response
    res.status(200).json(updatedBinder);
  } catch {
    res.status(err).json({ err: err.message });
  }
});

// delete Binder
router.delete('/:binderId', verifyToken, async (req, res) => {
  try {
    const binder = await Binder.findById(req.params.binderId);

    if (!binder.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    const deleteBinder = await Binder.findByIdAndDelete(req.params.binderId);
    res.status(200).json(deleteBinder);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
