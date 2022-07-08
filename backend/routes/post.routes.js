// PARCOURS UTILISATEURS
const router = require("express").Router();
const postController = require("../controllers/post.controller");
const commentController = require("../controllers/comment.controller");
const multer = require("../middleware/multer.middleware");
const { auth } = require("../middleware/auth.middleware");
// post
router.post("/", multer, postController.createPost);
router.get("/", postController.getPost);
router.get("/:id", postController.getNameById);
router.get("/like/:id", postController.getNameByIdLikes);
router.patch("/:id", postController.likePost);
router.put("/:id", auth, multer, postController.updatePost);
router.patch("/picture/:id", auth, multer, postController.deletePostPicture);
router.delete("/:id", auth, multer, postController.deletePost);

// comments
router.patch("/comment/:id", commentController.commentPost);
router.patch("/like-comment/:id", commentController.likeComment);
router.get("/like-comment/:id", commentController.getNameByIdCommentLikes);
router.get("/comment/:id", commentController.getNameByIdComment);
router.patch("/edit-comment/:id", auth, commentController.updateComment);
router.patch("/delete-comment/:id", auth, commentController.deleteComment);

module.exports = router;
