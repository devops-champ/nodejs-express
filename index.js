const express = require("express");
const mongoose = require("mongoose");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORTS } = require("./config/config");

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();


const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORTS}/?authSource=admin`


mongoose
    .connect(mongoURL)
    .then(() => console.log("successfully connected to Mongo DB"))
    .catch((e) => console.log(e));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h2> Hello I'm your Docker captain</h2>")
})

//localhost:3000/api/v1/post
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));