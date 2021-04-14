const mongoose = require("mongoose");
const uri = process.env.DB_URL;

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