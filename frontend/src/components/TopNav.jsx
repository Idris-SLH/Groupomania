import React from "react";
import { NavLink } from "react-router-dom";

function TopNav() {
  return (
    <div className="left-nav-container">
      <div className="icon">
        <div className="icon-bis">
          <NavLink exact="true" to="/">
            HOME
          </NavLink>
          <NavLink exact="true" to="/trending">
            TENDANCE
          </NavLink>
          <NavLink exact="true" to="/profil">
            PROFIL
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
