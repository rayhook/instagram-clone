import React, { useState, useEffect } from "react";
import userFinder from "../../API/userFinder";
import Navbar from "../Navbar/Navbar";

import "./Profile.css";
const Profile = () => {
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [expandImage, setExpandImage] = useState(false);
  const [ModalImage, setModalImage] = useState("");

  useEffect(() => {
    const getuser = async () => {
      const getUser = await userFinder.get("/user/rayray");
      setUser(getUser.data[0]);
      const posts = await userFinder.get("/posts/rayray");
      setPosts(posts.data);
    };
    getuser();
  }, []);

  const toggleExpandImage = (image) => {
    setModalImage(image);
    setExpandImage((prevState) => !prevState);
  };
  return (
    <>
      <Navbar />
      <div className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-8">
              <div className="columns">
                <div className="column is-4">
                  <div className="is-flex is-justify-content-center">
                    <figure className="image is-128x128">
                      <img className="is-rounded" src={user.profileImg} alt="Profile" />
                    </figure>
                  </div>
                </div>

                <div className="column is-4">
                  <h2 className="is-size-4 mb-3">{user.userName}</h2>
                  <div className="is-flex is-justify-content-space-between mb-3">
                    <h2>
                      <strong>{posts.length} </strong>
                      Posts
                    </h2>
                    <h2>Followers</h2>
                    <h2>Saved</h2>
                  </div>
                  <h2 className="is-size-5 has-text-weight-semibold mb-3">{user.name}</h2>
                </div>
                <div className="column is-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section image-gallery">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-8">
              <div className="columns is-multiline">
                {posts &&
                  posts.map((post) => {
                    return (
                      <div
                        key={post._id}
                        className="column is-4"
                        onClick={() => toggleExpandImage(post.imageURL)}
                      >
                        <div className={expandImage ? "modal is-active" : "modal"}>
                          <div className="modal-background"></div>
                          <div className="modal-content image-modal">
                            <div className="columns">
                              <div className="column is-two-thirds">
                                <figure>
                                  <img src={ModalImage} alt="gallery" />
                                </figure>
                              </div>
                              <div className="column has-background-white"></div>
                            </div>
                          </div>
                          <button className="modal-close is-large" aria-label="close"></button>
                        </div>
                        <figure className="image is-square">
                          <img className="image-single" src={post.imageURL} alt="gallery" />
                        </figure>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
