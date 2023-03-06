const express = require("express");
const dotenv = require("dotenv");

const app = express();
const PORT = process.env.PORT || 5000;
const chats = require("./data_dummy");

app.listen(PORT, () => {
  console.log(`server is working at https//localhost:${PORT} `);
});

//homepage
app.get("/", (req, res) => {
  res.status(200).send("HI this is homepage");
});

//chats
app.get("/api/chat", (req, res) => {
  res.status(200).send(chats);
});

//single chat using id
app.get("/api/chat/:id", (req, res) => {
  const singleChat = chats.find((e) => e._id === req.params.id);
  res.status(200).send(singleChat);
  console.log(singleChat);
});
