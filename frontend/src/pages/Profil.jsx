import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContexte";
import UpdateProfil from "../components/Profil/UpdateProfil";

function Profil() {
  const uid = useContext(UidContext);

  return (
    <div className="profil-page">
      {uid ? <UpdateProfil /> : <Log login={true} signup={false} />}
    </div>
  );
}

export default Profil;
