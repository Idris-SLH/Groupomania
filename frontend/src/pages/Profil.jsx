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
          <Log login={false} signup={true} />
          <div className="img-container"></div>
        </div>
      )}
    </div>
  );
}

export default Profil;


