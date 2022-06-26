// PARCOURS UTILISATEURS
const router = require("express").Router();
const postController = require("../controllers/post.controller");
const commentController = require("../controllers/comment.controller");
const multer = require("../middleware/multer.middleware");

// post
router.post("/", multer, postController.createPost);
router.get("/", postController.readPost);
router.put("/:id", multer, postController.updatePost);
router.delete("/:id", multer, postController.deletePost);
router.patch("/:id", postController.likePost);

// comments
router.patch("/comment/:id", commentController.commentPost);
router.patch("/edit-comment/:id", commentController.updateCommentPost);
router.patch("/delete-comment/:id", commentController.deleteCommentPost);
router.patch("/like-comment/:id", commentController.likeComment);

module.exports = router;
