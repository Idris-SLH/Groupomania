import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePost } from "../../actions/post.actions";
import { dateParser, getInfoById, isEmpty } from "../Utils";
import LikeButton from "./LikeButton";
import DeleteCard from "./DeleteCard";
import CommentCard from "./CardComment";

function Card({ post }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(post.message);
  const [showComments, setShowComments] = useState(false);

  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  function updateItem() {
    dispatch(updatePost(post._id, post.userId, userData._id, textUpdate));
    setIsUpdated(false);
  }

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(true);
    setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <div className="card-header">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user._id === post.userId) return user.picture;
                      else return null;
                    })
                    .join("")
                }
                alt="avatar poster"
              />
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === post.userId)
                          return user.firstname + " " + user.lastname;
                        else return null;
                      })
                      .join("")}
                </h3>
                <span>{getInfoById(post.userId, usersData)}</span>
                <br />
                <span>{dateParser(post.createdAt)}</span>
              </div>
            </div>
            {userData._id === post.userId && (
              <div className="update-container">
                <div onClick={() => setIsUpdated(!isUpdated)}>Modifier</div>
                <br />
                <DeleteCard post={post} />
              </div>
            )}
          </div>
          <div className="card-right">
            {isUpdated === false && <p>{post.message}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                ></textarea>
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Valider modification
                  </button>
                </div>
              </div>
            )}
            {post.picture && (
              <img src={post.picture} alt="card-pic" className="card-pic" />
            )}
            <div className="card-footer">
              <div onClick={() => setShowComments(!showComments) } className="comment-icon">
                N°de commentaires
                <span> {post.comments.length}</span>
              </div>
              <LikeButton post={post} />
            </div>
            {showComments && <CommentCard post={post} />}
          </div>
        </>
      )}
    </li>
  );
}

export default Card;
