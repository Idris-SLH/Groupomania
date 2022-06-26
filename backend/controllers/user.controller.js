const UserModel = require("../models/user.model");

exports.getAllUsers = (req, res, next) => {
  UserModel.find()
    .select("-password")
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneUser = (req, res, next) => {
  UserModel.findOne({ _id: req.params.id })
    .select("-password -role -createdAt -updatedAt -__v -_id")
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyUser = (req, res, next) => {
  const userObject = req.file
    ? {
        ...JSON.parse(req.body.user),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  UserModel.findOne({ _id: req.params.id })
    .then((user) => {
      const filename = user.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        UserModel.updateOne(
          { _id: req.params.id },
          { ...userObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Profile updated !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.deleteUser = (req, res, next) => {
  UserModel.findOne({ _id: req.params.id }).then((user) => {
    if (!user) {
      return res.status(404).json({
        erorr: new Error("User not found !"),
      });
    }
    /* if (user.userId !== req.auth.userId) {
                return res.status(401).json({ 
                    error: new error('Requête non autorisée !')
                });
            }*/
    UserModel.findOne({ _id: req.params.id })
      .then(() => {
        const filename = user.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          UserModel.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "User deleted !" }))
            .catch((error) => res.status(400).json({ error }));
        });
      })
      .catch((error) => res.status(500).json({ error }));
  });
};
