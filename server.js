const express = require("express");
const bodyParser = require("body-parser");
const PORT = 3000;

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose");
const { stringify } = require("qs");

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const uri =
  "mongodb+srv://User:user20@chatcluster.fjxtv.mongodb.net/learning-node?retryWrites=true&w=majority";

const MessageModel = mongoose.model("Message", {
  name: String,
  message: String,
});


app.get("/messages", (req, res) => {
  MessageModel.find({}, (err, messages) => {
    res.send(messages);
  });
});

app.post("/messages", (req, res) => {
  const messageModel = new MessageModel(req.body);

  messageModel.save((err) => {
    if (err) {
      sendStatus(500);
    }
  });

  io.emit("chatmessages", req.body);
  res.sendStatus(200);
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log("mongo db connection", err);
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.on("open", () => {
  console.log("Mongo DB is connected");
});

http.listen(PORT, () => {
  console.log("server is listening on port ", PORT);
});
