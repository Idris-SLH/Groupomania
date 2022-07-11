import axios from "axios";

export const CREATE_POSTS = "CREATE_POSTS";
export const GET_POSTS = "GET_POSTS";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const LIKE_POST = "LIKE_POST";

// coments
export const CREATE_COMMENT = "CREATE_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

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

export const createPost = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/post/`, data)
      .then(() => {
        dispatch({
          type: CREATE_POSTS,
          payload: data,
        });
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
// comments

export const createComment = (postId, userId, message) => {
  return (dispatch) => {
    return axios
      .patch(`${process.env.REACT_APP_API_URL}api/post/comment/${postId}`, {
        userId,
        message,
      })
      .then(() => {
        dispatch({
          type: CREATE_COMMENT,
          payload: { postId },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const updateComment = (postId, commentId, posterId, userId, message) => {
  return (dispatch) => {
    return axios
      .patch(
        `${process.env.REACT_APP_API_URL}api/post/edit-comment/${postId}`,
        {
          commentId,
          posterId,
          userId,
          message,
        }
      )
      .then(() => {
        dispatch({
          type: UPDATE_COMMENT,
          payload: { postId, commentId, userId, message },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteComment = (postId, commentId, posterId, userId) => {
  return (dispatch) => {
    return axios
      .patch(
        `${process.env.REACT_APP_API_URL}api/post/delete-comment/${postId}`,
        {
          commentId,
          posterId,
          userId,
        }
      )
      .then(() => {
        dispatch({
          type: DELETE_COMMENT,
          payload: { postId, commentId, posterId, userId },
        });
      })
      .catch((err) => console.log(err));
  };
};
