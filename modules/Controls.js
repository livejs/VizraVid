import quneo from './controllers.js';
import fx from './fx.js';
import createSets from '../library/library.js';

// I think this is going to do a whole heap of stuff, get MIDI, have FX functions, run them on input

const library = createSets(['space1', 'space2', 'space3', 'space4']);

class Controls {

	constructor(vidEls) {

		this.vids = vidEls;
		this.data = new Uint8Array(3);

		// abstract controls so buttons can change
		this.set_one = quneo.pads[0];
		this.set_two = quneo.pads[1];
		this.set_three = quneo.pads[2];
		this.set_four = quneo.pads[3];

		this.threshold = quneo.mainSlider;
		this.mixVal = 64;

		this.fade_one = quneo.horSliders[0];
		this.fade_two = quneo.horSliders[1];
		this.fade_three = quneo.horSliders[2];
		this.fade_four = quneo.horSliders[3];
		this.fadeColours = ['black', 'white', 'yellow', 'purple'],

		this.invert = quneo.vertSliders.bankOne[0];
		this.blur = quneo.vertSliders.bankOne[1];
		this.brightness = quneo.vertSliders.bankOne[2];
		this.contrast = quneo.vertSliders.bankOne[3];

		this.hue = quneo.vertSliders.bankTwo[0];
		this.grayscale = quneo.vertSliders.bankTwo[1];
		this.sepia = quneo.vertSliders.bankTwo[2];

		this.zoom = quneo.vertSliders.bankThree[0];
		this.rotate = quneo.vertSliders.bankThree[1];
		this.moveX = quneo.vertSliders.bankThree[2];
		this.moveY = quneo.vertSliders.bankThree[3];

		this.play = quneo.play;
		this.pause = quneo.pause;
		this.stop = quneo.stop;

		// this.sets = createSets(['logos', 'cartoons', 'games', 'dark']);
	}

	set sets(arrSetNames) {
		return createSets(arrSetNames);
	}

	// set mixVal(val) {
	// 	return val*2;
	// }

	// this is where all the magic happens
	_onMIDIMessage(message) {

		this.data = message.data;
		// console.log("%c"+this.data, 'background:violet; border: 2px solid turquoise; padding: 4px; color: black;');

		// OH GOD THIS IS HORRIBLE AGAIN - THERE IS N NICE WAY TO DO THIS!!!
		// switch over first value, then over second
		switch (this.data[0]) {

			// threshold
			case this.threshold[0]:
				// this.mixVal = () => {return this.data[2]*2};
				this.mixVal = this.data[2]*2;
				// console.log(this.data[2], this);
			break;

			// if set one
			case this.set_one[0].on[0]:
				// screen one
				if (this.data[1] < 32) {
					this.vids[0].src = 'library/'+library[0].vids[this.data[1]]
				} else { // screen two
					const vid = this.data[1]-32;
					this.vids[1].src = 'library/'+library[0].vids[vid]
				}
			break;
			// do nothing on off
			case this.set_one[0].off[0]:
			break;

			// if set two
			case this.set_two[0].on[0]:
			console.log(library[1]);
				// screen one
				if (this.data[1] < 32) {
					this.vids[0].src = 'library/'+library[1].vids[this.data[1]]
				} else { // screen two
					const vid = this.data[1]-32;
					this.vids[1].src = 'library/'+library[1].vids[vid]
				}
			break;
			// do nothing on off
			case this.set_two[0].off[0]:
			break;

			// if set three
			case this.set_three[0].on[0]:
				// screen one
				if (this.data[1] < 32) {
					this.vids[0].src = 'library/'+library[2].vids[this.data[1]]
				} else { // screen two
					const vid = this.data[1]-32;
					this.vids[1].src = 'library/'+library[2].vids[vid]
				}
			break;
			// do nothing on off
			case this.set_three[0].off[0]:
			break;

			// if set four
			case this.set_four[0].on[0]:
				// screen one
				if (this.data[1] < 32) {
					this.vids[0].src = 'library/'+library[3].vids[this.data[1]]
				} else { // screen two
					const vid = this.data[1]-32;
					this.vids[1].src = 'library/'+library[3].vids[vid]
				}
			break;
			// do nothing on off
			case this.set_four[0].off[0]:
			break;

			// filter one
			case this.invert[0]:

				switch (this.data[1]) {

					case this.invert[1]:
						fx.filter('invert', this.data[2])
					break;

					case this.blur[1]:
						fx.filter('blur', this.data[2])
					break;

					case this.contrast[1]:
						fx.filter('contrast', this.data[2])
					break;

					case this.brightness[1]:
						fx.filter('brightness', this.data[2])
					break;

					default:
						console.warn('filter one not working!')
				}
				break;

			// filter two
			case this.hue[0]:

				switch (this.data[1]) {

					case this.hue[1]:
						fx.filter('hue', this.data[2])
					break;

					case this.grayscale[1]:
						fx.filter('grayscale', this.data[2])
					break;

					case this.sepia[1]:
						fx.filter('sepia', this.data[2])
					break;

					default:
						console.warn('filter two not working!')
				}
				break;

			// transforms
			case this.zoom[0]:

				switch (this.data[1]) {

					case this.zoom[1]:
						fx.transform('zoom', this.data[2])
					break;

					case this.rotate[1]:
						fx.transform('rotate', this.data[2])
					break;

					case this.moveX[1]:
						fx.filter('transX', this.data[2])
					break;

					case this.moveY[1]:
						fx.filter('transY', this.data[2])
					break;

					 default:
					 	console.warn('transforms not working!')
				}
				break;

			// fades
			case this.fade_one[0]:

				switch (this.data[1]) {

					case this.fade_one[1]:
						fx.fade(this.fadeColours[0], this.data[2])
					break;

					case this.fade_two[1]:
						fx.fade(this.fadeColours[1], this.data[2])
					break;

					case this.fade_three[1]:
						fx.fade(this.fadeColours[2], this.data[2])
					break;

					case this.fade_four[1]:
						fx.fade(this.fadeColours[3], this.data[2])
					break;
				}
				break;

			default:
				console.warn('Somethings not working - so have fun Ruth')
				break;
		} // switch over first val

	}

	// get midi access
	init() {
		if (navigator.requestMIDIAccess) {
			navigator.requestMIDIAccess({
				sysex: false
			}).then(this._onMIDISuccess.bind(this), this._onMIDIFailure);
		} else {
			throw new Error('Your browser does not support the Web MIDI API: use Chrome');
		}
	}

	// run if successful access -> return midi data
	_onMIDISuccess(rawMIDIData) {
		const inputs = rawMIDIData.inputs.values();

		for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
			// each time there is a midi message call the onMIDIMessage function
			input.value.onmidimessage = this._onMIDIMessage.bind(this);
		}
	}

	// run if unsuccessful
	_onMIDIFailure() {
		throw new Error('Failed MIDI response, try unplugging & reconnecting your device');
	}


}

export default Controls;