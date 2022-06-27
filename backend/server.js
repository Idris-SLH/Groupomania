const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const path = require("path");
require("dotenv").config({ path: "./config/.env" });
require("./app");
const app = express();

app.use(cookieParser());
app.use(express.json());

// images
app.use("/images", express.static(path.join(__dirname, "images")));

// token
app.get("*", checkUser);
app.get("/tokenid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
