import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getPosts } from "../../actions/post.actions";
import { isEmpty, getNameById, getInfoById, dateParser } from "../Utils";
import UpdateComment from "./UpdateComment";

function CommentCard({ post }) {
  const [text, setText] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  function handleComment(e) {
    e.preventDefault();
    if (text) {
      dispatch(createComment(post._id, userData._id, text))
        .then(() => dispatch(getPosts()))
        .then(() => setText(""));
    }
  }

  return (
    <div>
      {post.comments.map((comment) => {
        return (
          <div className="comment-container" key={comment._id}>
            <div className="left-part">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user._id === comment.userId) return user.picture;
                      else return null;
                    })
                    .join("")
                }
                alt="comment-pic"
              />
            </div>
            <div className="right-part">
              <div className="comment-header">
                <h4>{getNameById(comment.userId, usersData)}</h4>
                <p>{getInfoById(comment.userId, usersData)}</p>
              </div>
              <UpdateComment comment={comment} post={post} />
              <p className="comment-date">{dateParser(comment.timestamp)}</p>
            </div>
          </div>
        );
      })}
      {userData._id && (
        <div className="comment-input">
          <form action="" onSubmit={handleComment} className="comment-form">
            <input
            className="input-form"
              type="text"
              name="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder="Laisser un commentaire"
            />
            <br />
            <input className="submit-btn" type="submit" value="Envoyer" />
          </form>
        </div>
      )}
    </div>
  );
}

export default CommentCard;
