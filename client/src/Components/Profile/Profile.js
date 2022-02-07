import React, { useState, useEffect } from "react";
import userFinder from "../../API/userFinder";
import Navbar from "../Navbar/Navbar";

import "./Profile.css";
const Profile = () => {
  const [user, setUser] = useState([]);
  const [expandImage, setExpandImage] = useState(false);
  const [ModalImage, setModalImage] = useState("");

  useEffect(() => {
    const getuser = async () => {
      const response = await userFinder.get("/LarMax");
      setUser(response.data[0]);
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
                    <h2>Posts</h2>
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
                {user.images &&
                  user.images.map((image) => {
                    return (
                      <div
                        key={image._id}
                        className="column is-4"
                        onClick={() => toggleExpandImage(image.src)}
                      >
                        <div className={expandImage ? "modal is-active" : "modal"}>
                          <div className="modal-background"></div>
                          <div className="modal-content">
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
                          <img className="image-single" src={image.src} alt="gallery" />
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
