import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../actions/post.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DeleteCard({ post }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  function deleteQuote() {
    dispatch(deletePost(post._id, post.userId, userData.role, userData._id));
  }

  return (
    <li
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer cet article ?")) {
          deleteQuote();
        }
      }}
    >
      <FontAwesomeIcon icon="fa-solid fa-trash-can" />
      Supprimer
    </li>
  );
}

export default DeleteCard;
