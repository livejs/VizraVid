// get dom els
const blackEl = document.getElementById('black'),
  whiteEl = document.getElementById('white'),
  screens = document.getElementsByClassName('screen'),
  vidScreens = document.getElementsByClassName('video'),
  domScreens = document.getElementsByClassName('dom'),
  videoEls = document.getElementsByTagName('video'),
  svgEls = document.getElementsByTagName('svg'),
  canvasEls = document.getElementsByTagName('canvas'),
  screen = {
    width: window.innerWidth,
    height: window.innerHeight,
    centerX: window.innerWidth/2,
    centerY: window.innerHeight/2,
    maxRadius: (window.innerHeight-(window.innerWidth/6))/2,
    minRadius: (window.innerHeight/10)/2
  };
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

var screenDomFunc = [centreCirc1, centreCirc2],
  freqResolutions = [32,8];

// set mixing params
var threshold = 100, volume = 130;
const easing = BezierEasing(0.01, 0.8, 0.8, 0.01);

// audio api stuff
const audioApi = new window.AudioContext;

// vars
var audioBuffer,
    analyserNode,
    frequencyData = new Uint8Array(4096);

analyserNode = audioApi.createAnalyser();
analyserNode.fftSize = 8192;

// set up worker for re-analysis
// var w_analyser = new Worker('scripts/workers/w_analyser.js');
// w_analyser.postMessage({'freqs': frequencyData, 'newCounts': freqResolutions});

// w_analyser.onmessage = function(data) {
//   console.log(newAr);
// }


// only call request animation frame on function you actually want to run
function reqAnim() {
  requestAnimationFrame(reqAnim);

  // returns .newFreqsOne, newFreqsTwo, .mixFreqs, lowFreqs, midFreqs, highFreqs
  const mixDataCount = 12;
  var freqs = adjustFreqData(freqResolutions, mixDataCount);

  screenDomFunc[1](1, freqs.newFreqsTwo);
  screenDomFunc[0](0, freqs.newFreqsOne);

  // mixing
  for (var i=0; i<mixDataCount; i++) {
    if (freqs.mixFreqs[i] > threshold){
      if (i<(mixDataCount/2)) {
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

// pass in arr of shape count for both canvas functions
function adjustFreqData(freqResolutions, mixArrCount) {
  analyserNode.getByteFrequencyData(frequencyData);
  var removed = frequencyData.slice(0,1024);
  
  var newFreqsOne = [], newFreqsTwo = [], mixFreqs = [], lowFreqs, midFreqs, highFreqs;

  function returnNewArr(newCount) {

    // set up the maxPow & thus ratio based on newCount
    var maxPow = Math.pow(2,newCount/2);
    var ratio = 1024/maxPow;
    var prevRangeStart = 0, prevItemCount = 0, newArr = [];

    // looping - get values for new array based on shapeCount
    for (let j=1; j<newCount+1; j++) {
      var itemCount, rangeStart;

      var pow = j/2;

      // use ratio to get itemCount (round)
      itemCount = Math.ceil( ((Math.pow(2, pow))*ratio)/2 );

      rangeStart = prevRangeStart + Math.ceil(prevItemCount/2);
       // get new values
      var newValue = 0, total = 0;
      for (let k=rangeStart; k<rangeStart+itemCount; k++) {
        // add up items and divide by total
        total += frequencyData[k];
        newValue = parseInt(total/itemCount);
      }
      // add to new array
      newArr.push(newValue);

      prevItemCount = itemCount;
      prevRangeStart = rangeStart;

    }

    return newArr;

  } // returnNewArr

  newFreqsOne = returnNewArr(freqResolutions[0]);
  newFreqsTwo = returnNewArr(freqResolutions[1]);
  mixFreqs = returnNewArr(mixArrCount);

  // low mid high
  var oneThird = Math.floor(1024/3);

  function avFreqs(arrPart) {
    var arrPart = arrPart;
    var avValue;
    var totalVal = 0;
    for (let l=0; l<arrPart.length; l++) {
      totalVal += arrPart[l];
    }
    avValue = Math.floor(totalVal/arrPart.length);
    return avValue;
  } // avfreqs

  lowFreqs = avFreqs(frequencyData.slice(0,oneThird));
  midFreqs = avFreqs(frequencyData.slice(oneThird, oneThird*2));
  highFreqs = avFreqs(frequencyData.slice(oneThird*2));
  
  return {
    newFreqsOne: newFreqsOne,
    newFreqsTwo: newFreqsTwo,
    mixFreqs: mixFreqs,

    lowFreqs: lowFreqs,
    midFreqs: midFreqs,
    highFreqs: highFreqs
  };
}

// create an audio API analyser node and connect to source
function createAnalyserNode(audioSource) {
  audioSource.connect(analyserNode);
}


// getUserMedia success callback -> pipe audio stream into audio API
function gotStream(stream) {
    // Create an audio input from the stream.
    console.log('got stream');
    var audioSource = audioApi.createMediaStreamSource(stream);
    createAnalyserNode(audioSource);
    reqAnim();
}

// pipe in analysing to getUserMedia
navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then(gotStream);

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