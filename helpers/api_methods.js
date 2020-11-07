const axios = require('axios');
var bodyParser= require('body-parser');
//spotify api info
var client_id = '152283c2b29e468ea2d120fe8e6e6659'; // Your client id
var client_secret = '266fd9461b084a20882ab711cf64f49e'; // Your secret



module.exports = function() { 
 this.hitTheApi= async function  (mood, playlistId, res){
	 
	 var stringObject;


	await axios({
        url: 'https://accounts.spotify.com/api/token',
        method: 'post',
        params: {
          grant_type: 'client_credentials'
        },
        headers: {
          'Accept':'application/json',
          'Content-Type': 'application/x-www-form-urlencoded', 
			    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))

        },

      }).then( function (response) {

    // use the access token to access the Spotify Web API
    var token =  response["data"].access_token;	
 axios({
          url: 'https://api.spotify.com/v1/playlists/'+playlistId,
        method: 'get',
        headers: {
          'Accept':'application/json',
          'Content-Type': 'application/x-www-form-urlencoded', 
			   'Authorization': 'Bearer ' + token
        },
      }).then(async function  (response) {
		//for loop to get the names of the songs in the play list and the aritst from spotify
		 for ( var i = 0; i < 8; i++) {
	var songName=  response["data"]["tracks"]["items"][i]["track"]["name"];
	var songArtist=  response["data"]["tracks"]["items"][i]["track"]["artists"][0]["name"];
			
			 
			 console.log(songName)
	 var		EndcodedsongName =   encodeURIComponent(songName.trim()) 
	   var 	EncodedsongArtist =  encodeURIComponent(songArtist.trim())


	
	await	axios({
          url: "https://www.googleapis.com/youtube/v3/search?q="+EndcodedsongName+ EncodedsongArtist+ "&type=video&key=AIzaSyAmfT1NTEyO4ka1GK0EY9jQKVPuG9dOnsM",
        method: 'get',
   
      }).then(function (body2){			
          console.log("DADF"+typeof body2)	        
            console.log("DATAAAAAAaa"+body2["data"]["kind"])
	var songId=	 body2["data"]["items"][0]["id"]["videoId"];
			var videoUrl=  "https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D"+songId;
			
		if(stringObject==null){
			stringObject= "{'title':'"+EndcodedsongName+ "%20-%20"+EncodedsongArtist+"','url':'"+videoUrl+"'}";
		}
		else{
	stringObject=		stringObject.concat(",{'title':'"+EndcodedsongName+ "%20-%20"+EncodedsongArtist+"','url':'"+videoUrl+"'}")
			
		}		
			
		})
			
} 
	}).then(function () {
			console.log("DATA TO PASS: "+stringObject)
		res.render(mood, {songData: stringObject})

 });
}).catch((err) => console.log(err));;


}}