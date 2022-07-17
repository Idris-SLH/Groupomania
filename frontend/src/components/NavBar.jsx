import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContexte";
import LogOut from "./Log/LogOut";

function NavBar() {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-container-logo">
          <NavLink exact="true" to="/">
            <img src="./img/icon-left-font.png" alt="Logo groupomania" />
          </NavLink>
        </div>
        <div className="nav-container-info">
          {uid ? (
            <>
              <div className="nav-container-info__searchbar">
                <input type="text" placeholder="Rechercher"/>
                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                <FontAwesomeIcon icon="fa-solid fa-bell" />
              </div>
              <div className="nav-container_info__menu">
                <div
                  onClick={onClick}
                  className="nav-container-info__menu--trigger"
                >
                  <img
                    src={userData.picture}
                    alt="User avatar"
                    className="avatar"
                  />
                  <p>
                    {userData.firstname} {userData.lastname}
                  </p>
                </div>
                <div
                  ref={dropdownRef}
                  className={`nav-container-info__menu--dropdown bubble ${
                    isActive ? "active" : "inactive"
                  }`}
                >
                  <ul>
                    <NavLink exact="true" to="/profil">
                      <li>Profil</li>
                    </NavLink>
                    <LogOut />
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <ul>
              <li>
                <NavLink exact="true" to="/profil">
                  Se connecter/S'inscrire
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
