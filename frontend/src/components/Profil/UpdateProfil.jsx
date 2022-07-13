import React, { useState } from "react";
import TopNav from "../TopNav";
import { useDispatch, useSelector } from "react-redux";
import { updateJob, uploadPicture } from "../../actions/user.actions";
import { dateParser, getAge, getDate, getDateUTC } from "../Utils";
import { getAllUsers } from "../../actions/users.actions";

function UpdateProfil() {
  const userData = useSelector((state) => state.userReducer);
  const [firstname, setFirstname] = useState(userData.firstname);
  const [lastname, setLastname] = useState(userData.lastname);
  const [job, setJob] = useState(userData.job);
  const [age, setAge] = useState(userData.age);
  const [file, setFile] = useState();
  const [updateForm, setUpdateForm] = useState(false);
  const dispatch = useDispatch();

  async function handleUpdate(e) {
    e.preventDefault();
    if (file) {
      const data = new FormData();
      data.append("userId", userData._id);
      data.append("picture", file);
      await dispatch(uploadPicture(data, userData._id));
    }
    const info = { firstname, lastname, job, age };
    dispatch(updateJob(info, userData._id)).then(() => dispatch(getAllUsers()));
    setUpdateForm(false);
  }

  return (
    <div className="home">
      <TopNav num={3} />
      <div className="profil-container">
        <h1>Profile de {userData.firstname}</h1>
        <form action="" onSubmit={handleUpdate} className="form-update">
          <div className="update-container">
            <div className="left-part">
              <h3>Photo de profil</h3>
              <img src={userData.picture} alt="avatar utilisateur" />
              <label htmlFor="file" className="upload-btn">
                Changer d'image
              </label>
              <input
                type="file"
                id="file"
                name="file"
                accept=".jpg, .jpeg, .png, .webp"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <br />
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
                  </>
                )}
              </div>
              <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
            </div>
          </div>
          <input className="submit-btn" type="submit" value="Enregister" />
        </form>
      </div>
    </div>
  );
}

export default UpdateProfil;
