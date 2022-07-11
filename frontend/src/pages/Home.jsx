import React, { useContext } from "react";
import TopNav from "../components/TopNav";
import Log from "../components/Log";
import Thread from "../components/Thread";
import { UidContext } from "../components/AppContexte";
import NewPostForm from "../components/Post/NewPostForm";
function Home() {
  const uid = useContext(UidContext);

  return (
    <div>
      {uid ? (
        <>
          <div className="home">
            <TopNav />
            <div className="main">
              <div className="home-header">
                <NewPostForm />
              </div>
              <Thread />
            </div>
          </div>
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

export default Home;
