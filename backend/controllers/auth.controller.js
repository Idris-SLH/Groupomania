const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/.env" });

exports.signUp = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10) // Hashage du mot de passe
    .then((hash) => {
      const user = new UserModel({
        ...req.body,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "User create !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.logIn = (req, res, next) => {
  UserModel.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "User not found !" });
      }
      bcrypt
        .compare(req.body.password, user.password) // Comparaison des hash de mot de passe
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Incorrect password" });
          }
          const token = jwt.sign(
            { userId: user._id },
            process.env.TOKEN_SECRET
          );
          res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
          });
          res.status(200).json({ user: user._id });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.logOut = (req, res, next) => {
  res.cookie("token", "", { maxAge: 1 });
  res.redirect("/");
};
