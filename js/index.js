var textObject = $("#until-text");
var displaySeconds = 10000;
var clock;
var displayText = [
    "am free",
    "can sleep",
    "have free time",
    "can relax",
    "can sleep in",
    "can make money",
    "can start life"
]

$(function() {

    setCookieValuesIfPossible();

    var popupWidth = 600;
    var popupHeight = 250;

    var settingsPopup = $('#settings-popup');
    if(!navigator.cookieEnabled) {
        settingsPopup = $('#enable-cookies-popup');
        popupWidth = 400;
        popupHeight = 300;
    }

    $('#settings-link').avgrund({
        height: popupHeight,
        width: popupWidth,
        holderClass: 'custom',
        showClose: true,
        showCloseText: 'close',
        onBlurContainer: '#page-container',
        template: settingsPopup,
        onLoad: function() { settingsPopup.show(); },
        onUnload: function() { settingsPopup.hide(); }
    });

    $('#custom-grad-date-input').pickadate();
    $('.tiltshift').tiltShift();

    textObject.textillate({ in: { loop: true, effect: 'rollIn' } });

    setInterval(function () {
        var newText = getNewDisplayText();
        swapUntilText(newText);
    }, displaySeconds);

});

$("#save-settings").on("click", function() {
    var time = $('#custom-grad-date-input').pickadate('get', 'highlight');
    var custom_date = $('#custom-grad-date-input').pickadate('get');

    alert("Highlight: " + custom_date);

    setCookie("uig_custom_background", $("#custom-background-input").val(), 10000000);
    setCookie("uig_countdown_date", custom_date, 10000000);
    setCookie("uig_countdown_year", time.year, 10000000);
    setCookie("uig_countdown_month", time.month, 10000000);
    setCookie("uig_countdown_day", time.day, 10000000);

    alert("INITIAL: " + time.year + ' ' + time.month + ' ' + time.day);

    setCookieValuesIfPossible();
});

function setCookieValuesIfPossible() {
    var countdown_date = getCookie("uig_countdown_date");
    var custom_background = getCookie("uig_custom_background");
    var year = getCookie("uig_countdown_year");
    var month = getCookie("uig_countdown_month");
    var day = getCookie("uig_countdown_day");

    if(custom_background.length > 0) {
        setSiteBackground(custom_background);
        $("#custom-background-input").val(custom_background);
    }
    else {
        setSiteBackground("assets/index_background.jpg");
    }

    if(countdown_date.length > 0) {
        setCountdownClock(year, month, day);
        var input = $('#custom-grad-date-input').pickadate();
        var picker = input.pickadate('picker');
        picker.set('select', [year, month, day]);
    }
    else {
        setCountdownClock(2015, 11, 18);
        var input = $('#custom-grad-date-input').pickadate();
        var picker = input.pickadate('picker');
        picker.set('select', [2015, 11, 18]);
    }
}


function setSiteBackground(background_url) {
    $('#page-container').css('background-image', 'url("' + background_url + '")');
}

function setCountdownClock(year, month, day) {
    var now = new Date();
    var graduation = new Date(year, month, day, 0, 0, 0);
    var msTillGraduation = graduation.getTime() - now.getTime();
    var secondsTillGraduation = msTillGraduation / 1000;

    clock = $('#countdown-clock').FlipClock(secondsTillGraduation, {
        clockFace: 'DailyCounter',
        countdown: true
    });
}

function swapUntilText(text) {
    textObject.unbind(); //Does not work yet
    textObject.textillate({ in: { loop: true, effect: 'rollIn' } }); //Does not work yet
    textObject.text(text);
}

function getNewDisplayText() {
    var randomVal = Math.floor(Math.random() * displayText.length);
    return displayText[randomVal];
}

/*
 * http://www.w3schools.com/js/js_cookies.asp
 */
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "max-age="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
