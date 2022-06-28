// PARCOURS UTILISATEURS
const router = require("express").Router();
const postController = require("../controllers/post.controller");
const commentController = require("../controllers/comment.controller");
const multer = require("../middleware/multer.middleware");

// post
router.post("/", multer, postController.createPost);
router.get("/", postController.readPost);
router.get("/:id", postController.getNameById);
router.put("/:id", multer, postController.updatePost);
router.delete("/:id", multer, postController.deletePost);
router.patch("/:id", postController.likePost);
router.patch("/picture/:id", multer, postController.deletePicturePost);
router.get("/like/:id", postController.getNameByIdLikes);

// comments
router.get("/comment/:id", postController.getCommentNameById);
router.patch("/comment/:id", commentController.commentPost);
router.patch("/edit-comment/:id", commentController.updateCommentPost);
router.patch("/delete-comment/:id", commentController.deleteCommentPost);
router.patch("/like-comment/:id", commentController.likeComment);

module.exports = router;
