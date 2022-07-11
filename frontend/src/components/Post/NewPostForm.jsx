import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getPosts, createPost } from "../../actions/post.actions";
import { isEmpty } from "../Utils";

function NewPostForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty[userData]) setIsLoading(false);
  }, [userData]);

  async function handlePost(e) {
    e.preventDefault();
    if (message || postPicture) {
      const data = new FormData();
      data.append("userId", userData._id);
      data.append("message", message);
      if (file) data.append("picture", file);

      dispatch(createPost(data)).then(
        () => dispatch(getPosts()),
        handleCancel()
      );
    } else {
      alert("Veuillez insérer du contenu !");
    }
  }

  function handlePicture(e) {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  }

  function handleCancel() {
    setMessage("");
    setPostPicture(null);
    setFile("");
  }

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <div className="data">
          <div className="user-info">
            <NavLink exact="true" to="/profil">
              <img src={userData.picture} alt="user-pic" className="avatar" />
            </NavLink>
            <p>
              {userData.firstname} {userData.lastname}
            </p>
          </div>
          <form action="" onSubmit={handlePost} className="form-update">
            <textarea
              name="message"
              id="message"
              placeholder="Quoi de neuf ?"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <label htmlFor="file-upload" className="upload-form">
              Image
            </label>
            <input
              type="file"
              id="file-upload"
              name="file"
              accept=".jpg, .jpeg, .png, .webp"
              onChange={(e) => handlePicture(e)}
            />
            <div className="content">
              {postPicture ? (
                <img src={postPicture} alt="preview" className="preview" />
              ) : null}
            </div>
            <div className="button-send">
              {message || postPicture || file ? (
                <button className="cancel" onClick={handleCancel}>
                  Annuler
                </button>
              ) : null}
            </div>
            <input className="submit-btn" type="submit" value="Enregister" />
          </form>
        </div>
      )}
    </div>
  );
}

export default NewPostForm;
