import React from "react";
import { NavLink } from "react-router-dom";

function TopNav({ num }) {
  return (
    <div className="left-nav-container">
      <div className="icon">
        <div className="icon-bis">
          <NavLink exact="true" to="/">
            {num === 1 ? (
              <div className="active-btn">HOME</div>
            ) : (
              <div>HOME</div>
            )}
          </NavLink>
          <NavLink exact="true" to="/trending">
            {num === 2 ? (
              <div className="active-btn">MESSAGE</div>
            ) : (
              <div>MESSAGE</div>
            )}
          </NavLink>
          <NavLink exact="true" to="/profil">
            {num === 3 ? (
              <div className="active-btn"> PROFIL</div>
            ) : (
              <div> PROFIL</div>
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
