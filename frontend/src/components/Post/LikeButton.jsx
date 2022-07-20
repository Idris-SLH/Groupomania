import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeComment, likePost } from "../../actions/post.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  if (isComment) {
    return (
      <>
        {userData._id && (
          <p className={`heart ${liked ? "liked" : "notliked"}`} onClick={like}>
            J'aime
          </p>
        )}
      </>
    );
  }

  return (
    <>
      {userData._id && (
        <p
          className={`heart box ${liked ? "liked" : "notliked"}`}
          onClick={like}
        >
          <FontAwesomeIcon icon="fa-solid fa-thumbs-up" /> J'aime
        </p>
      )}
    </>
  );
}

export default LikeButton;
