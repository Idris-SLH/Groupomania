// MIDDLEWARE D'AUTHENTIFICATION
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const PostModel = require("../models/post.model");

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
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        let user = await UserModel.findById(decodedToken.userId);
        const id = user._id.toString();
        const role = user.role;
        const userTable = { id, role };
        console.log(userTable);
        // REQUETE D'ADMIN
        if (userTable.role === "ADMIN") {
          next();
        } else {
          if (
            req.route.path === "/edit-comment/:id" ||
            req.route.path === "/delete-comment/:id"
          ) {
            console.log("On est dans commentaire");
            PostModel.findOne({ _id: req.params.id })
              .then((post) => {
                const newComment = post.comments.find((comment) =>
                  comment._id.equals(req.body.commentId)
                );
                if (userTable.id === newComment.userId) {
                  next();
                } else {
                  res.status(401).json({ error: "Unauthorized access !" });
                }
              })
              .catch((error) => res.status(404).json({ error }));
          }
          // REQUETE MODIFICATION POST
          if (
            (req.baseUrl === "/api/post" && req.route.path === "/:id") ||
            req.route.path === "/picture/:id"
          ) {
            console.log("On est dans post");
            PostModel.findOne({ _id: req.params.id })
              .then((post) => {
                if (userTable.id === post.userId) {
                  next();
                } else {
                  res.status(401).json({ error: "Unauthorized access !" });
                }
              })
              .catch((error) => res.status(404).json({ error }));
          }
          // REQUETE MODIFICATION USER
          if (req.baseUrl === "/api/user" && req.route.path === "/:id") {
            console.log("On est dans user");
            UserModel.findOne({ _id: req.params.id })
              .then((user) => {
                const userId = user._id.toString();
                console.log(userId + " " + userTable.id);
                if (userTable.id === userId) {
                  next();
                } else {
                  res.status(401).json({ error: "Unauthorized access !" });
                }
              })
              .catch((error) => res.status(404).json({ error }));
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
