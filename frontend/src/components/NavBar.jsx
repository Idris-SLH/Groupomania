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
        <div className="nav-container__logo">
          <NavLink exact="true" to="/">
            <img src="./img/icon-left-font.png" alt="Logo groupomania" />
          </NavLink>
        </div>
        <div className="nav-container__menu">
          {uid ? (
            <>
              <div onClick={onClick} className="nav-container__menu--trigger">
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
                className={`nav-container__menu--dropdown ${
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
