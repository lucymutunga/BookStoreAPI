const express = require("express");
require("dotenv").config();
const booksrouter = require("./src/routes/booksRoute");
const loansrouter = require("./src/routes/loansRoute");
const membersrouter = require("./src/routes/membersRoutes.js");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/books", booksrouter);
app.use("/loans", loansrouter);
app.use("/members", membersrouter);

//const { user } = require('./src/config/config.js');

const port = process.env.PORT || 3030;

app.use(loansrouter);
app.listen(port, () => console.log(`Server running on port ${port}`));
