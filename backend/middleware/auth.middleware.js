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

module.exports.auth = (req, res, next) => {
  // RECUPERATION PROFIL UTILISATEUR CONNECTÉE
  const token = req.cookies.token;
  console.log(req)
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        let user = await UserModel.findById(decodedToken.userId);
        const userId = user._id.toString();
        const userRole = user.role;
        // REQUETE D'ADMIN
        if (!req.body.userId) {
          res.status(401).json({ error: "Please login" });
        } else {
          if (userRole === "ADMIN") {
            console.log("Bienvenue ADMIN");
            next();
          } else {
            if (req.body.userId !== userId) {
              res.status(401).json({ error: "Unauthorized access !" });
            } else {
              next();
            }
          }
        }
      }
      // REQUETE MODIFICATION COMMENTAIRE
    });
  } else {
    res.status(401).json({
      error: "No token!",
    });
  }
};

