// maybe set these to typed arrays
let newAr = [], givenArr = [];
// const givenArrCount;

// e.data receives frequencyData(freqs) and array count(count)
onmessage = function(e) {
  givenArr = e.data.freqs;
  givenArrCount = e.data.count;

  newAr = alterArr(givenArr);
  postMessage(newAr);
}

// I kinda want to pass in the amount of array leaps we make considering we know the original array is 1024 and the array we want is 64
const shapeCount = 32; // size of new array
function alterArr(arrToChange) {

  arrToChange.slice(0, (arrToChange.length / 2) ); // pull off first 10khz freqs

  // set up the maxPow & thus ratio based on shapeCount
  var maxPow = Math.pow(2,shapeCount/2);
  var ratio = 1024/maxPow;
  var prevRangeStart = 0, prevItemCount = 0, newArr = [];

  // looping - get values for new array based on shapeCount
  for (let j=1; j<shapeCount+1; j++) {
    var itemCount, rangeStart;

    var pow = j/2;

    // use ratio to get itemCount (round)
    itemCount = Math.ceil( ((Math.pow(2, pow))*ratio)/2 );

    rangeStart = prevRangeStart + Math.ceil(prevItemCount/2);
     // get new values
    var newValue = 0, total = 0;
    for (let k=rangeStart; k<rangeStart+itemCount; k++) {
      // add up items and divide by total
      total += arrToChange[k];
      newValue = parseInt(total/itemCount);
    }
    // add to new array
    if (isNaN(newValue)) {
      newArr.push(arrToChange[500]);
    } else {
      newArr.push(newValue);
    }


    prevItemCount = itemCount;
    prevRangeStart = rangeStart;

  }

  return newArr;
}


