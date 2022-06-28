const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const fs = require("fs");

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
        picture: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  PostModel.findOne({ _id: req.params.id })
    .then((post) => {
      // Si changement, retourne 1
      if (req.file && post.picture) {
        // Si image envoyé ET image dans le post
        const filename = post.picture.split("/images/")[1]; // Supprimer image
        fs.unlink(`images/${filename}`, () => {});
      }
      // Si image envoyé ET pas d'image dans le post
      // Si 0 next();
      PostModel.updateOne(
        { _id: req.params.id },
        { ...postObject, _id: req.params.id }
      )
        .then(() => res.status(200).json({ message: "Post updated !" }))
        .catch((error) => res.status(400).json({ error }));
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

exports.deletePicturePost = (req, res, next) => {
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
  
  exports.getNameById = (req, res, next) => {
    PostModel.findOne({ _id: req.params.id })
      .then((post) => {
        UserModel.findOne({ _id: post.posterId })
          .then((user) => {
            const posterName = user.firstname + " " + user.surname;
            res.status(201).json({ posterName });
          })
          .catch((error) => res.status(401).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  };
  
  exports.getCommentNameById = (req, res, next) => {
    PostModel.findOne({ _id: req.params.id })
      .then((post) => {
        const comments = post.comments;
        const userId = [];
        comments.forEach(function (comment) {
          userId.push(comment.commenterId);
        });
        UserModel.find({ _id: userId })
          .then((users) => {
            const userName = [];
            users.forEach(function (user) {
              userName.push(user.firstname + " " + user.surname);
            });
            res.status(201).json({ userName });        })
          .catch((error) => res.status(401).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  };

exports.getNameByIdLikes = (req, res, next) => {
  PostModel.findOne({ _id: req.params.id })
    .then((post) => {
      UserModel.find({ _id: post.usersLiked })
        .then((users) => {
          const likeName = [];
          users.forEach(function (user) {
            likeName.push(user.firstname + " " + user.surname);
          });
          res.status(201).json({ likeName });
        })
        .catch((error) => res.status(401).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};


// function getNameById(userId) {
//   UserModel.findOne({ _id: userId })
//     .then((user) => {
//       const userName = user.firstname + " " + user.surname;
//       res.status(201).json({ userName });
//     })
//     .catch((error) => res.status(401).json({ error }));
// }
