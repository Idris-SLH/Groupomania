import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePost } from "../../actions/post.actions";
import { timeSince, getNameById, isAutor, isEmpty } from "../Utils";
import LikeButton from "./LikeButton";
import DeleteCard from "./DeleteCard";
import CommentCard from "./CardComment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Card({ post }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [textUpdate, setTextUpdate] = useState(post.message);

  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  function updateItem() {
    dispatch(updatePost(post._id, post.userId, userData.role, userData._id, textUpdate));
  }

  function commentFocus(e) {
    e.target.parentElement.parentElement.lastChild.lastChild.lastChild.firstChild.focus();
  }
  function commentActive(e) {
    e.target.parentElement.parentElement.lastChild.lastChild.firstChild.click();
  }

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(true);
    setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-container__user">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === post.userId) return user.picture;
                    else return null;
                  })
                  .join("")
              }
              alt="avatar poster"
              className="card-container__user--avatar"
            />
            <span>
              <p className="card-container__user--name">
                {!isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user._id === post.userId)
                        return user.firstname + " " + user.lastname;
                      else return null;
                    })
                    .join("")}
              </p>
              <p className="card-container__user--date">
                il y a { timeSince(post.createdAt)}
              </p>
            </span>
            <br />
            <div className="update-btn">
              {isAutor(userData, post.userId) && (
                <FontAwesomeIcon
                  icon="fa-solid fa-ellipsis"
                  className="update-btn_icon"
                  onClick={() => setIsOpen(!isOpen)}
                />
              )}
              {isOpen && (
                <ul className="update-btn_menu bubble">
                  <li>
                    <FontAwesomeIcon icon="fa-solid fa-pen" /> Modifier
                  </li>
                  <DeleteCard post={post} />
                </ul>
              )}
            </div>
          </div>
          <div className="card-container__content">
            <p className="card-container__content--message">{post.message}</p>
            {post.picture && (
              <img
                src={post.picture}
                alt="post-pic"
                className="card-container__content--picture"
              />
            )}
          </div>
          <div className="card-container__info">
            {post.usersLiked.length ? (
              <span className="like-container">
                <img src="./img/like.png" alt="like-pic" />
                {post.usersLiked.length >= 2 ? (
                  <>
                    <p>{post.usersLiked.length}</p>
                    <span className="like-container_list">
                      <ul>
                        {post.usersLiked.map((user) => (
                          <li key={user}>{getNameById(user, usersData)}</li>
                        ))}
                      </ul>
                    </span>
                  </>
                ) : (
                  <p>{getNameById(post.usersLiked[0], usersData)}</p>
                )}
              </span>
            ) : (
              <p></p>
            )}
            {post.comments.length >= 1 ? (
              <p
                className="card-container__info--comment"
                onClick={commentActive}
              >
                {post.comments.length} commentaire
                {post.comments.length >= 2 ? "s" : null}
              </p>
            ) : (
              <p></p>
            )}
          </div>
          <div className="card-container__footer">
            {post.comments.length || post.usersLiked.length ? <hr /> : null}
            <div className="card-container__footer--btn">
              <LikeButton object={post} postId={post._id} />
              <p onClick={commentFocus} className="box">
                <FontAwesomeIcon icon="fa-regular fa-message" />
                Commenter
              </p>
            </div>
            <hr />
            <CommentCard post={post} />
          </div>
        </>
      )}
    </li>
  );
}

export default Card;
