import React, { useContext } from "react";
import TopNav from "../components/TopNav";
import Log from "../components/Log";
import Thread from "../components/Thread";
import { UidContext } from "../components/AppContexte";
import NewPostForm from "../components/Post/NewPostForm";
import Trends from "../components/Trends";

function Home() {
  const uid = useContext(UidContext);

  return (
    <div>
      {uid ? (
        <>
          <div className="home">
            <TopNav num={1} />
            <div className="main">
              <div className="home-header">
                <NewPostForm />
              </div>
              <Thread />
            </div>
            <div className="right-side">
              <Trends />
            </div>
          </div>
        </>
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

export default Home;
