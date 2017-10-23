function GameOfLiveCanvas(canvasId, cols, rows, options) {
	function mergeOptions(obj1, obj2) {
		var obj3 = {};
		for ( var attrname in obj1) {
			obj3[attrname] = obj1[attrname];
		}
		for ( var attrname in obj2) {
			obj3[attrname] = obj2[attrname];
		}
		return obj3;
	}
	var canvasId = canvasId;
	var defaultOptions = {
		size : 5,
		colorDead : '#dddddd',
		colorAlive : '#000000',
		figure : 'rect'
	}

	var alive = [];

	var options = mergeOptions(defaultOptions, options);
	var that = this;

	var canvas = document.getElementById(canvasId);
	canvas.width = cols * (options.size + 1);
	canvas.height = rows * (options.size + 1);

	var canvasWidth = canvas.width;
	var canvasHeight = canvas.height;
	var canvasLeft = canvas.offsetLeft;
	var canvasTop = canvas.offsetTop;
	var ctx = canvas.getContext("2d");
	var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

	canvas.addEventListener('click', function(e) {
		var x;
		var y;
		if (e.pageX || e.pageY) {
			x = e.pageX;
			y = e.pageY;
		} else {
			x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		x -= canvas.offsetLeft;
		y -= canvas.offsetTop;
		x = x / (canvas.width / cols);
		y = y / (canvas.height / rows);
		x = Math.floor(x);
		y = Math.floor(y);

        const cell = that.getAlive().find(xy => xy[0] === x && xy[1] === y);

            if (cell) {
                that.dead(x,y)
                alive = alive.filter(xy => xy !== cell);
            } else {
                that.alive(x,y)
            }

	}, false);

	// Private
	drawPoint = function(x, y, color) {
		if (x == 0) {
			dx = 0;
		} else {
			dx = x * options.size + x;
		}

		if (y == 0) {
			dy = 0;
		} else {
			dy = y * options.size + y;
		}

		ctx.beginPath();

		if (options.figure == "arc") {
			ctx.arc(dx + options.size / 2, dy + options.size / 2, options.size / 2, 0, 2 * Math.PI);
		} else {
			ctx.rect(dx, dy, options.size, options.size);
		}
		ctx.fillStyle = color;
		ctx.fill();
	}

	this.getAlive = function() {
		return alive;
	}

	// Public
	this.alive = function(x, y) {
		alive.push([x,y]);
		drawPoint(x, y, options.colorAlive)
	}
	// Public
	this.dead = function(x, y) {
	    alive.slice([x,y]);
		drawPoint(x, y, options.colorDead)
	}
	// Public
	this.clear = function() {
		alive = [];
		for (x = 0; x <= cols; x++) {
			for (y = 0; y <= rows; y++) {
				this.dead(x, y);
			}
		}
	}

	this.clear();
}