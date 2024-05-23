const express = require('express');
const router = express.Router();
const adminAuthentication = require("../middleware/adminAuthentication");
const { ObjectId } = require('mongoose').Types;

const User = require('../models/userSchema');

module.exports = router.post('/deleteMessagefromdashboard', adminAuthentication, async (req, res) => {
  const getId = req.body.messageIdFromDashBoard;

  // Client-side validation (optional but recommended)
  if (typeof getId !== 'string' || !ObjectId.isValid(getId)) {
    return res.status(400).json({ error: 'Invalid message ID' });
  }

  try {
    const findUser = await User.findOne({ "messages._id": getId });

    if (!findUser || !findUser.messages.some(message => message._id.equals(getId))) {
      return res.status(404).json({ error: 'Message not found' });
    }

    const updateMessage = await User.updateOne(
      { _id: findUser._id },
      { $pull: { messages: { _id: getId } } }
    );

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting message' });
  }
});
