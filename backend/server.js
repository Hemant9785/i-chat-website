const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/mesageRoutes");
const app = express();
dotenv.config();

app.use(express.json()); //app can handle json data
const connectDB = require("./config/db.js");
connectDB();
const PORT = process.env.PORT || 5000;

var cors = require("cors");
app.use(cors()); // Use this after the variable declaration

const server = app.listen(PORT, () => {
  console.log(`server is working at https//localhost:${PORT} `);
});

//homepage
app.get("/", (req, res) => {
  res.status(200).send("HI this is homepage");
});
app.use("/api/user", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

//deployment/////////////////////

/////////////////////////////////

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});
io.on("connection", (socket) => {
  console.log("connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined romom " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not defined");
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
