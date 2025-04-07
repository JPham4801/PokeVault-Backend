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
    // populate author of hoot and comments
    const binder = await Binder.findById(req.params.binderId).populate('author', 'cards.author');
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
    res.status(500).json({ err: err.message });
  }
});

// DELETE Binder
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

// CREATE CARD
router.post('/:binderId/cards', verifyToken, async (req, res) => {
  try {
    req.body.author = req.user._id;

    const binder = await Binder.findById(req.params.binderId);
    binder.cards.push(req.body);
    await binder.save();

    // find the newly created comment
    const newCard = binder.cards[binder.cards.length - 1];

    newCard._doc.author = req.user;

    // respond with the newCard
    res.status(201).json(newCard);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// UPDATE Card
router.put('/:binderId/cards/:cardId', verifyToken, async (req, res) => {
  try {
    const binder = await Binder.findById(req.params.binderId);
    const card = binder.cards.id(req.params.cardId);

    // ensure the current user is the author of the card
    if (binder.author.toString() !== req.user._id) {
      return res.status(403).json({ message: 'You are not authorized to edit this comment' });
    }

    if (!card) return res.status(404).json({ message: 'Card not found in binder' });

    Object.assign(card.data, req.body);
    card.markModified('data');
    await binder.save();

    res.status(200).json({ message: 'Card updated successfully' });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// DELETE Card
router.delete("/:binderId/cards/:cardId", verifyToken, async (req, res) => {
  try {
    const binder = await Binder.findById(req.params.binderId);
    const card = binder.cards.id(req.params.cardId);

    // ensure the current user is the author of the card
    if (binder.author.toString() !== req.user._id) {
      return res.status(403).json({ message: 'You are not authorized to edit this comment' });
    }

    if (!card) return res.status(404).json({ message: 'Card not found in binder' });

    binder.cards.remove({ _id: req.params.cardId });
    await binder.save();
    res.status(200).json({ message: 'Card deleted successfully' });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
})

module.exports = router;
