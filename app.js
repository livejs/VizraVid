console.clear();

import Vis from './modules/Vis.js';
import Controls from './modules/Controls.js';

// setup
// TODO library setup should be here
const vids = document.querySelectorAll('video');


const vizraVid = {

	// get vids() { return document.querySelectorAll('video') },

	// 🤷🏻‍♀️
	src: ['library/logos/livejs/ljstitle.mp4', 'library/logos/livejs/ljstitle.mp4'],

	vis: new Vis(16),

	controls: new Controls(vids),

	start: function() {
		this.controls.init();
		this.vis.start();
		console.log(this.src);
		vids.forEach((el, i) => {
			el.play();
			el.src = this.src[i];
		});
	}

}

// go
// const vis = new Vis(16);

vizraVid.vis.draw = function() {

	// console.log("%c"+"mixVal: "+vizraVid.controls.mixVal, 'background:turquoise; border: 2px solid violet; padding: 4px; color: black;');

	if (vizraVid.vis.frequencies[2] > vizraVid.controls.mixVal) {

		vids[1].style.opacity = 0;
	} else {
		vids[1].style.opacity = 1;
	}

}

// resume/start on user gesture
window.addEventListener("keydown", event => {
	if (event.code === 'KeyR') {
		vizraVid.start();
	}
})
