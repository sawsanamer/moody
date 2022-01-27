let picture_name = "";

const detectEmotion = (req, res) => {

	const spawn = require("child_process").spawn;
	const pythonProcess = spawn('python', ["./emotion.py", picture_name]);

	pythonProcess.stdout.on('data', (emotion) => {
		res.json({ "emotion": emotion.toString().replace(/(\r\n|\n|\r)/gm, "") });
	});

}
const loadingEmotion = (req, res) => {
	picture_name = req.query.name;
	res.render("loading", { mood: "" });
}

const openCamera = (req, res) => {

	res.render("index.html");
}

const emotionUndetected = (req, res) => {
	res.render("error", { msg: "Error: Emotion undetected" })

}
module.exports = {
	detectEmotion: detectEmotion,
	loadingEmotion: loadingEmotion,
	openCamera: openCamera,
	emotionUndetected: emotionUndetected
}