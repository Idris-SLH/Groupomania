import {
  DELETE_POST,
  GET_POSTS,
  LIKE_POST,
  UPDATE_POST,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  LIKE_COMMENT,
} from "../actions/post.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;

    case UPDATE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          if (
            post.userId === action.payload.userId ||
            action.payload.posterRole === "ADMIN"
          ) {
            return {
              ...post,
              message: action.payload.message,
            };
          } else return post;
        } else return post;
      });

    case DELETE_POST:
      if (
        action.payload.userId === action.payload.posterId ||
        action.payload.posterRole === "ADMIN"
      ) {
        return state.filter((post) => post._id !== action.payload.postId);
      }
      return state;

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

    case UPDATE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment._id === action.payload.commentId) {
                if (
                  comment.userId === action.payload.userId ||
                  action.payload.posterRole === "ADMIN"
                ) {
                  return {
                    ...comment,
                    message: action.payload.message,
                  };
                } else return comment;
              } else return comment;
            }),
          };
        } else return post;
      });

    case DELETE_COMMENT:
      if (
        action.payload.userId === action.payload.posterId ||
        action.payload.posterRole === "ADMIN"
      ) {
        return state.map((post) => {
          if (post._id === action.payload.postId) {
            return {
              ...post,
              comments: post.comments.filter(
                (comment) => comment._id !== action.payload.commentId
              ),
            };
          } else return post;
        });
      } else return state;

    case LIKE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment._id === action.payload.commentId) {
                if (comment.usersLiked.includes(action.payload.userId)) {
                  return {
                    ...comment,
                    usersLiked: comment.usersLiked.filter(
                      (id) => id !== action.payload.userId
                    ),
                  };
                } else {
                  return {
                    ...comment,
                    usersLiked: [action.payload.userId, ...comment.usersLiked],
                  };
                }
              } else return comment;
            }),
          };
        } else return post;
      });

    default:
      return state;
  }
}
