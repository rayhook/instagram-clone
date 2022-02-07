require("dotenv").config();
const mongoose = require("mongoose");

const URI = process.env.DB_URI;

mongoose
  .connect(URI)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const postSchema = new mongoose.Schema(
  {
    userName: String,
    imageURL: String,
    caption: String,
    comments: [],
    liked: []
  },
  { timestamps: true }
);

postSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Post", postSchema);
