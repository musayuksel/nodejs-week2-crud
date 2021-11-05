const { request, response } = require("express");
const express = require("express");
const albumsData = require("./data/albums.json");
const app = express();
const PORT = process.env.PORT || 3000;
//3.1) Get All Albums
app.get("/albums", (request, response) => {
  response.send(albumsData);
});

// 3.2) Get Album by ID
app.get("/albums/:albumID", (request, response) => {
  const albumID = request.params.albumID;
  const filteredAlbum = albumsData.filter(
    (album) => album.albumId === albumID
  );
  if (filteredAlbum.length === 0) {
    return response
      .status(404)
      .send(
        `We're sorry, we couldn't find the album you requested. Please check your Id :${albumID}`
      );
  }
  response.send(filteredAlbum);
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
