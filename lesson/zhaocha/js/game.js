Function.prototype.addMethod = function(name, fn) {
	this.prototype[name] = fn;
}

var game = (function() {
	var Game = function(option) {
		this.src = option.src;
		this.level = option.level;
		this.arr = getRandom(option.arr);
		this.round = option.round;
	};

	var timer = null;
	// 入场
	Game.addMethod('play', function() {
		$('#content').show();
		$('.play_box').addClass('hide')
		setTimeout(function() {
			$('.play_box').remove()
		}, 1000)
	})

	// 准备开始
	Game.addMethod('count', function(callback) {
		var i = 3;
		dialog(i);
		var timer = setInterval(function() {
			i--;
			if (i == 0) {
				i = 'GO';
				clearInterval(timer);
				setTimeout(function() {
					$('#bg').html('').removeClass('bgshow');
					callback();
				}, 500)
			}
			dialog(i);
		}, 1000)
	})

	// 15s倒计时
	Game.addMethod('countTimer', function(n) {
		$('.progress').addClass('curr')
		var d = $('.countTimer')[0];
		d.innerHTML = n;
		timer = setInterval(function() {
			n--;
			d.innerHTML = n;
			if (n == 0) {
				$('.again').addClass('show');
				clearInterval(timer);
				$('.progress').removeClass('curr')
			}
		}, 1000)
	})

	// 创建图片
	Game.addMethod('creatImg', function() {
		var arr = this.arr;
		var i = this.level - 1;
		$('#box').children().removeClass('curr').removeAttr('style')
		$('.imgbox').attr('id', arr[i]).find('.' + arr[i]).show();
		$('.imgbox').find('.img').remove();
		$('<img />').attr('src', this.src + arr[i] + '_1.png').addClass('img100 img').appendTo('.imgbox');
		
		$('#box').find('.img1').remove();	
		$('<img />').attr('src', this.src + arr[i] + '_2.png').addClass('img100 img1').prependTo('#box');

	})

	// 绑定点击事件
	Game.addMethod('click', function() {
		var that = this;
		$('#box').on('tap', function(e) {
			if (e.target.tagName.toLocaleLowerCase() == 'i') {
				$(e.target).addClass('curr');
				// win 事件
				win(that);
			} else {
				diaError();
			}
		}, false)
	})

	// 游戏重新开始
	Game.addMethod('again', function(time) {
		this.creatImg();
		this.countTimer(time)
		$('.round').text(this.round - this.level + 1)
	})

	// 弹出层
	function dialog(msg) {
		var html = "<p>" + msg + "</p>";
		$('#bg').html(html).addClass('bgshow');
	}

	// 数组随机排序
	function getRandom(arr) {
		arr.sort(function() {
			return (Math.random() * 100 << 2) % 3 - 1;
		})
		return arr;
	}

	// 错误弹窗
	function diaError() {
		$('#error').addClass('show');
		setTimeout(function() {
			$('#error').removeClass('show')
		}, 1000)
	}

	// win 事件
	function win(that) {
		if ($('[style]', '#box').length === $('.curr', '#box').length) {
			clearInterval(timer);
			$('.progress').removeClass('curr');
			if (that.level === 1) {
				that.level = that.round;
				setTimeout(function() {
					$('#allwin').addClass('show');
				}, 500)

			} else {
				that.level--;
				setTimeout(function() {
					$('#nextWindow').addClass('show')
					$('.level').text(that.level)
				}, 500)

			}
		}
	}

	return new Game({
		src: 'img/play/play_img_', // 图片地址 + 图片前缀,可为任意路径
		level: 5,
		arr: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o'],
		round: 5,
	});
}());