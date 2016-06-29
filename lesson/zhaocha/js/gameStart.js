$('.start').tap(function() {
	$('#content').show();
	init();
	$(this).unbind('tap')
})

function init() {
	game.play();
	game.count(function() {
		game.countTimer(15);
		game.lazyImg();
	});
	game.creatImg()
	game.click();
}

function next(id) {
	$('#allwin').removeClass('show');
	$(id).addClass('show');
}

$('#nextSub').on('tap', function() {
	$('#nextWindow').removeClass('show')
	game.again(15);
})

$('#again').on('tap', function() {
	$('.again').removeClass('show');
	game.again(15);
})

$('#post').on('tap', function() {
	$('#phone').removeClass('show')
})