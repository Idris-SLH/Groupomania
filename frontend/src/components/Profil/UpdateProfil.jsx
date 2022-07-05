import React, { useState } from "react";
import TopNav from "../TopNav";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { updateJob } from "../../actions/user.actions";

function UpdateProfil() {
  const userData = useSelector((state) => state.userReducer);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [job, setJob] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    const info = { firstname, lastname, job };
    dispatch(updateJob(info, userData._id));
    setUpdateForm(false);
  };

  return (
    <>
      <TopNav />

      <div className="profil-container">
        <h1>Profile de {userData.firstname}</h1>
        <div className="update-container">
          <div className="left-part">
            <h3>Photo de profil</h3>
            <img src={userData.picture} alt="avatar utilisateur" />
            <UploadImg />
          </div>
          <div className="right-part">
            <div className="bio-update">
              <h3>Bio</h3>
              {updateForm ? (
                <>
                  <input
                    type="text"
                    defaultValue={userData.firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <input
                    type="text"
                    defaultValue={userData.lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                  <input
                    type="text"
                    defaultValue={userData.job}
                    onChange={(e) => setJob(e.target.value)}
                  />
                  <button onClick={handleUpdate}>Valider</button>
                </>
              ) : (
                <>
                  <p onClick={() => setUpdateForm(!updateForm)}>
                    {userData.firstname}
                  </p>
                  <p onClick={() => setUpdateForm(!updateForm)}>
                    {userData.lastname}
                  </p>
                  <p onClick={() => setUpdateForm(!updateForm)}>
                    {userData.job}
                  </p>
                  <button onClick={() => setUpdateForm(!updateForm)}>
                    Modifier Bio
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProfil;
