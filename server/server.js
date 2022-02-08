require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

// const User = require("./models/mongoose");
const Post = require("./models/mongoose");
const { findByIdAndUpdate } = require("./models/mongoose");
const User = require("./models/userModel");

const { json } = express;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(json());

const userName = "rayray";

// create a user, signup stage
app.post("/api/user/", async (req, res) => {
  try {
    const body = req.body;
    const user = await new User({
      userName: body.userName,
      name: body.name,
      profileImg: body.profileImg || "",
      following: []
    });
    const savedUser = await user.save();

    res.json(savedUser);
  } catch (err) {
    console.error(err);
  }
});

// Get all posts

app.get("/api/posts", async (req, res) => {
  try {
    const allPosts = await Post.find({}).sort({ createdAt: -1 });
    res.json(allPosts);
  } catch (err) {
    console.error(err.message);
  }
});

// Get user's posts

app.get("/api/posts/:userName", async (req, res) => {
  try {
    const userName = req.params.userName;
    const userPosts = await Post.find({ userName: userName }).sort({ createdAt: -1 });
    res.json(userPosts);
  } catch (err) {
    console.error(err.message);
  }
});

//get user

app.get("/api/user/:userName", async (req, res) => {
  try {
    const userName = req.params.userName;
    const user = await User.find({ userName: userName });
    res.json(user);
  } catch (err) {
    console.error(err.message);
  }
});

// create a post
app.post("/api/newPost", async (req, res) => {
  try {
    const imageURL = req.body.imageURL;
    const imageCaption = req.body.imageCaption;
    const post = {
      userName: "rayray",
      imageURL: imageURL,
      caption: imageCaption,
      comments: [],
      liked: []
    };
    const newPost = new Post(post);
    await newPost.save();
    const posts = await Post.find({});
    res.json(posts);
  } catch (err) {
    console.error(err.message);
  }
});

// like image

app.put("/api/like", async (req, res) => {
  try {
    const id = req.body.id;
    const post = await Post.findById(id);
    if (!post.liked.includes(userName)) {
      console.log("post.includes", post.liked.includes(userName));
      await Post.findOneAndUpdate({ _id: id }, { $push: { liked: userName } });
      const allPosts = await Post.find({});
      res.json(allPosts);
    } else {
      console.log("post.includes", post.liked.includes(userName));
      await Post.findOneAndUpdate({ _id: id }, { $pull: { liked: userName } });
      const allPosts = await Post.find({});
      res.json(allPosts);
    }
  } catch (err) {
    console.error(err.message);
  }
});

//

app.post("/api/comment", async (req, res) => {
  const id = req.body.id;
  const author = req.body.author;
  const comment = req.body.comment;

  const commentPost = await Post.findByIdAndUpdate(
    id,
    { $push: { comments: { author, comment } } },
    { returnDocument: "after" }
  );
  const posts = await Post.find({}).sort({ createdAt: -1 });
  res.json(posts);
});

// delete image
app.delete("api/user/:id", (req, res) => {
  try {
    console.log("image deleted");
  } catch (err) {
    console.error(err);
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
