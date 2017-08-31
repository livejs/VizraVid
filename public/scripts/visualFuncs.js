// SCREENS ~~~~~~~~~~~~~~~~~~~~~~~~~~
var mixScreens = function mixScreens() {
  // console.log('Threshold for mix: ' + threshold);
  requestAnimationFrame(mixScreens);
  //constantly getting feedback from data
  analyserNode.getByteFrequencyData(frequencyData);

  for (var i=0; i<49; i++) {
    var freqDataKey = i*8;
    if (frequencyData[freqDataKey] > threshold){
      if (i<10) {
        screens[1].style.opacity = '1';
      } else {
        screens[1].style.opacity = '0';
      }
    }
  }
}


// VIDEOS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var changeVidSrc = function changeVidSrc(videoEl, newSrc) {
  videoEl.src = newSrc;
}


// hideing/showing vid css
var showVideo = function showVideo(vidEl, domEl) {
  vidEl.style.display = "block"
  domEl.style.display = "none"
}
var showDom = function showDom(vidEl, domEl) {
  domEl.style.display = "block"
  vidEl.style.display = "none"
}


// only call request animation frame on function you actually want to run
function reqAnim() {
  requestAnimationFrame(reqAnim);

  screenDomFunc[1](1);
  screenDomFunc[0](0);

  var freqs = adjustFreqData(12);
  var mixData = freqs.newFreqs;

  // if ( (d3.quantile(mixData, 0.75)) > 110 ) {
  //   videoEls[0].style.filter = 'invert(100%)';
  //   videoEls[1].style.filter = 'invert(100%)';
  //   svgEls[0].style.backgroundColor = 'white';
  //   svgEls[1].style.backgroundColor = 'white';
  // } else {
  //   videoEls[0].style.filter = 'invert(0%) contrast(120%) brightness(120%)';
  //   videoEls[1].style.filter = 'invert(0%) contrast(120%) brightness(120%)';
  //   svgEls[0].style.backgroundColor = 'transparent';
  //   svgEls[1].style.backgroundColor = 'transparent';
  // }

  for (var i=0; i<12; i++) {
    if (mixData[i] > threshold){
      if (i<6) {
        screens[1].style.opacity = '1';
        screens[0].style.opacity = '0';
        // screenDomFunc[1](1);
      } else {
        screens[1].style.opacity = '0';
        screens[0].style.opacity = '1';
        // screenDomFunc[0](0);
      }
    }
  }
  
}

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

function centreCirc1(ctx) {
  ctxs[ctx].fillStyle = "#000";
  ctxs[ctx].fillRect(0,0,screen.width,screen.height);

  var frequencies = adjustFreqData(32);
  var newData = frequencies.newFreqs;

  for(var i=0;i<newData.length;i++) {
    var d = newData[i];
    var transparency = d/200;

    ctxs[ctx].strokeStyle = "hsla("+Math.round( i*(20+(d/255)) )+",50%,80%,"+transparency+")";
    // ctxs[ctx].fillStyle = "hsla("+Math.round( i*(20+(d/255)) )+",50%,80%,"+transparency+")";
    ctxs[ctx].globalCompositeOperation = "hard-light";
    ctxs[ctx].beginPath();
    ctxs[ctx].lineWidth = 15;
    ctxs[ctx].arc(screen.centerX, screen.centerY, i*24, 0, Math.PI*2);
    ctxs[ctx].stroke();

  }

}

function centreCirc2(ctx) {
  ctxs[ctx].fillStyle = "#000";
  ctxs[ctx].fillRect(0,0,screen.width, screen.height);

  var frequencies = adjustFreqData(8);
  var newData = frequencies.newFreqs;

  for(var i=0;i<newData.length;i++) {
    var d = newData[i];
    var transparency = d/200;

    ctxs[ctx].strokeStyle = "hsla("+Math.round( i*(20+(d/255)) )+",50%,80%,"+transparency+")";
    ctxs[ctx].fillStyle = "hsla("+Math.round( i*(20+(d/255)) )+",50%,80%,"+transparency+")";
    ctxs[ctx].globalCompositeOperation = "hard-light";
    ctxs[ctx].beginPath();
    ctxs[ctx].lineWidth = 15;
    ctxs[ctx].arc(screen.centerX, screen.centerY, i*64, 0, Math.PI*2);
    ctxs[ctx].fill();
    ctxs[ctx].stroke();

  }

}
