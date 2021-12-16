require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const { response } = require("express");
const app = express();

const { json } = express;

app.use(morgan("dev"));
app.use(cors());
app.use(json());

// Mongoose

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@instagram-db.vj1qb.mongodb.net/instagram-app?retryWrites=true&w=majority`;

mongoose.connect(url);

const userSchema = new mongoose.Schema({
  userName: String,
  name: String,
  profileImg: String,
  images: [
    {
      id: String,
      src: String,
      date: Date,
      title: String
    }
  ],
  following: []
});

const User = mongoose.model("User", userSchema);

const user = new User({
  userName: "LarMax",
  name: "Larson Maximilian",
  profileImg: "http://resouce.cdn.com",
  images: [
    {
      id: "4334",
      src: "http://cdn.323.com",
      date: new Date(),
      title: "First picture"
    }
  ],
  following: ["justing07", "jouhnSteven"]
});

// get current user

app.get("/api/user/:id", (req, res) => {
  try {
    user.save({}).then((result) => {
      res.json(result);
      mongoose.connection.close();
      console.log("user Added");
    });
  } catch (err) {
    console.error(err);
  }
});

// post image

app.post("/api/user/:id", (req, res) => {
  try {
    console.log("image uploaded");
  } catch (err) {
    console.error(err);
  }
});

// delete image

app.delete("api/user/:id", (req, res) => {
  try {
    console.log("image deleted");
  } catch (err) {
    console.error(err);
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// Data structure
/*
[
  {
    userID: "34234",
    userName: "justing07",
    profileImg: "http:///sdfsdfgfg",
    images: [{ id:"2323",src: "http;//", date: "10/02/21:T14:02:28", title: "In the beach with friends" }],
    follows: ["justing07", "jouhnSteven"]
  },
  {
    userID: "34234",
    userName: "justing07",
    profileImg: "http:///sdfsdfgfg",
    images: [{ id:"2323", src: "http;//", date: "10/02/21:T14:02:28", title: "In the beach with friends" }],
    follows: ["justing07", "jouhnSteven"]
  },
  {
    userID: "34234",
    userName: "justing07",
    profileImg: "http:///sdfsdfgfg",
    images: [{ id:"2323", src: "http;//", date: "10/02/21:T14:02:28", title: "In the beach with friends" }],
    follows: ["justing07", "jouhnSteven"]
  }
];
*/
