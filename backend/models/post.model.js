// MODELE D'UTILISATEUR
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    posterId: { type: String, required: true },
    message: { type: String, trim: true, maxlenght: 500 },
    picture: { type: String },
    video: { type: String },
    usersLiked: { type: [String], required: true },
    comments: {
      type: [
        {
          commenterId: String,
          commenterSurname: String,
          commenterFirstname: String,
          text: String,
          usersLiked: { type: [String], required: true },
          timestamp: Number,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", postSchema);
