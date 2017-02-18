var midi, data = [0,0,0], threshold;
// request MIDI access
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, function() {console.log('MIDI failure')});
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

function onMIDIMessage(message) {
  data = message.data; // this gives us our [command/channel, note, velocity] data.
  console.log('MIDI data', data); // MIDI data [144, 63, 73]

}