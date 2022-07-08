// MIDDLEWARE D'AUTHENTIFICATION
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("token", "", { maxAge: 1 });
        next();
      } else {
        let user = await UserModel.findById(decodedToken.userId);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        console.log(decodedToken.userId);
        next();
      }
    });
  } else {
    console.log("No token");
  }
};

module.exports.auth = async (req, res, next) => {
  // RECUPERATION PROFIL UTILISATEUR CONNECTÉE
  console.log(req.body)

  if (req.body.userId && req.body.posterId) {
    const posterId = req.body.posterId;
    let user = await UserModel.findById(req.body.userId);
    const userId = user._id.toString();
    const userRole = user.role;
    // REQUETE D'ADMIN
    if (userRole === "ADMIN") {
      console.log("Bienvenue ADMIN");
      next();
    } else {
      if (userId !== posterId) {
        res.status(401).json({ error: "Unauthorized access !" });
      } else {
        next();
      }
    }
  } else {
    res.status(401).json({ error: "Please login" });
  }
};
