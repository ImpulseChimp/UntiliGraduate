$(function() {

    var settingsPopup = $('#settings-popup');
    if(!navigator.cookieEnabled) {
        settingsPopup = $('#enable-cookies-popup');
    }

    $('#github-link').avgrund({
        height: 500,
        width: 600,
        holderClass: 'custom',
        showClose: true,
        showCloseText: 'close',
        onBlurContainer: '#page-container',
        template: settingsPopup,
        onLoad: function() { settingsPopup.show(); },
        onUnload: function() { settingsPopup.hide(); }
    });

    $('#countdown-date').pickadate();

});

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
    var graduation = new Date(2015, 11, 18, 0, 0, 0);
    var msTillGraduation = graduation.getTime() - now.getTime();
    var secondsTillGraduation = msTillGraduation / 1000;

    clock = $('#countdown-clock').FlipClock(secondsTillGraduation, {
        clockFace: 'DailyCounter',
        countdown: true
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

