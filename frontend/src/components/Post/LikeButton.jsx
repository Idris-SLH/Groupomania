import React, { useState, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { likePost } from "../../actions/post.actions";
import { UidContext } from "../AppContexte";

function LikeButton({ post }) {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post._id, uid));
    setLiked(!liked);
  };

  useEffect(() => {
    if (post.usersLiked.includes(uid)) setLiked(true);
    else setLiked(false);
  }, [uid, post.usersLiked, liked]);

  return (
    <div className="like-container">
      {uid && liked === false && (
        <p className="heart" onClick={like}>
          {post.usersLiked.length} ❤ J'aime
        </p>
      )}
      {uid && liked && (
        <p className="heart-active" onClick={like}>
          {post.usersLiked.length} ❤ Aimer
        </p>
      )}
    </div>
  );
}

export default LikeButton;
