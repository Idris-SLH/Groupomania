import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getPosts } from "../../actions/post.actions";
import { isEmpty, dateParser } from "../Utils";
import LikeButton from "./LikeButton";
import UpdateComment from "./UpdateComment";

function CommentCard({ post }) {
  const [text, setText] = useState("");
  const [count, setCount] = useState(1);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  async function handleComment() {
    if (text) {
      dispatch(createComment(post._id, userData._id, text)).then(() =>
        dispatch(getPosts())
      );
      await setCount(post.comments.length + 1);
      setText("");
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleComment();
    }
  };

  return (
    <div className="comments-container">
      {count >= 1 ? (
        <p className="comments-container__show" onClick={() => setCount(0)}>
          Cache les commentaires
        </p>
      ) : (
        <p
          className="comments-container__show"
          onClick={() => setCount(post.comments.length)}
        >
          Afficher tout les commentaires (<span>{post.comments.length}</span>)
        </p>
      )}
      {post.comments.slice(0, count).map((comment) => {
        return (
          <div className="comment-container" key={comment._id}>
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
              className="comment-container__avatar"
            />
            <div className="comment-container__right">
              <UpdateComment comment={comment} post={post} />
              <div className="comment-container__right--info">
                <LikeButton
                  object={comment}
                  postId={post._id}
                  isComment={true}
                />
                <p className="comment-date">{dateParser(comment.timestamp)}</p>
              </div>
            </div>
          </div>
        );
      })}
      {userData._id && (
        <div className="comment-section">
          <img
            src={userData.picture}
            alt="comment-pic"
            className="comment-container__avatar"
          />
          <input
            className="input-form"
            type="text"
            name="text"
            value={text}
            placeholder="Laisser un commentaire"
            id="comment-input"
            onKeyDown={handleKeyDown}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

export default CommentCard;
