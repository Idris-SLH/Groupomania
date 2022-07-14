import React, { useState } from "react";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Log = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [logInModal, setLogInModal] = useState(props.login);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setLogInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setLogInModal(true);
      setSignUpModal(false);
    }
  };

  return (
    <div className="log-container">
      <div className="log-container__img">
        <img src="./img/icon-left-font-monochrome-white.png" alt="connection" />
      </div>
      <div className="log-container__form">
        <div>
          <ul>
            <li>
              <FontAwesomeIcon
                icon={logInModal ? "fas fa-circle" : "far fa-circle"}
                id="login"
                onClick={handleModals}
              />
            </li>
            <li>
              <FontAwesomeIcon
                icon={signUpModal ? "fas fa-circle" : "far fa-circle"}
                id="register"
                onClick={handleModals}
              />
            </li>
          </ul>
        </div>
        {signUpModal && <SignUpForm />}
        {logInModal && <LogInForm />}
        <div>
          <ul>
            {logInModal ? (
              <li onClick={handleModals} id="register">
                S'inscrire
              </li>
            ) : null}
            {signUpModal ? (
              <li onClick={handleModals} id="login">
                Se connecter
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Log;
