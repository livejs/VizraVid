
function setProperty(prop, amount) {
	document.documentElement.style.setProperty(prop, amount);
}

// normalise amount 0-127
const fx = {

	filter: function(filter, amount) {
		switch (filter) {
      case 'invert':
        setProperty("--invert", amount+'%');
        break;
      case 'grayscale':
        setProperty("--gray", amount+'%');
        break;
      case 'contrast':
        setProperty("--contrast", amount/64);
        break;
      case 'brightness':
        setProperty("--bright", amount/64);
        break;
      case 'sepia':
        setProperty("--sepia", amount+'%');
        break;
      case 'hue':
        setProperty("--hue", amount*3+'deg');
        break;
      case 'blur':
        setProperty("--blur", amount/6+'px');
        break;
      default:
        setProperty("--invert", '0%');
        setProperty("--gray", '0%');
        setProperty("--hue", '0deg');
        setProperty("--blur", '0px');
        setProperty("--bright", '1');
        setProperty("--contrast", '1');
        setProperty("--sepia", '0%');
        break;
    }
	},

	transform: function(transform, amount) {
		switch (transform) {
      case 'zoom':
        setProperty("--zoom", amount/50);
        break;
      case 'transX':
        setProperty("--transX", amount*0.8+'vw');
        break;
      case 'transY':
        setProperty("--transY", amount*0.8+'vh');
        break;
      case 'rotate':
        setProperty("--rotate", amount/127+'turn');
        break;
      default:
        setProperty("--zoom", 1);
        setProperty("--transX", '0vw');
        setProperty("--transY", '0vh');
        setProperty("--rotate", '0turn');
        break;
    }
  },

  fade: function(colour, amount) {

    setProperty("--fadeCol", colour);
    setProperty("--fadeOp", amount/127);

  }

}

export default fx;