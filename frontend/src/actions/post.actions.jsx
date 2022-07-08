import axios from "axios";

export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

export const getPosts = (num) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post`)
      .then((res) => {
        const array = res.data.slice(0, num);
        dispatch({ type: GET_POSTS, payload: array });
      })
      .catch((err) => console.log(err));
  };
};

export const likePost = (postId, userId) => {
  return (dispatch) => {
    return axios
      .patch(`${process.env.REACT_APP_API_URL}api/post/${postId}`, { userId })
      .then(() => {
        dispatch({ type: LIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};

export const updatePost = (postId, posterId, userId, message) => {
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}api/post/${postId}`, {
        posterId,
        userId,
        message,
      })
      .then(() => {
        dispatch({
          type: UPDATE_POST,
          payload: { postId, posterId, userId, message },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (postId, posterId, userId) => {
  return (dispatch) => {
    return axios
      .delete(`${process.env.REACT_APP_API_URL}api/post/${postId}`, {
        data: {
          posterId,
          userId,
        },
      })
      .then(() => {
        dispatch({
          type: DELETE_POST,
          payload: { postId, posterId, userId },
        });
      })
      .catch((err) => console.log(err));
  };
};
