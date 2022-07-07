import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";
import LikeButton from "./LikeButton";

function Card({ post }) {
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(true);
    setIsLoading(false);
  }, usersData);

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === post.userId) return user.picture;
                  })
                  .join("")
              }
              alt="avatar poster"
            />
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === post.userId)
                          return user.firstname + " " + user.lastname;
                      })
                      .join("")}
                </h3>
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
          </div>
          <div className="card-right">
            <p>{post.message}</p>
            {post.picture && (
              <img src={post.picture} alt="card-pic" className="card-pic" />
            )}
            <div className="card-footer">
              <div className="comment-icon">
                N°de commentaires
                <span> {post.comments.length}</span>
              </div>
              <LikeButton post={post} />
            </div>
          </div>
        </>
      )}
    </li>
  );
}

export default Card;
