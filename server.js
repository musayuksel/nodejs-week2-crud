const { request, response } = require("express");
const express = require("express");
const albumsData = require("./data/albums.json");
const app = express();
app.use(express.json());
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

// 3.4) Add a New Album
app.post("/albums", (request, response) => {
  console.log(`request.body=>`, request.body);
  albumsData.push(request.body); // **We need to check if the data is secure.**
  response.send(albumsData);
});

// 3.5) Delete an album#
app.delete("/albums/:albumID", (request, response) => {
  const albumID = request.params.albumID;
  const albumIndex = albumsData.findIndex(
    (album) => album.albumId === albumID
  );
  if (albumIndex === -1) {
    return response
      .status(404)
      .send(` Album ID: ${albumID}  not found`);
  }
  albumsData.splice(albumIndex, 1);
  response.status(200).send({ success: true, albumsData });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
