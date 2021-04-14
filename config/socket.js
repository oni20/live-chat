const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});