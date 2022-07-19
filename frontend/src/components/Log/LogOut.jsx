import React from "react";
import axios from "axios";
import cookie from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LogOut() {
  function removeCookie(key) {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  }

  async function logout() {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("token"))
      .catch((err) => console.log(err));
    window.location = "/";
  }

  return (
    <li onClick={logout}>
      <FontAwesomeIcon icon="fa-solid fa-right-to-bracket" />
      Déconnexion
    </li>
  );
}

export default LogOut;
