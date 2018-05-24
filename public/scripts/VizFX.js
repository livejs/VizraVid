var VizFX = (function() {

  let vizFXMethods = {};


  // filter is string, default resets - flips between different filter types
  // amount set by control when called (0-127)
  vizFXMethods.filter = function(filter, amount) {
    switch (filter) {
      case 'invert':
        console.log('inverting');
        document.documentElement.style.setProperty("--invert", amount+'%');
        break;
      case 'grayscale':
        document.documentElement.style.setProperty("--grayscale", amount+'%');
        break;
      case 'hue':
        document.documentElement.style.setProperty("--hue", amount*3+'deg');
        break;
      case 'blur':
        document.documentElement.style.setProperty("--blur", amount/6+'px');
        break;
      default:
        document.documentElement.style.setProperty("--invert", '0%');
        document.documentElement.style.setProperty("--grayscale", '0%');
        document.documentElement.style.setProperty("--hue", '0deg');
        document.documentElement.style.setProperty("--blur", '0px');
        break;
    }

  }

  // transform flips between different transforms
  vizFXMethods.transform = function(transform, amount) {
    switch (transform) {
      case 'zoom':
        document.documentElement.style.setProperty("--zoom", amount/50);
        break;
      case 'transX':
        document.documentElement.style.setProperty("--transX", amount*0.8+'vw');
        break;
      case 'transY':
        document.documentElement.style.setProperty("--transY", amount*0.8+'vh');
        break;
      case 'rotate':
        document.documentElement.style.setProperty("--rotate", amount/127+'turn');
        break;
      default:
        document.documentElement.style.setProperty("--zoom", 1);
        document.documentElement.style.setProperty("--transX", '0vw');
        document.documentElement.style.setProperty("--transY", '0vh');
        document.documentElement.style.setProperty("--rotate", '0turn');
        break;
    }
  };



  // glitch


  // fade to black/white
  vizFXMethods.fade = function(type, amount) {
    if (type === 'white') {
      document.documentElement.style.setProperty("--whiteFade", amount);
      document.documentElement.style.setProperty("--blackFade", 0);
    } else if (type === 'black') {
      document.documentElement.style.setProperty("--blackFade", amount);
      document.documentElement.style.setProperty("--whiteFade", 0);
    } else {
      document.documentElement.style.setProperty("--blackFade", 0);
      document.documentElement.style.setProperty("--whiteFade", 0);
    }
  }

  return vizFXMethods;

})();




// tile

// symmetrysize



// chroma

// old film

// pixelation