const mongoose = require("mongoose");

// CONNEXION SUR MONGODB ATLAS
mongoose
  .connect(
    "mongodb+srv://" +
      process.env.SECRET_MONGODB +
      "@cluster0.u16wz.mongodb.net/groupomania?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Connexion à MongoDB échouée !", err));
