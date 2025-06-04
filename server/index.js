const express = require("express");
const app = express();
app.listen(3000, () => {
  console.log("Server up and running...");
});

app.get("/", (req, res) => {
  res.send("Hello from Baba Express");
});
