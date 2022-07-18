import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
      dispatch(getTrends(sortedArray));
    }
  }, [posts, dispatch]);

  return (
    <div className="right-container">
      <div className="right-container__trending">
        <h2>PLUS POPULAIRE</h2>
        <ul>
          {trendList.length &&
            trendList.map((post) => {
              return (
                <li key={post._id} className="card-container">
                  <div className="card-container__user">
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
                      className="card-container__user--avatar"
                    />
                    <span>
                      <p className="card-container__user--name">
                        {!isEmpty(usersData[0]) &&
                          usersData
                            .map((user) => {
                              if (user._id === post.userId)
                                return user.firstname + " " + user.lastname;
                              else return null;
                            })
                            .join("")}
                      </p>
                      <p className="card-container__user--date">
                        il y a {dateParser(post.createdAt)}
                      </p>
                    </span>
                  </div>
                  <div className="card-container__content">
                    {post.message && (
                      <p className="card-container__content--message">
                        {post.message}
                      </p>
                    )}
                    {post.picture && !post.message && (
                      <img
                        src={post.picture}
                        alt="post-pic"
                        className="card-container__content--picture"
                      />
                    )}
                  </div>
                  <p className="card-container__likecount">
                    <span className="card-container__likecount--info">
                      <span>{post.comments.length} 💬</span>
                      <span>{post.usersLiked.length} ❤</span>
                    </span>
                  </p>
                </li>
              );
            })}
        </ul>
      </div>
      <div className="right-container__contact">
        <h2>CONTACTS</h2>
        <ul className="right-container__contact--bubble">
          {usersData[0] &&
            usersData.map((user) => {
              return (
                <li key={user._id}>
                    <img src={user.picture} alt="user-pic" />
                    <p>{user.firstname + " " + user.lastname}</p>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default Trends;
