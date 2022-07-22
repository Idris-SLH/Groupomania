import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getPosts } from "../../actions/post.actions";
import { isEmpty, timeSince } from "../Utils";
import LikeButton from "./LikeButton";
import UpdateComment from "./UpdateComment";
import Picker from "emoji-picker-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextareaAutosize from "react-textarea-autosize";

function CommentCard({ post }) {
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [text, setText] = useState("");
  const [count, setCount] = useState(1);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const onEmojiClick = (event, emojiObject) => {
    setText(text + emojiObject.emoji);
  };

  async function handleComment() {
    let message = text.trim();
    if (message !== null && message !== "") {
      dispatch(createComment(post._id, userData._id, message)).then(() =>
        dispatch(getPosts())
      );
      await setCount(post.comments.length + 1);
      setText("");
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleComment();
      setText(text.trim());
    }
  };

  return (
    <div className="comments-container">
      {post.comments.length > 1 ? (
        <>
          {count > 1 ? (
            <p className="comments-container__show" onClick={() => setCount(0)}>
              Cache les commentaires
            </p>
          ) : (
            <>
              {count === 1 ? (
                <p
                  className="comments-container__show"
                  onClick={() => setCount(post.comments.length)}
                >
                  Afficher{" "}
                  {post.comments.length === 2
                    ? "l'autre"
                    : `les ${post.comments.length - 1} autres`}{" "}
                  commentaire{post.comments.length === 2 ? null : "s"}
                </p>
              ) : (
                <p
                  className="comments-container__show"
                  onClick={() => setCount(post.comments.length)}
                >
                  Afficher tout les commentaires ({post.comments.length})
                </p>
              )}
            </>
          )}
        </>
      ) : (
        <p></p>
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
                <p className="comment-date">{timeSince(comment.timestamp)}</p>
              </div>
            </div>
          </div>
        );
      })}
      {userData._id && (
        <div className="comment-section">
          <span>
            <img
              src={userData.picture}
              alt="comment-pic"
              className="comment-section__avatar"
            />
          </span>
          <div className="comment-section__input">
            <TextareaAutosize
              type="text"
              name="text"
              value={text}
              placeholder="Laisser un commentaire"
              id="comment-input"
              onKeyDown={handleKeyDown}
              onChange={(e) => setText(e.target.value)}
            />
            <FontAwesomeIcon
              icon="fa-regular fa-face-smile"
              onClick={() => setEmojiPicker(!emojiPicker)}
            />
            {emojiPicker && (
              <Picker
                onEmojiClick={onEmojiClick}
                disableSkinTonePicker="true"
                disableSearchBar="true"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentCard;
