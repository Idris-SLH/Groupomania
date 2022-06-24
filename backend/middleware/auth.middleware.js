// MIDDLEWARE D'AUTHENTIFICATION
const jwt = require('jsonwebtoken');
const UserModel = require("../models/user.model");

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
            res.locals.user = null;
            res.cookie('token', '', {maxAge :1})
            next();
        }
        else {
            let user = await UserModel.findById(decodedToken.userId);
            res.locals.user = user;
            next();
        }
    })
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
        }
        else {
            console.log(decodedToken.userId);
            next();
        }
    })
    } else {
        console.log("No token");
    }
};

//   try {
//     const token = req.cookies.token;
//     const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
//     const userId = decodedToken.userId;
//     req.auth = { userId }; // Vérifie l'id de l'utilisateur
//     if (req.body.userId && req.body.userId !== userId) {
//       res.status(401).json({
//         error: new Error('Invalid user ID !')
//       });
//     } else {
//       next();
//     }
//   } catch {
//     res.status(401).json({
//       error: new Error('Invalid request!')
//     });
//   }