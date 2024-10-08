// All the respective spritesheets ../grafx2/export/*.png 
// converted to RLE sprites using https://github.com/smiley405/RLE-sprite-editor
// using copy-as-an-Object button
// follow https://github.com/smiley405/RLE-sprite-editor on how to use

export const PLAYER_IDLE = {
	w: 8,
	h: 8,
	frames: '$21A2$6A2$3B3A1$4B3A1$4B3A1$3A5$2|$26B3$5B3A2$3B3A2$3A4$3A5$2',
	palette: {'A':'#ffcd75','B':'#b13e53'},
	fps: 5
};

export const PLAYER_RUN = {
	w: 8,
	h: 8,
	frames: '$27A3$5A3B2$2A4B2$2A1B4$2B5$2|$22B2$4A2B2$2A4B1$3A4B1$3A4B1$1B7$1|$26A4$4A3B2$3A3B2$3A3B1$3B5$2|$21B2$6B2$3A3B1$4A3B1$4A3B1$4B4$2',
	palette: {'A':'#b13e53','B':'#ffcd75'},
	fps: 8
};

export const PLAYER_JUMP = {
	w: 8,
	h: 8,
	frames: '$13A2$6A2$6A2$3B3A1$4B3A1$4B3A1$4B3$3',
	palette: {'A':'#ffcd75','B':'#b13e53'},
	fps: 1
};

export const PLAYER_FALL = {
	w: 8,
	h: 8,
	frames: '$18A3$5A3B2$3A3B2$3A3B1$6B2$6B2$2',
	palette: {'A':'#b13e53','B':'#ffcd75'},
	fps: 1
};

export const PLAYER_HURT = {
	w: 8,
	h: 8,
	frames: '$11A2$6A2$7B1A1$4B3A1$4B3A1$4B3A1$7A2$1',
	palette: {'A':'#ffcd75','B':'#b13e53'},
	fps: 1
};

export const PLAYER_THROW = {
	w: 8,
	h: 8,
	frames: '$20A2$3B3A1C1$3B3A2$3B3A1$5A3$5A3$3|$13A3$5A1C2$2B3A1$4B3A1$4B3A1C2$2B3A3$1A5$2',
	palette: {'A':'#ffcd75','B':'#b13e53','C':'#ef7d57'},
	fps: 8
};

export const PLAYER_SHOOT_LASER = {
	w: 8,
	h: 8,
	frames: '$20A2$3B3A1C1$3B3A2$3B3A1$5A3$5A3$3|$20A2$3B3A1C1$3B3A2$3B3A1$5A3$5A3$3|$13A3$5A1C2$2B3A1$4B3A1$4B3A1C2$2B3A3$1A5$2|$13A3$5A1C2$2B3A1$4B3A1$4B3A1C2$2B3A3$1A5$2|$20A2$3B3A1C1$3B3A2$3B3A1$5A3$5A3$3|$13A3$5A1C2$2B3A1$4B3A1$4B3A1C2$2B3A3$1A5$2|$20A2$3B3A1C1$3B3A2$3B3A1$5A3$5A3$3|$13A3$5A1C2$2B3A1$4B3A1$4B3A1C2$2B3A3$1A5$2|$13A3$5A1C2$2B3A1$4B3A1$4B3A1C2$2B3A3$1A5$2',
	palette: {'A':'#ffcd75','B':'#b13e53','C':'#ef7d57'},
	fps: 12
};



