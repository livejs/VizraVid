// set up audio context
var audioContext = window.AudioContext
// create audio class
const audioAPI = new audioContext();

// variables
var analyserNode,
    frequencyData = new Uint8Array(64);
const screen = document.querySelector('#screen');

// create an audio API analyser node and connect to source
function createAnalyserNode(audioSource) {
  analyserNode = audioAPI.createAnalyser();
  analyserNode.fftSize = 128;
  audioSource.connect(analyserNode);
}


function animate() {
  requestAnimationFrame(animate);
  analyserNode.getByteFrequencyData(frequencyData);
  // add some sudo beat detection here for music threshold
  const sudoBeat;
  animateTracks();
  mixScreens(MIDIthreshold, musicThreshold);
}

// getUserMedia success callback -> pipe audio stream into audio API
var gotStream = function(stream) {
  // Create an audio input from the stream.
  var audioSource = audioAPI.createMediaStreamSource(stream);
  createAnalyserNode(audioSource);
  animate();
}

// pipe in analysing to getUserMedia
navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then(gotStream);

function mixScreens(MIDIthreshold, musicThreshold) {
  const rightTrack = document.querySelector('.track_right')
  if (musicThreshold > MIDIthreshold) {
    rightTrack.style.opacity = '0';
  } else {
    rightTrack.style.opacity = '1';
  }
}


