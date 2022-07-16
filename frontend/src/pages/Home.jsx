import React, { useContext } from "react";
import InfoBox from "../components/InfoBox";
import Log from "../components/Log";
import Thread from "../components/Thread";
import { UidContext } from "../components/AppContexte";
import NewPostForm from "../components/Post/NewPostForm";
import Trends from "../components/Trends";
import NavBar from "../components/NavBar";

function Home() {
  const uid = useContext(UidContext);

  return (
    <div className="body-container">
      {uid ? (
        <>
          <NavBar />
          <InfoBox />
          <div className="main">
            <NewPostForm />
            <Thread />
          </div>
          <div className="right-side">
            <Trends />
          </div>
        </>
      ) : (
        <Log login={true} signup={false} />
      )}
    </div>
  );
}

export default Home;
