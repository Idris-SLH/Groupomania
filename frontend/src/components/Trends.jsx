import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTrends } from "../actions/post.actions";
import { dateParser, isEmpty } from "./Utils";

function Trends() {
  const posts = useSelector((state) => state.allPostsReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const trendList = useSelector((state) => state.trendingReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(posts[0])) {
      const postsArr = Object.keys(posts).map((i) => posts[i]);
      let sortedArray = postsArr.sort((a, b) => {
        return b.usersLiked.length - a.usersLiked.length;
      });
      sortedArray.length = 2;
      console.log(sortedArray);
      dispatch(getTrends(sortedArray));
    }
  }, [posts, dispatch]);

  return (
    <div className="right-side-container">
      <div className="trending-container">
        <h4>Plus populaires</h4>
        <ul>
          {trendList.length &&
            trendList.map((post) => {
              return (
                <li key={post._id}>
                  <div className="user-info">
                    <img
                      src={
                        usersData[0] &&
                        usersData
                          .map((user) => {
                            if (user._id === post.userId) return user.picture;
                            else return null;
                          })
                          .join("")
                      }
                      alt="user-pic"
                    />
                    <p>
                      {!isEmpty(usersData[0]) &&
                        usersData
                          .map((user) => {
                            if (user._id === post.userId)
                              return user.firstname + " " + user.lastname;
                            else return null;
                          })
                          .join("")}{" "}
                    </p>
                  </div>
                  <div className="post-content-img">
                    {post.picture && !post.message && (
                      <img src={post.picture} alt="post-pic" />
                    )}
                  </div>
                  <div className="post-content">{post.message && <p>{post.message}</p>}</div>
                  <p className="post-infos">
                    <span className="post-info">
                      <span>Com ({post.comments.length}) </span>-{" "}
                      <span>Like ({post.usersLiked.length})</span>
                    </span>
                    <span className="post-date">
                      {dateParser(post.createdAt)}
                    </span>
                  </p>
                </li>
              );
            })}
        </ul>
      </div>
      <div className="contact-container">
        <h4>Contacts</h4>
        <ul>
          {usersData[0] &&
            usersData.map((user) => {
              return (
                <li key={user._id}>
                  <div className="user-info">
                    <img src={user.picture} alt="user-pic" />
                    <p>{user.firstname + " " + user.lastname}</p>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default Trends;
