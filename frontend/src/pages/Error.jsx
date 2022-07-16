import React from "react";
import NavBar from "../components/NavBar";

function Error() {
  return (
    <div className="error-page">
      <NavBar />
      <h2>Oups...</h2>
      <img src="./img/404.png" alt="error-404" />
      <h2>Il semblerait qu'il y ait un problème</h2>
    </div>
  );
}

export default Error;
