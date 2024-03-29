const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const app = express();
const cors = require("cors");
require("express-async-errors");

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static("public/uploads"));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

const port = process.env.PORT || 3000;
const dbDriver = process.env.MONGO_DB_URL;
const authRouter = require("./routes/auth.routes");
app.use(authRouter);
const categoriesRouter = require("./routes/categories.routes");
app.use(categoriesRouter);
const postRouter = require("./routes/posts.routes");
app.use(postRouter);
const userRouter = require("./routes/users.routes");
app.use("/user", userRouter);

mongoose
  .connect(dbDriver, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    app.listen(port, () => {
      console.log("db is connected");
      console.log(`server is running @ http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("db is not connected");
  });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});
