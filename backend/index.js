require("dotenv").config();
const path = require("path");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const {
  UserRouter,
  NoteRouter,
  NotificationRouter,
  EventRouter,
  RatingRouter,
} = require("./router");
const app = express();

app.use(express.static(path.join(__dirname, "media")));

const store = new MongoDBStore({
  uri: process.env.DB_URL,
  collection: "customSession",
});

store.on("error", function (error) {
  console.log(error);
});

app.use(
  require("express-session")({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day expiry
      httpOnly: true,
      secure: false,
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  }),
);

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("MongoDb connected successfully!");
  })
  .catch((error) => {
    console.log(error);
  });

app.use((req, res, next) => {
  console.log(`${new Date()} :: ${req?.method} :: ${req?.url}`);
  next();
});

app.get("/", (req, res, next) => {
  res.json({
    success: true,
    message: "Server is up and running!",
  });
});

app.use("/user", UserRouter);
app.use("/note", NoteRouter);
app.use("/notification", NotificationRouter);
app.use("/event", EventRouter);
app.use("/rating", RatingRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server started at port ${process.env.PORT}`);
});
