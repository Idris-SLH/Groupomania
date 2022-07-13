import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContexte";
import UpdateProfil from "../components/Profil/UpdateProfil";

function Profil() {
  const uid = useContext(UidContext);

  return (
    <div className="profil-page">
      {uid ? (
          <UpdateProfil />
      ) : (
        <div className="log-container">
          <div className="img-container">
            <img src="./img/log.svg" alt="connection" />
          </div>
          <Log login={false} signup={true} />
        </div>
      )}
    </div>
  );
}

export default Profil;


