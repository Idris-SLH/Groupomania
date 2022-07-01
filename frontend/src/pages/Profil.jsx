import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContexte";

function Profil() {
  const uid = useContext(UidContext);

  return (
    <div className="profil-page">
      {uid ? (
        <h1>UPDATE PAGE</h1>
      ) : (
        <div className="log-container">
          <Log login={false} signup={true} />
          <div className="img-container">
          </div>
        </div>
      )}
    </div>
  );
}

export default Profil;
