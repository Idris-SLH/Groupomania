const PostModel = require("../models/post.model");
const { getNameById, getNameByIdLikes } = require("../middleware/project");

const fs = require("fs");

// CREATE POST
exports.createPost = (req, res, next) => {
  const postObject = req.file
    ? {
        ...req.body,
        picture: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  const newPost = new PostModel({
    ...postObject,
  });
  newPost
    .save()
    .then(() => res.status(201).json({ message: "Post created !" }))
    .catch((error) => res.status(400).json({ error }));
};

// GET ALL POSTS
exports.getPost = (req, res, next) => {
  PostModel.find()
    .sort({ createdAt: -1 })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

// UPDTATE POST
exports.updatePost = (req, res, next) => {
  const postObject = req.file
    ? {
        ...req.body,
        picture: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  PostModel.findOne({ _id: req.params.id })
    .then((post) => {
      if (req.file && post.picture) {
        const filename = post.picture.split("/images/")[1]; // Supprimer image
        fs.unlink(`images/${filename}`, () => {});
      }
      PostModel.updateOne(
        { _id: req.params.id },
        { ...postObject, _id: req.params.id }
      )
        .then(() => res.status(200).json({ message: "Post updated !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// DELETE POST
exports.deletePost = (req, res, next) => {
  PostModel.findOne({ _id: req.params.id }).then((post) => {
    if (!post) {
      return res.status(404).json({
        erorr: new Error("Post not found !"),
      });
    }
    PostModel.findOne({ _id: req.params.id })
      .then((post) => {
        if (post.picture) {
          const filename = post.picture.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {});
        }
        PostModel.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Post deleted !" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  });
};

// DELETE IMAGE IN POST
exports.deletePostPicture = (req, res, next) => {
  PostModel.findOne({ _id: req.params.id })
    .then((post) => {
      const filename = post.picture.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        PostModel.updateOne(
          { _id: req.params.id },
          {
            $unset: {
              picture: `${req.protocol}://${req.get(
                "host"
              )}/images/${filename}`,
            },
          }
        )
          .then(() => res.status(200).json({ message: "Picture deleted !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// LIKE A POST
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

// GET AUTHOR POST NAME
exports.getNameById = (req, res, next) => {
  PostModel.findOne({ _id: req.params.id })
    .then((post) => {
      getNameById(post.userId, res);
    })
    .catch((error) => res.status(500).json({ error }));
};

// GET USERNAME'S LIKES ARRAY
exports.getNameByIdLikes = (req, res, next) => {
  PostModel.findOne({ _id: req.params.id })
    .then((post) => {
      const likesTable = post.usersLiked;
      getNameByIdLikes(likesTable, res);
    })
    .catch((error) => res.status(500).json({ error }));
};
