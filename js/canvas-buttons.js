var CanvasButtons = function (id) {
	"use strict";
	this._width = 300;
	this._height = 100;
	this._borderRadius = [0, 0, 0, 0];
	this._borderWidth = [0, 0, 0, 0];
	this._borderColor = [0, 0, 0, 0];
	this._gradientOn = false;
	this._gradientColorStop = [0, 0, 0, 0];
	this._backgroundColor = '#fff';

	if (this.canvas(id)) {
		console.log('Canvas buttons init complete!');
	} else {
		console.log('Canvas buttons could not init because specified canvas ID does not exist on page.');
	}
};

CanvasButtons.prototype.canvas = function (id) {
	"use strict";
	this._canvas = this._ctx = $('#' + id)[0];
	if (this._canvas) {
		this._ctx = this._canvas.getContext('2d');
	}

	if (this._ctx) { return true; } else { return false; }
};

CanvasButtons.prototype.width = function (val) {
	"use strict";
	this._width = val;
};

CanvasButtons.prototype.height = function (val) {
	"use strict";
	this._height = val;
};

CanvasButtons.prototype.borderRadius = function (val, position) {
	"use strict";
	if (typeof(position) == 'undefined') {
		this._borderRadius = [val, val, val, val];
	} else {
		this._borderRadius[position] = val;
	}
};

CanvasButtons.prototype.borderWidth = function (val, position) {
	"use strict";
	if (typeof(position) == 'undefined') {
		this._borderWidth = [val, val, val, val];
	} else {
		this._borderWidth[position] = val;
	}
};

CanvasButtons.prototype.borderColor = function (val, position) {
	"use strict";
	if (typeof(position) == 'undefined') {
		this._borderColor = [val, val, val, val];
	} else {
		this._borderColor[position] = val;
	}
};

CanvasButtons.prototype.gradientFrom = function (x, y) {
	"use strict";
	this._gradientFrom = [x, y];
	this._gradientOn = true;
};

CanvasButtons.prototype.gradientTo = function (x, y) {
	"use strict";
	this._gradientTo = [x, y];
	this._gradientOn = true;
};

CanvasButtons.prototype.gradientColorStop = function (val, position) {
	"use strict";
	if (typeof(position) == 'undefined') {
		this._gradientColorStop = [val, val, val, val];
	} else {
		this._gradientColorStop[position] = val;
	}
	this._gradientOn = true;
};

CanvasButtons.prototype.backgroundColor = function (val) {
	"use strict";
	this._backgroundColor = val;
};

CanvasButtons.prototype.render = function () {
	"use strict";
	var ctx = this._ctx;

	// Work out center of canvas element
	var center = [this._canvas.width / 2, this._canvas.height / 2];

	// Work out starting x and y cords of button
	var x = center[0] - this._width / 2;
	var y = center[1] - this._height / 2;

	// Translate the canvas to the starting position
	//ctx.translate(x, y);
	this._renderBackground(ctx, x, y);
	this._renderBorder(ctx, x, y);
};

CanvasButtons.prototype._renderBackground = function (ctx, x, y) {
	"use strict";
	if (this._backgroundColor) {
		var widthPad = 0;
		var heightPad = 0;

		ctx.save();
		ctx.beginPath();

		// Top border
		ctx.moveTo(x + this._borderRadius[0], y);
		ctx.lineTo(x + this._width - this._borderRadius[1], y);

		// Top-right corner
		ctx.arcTo(x + this._width, y, x + this._width, y + this._borderRadius[1], this._borderRadius[1]);

		// Right border
		ctx.lineTo(x + this._width, y + this._height - this._borderRadius[2]);

		// Bottom-right corner
		ctx.arcTo(x + this._width, y + this._height, x + this._width - this._borderRadius[2], y + this._height, this._borderRadius[2]);

		// Bottom border
		ctx.lineTo(x + this._borderRadius[3], y + this._height);

		// Bottom-left corner
		ctx.arcTo(x, y + this._height, x, y + this._height - this._borderRadius[3], this._borderRadius[3]);

		// Left border
		ctx.lineTo(x, y + this._borderRadius[0]);

		// Top-left corner
		ctx.arcTo(x, y, x + this._borderRadius[0], y, this._borderRadius[0]);

		ctx.clip();

		// If there is a background colour, paint it here
		if (this._backgroundColor) {
			ctx.fillStyle = this._backgroundColor;
			ctx.fillRect(x, y, this._width, this._height);
		}

		// If there is a background image, paint it here
		if (this._backgroundImage && this._backgroundImage != 'none') {
			ctx.drawImage(this._backgroundImage, x, y, this._backgroundImage.width, this._backgroundImage.height);
		}

		ctx.restore();
	}
};

CanvasButtons.prototype._renderBorder = function (ctx, x, y) {
	"use strict";
	var rad = Math.PI / 180;

	if (this._borderWidth[0] || this._borderWidth[1] || this._borderWidth[2] || this._borderWidth[3]) {
		y += (this._borderWidth[1] / 2);
		this._height -= (this._borderWidth[3]);

		x += (this._borderWidth[0] / 2);
		this._width -= (this._borderWidth[2]);
	}

	// Create the clipping path for the background
	if (this._borderWidth[1]) {
		// Top-left corner top-half
		ctx.strokeStyle = this.borderTopColor;
		ctx.lineWidth = this._borderWidth[1];

		ctx.beginPath();
		ctx.arc(x + this._borderRadius[0], y + this._borderRadius[0], this._borderRadius[0], 225 * rad, 270 * rad);
		ctx.stroke();

		// Top border
		ctx.beginPath();
		ctx.moveTo(x + this._borderRadius[0], y);
		ctx.lineTo(x + this._width - this._borderRadius[1], y);
		ctx.stroke();

		// Top-right corner top-half
		ctx.beginPath();
		ctx.arc(x + this._width - this._borderRadius[1], y + this._borderRadius[1], this._borderRadius[1], -90 * rad, -45 * rad);
		ctx.stroke();
	}

	if (this._borderWidth[2]) {
		// Top-right corner bottom-half
		ctx.strokeStyle = this.borderRightColor;
		ctx.lineWidth = this._borderWidth[2];

		ctx.beginPath();
		ctx.arc(x + this._width - this._borderRadius[1], y + this._borderRadius[1], this._borderRadius[1], -45 * rad, 0 * rad);
		ctx.stroke();

		// Right border
		ctx.beginPath();
		ctx.moveTo(x + this._width, y + this._borderRadius[1]);
		ctx.lineTo(x + this._width, y + this._height - this._borderRadius[2]);
		ctx.stroke();

		// Bottom-right corner top-half
		ctx.beginPath();
		ctx.arc(x + this._width - this._borderRadius[2], y + this._height - this._borderRadius[2], this._borderRadius[1], 0 * rad, 45 * rad);
		ctx.stroke();
	}

	if (this._borderWidth[3]) {
		// Bottom-right corner bottom-half
		ctx.strokeStyle = this.borderBottomColor;
		ctx.lineWidth = this._borderWidth[3];

		ctx.beginPath();
		ctx.arc(x + this._width - this._borderRadius[2], y + this._height - this._borderRadius[2], this._borderRadius[2], 45 * rad, 90 * rad);
		ctx.stroke();

		// Bottom border
		ctx.beginPath();
		ctx.moveTo(x + this._width - this._borderRadius[2], y + this._height);
		ctx.lineTo(x + this._borderRadius[3], y + this._height);
		ctx.stroke();

		// Bottom-left corner bottom-half
		ctx.beginPath();
		ctx.arc(x + this._borderRadius[3], y + this._height - this._borderRadius[3], this._borderRadius[3], 90 * rad, 135 * rad);
		ctx.stroke();
	}

	if (this._borderWidth[3]) {
		// Bottom-left corner top-half
		ctx.strokeStyle = this.borderLeftColor;
		ctx.lineWidth = this._borderWidth[0];

		ctx.beginPath();
		ctx.arc(x + this._borderRadius[3], y + this._height - this._borderRadius[3], this._borderRadius[3], 135 * rad, 180 * rad);
		ctx.stroke();

		// Left border
		ctx.beginPath();
		ctx.moveTo(x, y + this._height - this._borderRadius[3]);
		ctx.lineTo(x, y + this._borderRadius[0]);
		ctx.stroke();

		// Top-left corner bottom-half
		ctx.beginPath();
		ctx.arc(x + this._borderRadius[0], y + this._borderRadius[0], this._borderRadius[0], 180 * rad, 225 * rad);
		ctx.stroke();
	}
};