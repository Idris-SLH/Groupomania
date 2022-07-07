import { GET_POSTS, LIKE_POST } from "../actions/post.actions";

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

    default:
      return state;
  }
}
