import React, { useState, useContext } from "react";
import {
  HomeIcon,
  ChatIcon,
  PlusCircleIcon,
  HeartIcon,
  UserCircleIcon
} from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import axios from "axios";
import userFinder from "../../API/userFinder";
import { PostsContext } from "../../Context/PostsContext";

const Navbar = () => {
  const { posts, setPosts } = useContext(PostsContext);
  const [uploadModal, setUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileTempURL, setFileTempURL] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [modalStage, setModalStage] = useState("selection");
  const [caption, setCaption] = useState("");

  const toggleUploadModal = () => {
    setUploadModal((prevState) => !prevState);
    setSelectedFile(null);
    setModalStage("selection");
    setCaption("");
  };
  const handleSelectedFile = (e) => {
    setSelectedFile(e.target.files[0]);
    setFileTempURL(URL.createObjectURL(e.target.files[0]));
    setModalStage("preview");
  };
  const handleCaption = (e) => {
    setCaption(e.target.value);
  };

  const handleUpload = async () => {
    try {
      const data = new FormData();
      data.append("file", selectedFile);
      data.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
      data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
      const instance = axios.create();
      const result = await instance.post(
        "https://api.cloudinary.com/v1_1/rayhookchris/image/upload",
        data
      );
      setImageURL(result.data.url);

      // upload to moongodb

      const newPost = await userFinder.post("/newPost", {
        imageURL: result.data.url,
        imageCaption: caption
      });
      setPosts(newPost.data);
      setSelectedFile(null);
      setCaption("");
      setUploadModal(false);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="box">
      <div className={uploadModal ? `modal is-active` : `modal`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title has-text-centered is-size-6">
              <strong>Create a new post</strong>
            </p>
          </header>
          <section className="modal-card-body">
            <div className="section is-large">
              {modalStage === "selection" && (
                <div className="file is-info is-centered">
                  <label className="file-label">
                    <input
                      className="file-input"
                      type="file"
                      multiple
                      onChange={handleSelectedFile}
                    />
                    <span className="file-cta">
                      <span className="file-label has-text-weight-semibold">
                        Select from computer
                      </span>
                    </span>
                  </label>
                </div>
              )}
              {modalStage === "preview" && (
                <div className="columns">
                  <div className="column is-7">
                    <figure className="image is-1by1">
                      <img src={fileTempURL && fileTempURL} alt="upload preview" />
                    </figure>
                  </div>
                  <div className="column is-5">
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Write a caption"
                        value={caption}
                        onChange={handleCaption}
                      />
                    </div>
                    <button className="button is-info" onClick={handleUpload}>
                      Share
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
        <button
          className="modal-close is-large"
          onClick={toggleUploadModal}
          aria-label="close"
        ></button>
      </div>
      <div className="navbar is-vcentered is-fixed-top">
        <div className="column"></div>
        <div className="column">
          <h2 className="is-size-3 is-family-primary">Instagram</h2>
        </div>
        <div className="column">
          <Search />
        </div>
        <div className="column is is-offset-1">
          <div className="is-flex is-justify-content-start">
            <Link to="/">
              <HomeIcon className="icon is-medium mr-4" />
            </Link>
            <ChatIcon className="icon is-medium mr-4" />
            <PlusCircleIcon className="icon is-medium mr-4" onClick={toggleUploadModal} />
            <HeartIcon className="icon is-medium mr-4" />
            <Link to="/Profile">
              <UserCircleIcon className="icon is-medium mr-4" />
            </Link>
          </div>
        </div>
        <div className="column"></div>
      </div>
    </div>
  );
};

export default Navbar;
