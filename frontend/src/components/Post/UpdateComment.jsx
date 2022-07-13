import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, updateComment } from "../../actions/post.actions";

function UpdateComment({ comment, post }) {
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(comment.message);
  const userData = useSelector((state) => state.userReducer);
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

  return (
    <>
      {userData._id === comment.userId && (
        <div className="update-container">
          <div onClick={() => setIsUpdated(!isUpdated)}>Modifier</div>
          <br />
          <div
            onClick={() => {
              if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                handleDelete();
              }
            }}
          >
            Supprimer
          </div>
        </div>
      )}
      <div className="comment-content">
        {isUpdated === false && <p>{comment.message}</p>}
        {isUpdated && (
          <div className="update-comment">
            <textarea
              defaultValue={comment.message}
              onChange={(e) => setTextUpdate(e.target.value)}
            ></textarea>
            <div className="button-container">
              <button className="btn" onClick={handleEdit}>
                Valider modification
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default UpdateComment;
