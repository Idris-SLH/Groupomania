// MODELE D'UTILISATEUR
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const {isEmail} = require("validator");

const userSchema = new mongoose.Schema({
  surname: { type: String, required: true, minLenght: 3, maxLenght: 30, trimp: true, uppercase: true },
  firstname: { type: String, required: true, minLenght: 3, maxLenght: 30, trimp: true },
  email: { type: String, required: true, validate: [isEmail], unique: true,  trimp: true, lowercase: true },
  password: { type: String, required: true },
  job: { type: String, maxLenght: 40 },
  age: { type: Date, trim: true },
  picture: { type: String/*, default: './uploads/profil/default.png'*/ },
  role: { type: String, default: "USER" }
  },
  {
    timestamps: true,
  });

userSchema.plugin(uniqueValidator); // Verification d'email unique

module.exports = mongoose.model("user", userSchema);