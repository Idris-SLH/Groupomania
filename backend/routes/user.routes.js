// PARCOURS UTILISATEURS
const router = require("express").Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const multer = require("../middleware/multer.middleware");

// authentification
router.post("/signup", authController.signUp);
router.post("/login", authController.logIn);
router.get("/logout", authController.logOut);

// user routes
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getOneUser);
router.put("/:id", multer, userController.updateUser);
router.patch("/:id", multer, userController.deleteUserAvatar);
router.delete("/:id", multer, userController.deleteUser);

module.exports = router;
