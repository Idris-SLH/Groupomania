import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, updateComment } from "../../actions/post.actions";
import { getNameById, getInfoById } from "../Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteCard from "./DeleteCard";

function UpdateComment({ comment, post }) {
  const [isUpdated, setIsUpdated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [textUpdate, setTextUpdate] = useState(comment.message);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);

  const dispatch = useDispatch();

  function handleEdit() {
    dispatch(
      updateComment(
        post._id,
        comment._id,
        comment.userId,
        userData._id,
        textUpdate
      )
    );
    setIsUpdated(false);
    setTextUpdate(textUpdate);
  }

  function handleDelete() {
    dispatch(
      deleteComment(post._id, comment._id, comment.userId, userData._id)
    );
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEdit();
    }
  };

  return (
    <div className="comment-container__right--content">
      <div className="comment-container__right--content-message">
        <p>{getNameById(comment.userId, usersData)}</p>
        <p className="userinfo">{getInfoById(comment.userId, usersData)}</p>
        {isUpdated === false && <p>{comment.message}</p>}
        {isUpdated && (
          <>
            <textarea
              defaultValue={comment.message}
              type="text"
              onKeyDown={handleKeyDown}
              onChange={(e) => setTextUpdate(e.target.value)}
            />
          </>
        )}
        {comment.usersLiked.length ? (
          <span className="like-container">
            <img src="./img/like.png" alt="like-pic" />
            {comment.usersLiked.length ? (
              <>
                <p>{comment.usersLiked.length}</p>
                <span className="like-container_list">
                  <ul>
                    {comment.usersLiked.map((user) => (
                      <li key={user}>{getNameById(user, usersData)}</li>
                    ))}
                  </ul>
                </span>
              </>
            ) : null}
          </span>
        ) : (
          <p></p>
        )}
      </div>
      <div className="update-btn">
        {userData._id === comment.userId && (
          <FontAwesomeIcon
            icon="fa-solid fa-ellipsis"
            className="update-btn_icon"
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
        {isOpen && (
          <ul className="update-btn_menu bubble">
            <li
              onClick={() => {
                setIsUpdated(!isUpdated);
                setIsOpen(!isOpen);
              }}
            >
              <FontAwesomeIcon icon="fa-solid fa-pen" />
              Modifier
            </li>
            <li
              onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                  handleDelete();
                }
              }}
            >
              <FontAwesomeIcon icon="fa-solid fa-trash-can" />
              Supprimer
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default UpdateComment;
