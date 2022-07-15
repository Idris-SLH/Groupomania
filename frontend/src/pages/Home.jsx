import React, { useContext } from "react";
import TopNav from "../components/TopNav";
import Log from "../components/Log";
import Thread from "../components/Thread";
import { UidContext } from "../components/AppContexte";
import NewPostForm from "../components/Post/NewPostForm";
import Trends from "../components/Trends";
import NavBar from "../components/NavBar";

function Home() {
  const uid = useContext(UidContext);

  return (
    <>
      <div className="body-container">
        {uid ? (
          <>
            <NavBar />
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
          <Log login={true} signup={false} />
        )}
      </div>
    </>
  );
}

export default Home;
