/* CONTENTS

mixing control

change what's showing

effects

*/

function onMIDIMessage(message) {
    data = message.data;
    // console.log('MIDI data', data);

    // Threshold for mixing - this show/hides screens
    if ( (data[0] === quneo.mainSlider[0]) && (data[1] === quneo.mainSlider[1]) ) {
      var bezierVal = data[2]/127;
      threshold = ( easing(bezierVal) )*volume;
      // console.log('midi:'+data[2]+'bezier:'+bezierVal+'threshold:'+threshold);
    }

    // what's showing
    // pad is pressed
    for (i=0; i<4; i++) {

      // if pad is pressed
      if ( (data[0] === quneo.pads[i][data[1]].onPress[0]) && (data[1] === quneo.pads[i][data[1]].onPress[1]) ) {

        set = sets[i];
        console.log("set "+set.name);
        var libraryName = '';
        var libraryItemNo = data[1];

        if (data[1]>31) {

          screenNo = 1;
          console.log("screen: "+screenNo);
          libraryItemNo = data[1]-32;

        } else {

          screenNo = 0;
          console.log("screen: "+screenNo);

        }

        libraryName = set.tracks[libraryItemNo];

        libraryTrack = library[libraryName];
        console.log('track: '+libraryTrack);

        // load correct set stuff
        if (libraryName !== '') {
          if (libraryTrack.type === 'video') {

            changeVidSrc(videoEls[screenNo], 'library/'+libraryTrack.file);

            showVideo(vidScreens[screenNo], domScreens[screenNo]);

            currentEls[screenNo] = videoEls[screenNo];
            screenDomFunc[screenNo] = clearRect;
            reqAnim();

            //set.name
          } else if (libraryTrack.type === 'dom') {

              // TO DO change freqResolutions array to new shapeCount for each function

              ctxs[screenNo].clearRect(0,0,screen.width,screen.height);
              showDom(vidScreens[screenNo], domScreens[screenNo]);
              
              currentEls[screenNo] = canvasEls[screenNo];
              screenDomFunc[screenNo] = libraryTrack.function;
              freqResolutions[screenNo] = libraryTrack.freqRes;
              reqAnim();  

              // var svg = d3.select(svgEls[screenNo]);
              // svg.selectAll('*').remove();
              
          
          }
        }// not '' track

      }// if pad

    }// for



    // effects

    // bank one is filters
    if ( data[0] === quneo.vertSliders.bankOne[0][0] ) {

      // switch over filter types
      let filterType = 'reset';

      switch(data[1]) {
        case quneo.vertSliders.bankOne[0][1]:
          filterType = 'invert';
          break;
        case quneo.vertSliders.bankOne[1][1]:
          filterType = 'grayscale';
          break;
        case quneo.vertSliders.bankOne[2][1]:
          filterType = 'hue';
          break;
        case quneo.vertSliders.bankOne[3][1]:
          filterType = 'blur';
          break;
        default:
          filterType = 'reset';
          break;
      }

      VizFX.filter(filterType, data[2]);

    }

    // bank two is transforms
    if ( data[0] === quneo.vertSliders.bankTwo[0][0] ) {

      // switch over filter types
      let transformType = 'reset';

      switch(data[1]) {
        case quneo.vertSliders.bankTwo[0][1]:
          transformType = 'zoom';
          break;
        case quneo.vertSliders.bankTwo[1][1]:
          transformType = 'transX';
          break;
        case quneo.vertSliders.bankTwo[2][1]:
          transformType = 'transY';
          break;
        case quneo.vertSliders.bankTwo[3][1]:
          transformType = 'rotate';
          break;
        default:
          transformType = 'reset';
          break;
      }

      VizFX.transform(transformType, data[2]);

    }

    // pause makes white fade in
    if ( (data[0] === quneo.pause.onPress[0])
     && (data[1] === quneo.pause.onPress[1])
     && (data[2] === quneo.pause.onPress[2])
      ) {

      VizFX.fade('white',1);
    }

    // stop makes black fade in
    if ( (data[0] === quneo.stop.onPress[0])
     && (data[1] === quneo.stop.onPress[1])
     && (data[2] === quneo.stop.onPress[2])
      ) {

      VizFX.fade('black',1);
    }

    // play starts again (shows)
    if ( (data[0] === quneo.play.onPress[0])
     && (data[1] === quneo.play.onPress[1])
     && (data[2] === quneo.play.onPress[2])
      ) {

      VizFX.fade('out',0);
    }

    

    return data;
}