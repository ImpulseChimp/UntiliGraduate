var displayText = [
    "am free",
    "can sleep",
    "have free time",
    "can relax",
    "can sleep in",
    "never have tests",
    "can make money",
    "can enjoy weekends",
    "can start life"
]
var textObject = $("#until-text");
var displaySeconds = 10000;
var clock;

$(document).ready(function() {

    textObject.textillate({ in: { loop: true, effect: 'rollIn' } });

	var clock;

    var now = new Date();
    var graduation = new Date(2015, 12, 16, 0, 0, 0);
    var msTillGraduation = graduation.getTime() - now.getTime();
    var secondsTillGraduation = msTillGraduation / 1000;

	clock = $('#countdown-clock').FlipClock(secondsTillGraduation, {
        clockFace: 'DailyCounter'
    });

    setInterval(function () {
        var newText = getNewDisplayText();
        swapUntilText(newText);
    }, displaySeconds);
		   
});

function swapUntilText(text) {
    textObject.unbind(); //Does not work yet
    textObject.textillate({ in: { loop: true, effect: 'rollIn' } }); //Does not work yet
    textObject.text(text);
}

function getNewDisplayText() {
    var randomVal = Math.floor(Math.random() * displayText.length);
    return displayText[randomVal];
}
