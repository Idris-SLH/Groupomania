import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../actions/post.actions";

function DeleteCard({ post }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  function deleteQuote() {
    dispatch(deletePost(post._id, post.userId, userData._id));
  }

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer cet article ?")) {
          deleteQuote();
        }
      }}
    >
      Supprimer
    </div>
  );
}

export default DeleteCard;
