import SpotifyWebApi from "spotify-web-api-node";

/* const scope = [
  "user-read-private",
  "user-read-email ",
  "playlist-read-private",
  "playlist-read-collaborative",
].join(","); */

const scope = "user-read-private user-read-email playlist-read-private playlist-read-collaborative user-library-read"

const params = {
  scope: scope,
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default spotifyApi;

export { LOGIN_URL };
