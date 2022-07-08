import { GET_ALL_USERS, UPDATE_ALL_USERS } from "../actions/users.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.payload;

      case UPDATE_ALL_USERS:
        return state.map((user) => {
          if (user._id === action.payload.id) {
              return {
                ...user,
                picture: action.payload.picture,
              };
          }
          return user;
        });
      
    default:
      return state;
  }
}
