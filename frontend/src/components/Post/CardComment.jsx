import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getPosts } from "../../actions/post.actions";
import { isEmpty, getNameById, getInfoById, dateParser } from "../Utils";
import LikeButton from "./LikeButton";
import UpdateComment from "./UpdateComment";

function CommentCard({ post }) {
  const [text, setText] = useState("");
  const [count, setCount] = useState(1);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  async function handleComment(e) {
    e.preventDefault();
    if (text) {
      dispatch(createComment(post._id, userData._id, text)).then(() =>
        dispatch(getPosts())
      );
      await setCount(post.comments.length + 1);
      setText("");
    }
  }

  return (
    <div className="comments-container">
      {count > 1 ? (
        <p className="comment-info" onClick={() => setCount(0)}>
          Cache les commentaires
        </p>
      ) : (
        <p
          className="comment-info"
          onClick={() => setCount(post.comments.length)}
        >
          Afficher tout les commentaires (<span>{post.comments.length}</span>)
        </p>
      )}
      {post.comments.slice(0, count).map((comment) => {
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
              <LikeButton object={comment} postId={post._id} isComment={true}/>
              <p className="comment-date">{dateParser(comment.timestamp)}</p>
            </div>
          </div>
        );
      })}
      {userData._id && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <textarea
            className="input-form"
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Laisser un commentaire"
            id="comment-input"
          />
          <input className="submit-btn" type="submit" value="Envoyer" />
        </form>
      )}
    </div>
  );
}

export default CommentCard;
