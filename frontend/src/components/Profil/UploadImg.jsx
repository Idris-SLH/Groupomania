import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";
import { updateAllUsers } from "../../actions/users.actions";

function UploadImg() {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("userId", userData._id);
    data.append("picture", file);
    dispatch(uploadPicture(data, userData._id));
    setTimeout(() => {
      dispatch(updateAllUsers(userData._id));
    }, 500);
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="file">Changer d'image</label>
      <br />
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png, .webp"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <input type="submit" value="Enregister" />
    </form>
  );
}

export default UploadImg;
