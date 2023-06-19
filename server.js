const express = require("express");
require("dotenv").config();
const booksrouter = require("./src/routes/booksRoute");
const loansrouter = require("./src/routes/loansRoute");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use( '/books',booksrouter);
app.use('/loans', loansrouter)





app.use(loansrouter);
app.listen(port, () => console.log(`Server running on port ${port}`));
