const express = require("express");
require("dotenv").config();
const booksrouter = require("./src/routes/booksRoute");
const loansrouter = require("./src/routes/loansRoute");
const membersrouter = require("./src/routes/membersRoutes.js");
const { adminTokenValidation } = require("./src/Middlewares/tokenval");
const app = express();

app.use(express.json());
//applying middleware at root level
app.get(
  "/",
  (req, res, next) => {
    console.log("I am a middleware");
    let cont = true;
    if (cont) {
      next();
    } else {
      res.send("Validation failed");
    }

    // next();
  },
  (req, res) => {
    res.send("Welcome to BookStore");
  }
);

app.use("/books", booksrouter);
app.use("/loans", loansrouter);
app.use("/members", membersrouter);
//applying middleware at app level
app.use((req, res, next) => {
  const error = new Error("Route Not found");
  next({
    status: 404,
    message: error.message,
  });
});
app.use((error, req, res, next) => {
  console.log("Error!invalid token on middleware");
  res.status(error.status).json(error.message);
});
const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`Server running on port ${port}`));
