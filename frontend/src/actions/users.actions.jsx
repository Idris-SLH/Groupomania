import axios from "axios";

export const GET_ALL_USERS = "GET_ALL_USERS";
export const UPDATE_ALL_USERS = "UPDATE_ALL_USERS";

export const getAllUsers = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user`)
      .then((res) => {
        dispatch({ type: GET_ALL_USERS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const updateAllUsers = (id) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
      .then((res) => {
        const picture = res.data.picture;
        dispatch({ type: UPDATE_ALL_USERS, payload: { picture, id } });
      })
      .catch((err) => console.log(err));
  };
};
