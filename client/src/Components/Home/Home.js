import React, { useEffect, useState, useContext } from "react";
import userFinder from "../../API/userFinder";
import Navbar from "../Navbar/Navbar";
import "./Home.css";
import { HeartIcon, ChatIcon, PaperAirplaneIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import { PostsContext } from "../../Context/PostsContext";

const author = "rayray";

const Home = () => {
  const { posts, setPosts } = useContext(PostsContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsResult = await userFinder.get("/posts");
      setPosts(postsResult.data);
    };
    fetchPosts();
  }, [setPosts]);

  const handleLike = async (id) => {
    const updatePosts = await userFinder.put("/like", { id });
    setPosts(updatePosts.data);
  };

  return (
    <div>
      <Navbar />
      <div className="section">
        <div className="columns is-centered">
          <div className="column is-7">
            <div className="columns">
              <div className="column is-8">
                {posts &&
                  posts.map((post) => <Post key={post.id} post={post} handleLike={handleLike} />)}
              </div>
              <div className="column is-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Post = ({ post, handleLike }) => {
  // commments {author, comment, timeStamp}
  const { posts, setPosts } = useContext(PostsContext);
  const [comments, setComments] = useState([post.comments]);
  const [comment, setComment] = useState("");

  const handleCommentInput = (event) => {
    setComment(event.target.value);
  };
  const handlePostComment = async (e) => {
    e.preventDefault();
    const id = post.id;
    const postComment = await userFinder.post("/comment", { id, comment, author });
    setPosts(postComment.data);
    setComment("");
  };
  return (
    <div className="card my-4">
      <p className="card-header-title py-4">@{post.userName}</p>
      <div className="card-image">
        <figure className="image is-square">
          <img className="post-image" src={post.imageURL} alt="" />
        </figure>
      </div>
      <div className="content">
        <div className="card-title"></div>
      </div>
      <div className="mx-2 mb-4">
        <div className="is-flex">
          {post.liked.includes("rayray") ? (
            <HeartIconSolid
              className="icon is-medium mr-2 has-text-danger"
              onClick={() => handleLike(post.id)}
            />
          ) : (
            <HeartIcon className="icon is-medium mr-2" onClick={() => handleLike(post.id)} />
          )}
          <ChatIcon className="icon is-medium mr-2" />
          <PaperAirplaneIcon className="icon is-medium mb-3" />
        </div>
        <h2 className="subtitle is-6">{post.caption}</h2>
        {post.comments.length > 0 &&
          post.comments.map((comment) => (
            <p key={comment.comment}>
              <span className="has-text-weight-bold " key={comment.comment}>
                {comment.author}
              </span>{" "}
              <span>{comment.comment}</span>
            </p>
          ))}
      </div>
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            value={comment}
            onChange={handleCommentInput}
            placeholder="Add a comment..."
          />
        </div>

        <div className="control">
          <button className="button has-text-info" onClick={handlePostComment}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
export default Home;
