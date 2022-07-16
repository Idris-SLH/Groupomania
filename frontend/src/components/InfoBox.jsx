import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { dateParser } from "./Utils";

function InfoBox() {
  const userData = useSelector((state) => state.userReducer);

  return (
    <div className="left-container">
      <NavLink exact="true" to="/profil">
        <img src={userData.picture} alt="user-avatar" className="avatar" />
      </NavLink>
      <span className="left-container--right-part">
        <h4>
          {userData.firstname} {userData.lastname}
        </h4>
        <p>Membre depuis le : {dateParser(userData.createdAt)}</p>
      </span>
    </div>
  );
}

export default InfoBox;
