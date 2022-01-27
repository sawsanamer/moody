
const apiMethods= require('../helpers/apiMethods.js')

const moodDetails = async (req, res) => {
	const { requestedMood } = req.params;
	const playlistID = {
		"calm": "37i9dQZF1DX1s9knjP51Oa",
		"sad": "37i9dQZF1DX7qK8ma5wgG1",
		"happy": "37i9dQZF1DWSf2RDTDayIx",
		"surprised": "6p21dRudS9FmcyGvKWPq2R",
		"angry": "37i9dQZF1DX9qNs32fujYe"
	};

	if (playlistID.hasOwnProperty(requestedMood))
	{
	let songData=await	apiMethods.getSongData( playlistID[requestedMood])

	res.render("mood", { songData, mood:requestedMood })

	}
		else
		res.redirect("/error");
}


const moodLoading = (req, res) => {
	const mood = req.query.mood;
	res.render(`loading`, { mood: mood });
}

module.exports = {
	moodDetails: moodDetails,
	moodLoading: moodLoading
}