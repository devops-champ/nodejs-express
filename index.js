const express = require("express");
const mongoose = require("mongoose");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORTS } = require("./config/config");

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORTS}/?authSource=admin`


mongoose
    .connect(mongoURL)
    .then(() => console.log("successfully connected to Mongo DB"))
    .catch((e) => console.log(e));

app.get("/", (req, res) => {
    res.send("<h2> Hello I'm your Docker captain</h2>")
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));