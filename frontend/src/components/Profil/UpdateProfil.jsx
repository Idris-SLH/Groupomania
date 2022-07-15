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
    <>
      <TopNav num={3} />
      <div className="profil_page__container">
        <form action="" onSubmit={handleUpdate}>
          <div className="profil_page__container__form">
            <div className="profil_page__container__form--left-part">
              <img src={userData.picture} alt="avatar utilisateur" />
              <br />
              <label htmlFor="file" className="upload-btn">
                Modifier photo de profil
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

            <div className="profil_page__container__form--right-part">
              <label htmlFor="fisrtname">Prénom</label>
              <br />
              <input
                type="text"
                id="fisrtname"
                defaultValue={userData.firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <br />
              <label htmlFor="lastname">Nom</label>
              <br />
              <input
                type="text"
                id="lastname"
                defaultValue={userData.lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              <br />
              <label htmlFor="job">Job</label>
              <br />
              <input
                type="text"
                id="job"
                defaultValue={userData.job}
                onChange={(e) => setJob(e.target.value)}
              />
              <br />
              <label htmlFor="age">Date de naissance</label>
              <br />
              <input
                type="date"
                id="age"
                defaultValue={getDateUTC(userData.age)}
                onChange={(e) => setAge(e.target.value)}
              />
              <br />
              <label htmlFor="email">Mail</label>
              <br />
              <input
                type="text"
                disabled="true"
                id="email"
                defaultValue={userData.email}
              />
              <br />
              <label htmlFor="password">Mot de passe</label>
              <br />
              <input
                type="text"
                disabled="true"
                id="password"
                defaultValue="********"
              />
              <br />
              <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
            </div>
          </div>
          <input type="submit" className="submit-btn" value="Enregister" />
        </form>
      </div>
    </>
  );
}

export default UpdateProfil;
