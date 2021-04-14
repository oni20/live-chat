const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const MessageModel = require('../models/message.model');

module.exports.getMessages = (req, res) => {
    MessageModel.find({}, (err, messages) => {
        res.send(messages);
    });
};

module.exports.writeMessages = (req, res) => {
    const messageModel = new MessageModel(req.body);

    messageModel.save((err) => {
        if (err) {
            sendStatus(500);
        }
    });

    io.emit("chatmessages", req.body);
    res.sendStatus(200);
}