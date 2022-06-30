const PostModel = require("../models/post.model");
const { getNameById, getNameByIdLikes } = require("../middleware/project");

// CREATE COMMENT
exports.commentPost = (req, res, next) => {
  PostModel.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $push: {
        comments: {
          userId: req.body.userId,
          message: req.body.message,
          timestamp: new Date().getTime(),
        },
      },
    }
  )
    .then(() => {
      // Push l'userId dans l'Array usersLiked
      res.status(200).json({ message: "Comment posted !" });
    })
    .catch((error) => res.status(401).json({ error }));
};

// UPDATE COMMENT
exports.updateComment = (req, res, next) => {
  PostModel.findOne({ _id: req.params.id })
    .then((post) => {
      const newComment = post.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );
      newComment.message = req.body.message;
      post
        .save()
        .then(() => res.status(200).json({ message: "Comment updated !" }))
        .catch((error) => res.status(400).json({ error }));
    })

    .catch((error) => res.status(404).json({ error }));
};

// DELETE COMMENT
exports.deleteComment = (req, res, next) => {
  PostModel.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $pull: {
        comments: { _id: req.body.commentId },
      },
    }
  )
    .then(() => {
      // Push l'userId dans l'Array usersLiked
      res.status(200).json({ message: "Comment deleted !" });
    })
    .catch((error) => res.status(401).json({ error }));
};

// LIKE COMMENT
exports.likeComment = (req, res, next) => {
  const userId = req.body.userId; // UserID de l'utilisateur
  PostModel.findOne({ _id: req.params.id })
    .then((post) => {
      const newComment = post.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );
      if (newComment.usersLiked.includes(userId)) {
        newComment.usersLiked.pull(userId);
        post
          .save()
          .then(() => res.status(201).json({ message: "Comment unliked !" }))
          .catch((error) => res.status(400).json({ error }));
        // Retire l'userId dans l'Array usersLiked
      } else {
        newComment.usersLiked.push(userId);
        post
          .save()
          .then(() => res.status(201).json({ message: "Comment liked !" }))
          .catch((error) => res.status(400).json({ error }));
        // Push l'userId dans l'Array usersLiked
      }
    })
    .catch((error) => res.status(404).json({ error }));
};

// GET NAME USER BY ID
exports.getNameByIdComment = (req, res, next) => {
  PostModel.findOne({ _id: req.params.id })
    .then((post) => {
      if (!req.body.commentId) {
        res.status(404).json({ error: "Invalid comment Id" });
      }
      const comment = post.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );
      getNameById(comment.userId, res);
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.getNameByIdCommentLikes = (req, res, next) => {
  PostModel.findOne({ _id: req.params.id })
    .then((post) => {
      if (!req.body.commentId) {
        res.status(404).json({ error: "Invalid comment Id" });
      }
      const comment = post.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );
      const likesTable = comment.usersLiked;
      getNameByIdLikes(likesTable, res);
    })
    .catch((error) => res.status(500).json({ error }));
};
