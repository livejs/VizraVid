// get dom els
const screens = document.querySelectorAll('.screen'),
  vidScreens = document.querySelectorAll('.video'),
  domScreens = document.querySelectorAll('.dom'),
  videoEls = document.getElementsByTagName('video'),
  canvasEls = document.getElementsByTagName('canvas'),
  screen = {
    width: window.innerWidth,
    height: window.innerHeight,
    centerX: window.innerWidth/2,
    centerY: window.innerHeight/2,
    maxRadius: (window.innerHeight-(window.innerWidth/6))/2,
    minRadius: (window.innerHeight/10)/2
  };
console.log(videoEls);
// set up contexts
var ctxs = [];
function createContexts() {
  for (let i=0; i<canvasEls.length; i++) {
    canvasEls[i].width = screen.width;
    canvasEls[i].height = screen.height;
    var ctx = canvasEls[i].getContext('2d');
    ctxs.push(ctx);
  }
}
createContexts();

var currentEls = [canvasEls[0], canvasEls[1]];

// set sets & tracks
var set = sets[0],
  screenNo = 1,
  libraryTrack = library['thundercats'];

var screenDomFunc = [centerHeart, jsconfTextCenter],
  freqResolutions = [32,32];

// set mixing params - volumn is getting times by threshold - 2 is the max as the slider returns up to 127
var threshold = 127, volume = 2;
const easing = BezierEasing(0.01, 0.8, 0.8, 0.01);

// import { makeAnalyserNode } from './m_audio.js';

// audio api stuff
const audioCtx = new window.AudioContext;
const analyserSize = 1024;
let analyserNode = makeAnalyserNode(audioCtx, analyserSize*2);
// create an array for received analysis data to be stored
var receivedData = new Uint8Array(analyserSize);

// worker stuff
const analysisWorker = new Worker('scripts/workers/w_analyser.js');
// put message sending into a function, just to make sure it happens after we receive data...
function sendMessageToWorker() {
  analysisWorker.postMessage({'freqs': receivedData, 'count': analyserSize});
}

// set render after stream has started
function getStreamData() {

  // pipe in analysing to getUserMedia
  return navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(stream => audioCtx.createMediaStreamSource(stream))
    .then(source => {
      source.connect(analyserNode);
    });
}
getStreamData().then(render);

// run at 30 fps
let renderFrame = true;
const mixDataCount = 16;
let newFreqs = [];

// render function (all request animation frame stuff)
function render() {
  requestAnimationFrame(render);

  if (renderFrame) {
    renderFrame = false;

    // get frequency data
    analyserNode.getByteFrequencyData(receivedData);
    // console.log(receivedData);
    sendMessageToWorker();
    analysisWorker.onmessage = function(e) {
      newFreqs = e.data;
    }

    // mixing

    // for jsconf try just one returned val
    // if (newFreqs[16] > threshold)


    for (var i=0; i<mixDataCount; i++) {
      if (newFreqs[i] > threshold){
        if (i<(mixDataCount/2)) {
          screens[1].style.opacity = '1';
          screens[0].style.opacity = '0';
          screenDomFunc[1](1, newFreqs);
        } else {
          screens[1].style.opacity = '0';
          screens[0].style.opacity = '1';
          screenDomFunc[0](0, newFreqs);
        }
      }
    }//for

  } else {
    renderFrame = true;
  }

}

// once we've received the message back, show it so we know it's working
// const result = document.querySelector('#result');
// analysisWorker.onmessage = function(e) {
//   result.innerHTML = e.data;
// }

// ----------------MIDI SHIZZLE
var midi, data;
// request MIDI access
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    alert("No MIDI support in your browser.");
}

// midi functions
function onMIDISuccess(midiAccess) {
    // when we get a succesful response, run this code
    midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status

    var inputs = midi.inputs.values();
    // loop over all available inputs and listen for any MIDI input
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        // each time there is a midi message call the onMIDIMessage function
        input.value.onmidimessage = onMIDIMessage;
    }


}

function onMIDIFailure(error) {
    // when we get a failed response, run this code
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
}


// -------------------- original binpattern stuff
// ok so this doesn't return what we want - I kinda thought it when I was copying it - the bin amount gets too high, like the cut off is

// // We want to spread the analysis array out - to do this we have to make what is essentially a ... scale into a log one
// // Take the values we have a 'spread them out'
// // Return array of each new array bin count - we have the values set for the moment
// //---
// // If our original analyser size is 1024 items, this represents 20khz, we need about up to 8-10 for music - let's go with half for now
// const cutoff = 512;
// const finalSize = 64; // final size of new array
// const binPattern = (function(inAmount, target) {
//   let val = 1, step = 1, result;
//   // work out whether finalSize will fit into original array or not
//   while (result != finalSize) {
//     result = getBins(val).length;
//     if (result < finalSize) {
//       step = step / 2;
//       val -= step;
//     } else if (result > finalSize) {
//       val += step;
//     }
//   }// while

//   function getBins(k) {
//     const a = []; // array to return
//     // I don't know what i is or why we need it
//     let t = 0, i = 0; // t is orig array item
//     while (t < cutoff) {
//       t += Math.pow(2, k * i++);
//       a.push((a[a.length - 1] || 0) + Math.round(Math.pow(2, k * i++)));
//     }
//     return a;
//   }

//   return getBins(val);
// }(cutoff, finalSize))
// console.log(binPattern)



