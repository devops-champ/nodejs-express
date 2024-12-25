const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis").default; // Ensure to use `.default`

const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_IP,
    MONGO_PORTS,
    REDIS_URL,
    REDIS_PORT,
    SESSION_SECRET,
} = require("./config/config");

// Create Redis client
let redisClient = redis.createClient({
    socket: {
        host: REDIS_URL,
        port: REDIS_PORT,
    },
});

redisClient.connect().catch(console.error); // Redis client must connect explicitly in newer versions

redisClient.on("error", (err) => console.error("Redis Client Error", err));

// Use RedisStore to configure session storage
const redisStore = new RedisStore({
    client: redisClient,
});

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORTS}/?authSource=admin`;

mongoose
    .connect(mongoURL)
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch((e) => console.error(e));

app.use(
    session({
        store: redisStore,
        secret: SESSION_SECRET,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 30000,
        },
        resave: false,
        saveUninitialized: false,
    })
);

app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h2>Hello, I'm your Docker Captain</h2>");
});

// localhost:3000/api/v1/post
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
