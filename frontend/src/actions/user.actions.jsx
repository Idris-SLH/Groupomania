import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_JOB = "UPDATE_JOB";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}api/user/${id}`, data)
      .then(() => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
          .then((res) => {
            dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
          });
      })
      .catch((err) => console.log(err));
  };
};

export const updateJob = (info, id) => {
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}api/user/${id}`, { ...info })
      .then(() => {
        dispatch({ type: UPDATE_JOB, payload: info });
      })
      .catch((err) => console.log(err));
  };
};
