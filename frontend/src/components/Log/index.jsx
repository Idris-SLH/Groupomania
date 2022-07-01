import React, { useState } from "react";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";

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
    <div className="conection-form">
      <div className="btn-container">
        <ul>
          <li
            onClick={handleModals}
            id="register"
            className={signUpModal ? "active-btn" : null}
          >
            S'inscrire
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={logInModal ? "active-btn" : null}
          >
            Se connecter
          </li>
        </ul>
        <div className="form-container">
          {signUpModal && <SignUpForm />}
          {logInModal && <LogInForm />}
        </div>
      </div>
    </div>
  );
};

export default Log;
