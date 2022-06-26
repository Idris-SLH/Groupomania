const PostModel = require("../models/post.model");
const fs = require("fs");

exports.createPost = (req, res, next) => {
  // const postObject = JSON.parse(req.body.PostModel);
  // delete sauceObject._id;
  const newPost = new PostModel({
    ...req.body,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  newPost
    .save()
    .then(() => res.status(201).json({ message: "Post created !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.readPost = (req, res, next) => {
  PostModel.find()
    .sort({ createdAt: -1 })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

exports.updatePost = (req, res, next) => {
  const postObject = req.file
    ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  PostModel.findOne({ _id: req.params.id })
    .then((post) => {
      const filename = post.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        PostModel.updateOne(
          { _id: req.params.id },
          { ...postObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Post updated !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.deletePost = (req, res, next) => {
  PostModel.findOne({ _id: req.params.id }).then((post) => {
    if (!post) {
      return res.status(404).json({
        erorr: new Error("Post not found !"),
      });
    }
    /* if (user.userId !== req.auth.userId) {
                    return res.status(401).json({ 
                        error: new error('Requête non autorisée !')
                    });
                }*/
    PostModel.findOne({ _id: req.params.id })
      .then(() => {
        const filename = user.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          PostModel.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Post deleted !" }))
            .catch((error) => res.status(400).json({ error }));
        });
      })
      .catch((error) => res.status(500).json({ error }));
  });
};

exports.likePost = (req, res, next) => {
  const userId = req.body.userId; // UserID de l'utilisateur

  PostModel.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.usersLiked.includes(userId)) {
        PostModel.updateOne(
          { _id: req.params.id },
          { $pull: { usersLiked: userId } }
        )
          // Push l'userId dans l'Array usersLiked
          .then(() => res.status(200).json({ message: "Post unliked !" }))
          .catch((error) => res.status(401).json({ error }));
      } else {
        PostModel.updateOne(
          { _id: req.params.id },
          { $push: { usersLiked: userId } }
        )
          // Retire l'userId dans l'Array usersLiked
          .then(() => res.status(200).json({ message: "Post liked !" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => res.status(401).json({ error }));
};

