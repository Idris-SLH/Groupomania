const PostModel = require("../models/post.model");

exports.commentPost = (req, res, next) => {
  PostModel.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $push: {
        comments: {
          commenterId: req.body.commenterId,
          message: req.body.message,
          timestamp: new Date().getTime(),
        },
      },
    }
  )
    .then((post) => {
      // Push l'userId dans l'Array usersLiked
      res.status(200).json({ message: "Comment posted !" });
    })
    .catch((error) => res.status(401).json({ error }));
};

exports.updateCommentPost = (req, res, next) => {
  PostModel.findOne({ _id: req.params.id })
    .then((post) => {
      const newComment = post.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );
      newComment.message = req.body.message;
      newComment.commenterId = req.body.commenterId;
      post
        .save()
        .then(() => res.status(200).json({ message: "Comment updated !" }))
        .catch((error) => res.status(400).json({ error }));
    })

    .catch((error) => res.status(404).json({ error }));
};

exports.deleteCommentPost = (req, res, next) => {
  PostModel.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $pull: {
        comments: { _id: req.body.commentId },
      },
    }
  )
    .then((post) => {
      // Push l'userId dans l'Array usersLiked
      res.status(200).json({ message: "Comment deleted !" });
    })
    .catch((error) => res.status(401).json({ error }));
};

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
