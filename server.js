const express = require("express");
require("dotenv").config();
const router = require("./src/routes/booksRoute");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use('/', router);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
