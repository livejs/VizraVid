Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

function clearRect(ctx) {
  ctxs[ctx].clearRect(0,0,screen.width,screen.height);
}

function translate(i) {
  return "translate("+(i%16)*z+","+Math.round(Math.floor(i/16))*z+")";
}

// can use for options position
// what if I want the distribution to come from the center? I certainly do for jsconf on the y axis
function returnPosition(xCount, yCount, itemNo) {
  xCount = Number(xCount);
  yCount = Number(yCount);
  let position = {};
  let xGap = Math.floor(screen.width/(xCount+1) );
  let yGap = Math.floor(screen.height/(yCount+1) );
  position.x = ( (itemNo%xCount) +1 )*xGap;
  position.y = ( Math.floor(itemNo/xCount) +1 )*yGap;

  return position;

}

function returnHslaString(col, opacity) {
  return 'hsla('+col.hue+', '+col.sat+'%, '+col.lum+'%,'+opacity+' )';
}

// make this more generic for any colour palette
// light true will return cream not black
function cycleColours(index, light=true) {
  let remainder = index % 7;
  let colour = jsconfeucols.pink;

  switch (remainder) {
    case 1:
      colour = jsconfeucols.blue;
      break;
    case 2:
      colour = jsconfeucols.purple;
      break;
    case 3:
      colour = jsconfeucols.rose;
      break;
    case 4:
      colour = jsconfeucols.cloud;
      break;
    case 5:
      if (light) {
        colour = jsconfeucols.cream;
      } else {
        colour = jsconfeucols.black;
      }
      break;
    case 6:
      colour = jsconfeucols.grey;
      break;
    default:
      colour = jsconfeucols.pink;
      break;
  }// switch
  return colour;
}

//~~~~~~~~~~~~~~~~~~~~~~
// this seriously needs to be something extendable omg

function liveJSHeartCenter(ctx, frequencies) {

  let pulse = frequencies[16];
  // frequencies = frequencies.filter(val => val % 2 === 0);

  ctxs[ctx].fillStyle = returnHslaString(jsconfeucols.black, 1);
  ctxs[ctx].fillRect(0,0,screen.width,screen.height);
  ctxs[ctx].lineWidth = 2;

  let options = {};

  let d = pulse;
  let unit = d/200; // make like 1 instead of 100

  options.scale = unit;
  options.position = {};
  options.position.x = screen.centerX;
  options.position.y = screen.centerY;
  options.fill = returnHslaString(jsconfeucols.cream, 0.8);
  options.stroke = returnHslaString(jsconfeucols.cream, 1);

  drawLivejsHeartOutline(ctxs[ctx], options);
}

function liveJSHeartScale(ctx, frequencies) {

  // frequencies = frequencies.filter(val => val % 2 === 0);

  ctxs[ctx].fillStyle = returnHslaString(jsconfeucols.black, 1);
  ctxs[ctx].fillRect(0,0,screen.width,screen.height);
  ctxs[ctx].lineWidth = 2;

  let options = {};

  for(let i=0; i<frequencies.length; i++) {
    let d = frequencies[i];
    let unit = d/200; // make like 1 instead of 100

    options.scale = unit;
    options.position = returnPosition(8, 4, i);
    // options.position.x = i*10;
    // options.position.y = (i%5)*10;
    options.fill = returnHslaString(cycleColours(i),0.7);
    options.stroke = returnHslaString(cycleColours(i),1);

    drawLivejsHeartOutline(ctxs[ctx], options);
  }

}

function liveJSFillHeartScale(ctx, frequencies) {

  // frequencies = frequencies.filter(val => val % 2 === 0);

  ctxs[ctx].fillStyle = returnHslaString(jsconfeucols.black, 1);
  ctxs[ctx].fillRect(0,0,screen.width,screen.height);
  ctxs[ctx].lineWidth = 2;

  let options = {};

  for(let i=0; i<frequencies.length; i++) {
    let d = frequencies[i];
    let unit = d/200; // make like 1 instead of 100

    options.scale = unit*1.5;
    options.position = returnPosition(8, 4, i);
    // options.position.x = i*10;
    // options.position.y = (i%5)*10;
    options.fill = returnHslaString(cycleColours(i),0.7);
    options.stroke = returnHslaString(cycleColours(i),1);

    drawLivejsHeartSolid(ctxs[ctx], options);
  }

}

function liveJSHeartFill(ctx, frequencies) {

  // frequencies = frequencies.filter(val => val % 2 === 0);

  ctxs[ctx].fillStyle = "#000";
  ctxs[ctx].fillRect(0,0,screen.width,screen.height);
  ctxs[ctx].globalCompositeOperation = "hard-light";
  ctxs[ctx].lineWidth = 2;

  let options = {};

  for(let i=0; i<frequencies.length; i++) {
    let d = frequencies[i];
    let unit = d/200; // make like 1 instead of 100

    options.scale = 0.5;
    options.position = returnPosition(8, 4, i);
    // options.position.x = i*10;
    // options.position.y = (i%5)*10;
    options.fill = "hsla("+Math.round( i*10 )+",50%,80%,"+unit+")";
    options.stroke = "hsla("+Math.round( i*10 )+",50%,80%,1)";

    drawLivejsHeartSolid(ctxs[ctx], options);
  }

}

function liveJSTextCenter(ctx, frequencies) {

  let pulse = frequencies[16];
  // frequencies = frequencies.filter(val => val % 2 === 0);

  ctxs[ctx].fillStyle = returnHslaString(jsconfeucols.black, 1);
  ctxs[ctx].fillRect(0,0,screen.width,screen.height);
  ctxs[ctx].lineWidth = 2;

  let options = {};

  let d = pulse;
  let unit = d/200; // make like 1 instead of 100

  options.scale = unit*1.5;
  options.position = {};
  options.position.x = screen.centerX;
  options.position.y = screen.centerY;
  options.fill = returnHslaString(jsconfeucols.cream, 0.8);
  options.stroke = returnHslaString(jsconfeucols.cream, 1);

  drawLivejsText(ctxs[ctx], options);

}

function liveJSTextScale(ctx, frequencies) {

  // frequencies = frequencies.filter(val => val % 2 === 0);

  ctxs[ctx].fillStyle = returnHslaString(jsconfeucols.black, 1);
  ctxs[ctx].fillRect(0,0,screen.width,screen.height);
  ctxs[ctx].lineWidth = 2;

  let options = {};

  for(let i=0; i<frequencies.length; i++) {
    let d = frequencies[i];
    let unit = d/200; // make like 1 instead of 100

    options.scale = unit;
    options.position = returnPosition(8, 4, i);
    // options.position.x = i*10;
    // options.position.y = (i%5)*10;
    options.fill = returnHslaString(cycleColours(i),0.7);
    options.stroke = returnHslaString(cycleColours(i),1);

    drawLivejsText(ctxs[ctx], options);
  }

}

// ~~~~~~~~~~~~~~~~~~~~~~ JS CONF

function jsconfLogoTile(ctx, frequencies) {

  // frequencies = frequencies.filter(val => val % 2 === 0);

  ctxs[ctx].fillStyle = returnHslaString(jsconfeucols.cream, 1);
  ctxs[ctx].fillRect(0,0,screen.width,screen.height);
  ctxs[ctx].lineWidth = 2;

  let options = {};

  for(let i=0; i<frequencies.length; i++) {
    let d = frequencies[i];
    let unit = d/200; // make like 1 instead of 100

    options.scale = 0.5;
    options.position = returnPosition(8, 4, i);
    // options.position.x = i*10;
    // options.position.y = (i%5)*10;
    options.fill = "hsla("+Math.round( i*10 )+",50%,80%,"+unit+")";
    options.stroke = "hsla("+Math.round( i*10 )+",50%,80%,1)";

    drawJsconfeuLogo(ctxs[ctx], options);
  }

}

function jsconfLogoScale(ctx, frequencies) {

  // frequencies = frequencies.filter(val => val % 2 === 0);

  ctxs[ctx].fillStyle = returnHslaString(jsconfeucols.black, 1);
  ctxs[ctx].fillRect(0,0,screen.width,screen.height);
  ctxs[ctx].lineWidth = 2;

  let options = {};

  for(let i=0; i<frequencies.length; i++) {
    let d = frequencies[i];
    let unit = d/200; // make like 1 instead of 100

    options.scale = unit;
    options.position = returnPosition(8, 4, i);
    // options.position.x = i*10;
    // options.position.y = (i%5)*10;
    options.fill = returnHslaString(cycleColours(i),0.7);
    options.stroke = returnHslaString(cycleColours(i),1);

    drawJsconfeuLogo(ctxs[ctx], options);
  }

}

// I have no idea 🤷🏻‍♀️
function jsconfTextCenter(ctx, frequencies) {

  let pulse = frequencies[16];
  // frequencies = frequencies.filter(val => val % 2 === 0);

  ctxs[ctx].fillStyle = returnHslaString(jsconfeucols.cream,1);
  ctxs[ctx].fillRect(0,0,screen.width,screen.height);
  ctxs[ctx].lineWidth = 2;

  let options = {};

  let d = pulse;
  let unit = d/200; // make like 1 instead of 100

  options.scale = unit;
  options.position = {};
  options.position.x = screen.centerX;
  options.position.y = screen.centerY;
  options.fill = returnHslaString(jsconfeucols.black, 0.8);
  options.stroke = returnHslaString(jsconfeucols.black, 1);

  // ctx.translate(screen.centerX, screen.centerY);
  drawJsconfeuText(ctxs[ctx], options);
  // VizFX.transform('zoom', d/50);
}

function jsconfTextScale(ctx, frequencies) {

  // frequencies = frequencies.filter(val => val % 2 === 0);

  ctxs[ctx].fillStyle = returnHslaString(jsconfeucols.cream,1);
  ctxs[ctx].fillRect(0,0,screen.width,screen.height);
  ctxs[ctx].lineWidth = 2;

  let options = {};

  for(let i=0; i<frequencies.length; i++) {
    let d = frequencies[i];
    let unit = d/200; // make like 1 instead of 100

    options.scale = unit;
    options.position = returnPosition(8, 4, i);
    // options.position.x = i*10;
    // options.position.y = (i%5)*10;
    options.fill = returnHslaString(cycleColours(i, false), 0.8);
    options.stroke = returnHslaString(cycleColours(i, false), 1);

    drawJsconfeuText(ctxs[ctx], options);
  }

}

function jsconfTextTile(ctx, frequencies) {

  // frequencies = frequencies.filter(val => val % 2 === 0);

  ctxs[ctx].fillStyle = returnHslaString(jsconfeucols.pink,1);
  ctxs[ctx].fillRect(0,0,screen.width,screen.height);
  ctxs[ctx].lineWidth = 2;

  let options = {};

  for(let i=0; i<frequencies.length; i++) {
    let d = frequencies[i];
    let unit = d/200; // make like 1 instead of 100

    options.scale = unit*2;
    options.position = returnPosition(8, 4, i);
    // options.position.x = i*10;
    // options.position.y = (i%5)*10;
    if (i%3===0) {
      options.fill = returnHslaString(jsconfeucols.cream,0.5);
      options.stroke = returnHslaString(jsconfeucols.cream,1);
    } else if (i%3===1) {
      options.fill = returnHslaString(jsconfeucols.rose,0.5);
      options.stroke = returnHslaString(jsconfeucols.rose,1);
    } else {
      options.fill = returnHslaString(jsconfeucols.cloud,0.5);
      options.stroke = returnHslaString(jsconfeucols.cloud,1);
    }


    drawJsconfeuText(ctxs[ctx], options);
  }

}

function jsconfLeaf(ctx, frequencies) {

  // frequencies = frequencies.filter(val => val % 2 === 0);

  ctxs[ctx].fillStyle = "#fff";
  ctxs[ctx].fillRect(0,0,screen.width,screen.height);
  ctxs[ctx].lineWidth = 2;

  let options = {};

  for(let i=0; i<frequencies.length; i++) {
    let d = frequencies[i];
    let unit = d/200; // make like 1 instead of 100

    options.scale = 0.5;
    options.position = returnPosition(8, 4, i);
    // options.position.x = i*10;
    // options.position.y = (i%5)*10;
    options.fill = "hsla("+Math.round( i*10 )+",50%,80%,"+unit+")";
    options.stroke = "hsla("+Math.round( i*10 )+",50%,80%,1)";

    drawJsconfeuLeaf(ctxs[ctx], options);
  }

}

function jsconfRect(ctx, frequencies) {

  // frequencies = frequencies.filter(val => val % 2 === 0);

  ctxs[ctx].fillStyle = "#fff";
  ctxs[ctx].fillRect(0,0,screen.width,screen.height);
  ctxs[ctx].lineWidth = 2;

  let options = {};

  for(let i=0; i<frequencies.length; i++) {
    let d = frequencies[i];
    let unit = d/200; // make like 1 instead of 100

    options.scale = 0.5;
    options.position = returnPosition(8, 4, i);
    // options.position.x = i*10;
    // options.position.y = (i%5)*10;
    options.fill = "hsla("+Math.round( i*10 )+",50%,80%,"+unit+")";
    options.stroke = "hsla("+Math.round( i*10 )+",50%,80%,1)";

    drawJsconfeuRectangle(ctxs[ctx], options);
  }

}

function jsconfSnake(ctx, frequencies) {

  // frequencies = frequencies.filter(val => val % 2 === 0);

  ctxs[ctx].fillStyle = "#fff";
  ctxs[ctx].fillRect(0,0,screen.width,screen.height);
  ctxs[ctx].lineWidth = 2;

  let options = {};

  for(let i=0; i<frequencies.length; i++) {
    let d = frequencies[i];
    let unit = d/200; // make like 1 instead of 100

    options.scale = 0.5;
    options.position = returnPosition(8, 4, i);
    // options.position.x = i*10;
    // options.position.y = (i%5)*10;
    options.fill = "hsla("+Math.round( i*10 )+",50%,80%,"+unit+")";
    options.stroke = "hsla("+Math.round( i*10 )+",50%,80%,1)";

    drawJsconfeuSnake(ctxs[ctx], options);
  }

}

function jsconfTriangle(ctx, frequencies) {

  // frequencies = frequencies.filter(val => val % 2 === 0);

  ctxs[ctx].fillStyle = "#fff";
  ctxs[ctx].fillRect(0,0,screen.width,screen.height);
  ctxs[ctx].lineWidth = 2;

  let options = {};

  for(let i=0; i<frequencies.length; i++) {
    let d = frequencies[i];
    let unit = d/200; // make like 1 instead of 100

    options.scale = 0.5;
    options.position = returnPosition(8, 4, i);
    // options.position.x = i*10;
    // options.position.y = (i%5)*10;
    options.fill = "hsla("+Math.round( i*10 )+",50%,80%,"+unit+")";
    options.stroke = "hsla("+Math.round( i*10 )+",50%,80%,1)";

    drawJsconfeuTriangle(ctxs[ctx], options);
  }

}

function jsconfCircle(ctx, frequencies) {

  // frequencies = frequencies.filter(val => val % 2 === 0);

  ctxs[ctx].fillStyle = "#fff";
  ctxs[ctx].fillRect(0,0,screen.width,screen.height);
  ctxs[ctx].lineWidth = 2;

  let options = {};

  for(let i=0; i<frequencies.length; i++) {
    let d = frequencies[i];
    let unit = d/200; // make like 1 instead of 100

    options.scale = 0.5;
    options.position = returnPosition(8, 4, i);
    // options.position.x = i*10;
    // options.position.y = (i%5)*10;
    options.fill = "hsla("+Math.round( i*10 )+",50%,80%,"+unit+")";
    options.stroke = "hsla("+Math.round( i*10 )+",50%,80%,1)";

    drawJsconfeuCircle(ctxs[ctx], options);
  }

}

function jsconfSquare(ctx, frequencies) {

  // frequencies = frequencies.filter(val => val % 2 === 0);

  ctxs[ctx].fillStyle = "#fff";
  ctxs[ctx].fillRect(0,0,screen.width,screen.height);
  ctxs[ctx].lineWidth = 2;

  let options = {};

  for(let i=0; i<frequencies.length; i++) {
    let d = frequencies[i];
    let unit = d/200; // make like 1 instead of 100

    options.scale = 0.5;
    options.position = returnPosition(8, 4, i);
    // options.position.x = i*10;
    // options.position.y = (i%5)*10;
    options.fill = "hsla("+Math.round( i*10 )+",50%,80%,"+unit+")";
    options.stroke = "hsla("+Math.round( i*10 )+",50%,80%,1)";

    drawJsconfeuSquare(ctxs[ctx], options);
  }

}

function jsconfeuAllShapes(ctx, frequencies) {

  // background is cream
  ctxs[ctx].fillStyle = returnHslaString(jsconfeucols.cream, 1);
  ctxs[ctx].fillRect(0,0,screen.width,screen.height);
  ctxs[ctx].lineWidth = 2;

  let options = {};

  for(let i=0; i<frequencies.length; i++) {
    let d = frequencies[i];
    let unit = d/200; // make like 1 instead of 100

    options.scale = unit/2;
    options.position = returnPosition(8, 4, i);
    // options.position.x = i*10;
    // options.position.y = (i%5)*10;


    options.fill = returnHslaString(cycleColours(i),0.7);
    options.stroke = returnHslaString(cycleColours(i),1);

    if (i%6===0) {
      drawJsconfeuRectangle(ctxs[ctx], options)
    } else if (i%6===1) {
      drawJsconfeuTriangle(ctxs[ctx], options);
    } else if (i%6===2) {
      drawJsconfeuCircle(ctxs[ctx], options);
    } else if (i%6===3) {
      drawJsconfeuSquare(ctxs[ctx], options);
    } else if (i%6===4) {
      drawJsconfeuLeaf(ctxs[ctx], options);
    } else {
      drawJsconfeuSnake(ctxs[ctx], options);
    }
  }


}

// function jsconfLogoHeart() {

// }

function centerHeart(ctx, frequencies) {

  let pulse = frequencies[10];
  // frequencies = frequencies.filter(val => val % 2 === 0);

  ctxs[ctx].fillStyle = "#fff";
  ctxs[ctx].fillRect(0,0,screen.width,screen.height);
  ctxs[ctx].lineWidth = 2;

  let options = {};

  let d = pulse;
  let unit = d/200; // make like 1 instead of 100

  options.scale = unit/2;
  options.position = {};
  options.position.x = screen.centerX;
  options.position.y = screen.centerY;
  options.fill = returnHslaString(jsconfeucols.pink, 0.8);
  options.stroke = returnHslaString(jsconfeucols.pink, 1);

  // ctx.translate(screen.centerX, screen.centerY);
  drawJsconfeuLogo(ctxs[ctx], options);
  // VizFX.transform('zoom', d/50);

}

function centerHeartThree(ctx, frequencies) {

  let hearts = frequencies.filter( (val, index) => index % 10 === 0);

  let options = {};

  ctxs[ctx].fillStyle = "#fff";
  ctxs[ctx].fillRect(0,0,screen.width,screen.height);
  ctxs[ctx].lineWidth = 2;

  for(let i=0; i<hearts.length; i++) {
    let d = hearts[i];
    let unit = d/200; // make like 1 instead of 100

    options.scale = unit/2;
    options.position = returnPosition(3, 1, i);
    // options.position.x = i*10;
    // options.position.y = (i%5)*10;
    options.fill =  returnHslaString(jsconfeucols.pink, 1);
    options.stroke = returnHslaString(jsconfeucols.pink, 1);

    drawJsconfeuLogo(ctxs[ctx], options);
  }

}





function centreCirc1(ctx, frequencies) {
  ctxs[ctx].fillStyle = "#000";
  ctxs[ctx].fillRect(0,0,screen.width,screen.height);
  ctxs[ctx].globalCompositeOperation = "hard-light";
  ctxs[ctx].lineWidth = 15;


  for(var i=0;i<frequencies.length;i++) {
    var d = frequencies[i];
    var transparency = d/200;

    ctxs[ctx].strokeStyle = "hsla("+Math.round( i*10 )+",50%,80%,"+transparency+")";
    // ctxs[ctx].fillStyle = "hsla("+Math.round( i*(20+(d/255)) )+",50%,80%,"+transparency+")";
    ctxs[ctx].beginPath();
    ctxs[ctx].arc(screen.centerX, screen.centerY, i*24, 0, Math.PI*2);
    ctxs[ctx].closePath();
    ctxs[ctx].stroke();
  }

}

function centreCirc2(ctx, frequencies) {
  ctxs[ctx].fillStyle = "#000";
  ctxs[ctx].fillRect(0,0,screen.width, screen.height);
  ctxs[ctx].globalCompositeOperation = "hard-light";
  ctxs[ctx].lineWidth = 15;

  for(var i=0;i<frequencies.length;i++) {
    var d = frequencies[i];
    var transparency = d/200;

    ctxs[ctx].strokeStyle = "hsla("+Math.round( i*30 )+",50%,80%,"+transparency+")";
    ctxs[ctx].fillStyle = "hsla("+Math.round( i*30 )+",50%,80%,"+transparency+")";
    ctxs[ctx].beginPath();
    ctxs[ctx].arc(screen.centerX, screen.centerY, i*64, 0, Math.PI*2);
    ctxs[ctx].closePath();
    ctxs[ctx].fill();
    ctxs[ctx].stroke();
  }


}

function concentric1(ctx, frequencies) {
  ctxs[ctx].fillStyle = "#000";
  ctxs[ctx].fillRect(0,0,screen.width, screen.height);
  ctxs[ctx].globalCompositeOperation = "hard-light";
  ctxs[ctx].lineWidth = 15;

  for(var i=0;i<frequencies.length;i++) {
    var d = frequencies[i];

    ctxs[ctx].strokeStyle = "hsla("+Math.round( i*10+100 )+",50%,80%,1)";
    ctxs[ctx].beginPath();
    ctxs[ctx].arc(screen.centerX, screen.centerY, i*24, 0-(Math.radians(90)), d/32-(Math.radians(90)) );
    ctxs[ctx].closePath();
    ctxs[ctx].stroke();
  }
}

function concentric2(ctx, frequencies) {
  ctxs[ctx].fillStyle = "#000";
  ctxs[ctx].fillRect(0,0,screen.width, screen.height);
  ctxs[ctx].globalCompositeOperation = "hard-light";
  ctxs[ctx].lineWidth = 15;

  for(var i=0;i<frequencies.length;i++) {
    var d = frequencies[i];

    ctxs[ctx].fillStyle = "hsla("+Math.round( i*(20+(d/255)) )+",50%,80%,0.6)";
    ctxs[ctx].beginPath();
    ctxs[ctx].arc(screen.centerX, screen.centerY, i*24, 0-(Math.radians(90)), d/32-(Math.radians(90)) );
    ctxs[ctx].closePath();
    ctxs[ctx].fill();
  }
}

function concentric21(ctx, frequencies) {
  ctxs[ctx].fillStyle = "#000";
  ctxs[ctx].fillRect(0,0,screen.width, screen.height);
  ctxs[ctx].globalCompositeOperation = "hard-light";
  ctxs[ctx].lineWidth = 15;

  for(var i=0;i<frequencies.length;i++) {
    var d = frequencies[i];

    ctxs[ctx].fillStyle = "hsla("+Math.round( i*(20+(d/255)) )+",50%,80%,0.3)";
    ctxs[ctx].beginPath();
    ctxs[ctx].arc(screen.centerX, screen.centerY, i*24, (0-(Math.radians(90)))+(Math.radians(i*10)), (d/32-(Math.radians(90)))+(Math.radians(i*10)) );
    ctxs[ctx].closePath();
    ctxs[ctx].fill();
  }
}

function concentric3(ctx, frequencies) {
  ctxs[ctx].fillStyle = "#000";
  ctxs[ctx].fillRect(0,0,screen.width, screen.height);
  ctxs[ctx].globalCompositeOperation = "hard-light";
  ctxs[ctx].lineWidth = 15;

  for(var i=0;i<frequencies.length;i++) {
    var d = frequencies[i];
    ctxs[ctx].fillStyle = "hsla("+Math.round( i*15+100 )+",50%,80%,0.4)";
    ctxs[ctx].strokeStyle = "hsla("+Math.round( i*15+100 )+",50%,80%,0.8)";
    ctxs[ctx].beginPath();
    ctxs[ctx].arc(screen.centerX, screen.centerY, i*24, 0-(Math.radians(90)), d/32-(Math.radians(90)) );
    ctxs[ctx].closePath();
    ctxs[ctx].fill();
    ctxs[ctx].stroke();
  }

}

function concentric31(ctx, frequencies) {
  ctxs[ctx].fillStyle = "#000";
  ctxs[ctx].fillRect(0,0,screen.width, screen.height);
  ctxs[ctx].globalCompositeOperation = "hard-light";
  ctxs[ctx].lineWidth = 15;

  for(var i=0;i<frequencies.length;i++) {
    var d = frequencies[i];

    var colour = i*10+100

    ctxs[ctx].fillStyle = "hsla("+i*10+100+",50%,80%,0.3)";
    ctxs[ctx].strokeStyle = "hsla("+i*10+100+",50%,80%,0.8)";
    ctxs[ctx].beginPath();
    ctxs[ctx].arc(screen.centerX, screen.centerY, i*24, (0-(Math.radians(90)))+(Math.radians(i*10)), (d/32-(Math.radians(90)))+(Math.radians(i*10)) );
    ctxs[ctx].closePath();
    ctxs[ctx].fill();
    ctxs[ctx].stroke();
  }

}

function concentric4(ctx, frequencies) {
  ctxs[ctx].fillStyle = "#000";
  ctxs[ctx].fillRect(0,0,screen.width, screen.height);
  ctxs[ctx].globalCompositeOperation = "hard-light";
  ctxs[ctx].lineWidth = 15;

  for(var i=0;i<frequencies.length;i++) {
    var d = frequencies[i];

    ctxs[ctx].strokeStyle = "hsla("+Math.round( i*10+100 )+",50%,80%,0.7)";
    ctxs[ctx].beginPath();
    ctxs[ctx].arc(screen.centerX, screen.centerY, i*24, 0-(Math.radians(90)), d/32-(Math.radians(90)) );
    ctxs[ctx].closePath();
    ctxs[ctx].stroke();

    ctxs[ctx].beginPath();
    ctxs[ctx].arc(screen.centerX, screen.centerY, i*24, 0-(Math.radians(90)), d/32+(Math.radians(90)), true);
    ctxs[ctx].closePath();
    ctxs[ctx].stroke();
  }

}

function hex(ctx, frequencies) {
  ctxs[ctx].fillStyle = "#000";
  ctxs[ctx].fillRect(0,0,screen.width, screen.height);
  ctxs[ctx].globalCompositeOperation = "hard-light";
  ctxs[ctx].lineWidth = 2;

  for(var i=0;i<frequencies.length;i++) {
    var d = frequencies[i];

    drawHex(ctxs[ctx], d, i*80, i*50);
    ctxs[ctx].strokeStyle = "hsla("+(i*10+100)+",60%,80%,1)";
    ctxs[ctx].fillStyle = "hsla("+(i*10+100)+",60%,80%,0.8)";
    // ctxs[ctx].arc(x, y, d/(j*5), 0, Math.PI*2);
    ctxs[ctx].fill();
    ctxs[ctx].stroke();

  }

}

function hex2(ctx, frequencies) {
  ctxs[ctx].fillStyle = "#000";
  ctxs[ctx].fillRect(0,0,screen.width, screen.height);
  ctxs[ctx].globalCompositeOperation = "hard-light";
  ctxs[ctx].lineWidth = 2;

  for(var i=0;i<frequencies.length;i++) {
    var d = frequencies[i];
    drawHex(ctxs[ctx], 80, (i%16)*90, (i%14)*80);
    ctxs[ctx].strokeStyle = "hsla("+(i*10)+",60%,80%,1)";
    ctxs[ctx].fillStyle = "hsla("+(i*10)+",60%,"+d/2+"%,0.8)";
    ctxs[ctx].fill();
    ctxs[ctx].stroke();

  }

}

function hex3(ctx, frequencies) {
  ctxs[ctx].fillStyle = "#000";
  ctxs[ctx].fillRect(0,0,screen.width, screen.height);
  ctxs[ctx].globalCompositeOperation = "hard-light";
  ctxs[ctx].lineWidth = 2;

  for(var i=0;i<frequencies.length;i++) {
    var d = frequencies[i];
    // ctxs[ctx].beginPath();
    drawHex(ctxs[ctx], 120+(d/12), (i%24)*90, (i%14)*60);
    ctxs[ctx].strokeStyle = "hsla("+(i*30)+",60%,80%,1)";
    ctxs[ctx].fillStyle = "hsla(0,0%,"+d/1.5+"%,0.4)";
    ctxs[ctx].fill();
    ctxs[ctx].stroke();

  }

}

function hex4(ctx, frequencies) {
  ctxs[ctx].fillStyle = "#000";
  ctxs[ctx].fillRect(0,0,screen.width, screen.height);
  ctxs[ctx].globalCompositeOperation = "hard-light";
  ctxs[ctx].lineWidth = 2;

  for(var i=0;i<frequencies.length;i++) {
    var d = frequencies[i];
    // ctxs[ctx].beginPath();
    drawHex(ctxs[ctx], d, (i%24)*90, (i%14)*60);
    ctxs[ctx].strokeStyle = "hsla("+(i*3)+",60%,80%,1)";
    ctxs[ctx].fillStyle = "hsla("+(i*3)+",60%,"+d/2+"%,0.4)";
    // ctxs[ctx].arc(x, y, d/(j*5), 0, Math.PI*2);
    ctxs[ctx].fill();
    ctxs[ctx].stroke();

  }

}

