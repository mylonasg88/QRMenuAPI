"use strict";

const express = require("express");
const app = express();
// const categoriesRoutes = require("./routes/categories.js")(app);

// App

//--- Routes
const categoriesRoutes = require("./routes/categories.js");
app.use("/categories", categoriesRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Constants
const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
