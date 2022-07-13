import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeComment, likePost } from "../../actions/post.actions";
import { getNameById } from "../Utils";

function LikeButton({ object, postId, isComment = false }) {
  const [liked, setLiked] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();

  function like() {
    if (isComment) {
      dispatch(likeComment(postId, userData._id, object._id));
      setLiked(!liked);
    } else {
      dispatch(likePost(postId, userData._id));
      setLiked(!liked);
    }
  }

  useEffect(() => {
    if (object.usersLiked.includes(userData._id)) setLiked(true);
    else setLiked(false);
  }, [userData._id, object.usersLiked, liked]);

  return (
    <>
      <div className="like-container">
        {userData._id && liked === false && (
          <p className="heart" onClick={like}>
            {object.usersLiked.length} ❤ J'aime
          </p>
        )}
        {userData._id && liked && (
          <p className="heart-active" onClick={like}>
            {object.usersLiked.length} ❤ Aimer
          </p>
        )}
      </div>
      <div className="like-name">
        {object.usersLiked.map((user) => (
          <p>{getNameById(user, usersData)}</p>
        ))}
      </div>
    </>
  );
}

export default LikeButton;
