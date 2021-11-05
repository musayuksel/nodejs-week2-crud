const express = require("express");
const albumsData = require("./data/albums.json");
const app = express();
const PORT = process.env.PORT || 3000;
//3.1) Get All Albums
app.get("/albums", (request, response) => {
  response.send(albumsData);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
