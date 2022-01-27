

function sendToMoodPage(mood) {
    setTimeout(function () {
        window.location = `/mood/${mood}`;
    }, 500)
}

function detectEmotion() {
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', '/emotion/detect', true);
    req.onload = function () {
        let emotion = req.response['emotion'];
        const validEmotions = ['calm', 'happy', 'surprised', 'angry', 'sad']
        if (validEmotions.includes(emotion))
            window.location = `/mood/${emotion}`;
        else
            window.location = `/emotion/undetected`; //should redirect to unsuccesful page
    };
    req.send(null);

}

function redirectHome() {
    setTimeout(function () {
        window.location = "/";
    }, 2000)
}
