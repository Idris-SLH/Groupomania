import React, { useState } from "react";
import axios from "axios";

function SignUpForm() {
  // const [formSubmit, setFormSubmit] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordControl, setPasswordControl] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    // const firstnameError = document.querySelector(".firstname.error");
    // const lastnameError = document.querySelector(".lastname.error");
    // const passwordError = document.querySelector(".password.error");
    const emailError = document.querySelector(".email.error");
    const passwordControlError = document.querySelector(
      ".password-control.error"
    );
    const termsError = document.querySelector(".terms.error");

    emailError.innerHTML = "";
    passwordControlError.innerHTML = "";
    termsError.innerHTML = "";
    if (password !== passwordControl || !terms.checked) {
      if (password !== passwordControl) {
        passwordControlError.innerHTML =
          "Les mots de passe ne correspondent pas";
      }
      if (!terms.checked) {
        termsError.innerHTML = "Veuillez valider les conditions générales";
      }
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/signup`,
        data: {
          firstname,
          lastname,
          email,
          password,
        },
      })
        .then((res) => {
          if (res.data.error) {
            emailError.innerHTML = res.data.error.email;
          }
        })
        .then(() => {
          axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/user/login`,
            withCredentials: true,
            data: {
              email,
              password,
            },
          });
          window.location = "/";
        });
    }
  };

  return (
    <form action="" onSubmit={handleRegister} id="log-container__form--SignUp">
      <input
        type="text"
        name="firstname"
        id="firstname"
        placeholder="Prénom"
        onChange={(e) => setFirstname(e.target.value)}
        value={firstname}
      />
      <div className="firstname error"></div>
      <br />
      <input
        type="text"
        name="lastname"
        id="lastname"
        placeholder="Nom"
        onChange={(e) => setLastname(e.target.value)}
        value={lastname}
      />
      <div className="lastname error"></div>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />

      <input
        type="password"
        name="password"
        id="password"
        placeholder="Mot de passe"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <input
        type="password"
        name="password"
        id="password-conf"
        placeholder="Confirmez le mot de passe"
        onChange={(e) => setPasswordControl(e.target.value)}
        value={passwordControl}
      />
      <div className="password-control error"></div>
      <br />
      <input type="checkbox" id="terms" />
      <label htmlFor="terms">
        J'accepte les{" "}
        <a
          href="/"
          target="_blank"
          alt="Conditions générales"
          rel="noopener noreferrer"
        >
          conditions générales
        </a>
        <div className="terms error"></div>
        <br />
      </label>
      <input type="submit" className="submit-btn" value="S'inscrire" />
    </form>
  );
}

export default SignUpForm;
