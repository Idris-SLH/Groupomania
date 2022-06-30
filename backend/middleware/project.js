const UserModel = require("../models/user.model");

function getNameById(userId, res) {
  UserModel.findOne({ _id: userId })
    .then((user) => {
      const userName = user.firstname + " " + user.surname;
      res.status(200).json({ userName });
    })
    .catch((error) => res.status(401).json({ error }));
}

function getNameByIdLikes(userTable, res) {
  UserModel.find({ _id: userTable })
    .then((users) => {
      const likeName = [];
      users.forEach(function (user) {
        likeName.push(user.firstname + " " + user.surname);
      });
      res.status(201).json({ likeName });
    })
    .catch((error) => res.status(401).json({ error }));
}

module.exports = { getNameById, getNameByIdLikes };
