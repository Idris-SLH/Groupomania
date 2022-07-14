import React from "react";
import axios from "axios";
import { useState } from "react";

function LogInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res.data);
        emailError.innerHTML = ""
        passwordError.innerHTML = "";
        if (res.data.error) {
          if (res.data.error.email) {
            emailError.innerHTML = res.data.error.email;
          }
          if (res.data.error.password) {
            passwordError.innerHTML = res.data.error.password;
          }
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
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
      <input type="submit" value="Se connecter" />
    </form>
  );
}

export default LogInForm;
