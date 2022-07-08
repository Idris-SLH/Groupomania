import {
  DELETE_POST,
  GET_POSTS,
  LIKE_POST,
  UPDATE_POST,
} from "../actions/post.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;

    case LIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          if (post.usersLiked.includes(action.payload.userId)) {
            return {
              ...post,
              usersLiked: post.usersLiked.filter(
                (id) => id !== action.payload.userId
              ),
            };
          } else {
            return {
              ...post,
              usersLiked: [action.payload.userId, ...post.usersLiked],
            };
          }
        }
        return post;
      });
    case UPDATE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          if (post.userId === action.payload.userId) {
            return {
              ...post,
              message: action.payload.message,
            };
          } else {
            return post;
          }
        }
        return post;
      });
      
    case DELETE_POST:
      if (action.payload.userId === action.payload.posterId) {
        return state.filter((post) => post._id !== action.payload.postId);
      }
      return state;
      
    default:
      return state;
  }
}
