var express= require("express");
var app=express();
const request = require('request');
const axios = require('axios');
var bodyParser= require('body-parser');
app.use(express.urlencoded({limit: '25mb'}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.static('webcam-easy-master/demo/style'))
app.use(express.static('webcam-easy-master/demo/js'))
app.use(express.static('webcam-easy-master/demo'))

app.use(express.static('webcam-easy-master/dist'))





//spotify api info
var client_id = '152283c2b29e468ea2d120fe8e6e6659'; // Your client id
var client_secret = '5ce28f20b265497db502a99f262cd7d3'; // Your secret




 async function  hitTheApi(mood, playlistId, res){
	 
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
		 for ( var i = 0; i < 2; i++) {
	var songName=  response["data"]["tracks"]["items"][i]["track"]["name"];
	var songArtist=  response["data"]["tracks"]["items"][i]["track"]["artists"][0]["name"];
			
			 
			 console.log(songName)
	 var		EndcodedsongName =   encodeURIComponent(songName.trim()) 
	   var 	EncodedsongArtist =  encodeURIComponent(songArtist.trim())


	
	await	axios({
          url: "https://www.googleapis.com/youtube/v3/search?q="+EndcodedsongName+ EncodedsongArtist+ "&type=video&key=AIzaSyA_UOn4yoN6-KteSrMeIZoSFwb-B9nQKHI",
        method: 'get',
   
      }).then(function (body2){				
			var data=  body2["data"];
	var songId=	 data["items"][0]["id"]["videoId"];
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


}






app.get('/calm',async function(req, res){
	
	hitTheApi("calm", "37i9dQZF1DXdPec7aLTmlC", res)

	

})

app.get('/sad', function(req, res){
	
		hitTheApi("sad", "37i9dQZF1DX7qK8ma5wgG1", res)



})

app.get('/',function(req, res){
	res.render("home.ejs");
})

app.get('/index',function(req, res){
	
	
	res.render("/workspace/wdb/webcam-easy-master/demo/index.html");
})

//////////////////////////////////////////////


app.post('/picture', function(req, res) {
var d=	req.body
	console.log("NAME:" +d.picture);
	res.redirect("/")
  
})





app.listen(3000, function(){
	console.log("listen here"); 
});