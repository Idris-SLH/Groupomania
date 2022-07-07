import React, { useContext } from "react";
import TopNav from "../components/TopNav";
import Log from "../components/Log";
import { UidContext } from "../components/AppContexte";

function Trending() {
  const uid = useContext(UidContext);

  return (
    <div>
      {uid ? (
        <>
          <TopNav />
          <h1>Page post populaire</h1>
        </>
      ) : (
        <div className="log-container">
          <Log login={false} signup={true} />
          <div className="img-container"></div>
        </div>
      )}
    </div>
  );
}

export default Trending;
