import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, getNameById, getInfoById, dateParser } from "../Utils";

function CommentCard({ post }) {
  const [text, setText] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  function handleComment(value) {
    console.log(value);
  }

  return (
    <div className="comments-container">
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
              <div className="comment-content">
                <p>{comment.message}</p>
              </div>
              <p className="comment-date">{dateParser(comment.timestamp)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CommentCard;
