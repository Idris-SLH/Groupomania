const UserModel = require("../models/user.model");
const fs = require("fs");

// GET ALL USERS
exports.getAllUsers = (req, res, next) => {
  UserModel.find()
    .select("-password  -updatedAt -__v")
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

// GET ON USER
exports.getOneUser = (req, res, next) => {
  UserModel.findOne({ _id: req.params.id })
    .select("-password  -updatedAt -__v")
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

// UPDATE USER
exports.updateUser = (req, res, next) => {
  const userObject = req.file
    ? {
        ...req.body,
        picture: `${req.protocol}://${req.get("host")}/images/avatar/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  UserModel.findOne({ _id: req.params.id })
    .then((user) => {
      const filename = user.picture.split("/images/avatar/")[1];
      if (filename !== "default.png" && req.file) {
        fs.unlink(`images/avatar/${filename}`, () => {});
      }
      UserModel.updateOne(
        { _id: req.params.id },
        { ...userObject, _id: req.params.id, password: user.password }
      )
        .then(() => res.status(200).json({ message: "Profile updated !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// DELETE USER
exports.deleteUser = (req, res, next) => {
  UserModel.findOne({ _id: req.params.id }).then((user) => {
    if (!user) {
      return res.status(404).json({
        erorr: new Error("User not found !"),
      });
    }
    UserModel.findOne({ _id: req.params.id })
      .then((user) => {
        const filename = user.picture.split("/images/avatar/")[1];
        if (filename !== "default.png") {
          fs.unlink(`images/avatar/${filename}`, () => {});
        }
        UserModel.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "User deleted !" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  });
};

// DELETE USER AVATAR
exports.deleteUserAvatar = (req, res, next) => {
  UserModel.findOne({ _id: req.params.id })
    .then((user) => {
      const filename = user.picture.split("/images/avatar/")[1];
      if (filename == "default.png") {
        return res.status(401).json({ error: "Unautorized" });
      }
      fs.unlink(`images/avatar/${filename}`, () => {
        UserModel.updateOne(
          { _id: req.params.id },
          {
            picture: `${req.protocol}://${req.get(
              "host"
            )}/images/avatar/default.png`,
            _id: req.params.id,
          }
        )
          .then(() => res.status(200).json({ message: "Avatar deleted !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
