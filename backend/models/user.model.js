// MODELE D'UTILISATEUR
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema(
  {
    surname: {
      type: String,
      required: true,
      minlenght: 3,
      maxlenght: 30,
      trim: true,
      uppercase: true,
    },
    firstname: {
      type: String,
      required: true,
      minlenght: 3,
      maxlenght: 30,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    job: { type: String, maxlenght: 40 },
    age: { type: Date, trim: true },
    picture: {
      type: String,
      default: "http://localhost:5000/images/default.png",
    },
    role: { type: String, default: "USER" },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator); // Verification d'email unique

module.exports = mongoose.model("user", userSchema);
