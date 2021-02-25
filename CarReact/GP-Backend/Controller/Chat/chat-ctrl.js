const chatMessage = require("../../models/Chat/chatMessage");
const chatRoom = require("../../models/Chat/chatRoom");
const user = require("../../models/Person/User/user");
const vendor = require("../../models/Person/Vendor/vendor");

const sendMessage = async (req, res) => {
  const userId = [req.body.vendorId, req.body.userId];

  const chatroomExists = await chatRoom.findOne({ name: { $all: userId } });

  if (chatroomExists) {
    const message = new chatMessage({
      user: req.user._id,
      message: req.body.message,
      chatroom: chatroomExists._id,
    });
    message
      .save()
      .then(async (data) => {
        await chatRoom
          .updateOne(
            { _id: chatroomExists._id },
            { $push: { messages: data._id } }
          )
          .then("Done")
          .catch("Error");
        return res.json({
          Data: data,
          Message: "Done send Message",
          Success: true,
        });
      })
      .catch((error) => {
        return res.json({
          Data: error.message,
          Message: "can't send message",
          Success: false,
        });
      });
  } else {
    const chatroom = new chatRoom({ name: userId });
    chatroom.save();
    await user
      .updateOne({ person: req.body.userId }, { $push: { chat: chatroom._id } })
      .then("Done")
      .catch((error) => {
        return res.json({
          Data: error.message,
          Message: "can't send message",
          Success: false,
        });
      });
    await vendor
      .updateOne(
        { person: req.body.vendorId },
        { $push: { chat: chatroom._id } }
      )
      .then("Done")
      .catch((error) => {
        return res.json({
          Data: error.message,
          Message: "can't send message",
          Success: false,
        });
      });

    const message = new chatMessage({
      user: req.user._id,
      message: req.body.message,
      chatroom: chatroom._id,
    });
    message
      .save()
      .then(async (data) => {
        await chatRoom
          .updateOne({ _id: chatroom._id }, { $push: { messages: data._id } })
          .then("Done")
          .catch("Error");
        return res.json({
          Data: data,
          Message: "Done send Message",
          Success: true,
        });
      })
      .catch((error) => {
        return res.json({
          Data: error.message,
          Message: "can't send message",
          Success: false,
        });
      });
  }
};

module.exports = {
  sendMessage,
};
