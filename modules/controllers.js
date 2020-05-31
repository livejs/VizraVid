// setup quneo structure
const quneo = {
  mainSlider: new Uint8Array([176,0]),
  pause: {
    on: new Uint8Array([144,1,127]),
    off: new Uint8Array([128,1,0])
  },
  stop: {
    on: new Uint8Array([144,2,127]),
    off: new Uint8Array([128,2,0])
  },
  play: {
    on: new Uint8Array([144,3,127]),
    off: new Uint8Array([128,3,0])
  },
  pads: [
   [],[],[],[]
  ],
  arrows: [
    {
      left: {
        on: new Uint8Array([145,0,127]),
        off: new Uint8Array([129,0,0])
      },
      right: {
        on: new Uint8Array([145,1,127]),
        off: new Uint8Array([129,1,0])
      }
    },
    {
      left: {
        on: new Uint8Array([145,2,127]),
        off: new Uint8Array([129,2,0])
      },
      right: {
        on: new Uint8Array([145,3,127]),
        off: new Uint8Array([129,3,0])
      }
    },
    {
      left: {
        on: new Uint8Array([145,4,127]),
        off: new Uint8Array([129,4,0])
      },
      right: {
        on: new Uint8Array([145,5,127]),
        off: new Uint8Array([129,5,0])
      }
    },
    {
      left: {
        on: new Uint8Array([145,6,127]),
        off: new Uint8Array([129,6,0])
      },
      right: {
        on: new Uint8Array([145,7,127]),
        off: new Uint8Array([129,7,0])
      }
    }
  ],
  horSliders: [
    new Uint8Array([177,1]),
    new Uint8Array([177,5]),
    new Uint8Array([177,9]),
    new Uint8Array([177,13])
  ],
  rotaries: {
    bankOne: {
      left: new Uint8Array([178,0]),
      right: new Uint8Array([178,1])
    },
    bankTwo: {
      left: new Uint8Array([178,2]),
      right: new Uint8Array([178,3])
    },
    bankThree: {
      left: new Uint8Array([178,4]),
      right: new Uint8Array([178,5])
    },
    bankFour: {
      left: new Uint8Array([178,6]),
      right: new Uint8Array([178,7])
    },
  },
  vertSliders: {
    bankOne: [
      new Uint8Array([179,5]),
      new Uint8Array([179,6]),
      new Uint8Array([179,7]),
      new Uint8Array([179,8])
    ],
    bankTwo: [
      new Uint8Array([180,5]),
      new Uint8Array([180,6]),
      new Uint8Array([180,7]),
      new Uint8Array([180,8])
    ],
    bankThree: [
      new Uint8Array([181,5]),
      new Uint8Array([181,6]),
      new Uint8Array([181,7]),
      new Uint8Array([181,8])
    ],
    bankFour: [
      new Uint8Array([182,5]),
      new Uint8Array([182,6]),
      new Uint8Array([182,7]),
      new Uint8Array([182,8])
    ]
  }
};

// generate pad values
function generatePadVals() {

  // 145 146, 0-63, 127
  // 129 130, 0-63, 0

  for (let i=0; i<4; i++) {

    for (let j=0; j<64; j++) {
      var toPush = {
        on: new Uint8Array([159-i,j,127]),
        off: new Uint8Array([143-i,j,0])
      };
      quneo.pads[i].push(toPush);
    }

  }
}
generatePadVals();

export default quneo;