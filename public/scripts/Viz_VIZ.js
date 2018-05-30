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
  let xGap = Math.floor(screen.width/(xCount+2) );
  let yGap = Math.floor(screen.height/(yCount+2) );
  position.x = ( (itemNo%xCount) +1 )*xGap;
  position.y = ( Math.floor(itemNo/xCount) +1 )*yGap;

  return position;
}

//~~~~~~~~~~~~~~~~~~~~~~
// this seriously needs to be something extendable omg

function liveJSHeart(ctx, frequencies) {

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

    drawLivejsHeartOutline(ctxs[ctx], options);
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









function ljsLilHeart(ctx) {

  ctxs[ctx].fillStyle = "#000";
  ctxs[ctx].fillRect(0,0,screen.width, screen.height);

  var frequencies = adjustFreqData(8);
  var frequencies = frequencies.newFreqs;

  for(var i=0;i<newData.length;i++) {
    var d = newData[i];
  }

  var draw = function(ctx) {
ctx.save();
ctx.translate(0,0);
ctx.beginPath();
ctx.moveTo(0,0);
ctx.lineTo(80,0);
ctx.lineTo(80,90);
ctx.lineTo(0,90);
ctx.closePath();
ctx.clip();
ctx.translate(0,0);
ctx.translate(0,0);
ctx.scale(1,1);
ctx.translate(0,0);
ctx.strokeStyle = 'rgba(0,0,0,0)';
ctx.lineCap = 'butt';
ctx.lineJoin = 'miter';
ctx.miterLimit = 4;
ctx.save();
ctx.transform(1.2445837,0,0,1.2445837,-71.636963,15.470663);
ctx.save();
ctx.beginPath();
ctx.moveTo(84.424,3.988);
ctx.lineTo(84.424,3.988);
ctx.bezierCurveTo(84.424,5.107,83.52000000000001,6.0120000000000005,82.4,6.0120000000000005);
ctx.lineTo(80.77900000000001,6.0120000000000005);
ctx.bezierCurveTo(79.659,6.0120000000000005,78.75500000000001,5.1080000000000005,78.75500000000001,3.9880000000000004);
ctx.lineTo(78.75500000000001,3.9880000000000004);
ctx.bezierCurveTo(78.75500000000001,2.8680000000000003,79.659,1.9640000000000004,80.77900000000001,1.9640000000000004);
ctx.lineTo(82.4,1.9640000000000004);
ctx.bezierCurveTo(83.52,1.965,84.424,2.869,84.424,3.988);
ctx.closePath();
ctx.fill();
ctx.stroke();
ctx.restore();
ctx.save();
ctx.beginPath();
ctx.moveTo(92.533,10.475);
ctx.lineTo(92.533,10.475);
ctx.bezierCurveTo(92.533,11.594,91.628,12.498999999999999,90.509,12.498999999999999);
ctx.lineTo(88.887,12.498999999999999);
ctx.bezierCurveTo(87.768,12.498999999999999,86.863,11.594999999999999,86.863,10.474999999999998);
ctx.lineTo(86.863,10.474999999999998);
ctx.bezierCurveTo(86.863,9.354999999999997,87.767,8.450999999999997,88.887,8.450999999999997);
ctx.lineTo(90.509,8.450999999999997);
ctx.bezierCurveTo(91.614,8.437,92.533,9.356,92.533,10.475);
ctx.closePath();
ctx.fill();
ctx.stroke();
ctx.restore();
ctx.save();
ctx.beginPath();
ctx.moveTo(100.627,-0.073);
ctx.lineTo(100.627,-0.073);
ctx.bezierCurveTo(100.627,1.046,99.723,1.951,98.604,1.951);
ctx.lineTo(96.981,1.951);
ctx.bezierCurveTo(95.862,1.951,94.958,1.0470000000000002,94.958,-0.07299999999999995);
ctx.lineTo(94.958,-0.07299999999999995);
ctx.bezierCurveTo(94.958,-1.192,95.862,-2.097,96.981,-2.097);
ctx.lineTo(98.604,-2.097);
ctx.bezierCurveTo(99.723,-2.097,100.627,-1.193,100.627,-0.073);
ctx.closePath();
ctx.fill();
ctx.stroke();
ctx.restore();
ctx.save();
ctx.beginPath();
ctx.moveTo(108.735,-5.743);
ctx.lineTo(108.735,-5.743);
ctx.bezierCurveTo(108.735,-4.6240000000000006,107.831,-3.7190000000000003,106.711,-3.7190000000000003);
ctx.lineTo(105.09,-3.7190000000000003);
ctx.bezierCurveTo(103.97,-3.7190000000000003,103.066,-4.623,103.066,-5.743);
ctx.lineTo(103.066,-5.743);
ctx.bezierCurveTo(103.066,-6.863,103.97,-7.767,105.09,-7.767);
ctx.lineTo(106.711,-7.767);
ctx.bezierCurveTo(107.831,-7.766,108.735,-6.863,108.735,-5.743);
ctx.closePath();
ctx.fill();
ctx.stroke();
ctx.restore();
ctx.save();
ctx.beginPath();
ctx.moveTo(116.846,9.026);
ctx.lineTo(116.846,9.026);
ctx.bezierCurveTo(116.846,10.146,115.941,11.05,114.822,11.05);
ctx.lineTo(113.2,11.05);
ctx.bezierCurveTo(112.081,11.05,111.176,10.146,111.176,9.026);
ctx.lineTo(111.176,9.026);
ctx.bezierCurveTo(111.176,7.907,112.081,7.002,113.2,7.002);
ctx.lineTo(114.822,7.002);
ctx.bezierCurveTo(115.927,7.002,116.846,7.906,116.846,9.026);
ctx.closePath();
ctx.fill();
ctx.stroke();
ctx.restore();
ctx.save();
ctx.beginPath();
ctx.moveTo(76.315,1.548);
ctx.lineTo(76.315,1.548);
ctx.bezierCurveTo(76.315,2.667,75.411,3.572,74.291,3.572);
ctx.lineTo(72.669,3.572);
ctx.bezierCurveTo(71.54899999999999,3.572,70.645,2.668,70.645,1.548);
ctx.lineTo(70.645,1.548);
ctx.bezierCurveTo(70.645,0.42799999999999994,71.54899999999999,-0.476,72.669,-0.476);
ctx.lineTo(74.291,-0.476);
ctx.bezierCurveTo(75.411,-0.475,76.315,0.428,76.315,1.548);
ctx.closePath();
ctx.fill();
ctx.stroke();
ctx.restore();
ctx.save();
ctx.beginPath();
ctx.moveTo(68.221,8.437);
ctx.lineTo(68.221,8.437);
ctx.bezierCurveTo(68.221,9.556,67.31700000000001,10.460999999999999,66.197,10.460999999999999);
ctx.lineTo(64.57600000000001,10.460999999999999);
ctx.bezierCurveTo(63.45700000000001,10.460999999999999,62.55200000000001,9.556999999999999,62.55200000000001,8.436999999999998);
ctx.lineTo(62.55200000000001,8.436999999999998);
ctx.bezierCurveTo(62.55200000000001,7.317999999999998,63.45600000000001,6.412999999999998,64.57600000000001,6.412999999999998);
ctx.lineTo(66.197,6.412999999999998);
ctx.bezierCurveTo(67.302,6.414,68.221,7.318,68.221,8.437);
ctx.closePath();
ctx.fill();
ctx.stroke();
ctx.restore();
ctx.save();
ctx.beginPath();
ctx.moveTo(113.803,13.891);
ctx.bezierCurveTo(112.755,13.991,111.979,14.939,111.979,16);
ctx.lineTo(111.979,18.756);
ctx.bezierCurveTo(111.979,19.775,111.146,20.607,110.128,20.607);
ctx.lineTo(109.784,20.607);
ctx.bezierCurveTo(108.766,20.607,107.933,19.775,107.933,18.756);
ctx.lineTo(107.933,11.15);
ctx.bezierCurveTo(107.933,10.088000000000001,107.158,9.141,106.11000000000001,9.040000000000001);
ctx.bezierCurveTo(104.90500000000002,8.925,103.88600000000001,9.873000000000001,103.88600000000001,11.064);
ctx.lineTo(103.88600000000001,14.709);
ctx.bezierCurveTo(103.88600000000001,15.727,103.05300000000001,16.56,102.034,16.56);
ctx.lineTo(101.69000000000001,16.56);
ctx.bezierCurveTo(100.67200000000001,16.56,99.83700000000002,15.726999999999999,99.83700000000002,14.709);
ctx.lineTo(99.83700000000002,12.757);
ctx.bezierCurveTo(99.83700000000002,11.695,99.06300000000002,10.748,98.01500000000001,10.647);
ctx.bezierCurveTo(96.81100000000002,10.532,95.79100000000001,11.48,95.79100000000001,12.671);
ctx.lineTo(95.79100000000001,21.183);
ctx.bezierCurveTo(95.79100000000001,22.201,94.95800000000001,23.033,93.94000000000001,23.033);
ctx.lineTo(93.56700000000001,23.033);
ctx.bezierCurveTo(92.549,23.033,91.715,22.200000000000003,91.715,21.183);
ctx.lineTo(91.715,17.622);
ctx.bezierCurveTo(91.715,16.56,90.94,15.613,89.89200000000001,15.513);
ctx.bezierCurveTo(88.686,15.398,87.66700000000002,16.346,87.66700000000002,17.537);
ctx.lineTo(87.66700000000002,18.756999999999998);
ctx.bezierCurveTo(87.66700000000002,19.775,86.83400000000002,20.607,85.81600000000002,20.607);
ctx.lineTo(85.47200000000002,20.607);
ctx.bezierCurveTo(84.45300000000002,20.607,83.62000000000002,19.775,83.62000000000002,18.756999999999998);
ctx.lineTo(83.62000000000002,12.758);
ctx.bezierCurveTo(83.62000000000002,11.696,82.84600000000002,10.748999999999999,81.79800000000002,10.648);
ctx.bezierCurveTo(80.59300000000002,10.533,79.57400000000001,11.481,79.57400000000001,12.672);
ctx.lineTo(79.57400000000001,21.184);
ctx.bezierCurveTo(79.57400000000001,22.202,78.74100000000001,23.034000000000002,77.72100000000002,23.034000000000002);
ctx.lineTo(77.37700000000002,23.034000000000002);
ctx.bezierCurveTo(76.35900000000002,23.034000000000002,75.52600000000002,22.201000000000004,75.52600000000002,21.184);
ctx.lineTo(75.52600000000002,11.136);
ctx.bezierCurveTo(75.52600000000002,10.074,74.75200000000002,9.126999999999999,73.70300000000003,9.026);
ctx.bezierCurveTo(72.49700000000003,8.911,71.47900000000003,9.859,71.47900000000003,11.05);
ctx.lineTo(71.47900000000003,17.537);
ctx.bezierCurveTo(71.47900000000003,18.555999999999997,70.64600000000003,19.387999999999998,69.62700000000002,19.387999999999998);
ctx.lineTo(69.28300000000003,19.387999999999998);
ctx.bezierCurveTo(68.26500000000003,19.387999999999998,67.43200000000003,18.555999999999997,67.43200000000003,17.537);
ctx.lineTo(67.43200000000003,16.000999999999998);
ctx.bezierCurveTo(67.43200000000003,14.938999999999998,66.65800000000003,13.991999999999997,65.60900000000004,13.891999999999998);
ctx.bezierCurveTo(64.40200000000004,13.776999999999997,63.38500000000003,14.724999999999998,63.38500000000003,15.915999999999997);
ctx.lineTo(63.38500000000003,30.008999999999997);
ctx.bezierCurveTo(63.38500000000003,31.070999999999998,64.15900000000003,32.017999999999994,65.20700000000004,32.117999999999995);
ctx.bezierCurveTo(66.41400000000003,32.233,67.43100000000004,31.285999999999994,67.43100000000004,30.094999999999995);
ctx.lineTo(67.43100000000004,30.094999999999995);
ctx.bezierCurveTo(67.43100000000004,29.075999999999997,68.26400000000004,28.241999999999994,69.28200000000004,28.241999999999994);
ctx.lineTo(69.62600000000003,28.241999999999994);
ctx.bezierCurveTo(70.64500000000004,28.241999999999994,71.47800000000004,29.074999999999992,71.47800000000004,30.094999999999995);
ctx.lineTo(71.47800000000004,40.14);
ctx.bezierCurveTo(71.47800000000004,41.202,72.25200000000004,42.149,73.30100000000003,42.251);
ctx.bezierCurveTo(74.50700000000003,42.366,75.52500000000003,41.418,75.52500000000003,40.227999999999994);
ctx.lineTo(75.52500000000003,38.605);
ctx.bezierCurveTo(75.52500000000003,37.586999999999996,76.35800000000003,36.753,77.37700000000004,36.753);
ctx.lineTo(77.72100000000003,36.753);
ctx.bezierCurveTo(78.73900000000003,36.753,79.57300000000004,37.586,79.57300000000004,38.605);
ctx.lineTo(79.57300000000004,47.03);
ctx.bezierCurveTo(79.57300000000004,48.092,80.34700000000004,49.039,81.39700000000003,49.141);
ctx.bezierCurveTo(82.60100000000003,49.256,83.62100000000004,48.308,83.62100000000004,47.117);
ctx.lineTo(83.62100000000004,37.387);
ctx.bezierCurveTo(83.62100000000004,36.367,84.45300000000003,35.534,85.47200000000004,35.534);
ctx.lineTo(85.81600000000003,35.534);
ctx.bezierCurveTo(86.83400000000003,35.534,87.66600000000003,36.367,87.66600000000003,37.387);
ctx.lineTo(87.66600000000003,53.1);
ctx.bezierCurveTo(87.66600000000003,54.162,88.44100000000003,55.109,89.49000000000002,55.209);
ctx.bezierCurveTo(90.69600000000003,55.324000000000005,91.71400000000003,54.376000000000005,91.71400000000003,53.185);
ctx.lineTo(91.71400000000003,42.25);
ctx.bezierCurveTo(91.71400000000003,41.232,92.54700000000003,40.398,93.56600000000003,40.398);
ctx.lineTo(93.91000000000003,40.398);
ctx.bezierCurveTo(94.92800000000003,40.398,95.76200000000003,41.231,95.76200000000003,42.25);
ctx.lineTo(95.76200000000003,47.028999999999996);
ctx.bezierCurveTo(95.76200000000003,48.090999999999994,96.53700000000003,49.038,97.58500000000002,49.13999999999999);
ctx.bezierCurveTo(98.79100000000003,49.254999999999995,99.80900000000003,48.306999999999995,99.80900000000003,47.11599999999999);
ctx.lineTo(99.80900000000003,32.533);
ctx.bezierCurveTo(99.80900000000003,31.514000000000003,100.64200000000002,30.682000000000002,101.66100000000003,30.682000000000002);
ctx.lineTo(102.00500000000002,30.682000000000002);
ctx.bezierCurveTo(103.02500000000002,30.682000000000002,103.85800000000002,31.514000000000003,103.85800000000002,32.533);
ctx.lineTo(103.85800000000002,40.139);
ctx.bezierCurveTo(103.85800000000002,41.201,104.63200000000002,42.148,105.68100000000001,42.248000000000005);
ctx.bezierCurveTo(106.88700000000001,42.36300000000001,107.90500000000002,41.415000000000006,107.90500000000002,40.225);
ctx.lineTo(107.90500000000002,30.093);
ctx.bezierCurveTo(107.90500000000002,29.075,108.73800000000001,28.241,109.75800000000001,28.241);
ctx.lineTo(110.18800000000002,28.241);
ctx.bezierCurveTo(111.16400000000002,28.241,111.95300000000002,29.03,111.95300000000002,30.006);
ctx.lineTo(111.95300000000002,30.006);
ctx.bezierCurveTo(111.95300000000002,31.068,112.72800000000002,32.015,113.77600000000001,32.114);
ctx.bezierCurveTo(114.98200000000001,32.229,116.00000000000001,31.281999999999996,116.00000000000001,30.090999999999998);
ctx.lineTo(116.00000000000001,15.910999999999998);
ctx.bezierCurveTo(116.027,14.724,115.008,13.776,113.803,13.891);
ctx.lineTo(113.803,13.891);
ctx.closePath();
ctx.fill();
ctx.stroke();
ctx.restore();
ctx.restore();
ctx.restore();
};
}

function ljsBigHeart(ctx) {

  ctxs[ctx].fillStyle = "#000";
  ctxs[ctx].fillRect(0,0,screen.width, screen.height);

  var frequencies = adjustFreqData(8);
  var newData = frequencies.newFreqs;

  for(var i=0;i<newData.length;i++) {
    var d = newData[i];
  }

  var draw = function(ctx) {
ctx.save();
ctx.translate(0,0);
ctx.beginPath();
ctx.moveTo(0,0);
ctx.lineTo(475,0);
ctx.lineTo(475,550);
ctx.lineTo(0,550);
ctx.closePath();
ctx.clip();
ctx.translate(0,0);
ctx.translate(0,0);
ctx.scale(1,1);
ctx.translate(-62.5,-17.1);
ctx.strokeStyle = 'rgba(0,0,0,0)';
ctx.lineCap = 'butt';
ctx.lineJoin = 'miter';
ctx.miterLimit = 4;
ctx.save();
ctx.transform(1.2445837,0,0,1.2445837,-71.636963,15.470663);
ctx.save();
ctx.beginPath();
ctx.moveTo(262.268,85.87);
ctx.lineTo(262.268,85.87);
ctx.bezierCurveTo(262.268,93.617,256.01199999999994,99.873,248.26399999999998,99.873);
ctx.lineTo(237.04099999999997,99.873);
ctx.bezierCurveTo(229.29399999999998,99.873,223.03599999999997,93.617,223.03599999999997,85.87);
ctx.lineTo(223.03599999999997,85.87);
ctx.bezierCurveTo(223.03599999999997,78.122,229.29399999999998,71.866,237.04099999999997,71.866);
ctx.lineTo(248.26399999999998,71.866);
ctx.bezierCurveTo(256.012,71.865,262.268,78.122,262.268,85.87);
ctx.closePath();
ctx.fill();
ctx.stroke();
ctx.restore();
ctx.save();
ctx.beginPath();
ctx.moveTo(318.386,130.762);
ctx.lineTo(318.386,130.762);
ctx.bezierCurveTo(318.386,138.51,312.13,144.768,304.382,144.768);
ctx.lineTo(293.159,144.768);
ctx.bezierCurveTo(285.411,144.768,279.153,138.51,279.153,130.762);
ctx.lineTo(279.153,130.762);
ctx.bezierCurveTo(279.153,123.015,285.411,116.759,293.159,116.759);
ctx.lineTo(304.382,116.759);
ctx.bezierCurveTo(312.03,116.659,318.386,123.015,318.386,130.762);
ctx.closePath();
ctx.fill();
ctx.stroke();
ctx.restore();
ctx.save();
ctx.beginPath();
ctx.moveTo(374.404,57.76);
ctx.lineTo(374.404,57.76);
ctx.bezierCurveTo(374.404,65.508,368.146,71.76599999999999,360.4,71.76599999999999);
ctx.lineTo(349.17699999999996,71.76599999999999);
ctx.bezierCurveTo(341.429,71.76599999999999,335.17099999999994,65.508,335.17099999999994,57.75999999999999);
ctx.lineTo(335.17099999999994,57.75999999999999);
ctx.bezierCurveTo(335.17099999999994,50.01299999999999,341.4289999999999,43.75699999999999,349.1769999999999,43.75699999999999);
ctx.lineTo(360.4,43.75699999999999);
ctx.bezierCurveTo(368.147,43.756,374.404,50.013,374.404,57.76);
ctx.closePath();
ctx.fill();
ctx.stroke();
ctx.restore();
ctx.save();
ctx.beginPath();
ctx.moveTo(430.523,18.528);
ctx.lineTo(430.523,18.528);
ctx.bezierCurveTo(430.523,26.275,424.266,32.533,416.519,32.533);
ctx.lineTo(405.296,32.533);
ctx.bezierCurveTo(397.548,32.533,391.292,26.275000000000002,391.292,18.528);
ctx.lineTo(391.292,18.528);
ctx.bezierCurveTo(391.292,10.779999999999998,397.548,4.523999999999999,405.296,4.523999999999999);
ctx.lineTo(416.519,4.523999999999999);
ctx.bezierCurveTo(424.266,4.523,430.523,10.78,430.523,18.528);
ctx.closePath();
ctx.fill();
ctx.stroke();
ctx.restore();
ctx.save();
ctx.beginPath();
ctx.moveTo(486.641,120.731);
ctx.lineTo(486.641,120.731);
ctx.bezierCurveTo(486.641,128.47899999999998,480.38300000000004,134.736,472.636,134.736);
ctx.lineTo(461.41200000000003,134.736);
ctx.bezierCurveTo(453.665,134.736,447.408,128.47899999999998,447.408,120.731);
ctx.lineTo(447.408,120.731);
ctx.bezierCurveTo(447.408,112.984,453.666,106.726,461.41200000000003,106.726);
ctx.lineTo(472.636,106.726);
ctx.bezierCurveTo(480.284,106.727,486.641,112.984,486.641,120.731);
ctx.closePath();
ctx.fill();
ctx.stroke();
ctx.restore();
ctx.save();
ctx.beginPath();
ctx.moveTo(206.152,68.984);
ctx.lineTo(206.152,68.984);
ctx.bezierCurveTo(206.152,76.731,199.89399999999998,82.98899999999999,192.147,82.98899999999999);
ctx.lineTo(180.923,82.98899999999999);
ctx.bezierCurveTo(173.176,82.98899999999999,166.919,76.731,166.919,68.984);
ctx.lineTo(166.919,68.984);
ctx.bezierCurveTo(166.919,61.236999999999995,173.17700000000002,54.98,180.923,54.98);
ctx.lineTo(192.147,54.98);
ctx.bezierCurveTo(199.894,54.979,206.152,61.237,206.152,68.984);
ctx.closePath();
ctx.fill();
ctx.stroke();
ctx.restore();
ctx.save();
ctx.beginPath();
ctx.moveTo(150.133,116.659);
ctx.lineTo(150.133,116.659);
ctx.bezierCurveTo(150.133,124.406,143.875,130.66400000000002,136.12900000000002,130.66400000000002);
ctx.lineTo(124.90500000000002,130.66400000000002);
ctx.bezierCurveTo(117.15700000000001,130.66400000000002,110.90100000000001,124.40600000000002,110.90100000000001,116.65900000000002);
ctx.lineTo(110.90100000000001,116.65900000000002);
ctx.bezierCurveTo(110.90100000000001,108.91100000000002,117.15700000000001,102.65500000000002,124.90500000000002,102.65500000000002);
ctx.lineTo(136.12900000000002,102.65500000000002);
ctx.bezierCurveTo(143.776,102.655,150.133,108.911,150.133,116.659);
ctx.closePath();
ctx.fill();
ctx.stroke();
ctx.restore();
ctx.save();
ctx.beginPath();
ctx.moveTo(465.583,154.402);
ctx.bezierCurveTo(458.334,155.09599999999998,452.968,161.653,452.968,169.003);
ctx.lineTo(452.968,188.07399999999998);
ctx.bezierCurveTo(452.968,195.12499999999997,447.209,200.885,440.156,200.885);
ctx.lineTo(437.772,200.885);
ctx.bezierCurveTo(430.71999999999997,200.885,424.959,195.125,424.959,188.07399999999998);
ctx.lineTo(424.959,135.432);
ctx.bezierCurveTo(424.959,128.082,419.596,121.52699999999999,412.345,120.832);
ctx.bezierCurveTo(404.00300000000004,120.03699999999999,396.95000000000005,126.592,396.95000000000005,134.83599999999998);
ctx.lineTo(396.95000000000005,160.065);
ctx.bezierCurveTo(396.95000000000005,167.11599999999999,391.19000000000005,172.876,384.13700000000006,172.876);
ctx.lineTo(381.75300000000004,172.876);
ctx.bezierCurveTo(374.70200000000006,172.876,368.94000000000005,167.116,368.94000000000005,160.065);
ctx.lineTo(368.94000000000005,146.557);
ctx.bezierCurveTo(368.94000000000005,139.207,363.57700000000006,132.652,356.32700000000006,131.956);
ctx.bezierCurveTo(347.98400000000004,131.161,340.93100000000004,137.71599999999998,340.93100000000004,145.96099999999998);
ctx.lineTo(340.93100000000004,204.85999999999999);
ctx.bezierCurveTo(340.93100000000004,211.91099999999997,335.16900000000004,217.67299999999997,328.119,217.67299999999997);
ctx.lineTo(325.535,217.67299999999997);
ctx.bezierCurveTo(318.483,217.67299999999997,312.723,211.91199999999998,312.723,204.85999999999999);
ctx.lineTo(312.723,180.22699999999998);
ctx.bezierCurveTo(312.723,172.87699999999998,307.358,166.32199999999997,300.108,165.62699999999998);
ctx.bezierCurveTo(291.765,164.83299999999997,284.712,171.38799999999998,284.712,179.63199999999998);
ctx.lineTo(284.712,188.07599999999996);
ctx.bezierCurveTo(284.712,195.12699999999995,278.952,200.88699999999997,271.899,200.88699999999997);
ctx.lineTo(269.515,200.88699999999997);
ctx.bezierCurveTo(262.46299999999997,200.88699999999997,256.704,195.12699999999998,256.704,188.07599999999996);
ctx.lineTo(256.704,146.55899999999997);
ctx.bezierCurveTo(256.704,139.20899999999997,251.339,132.65399999999997,244.089,131.95799999999997);
ctx.bezierCurveTo(235.746,131.16299999999998,228.695,137.71799999999996,228.695,145.96299999999997);
ctx.lineTo(228.695,204.86199999999997);
ctx.bezierCurveTo(228.695,211.91299999999995,222.934,217.67499999999995,215.881,217.67499999999995);
ctx.lineTo(213.498,217.67499999999995);
ctx.bezierCurveTo(206.446,217.67499999999995,200.685,211.91399999999996,200.685,204.86199999999997);
ctx.lineTo(200.685,135.33499999999998);
ctx.bezierCurveTo(200.685,127.98499999999999,195.322,121.42999999999998,188.07,120.73499999999999);
ctx.bezierCurveTo(179.727,119.94099999999999,172.676,126.49599999999998,172.676,134.73999999999998);
ctx.lineTo(172.676,179.634);
ctx.bezierCurveTo(172.676,186.68599999999998,166.915,192.44699999999997,159.863,192.44699999999997);
ctx.lineTo(157.478,192.44699999999997);
ctx.bezierCurveTo(150.42700000000002,192.44699999999997,144.66500000000002,186.68699999999998,144.66500000000002,179.634);
ctx.lineTo(144.66500000000002,169.00699999999998);
ctx.bezierCurveTo(144.66500000000002,161.65699999999998,139.30300000000003,155.10099999999997,132.05300000000003,154.40599999999998);
ctx.bezierCurveTo(123.70900000000003,153.611,116.65700000000002,160.16699999999997,116.65700000000002,168.41099999999997);
ctx.lineTo(116.65700000000002,265.947);
ctx.bezierCurveTo(116.65700000000002,273.294,122.02000000000002,279.851,129.27100000000002,280.546);
ctx.bezierCurveTo(137.614,281.34,144.66500000000002,274.78499999999997,144.66500000000002,266.542);
ctx.lineTo(144.66500000000002,266.542);
ctx.bezierCurveTo(144.66500000000002,259.48999999999995,150.42600000000002,253.72999999999996,157.478,253.72999999999996);
ctx.lineTo(159.863,253.72999999999996);
ctx.bezierCurveTo(166.915,253.72999999999996,172.676,259.489,172.676,266.542);
ctx.lineTo(172.676,336.068);
ctx.bezierCurveTo(172.676,343.419,178.039,349.972,185.29,350.669);
ctx.bezierCurveTo(193.63299999999998,351.46299999999997,200.68599999999998,344.907,200.68599999999998,336.66499999999996);
ctx.lineTo(200.68599999999998,325.441);
ctx.bezierCurveTo(200.68599999999998,318.39,206.44599999999997,312.628,213.49899999999997,312.628);
ctx.lineTo(215.88199999999998,312.628);
ctx.bezierCurveTo(222.93499999999997,312.628,228.69599999999997,318.39,228.69599999999997,325.441);
ctx.lineTo(228.69599999999997,383.74399999999997);
ctx.bezierCurveTo(228.69599999999997,391.09299999999996,234.05899999999997,397.65,241.30999999999997,398.34499999999997);
ctx.bezierCurveTo(249.65299999999996,399.13899999999995,256.70599999999996,392.58399999999995,256.70599999999996,384.34099999999995);
ctx.lineTo(256.70599999999996,316.99899999999997);
ctx.bezierCurveTo(256.70599999999996,309.94699999999995,262.46599999999995,304.186,269.51699999999994,304.186);
ctx.lineTo(271.90099999999995,304.186);
ctx.bezierCurveTo(278.953,304.186,284.71399999999994,309.947,284.71399999999994,316.99899999999997);
ctx.lineTo(284.71399999999994,425.75899999999996);
ctx.bezierCurveTo(284.71399999999994,433.10799999999995,290.07899999999995,439.66499999999996,297.32899999999995,440.35999999999996);
ctx.bezierCurveTo(305.67199999999997,441.15399999999994,312.72399999999993,434.59899999999993,312.72399999999993,426.3539999999999);
ctx.lineTo(312.72399999999993,350.66999999999996);
ctx.bezierCurveTo(312.72399999999993,343.61799999999994,318.4839999999999,337.85799999999995,325.53599999999994,337.85799999999995);
ctx.lineTo(327.92099999999994,337.85799999999995);
ctx.bezierCurveTo(334.97299999999996,337.85799999999995,340.73299999999995,343.61699999999996,340.73299999999995,350.66999999999996);
ctx.lineTo(340.73299999999995,383.74499999999995);
ctx.bezierCurveTo(340.73299999999995,391.09399999999994,346.09799999999996,397.65099999999995,353.34799999999996,398.34599999999995);
ctx.bezierCurveTo(361.691,399.13999999999993,368.74399999999997,392.5849999999999,368.74399999999997,384.3419999999999);
ctx.lineTo(368.74399999999997,283.424);
ctx.bezierCurveTo(368.74399999999997,276.37199999999996,374.50399999999996,270.611,381.556,270.611);
ctx.lineTo(383.941,270.611);
ctx.bezierCurveTo(390.993,270.611,396.753,276.372,396.753,283.424);
ctx.lineTo(396.753,336.065);
ctx.bezierCurveTo(396.753,343.416,402.118,349.969,409.368,350.666);
ctx.bezierCurveTo(417.711,351.46,424.762,344.904,424.762,336.662);
ctx.lineTo(424.762,266.539);
ctx.bezierCurveTo(424.762,259.48699999999997,430.524,253.72699999999998,437.576,253.72699999999998);
ctx.lineTo(440.555,253.72699999999998);
ctx.bezierCurveTo(447.31,253.72699999999998,452.773,259.19,452.773,265.94399999999996);
ctx.lineTo(452.773,265.94399999999996);
ctx.bezierCurveTo(452.773,273.29099999999994,458.137,279.84799999999996,465.387,280.54299999999995);
ctx.bezierCurveTo(473.731,281.33699999999993,480.781,274.7819999999999,480.781,266.53899999999993);
ctx.lineTo(480.781,168.40799999999993);
ctx.bezierCurveTo(480.979,160.164,473.927,153.607,465.583,154.402);
ctx.lineTo(465.583,154.402);
ctx.closePath();
ctx.fill();
ctx.stroke();
ctx.restore();
ctx.restore();
ctx.restore();
};
}
