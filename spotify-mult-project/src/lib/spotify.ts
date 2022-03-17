import SpotifyWebApi from "spotify-web-api-node";

/* const scope = [
  "user-read-private",
  "user-read-email ",
  "playlist-read-private",
  "playlist-read-collaborative",
].join(","); */

const scope =
  "user-read-private user-read-email playlist-read-private playlist-read-collaborative user-library-read";

const params = {
  scope: scope,
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
  clientId: "bb1d8b641c7c4a84ab38d793f8fb11a4",
  clientSecret: "58cd9aeb47d642caa78f798bb1f5fec7",
});

export default spotifyApi;

export { LOGIN_URL };
