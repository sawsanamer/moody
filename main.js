const express = require("express");
const app = express();
require('dotenv').config(); //for environment vars
const path = require('path');

const moodRoutes = require("./routes/moodRoutes")
const emotionRoutes = require("./routes/emotionRoutes")

app.use(express.urlencoded({ limit: '25mb' }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, './webcam-easy-master/demo/style')));
app.use(express.static(path.join(__dirname, './webcam-easy-master/demo/js')));
app.use(express.static(path.join(__dirname, './webcam-easy-master/dist')));

app.engine('html', require('ejs').renderFile);
app.set('views', [path.join(__dirname, '/views'), path.join(__dirname, '/webcam-easy-master/demo')]);
//__dirname refers to the directory name that main.js is located in
app.set("view engine", "ejs");

app.get('/', function (req, res) {
	res.render("home");
})
app.get('/home', function (req, res) {
	res.render("home");
})

app.use("/mood", moodRoutes);
app.use("/emotion", emotionRoutes);

app.get("*", function (req, res) {
	res.render("error", { msg: "Error: path does not exist" })

})

app.listen(process.env.PORT, function () {
	console.log("listeninig.");
});