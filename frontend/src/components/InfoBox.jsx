import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { dateParser } from "./Utils";

function InfoBox() {
  const userData = useSelector((state) => state.userReducer);

  return (
    <div className="left-container">
      <div className="left-container__userinfo bubble">
        <NavLink exact="true" to="/profil">
          <img src={userData.picture} alt="user-avatar" className="avatar" />
        </NavLink>
        <NavLink exact="true" to="/profil">
          <span className="left-container__userinfo--right-part">
            <h4>
              {userData.firstname} {userData.lastname}
            </h4>
            <p>Membre depuis le : {dateParser(userData.createdAt)}</p>
          </span>
        </NavLink>
      </div>
      <div className="left-container__event">
        <ul className="bubble">
          <li>
            <img src="./img/friends.png" alt="amis" />
            <p>Retrouver des amis</p>
          </li>
          <li>
            <img src="./img/group.png" alt="groupes" />
            <p>Groupes</p>
          </li>
          <li>
            <img src="./img/news.png" alt="actualités" />
            <p>Actualités</p>
          </li>
          <li>
            <img src="./img/event.png" alt="évenement" />
            <p>Évènements</p>
          </li>
          <li>
            <img src="./img/bookmarks.png" alt="favoris" />
            <p>Favoris</p>
          </li>
        </ul>
      </div>

      <div className="left-container__footer">
        <ul>
          <li>Confidentialité</li>
          <span>·</span>
          <li>Conditions générales</li> <span>·</span>
          <li>Cookies</li> <span>·</span>
          <li> Groupomania © 2022</li>
        </ul>
      </div>
    </div>
  );
}

export default InfoBox;
