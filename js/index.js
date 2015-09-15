var clock;

$(document).ready(function() {
	var clock;

    var now = new Date();
    var graduation = new Date(2015, 12, 16, 0, 0, 0);
    var msTillGraduation = graduation.getTime() - now.getTime();
    var secondsTillGraduation = msTillGraduation / 1000;

	clock = $('#countdown-clock').FlipClock(secondsTillGraduation, {
        clockFace: 'DailyCounter'
    });
		   
});