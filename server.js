const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const { stringify } = require("qs");

const UserController = require('./controllers/user.controller');
const ChatController = require('./controllers/chat.controller');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

require('dotenv').config();

// Connect Mongo DB
require('./config/db');

// Connect Socket IO
require('./config/socket');

const PORT = process.env.PORT || 3000;

// Registration controller
app.post('/signup', UserController.createUser);

// Login controller
app.post('/login', UserController.authenticateUser);

// Chat window controller
app.get("/messages", ChatController.getMessages);
app.post("/messages",ChatController.writeMessages);

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

http.listen(PORT, () => {
  console.log("server is listening on port ", PORT);
});
