const expressAsyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");

const sendMessage = expressAsyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  if (!chatId || !content) {
    console.log("Invalid data passed");
    res.sendStatus(400);
    return;
  }

  try {
    var message = await Message.create({
      chat: chatId,
      content: content,
      sender: req.user._id,
    });
    console.log(0, message);
    message = await message.populate("sender", "name picture");
    console.log(1, message);
    // message = await message.populate("chat");
    // message = await message.populate("chat", "chatName");
    // message = await message.populate("chat");
    message = await Chat.populate(message, {
      path: "",
    });
    console.log(2, message);
    message = await User.populate(message, {
      path: "chat.users",
      select: "name picture email",
    });

    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });
    console.log(message);
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const fetchMessages = expressAsyncHandler(async (req, res) => {});
module.exports = { sendMessage, fetchMessages };
