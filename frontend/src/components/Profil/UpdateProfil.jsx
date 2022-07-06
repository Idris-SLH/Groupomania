import React, { useState } from "react";
import TopNav from "../TopNav";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { updateJob } from "../../actions/user.actions";
import { dateParser, getAge, getDate, getDateUTC } from "../Utils";

function UpdateProfil() {
  const userData = useSelector((state) => state.userReducer);
  const [firstname, setFirstname] = useState(userData.firstname);
  const [lastname, setLastname] = useState(userData.lastname);
  const [job, setJob] = useState(userData.job);
  const [age, setAge] = useState(userData.age);
  const [updateForm, setUpdateForm] = useState(false);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    const info = { firstname, lastname, job, age };
    dispatch(updateJob(info, userData._id));
    setUpdateForm(false);
    window.location.reload();
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
                  <br />
                  <input
                    type="text"
                    defaultValue={userData.lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                  <br />
                  <input
                    type="text"
                    defaultValue={userData.job}
                    onChange={(e) => setJob(e.target.value)}
                  />
                  <br />
                  <input
                    type="date"
                    defaultValue={getDateUTC(userData.age)}
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <br />
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
                  <p onClick={() => setUpdateForm(!updateForm)}>
                    {getDate(userData.age)}
                  </p>
                  <p onClick={() => setUpdateForm(!updateForm)}>
                    {getAge(userData.age)} ans
                  </p>
                  <button onClick={() => setUpdateForm(!updateForm)}>
                    Modifier Bio
                  </button>
                </>
              )}
            </div>
            <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProfil;
