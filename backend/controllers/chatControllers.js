const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const Message = require("../models/messageModel");

const accessChats = asyncHandler(async (req, res) => {
  console.log(req);
  const { userId } = req.body;
  if (!userId) {
    throw new Error("user id param not sent with request");
    return;
  }

  var isChat = Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) res.send(isChat[0]);
  else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({
        _id: createdChat._id,
      })
        .populate("users")
        .select("-password");
      res.status(200).json(fullChat);
    } catch (error) {
      console.log(error);
      res.status(400);
      throw new Error("oops something went wrong");
    }
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    console.log("fetch chats");
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (result) => {
        const results = await User.populate(result, {
          path: "latestMessage.sender",
          select: "name email pic",
        });
        console.log(result);
        console.log(results);
        res.status(200).json(results);
      });
  } catch (error) {
    console.log("fetch error ", error);
    throw new Error(error.message);
  }
});
module.exports = { accessChats, fetchChats };
