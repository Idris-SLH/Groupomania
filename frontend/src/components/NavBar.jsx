import React from "react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContexte";
import LogOut from "./Log/LogOut";

function NavBar() {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink exact to="/">
              <img src="./img/icon-left-font.png" alt="Logo groupomania" />
          </NavLink>
        </div>
        {uid ? (
          <ul>
            <li className="welcome">
              <NavLink exact to="/profil">
                Bienvenue {userData.firstname} {userData.lastname}
              </NavLink>
            </li>
            <LogOut />
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink exact to="/profil">
                Login
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
