const axios = require('axios');
//spotify api info
let client_id = process.env.SPOTIFY_CLIENT_ID; //  client id
let client_secret = process.env.SPOTIFY_CLIENT_SECRET; // secret


const formatSongDataString = function (songId, songDataString, EndcodedsongName, EncodedsongArtist) {

  const videoUrl = "https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D" + songId;

  if (songDataString == "")
    songDataString = "{'title':'" + EndcodedsongName + "%20-%20" + EncodedsongArtist + "','url':'" + videoUrl + "'}";

  else
    songDataString = songDataString.concat(",{'title':'" + EndcodedsongName + "%20-%20" + EncodedsongArtist + "','url':'" + videoUrl + "'}")

  return songDataString;

}

const constructSongDataString = async function (response) {
  //for loop to get the names of the songs in the play list and the aritst from spotify

  let songDataString = "";
  for (let i = 0; i < 5; i++) {
    const songName = response["data"]["tracks"]["items"][i]["track"]["name"];
    const songArtist = response["data"]["tracks"]["items"][i]["track"]["artists"][0]["name"];

    const EndcodedsongName = encodeURIComponent(songName.trim())
    const EncodedsongArtist = encodeURIComponent(songArtist.trim())

    await axios({
      url: "https://www.googleapis.com/youtube/v3/search?q=" + EndcodedsongName + EncodedsongArtist + "&type=video&key=AIzaSyAmfT1NTEyO4ka1GK0EY9jQKVPuG9dOnsM",
      method: 'GET',

    }).then(async function (searchQueryResponse) {
      const songId = searchQueryResponse["data"]["items"][0]["id"]["videoId"];

      songDataString = formatSongDataString(songId, songDataString, EndcodedsongName, EncodedsongArtist)

    }).catch((err) => {
      songDataString = "error"
    })
    if (songDataString == "error")
      break;
  }
  return songDataString;

}



const getSpotifyPLaylist = async function (token, playlistId) {

  let playlist;

  // use the access token to access the Spotify Web API
  await axios({
    url: 'https://api.spotify.com/v1/playlists/' + playlistId,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + token
    },
  }).then(async function (response) {
    playlist = response

  }).catch((err) => { playlist = "error" })

  return playlist;

}


async function getSpotifyToken() {
  let token;
  await axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    params: {
      grant_type: 'client_credentials'
    },
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))

    },

  }).then((spotifyResponse) => {
    token = spotifyResponse["data"].access_token;

  }).catch((err) => {
    token = "error"
  })
  return token;
}

const getSongData = async function ( playlistId) {
  let songData = "", token, spoityfyPlaylistRes;
  token = await getSpotifyToken();
  if (token != "error"){
    spoityfyPlaylistRes = await getSpotifyPLaylist(token, playlistId)
  if (spoityfyPlaylistRes != "error")
    songData = await constructSongDataString(spoityfyPlaylistRes);
    }

  return songData!="error"?songData:"";
}


module.exports = {
  getSongData
}