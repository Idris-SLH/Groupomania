import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContexte";
import UpdateProfil from "../components/Profil/UpdateProfil";
import NavBar from "../components/NavBar";
function Profil() {
  const uid = useContext(UidContext);

  return (
    <>
      {uid ? (
        <>
          <NavBar />
          <div className="profil_page">
            <UpdateProfil />
          </div>
        </>
      ) : (
        <Log login={true} signup={false} />
      )}
    </>
  );
}

export default Profil;
