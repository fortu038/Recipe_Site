const express = require("express");
const path = require("path");
const db = require("./config/connection");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit: "10mb"}));


app.use(express.static(path.join(__dirname, "../client/build")));
app.use(routes);
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});



db.once("open", () => {
  app.listen(PORT, () => console.log(`Now listening on localhost: ${PORT}`));
});