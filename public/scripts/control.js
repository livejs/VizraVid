
function onMIDIMessage(message) {
    data = message.data;
    console.log('MIDI data', data);

    // Threshold for mixing - this show/hides screens
    if ( (data[0] === quneo.mainSlider[0]) && (data[1] === quneo.mainSlider[1]) ) {
      var bezierVal = data[2]/127;
      threshold = ( easing(bezierVal) )*240
      // console.log('midi:'+data[2]+'bezier:'+bezierVal+'threshold:'+threshold);
      console.log(data[2],bezierVal,threshold);
    }

    // new control

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


              ctxs[screenNo].clearRect(0,0,screen.width,screen.height);
              showDom(vidScreens[screenNo], domScreens[screenNo]);
              
              currentEls[screenNo] = canvasEls[screenNo];
              screenDomFunc[screenNo] = libraryTrack.function;
              reqAnim();  

              // var svg = d3.select(svgEls[screenNo]);
              // svg.selectAll('*').remove();
              
          
          }
        }// not '' track

      }// if pad

    }// for



    // effects

    // black on
    if ( (data[0] === quneo.arrows[0].left.onPress[0]) && (data[1] === quneo.arrows[0].left.onPress[1]) ) {

      blackEl.style.opacity = 1;

    // black off
    } else if ( (data[0] === quneo.arrows[0].left.onRelease[0]) && (data[1] === quneo.arrows[0].left.onRelease[1]) ) {

      blackEl.style.opacity = 0;

    }

    // white on
    if ( (data[0] === quneo.arrows[0].right.onPress[0]) && (data[1] === quneo.arrows[0].right.onPress[1]) ) {

      whiteEl.style.opacity = 1;

    // white off
    } else if ( (data[0] === quneo.arrows[0].right.onRelease[0]) && (data[1] === quneo.arrows[0].right.onRelease[1]) ) {

      whiteEl.style.opacity = 0;

    }

    // invert on
    if ( (data[0] === quneo.arrows[1].left.onPress[0]) && (data[1] === quneo.arrows[1].left.onPress[1]) ) {

      for (i=0; i<currentEls.length; i++) {
        currentEls[i].style.webkitFilter = "invert(100%)";
      }

    // invert off
    } else if ( (data[0] === quneo.arrows[1].left.onRelease[0]) && (data[1] === quneo.arrows[1].left.onRelease[1]) ) {

      for (i=0; i<currentEls.length; i++) {
        currentEls[i].style.webkitFilter = "invert(0%)";
      }

    }

    // // invert
    // if ( (data[0] === minim.top[2].onPress[0]) && (data[1] === minim.top[2].onPress[1]) ) {

    //   if ( data[2] === minim.top[2].onPress[2] ) {
    //     videoEls[0].style.webkitFilter = "invert(100%)";
    //     videoEls[1].style.webkitFilter = "invert(100%)";
    //   } else if ( data[2] === minim.top[2].onRelease[2] ) {
    //     videoEls[0].style.webkitFilter = "invert(0%)";
    //     videoEls[1].style.webkitFilter = "invert(0%)";
    //   }
      
    // }

    // zoom
    if ( (data[0] === minim.top[3].onPress[0]) && (data[1] === minim.top[3].onPress[1]) ) {

      if ( data[2] === minim.top[3].onPress[2] ) {
        screens[0].style.transform = 'scale(3)';
        screens[1].style.transform = 'scale(3)';
      } else if ( data[2] === minim.top[3].onRelease[2] ) {
        screens[0].style.transform = 'scale(1)';
        screens[1].style.transform = 'scale(1)';
      }
      
    }

    //

    return data;
}