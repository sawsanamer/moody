var express= require("express");
var app=express();
require('D:\\Desktop\\moody-master\\moody-master\\moody\\helpers\\api_methods.js')();

app.use(express.urlencoded({limit: '25mb'}));
app.engine('html', require('ejs').renderFile);
app.use(express.static("public"));
app.use(express.static('D:\\Desktop\\moody-master\\moody-master\\moody\\webcam-easy-master\\demo\\style'))
app.use(express.static('D:\\Desktop\\moody-master\\moody-master\\moody\\webcam-easy-master\\demo\\js'))
app.use(express.static('javascript'))
app.use(express.static('D:\\Desktop\\moody-master\\moody-master\\moody\\webcam-easy-master\\dist'))


var picture_name="";

app.get('/',function(req, res){
	res.render("home.ejs");
})
app.get('/home',function(req, res){
	res.render("home.ejs");
})


app.get('/calm',async function(req, res){
	
	 hitTheApi("calm.ejs", "37i9dQZF1DX1s9knjP51Oa", res)
	

})

app.get('/sad', function(req, res){
	
		hitTheApi("sad.ejs", "37i9dQZF1DX7qK8ma5wgG1", res)


})

app.get('/happy', function(req, res){
	
	 hitTheApi("happy.ejs", "37i9dQZF1DXdPec7aLTmlC", res)



})

app.get('/surprised', function(req, res){
	
hitTheApi("surprised.ejs", "6p21dRudS9FmcyGvKWPq2R", res)



})

app.get('/angry', function(req, res){
	
	hitTheApi("angry.ejs", "37i9dQZF1DX9qNs32fujYe", res)


})



app.get('/unsuccessful',function(req, res){
	res.render("unsuccessful.ejs");
})

app.get("/loading", function(req, res){
	res.render("loading.ejs")
})


app.get('/index',function(req, res){
	
	res.render("D:\\Desktop\\moody-master\\moody-master\\moody\\webcam-easy-master\\demo\\index.html");
})

//////////////////////////////////////////////


app.post('/picture', function(req, res) {

	const spawn = require("child_process").spawn;
const pythonProcess = spawn('python',["./emotion.py", picture_name]);

pythonProcess.stdout.on('data', (emotion) => {
console.log("FROM NODEE"+  emotion.toString().replace(/(\r\n|\n|\r)/gm,"")+ "P")
redirection(emotion.toString().replace(/(\r\n|\n|\r)/gm,""), res)
});
  
})


app.post("/loading", function(req, res){
	 picture_name=req.body.name;
	console.log("SDFAF "+ req.body.name)
	res.redirect("/loading")
	
	})


function redirection(emotion, res){
if (emotion=="sad"){
	res.redirect("/sad");
}
else if(emotion=="happy"){
	res.redirect("/happy");
}
else if(emotion=="neutral"){
	res.redirect("/calm");
}
else if(emotion=="surprise"){
	res.redirect("/surprised");
}
else if(emotion=="angry"){
	res.redirect("/angry");
}else{
	res.redirect("/unsuccessful");

}
}

app.listen(3002, function(){
	console.log("listen here"); 
});