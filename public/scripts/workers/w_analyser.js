onmessage = function(data) {

  console.log(data);

  // have this return one array for mix
  // one set for first function
  // one set for second function

  var newAr = data.freqs.slice(0,1024);

  postMessage({'newAr': newAr});

  // function adjustFreqData(shapeNo) {
  
  //   var removed = frequencyData.slice(0,1024);
    
  //   var newFreqs = [], lowFreqs, midFreqs, highFreqs, prevRangeStart = 0, prevItemCount = 0;

  //   // set up the maxPow & thus ratio based on shapeCount
  //   var maxPow = Math.pow(2,shapeNo/2);
  //   var ratio = 1024/maxPow;
    
  //   // looping - get values for new array based on shapeCount
  //   for (let j=1; j<shapeNo+1; j++) {
  //     var itemCount, rangeStart;

  //     var pow = j/2;

  //     // use ratio to get itemCount (round)
  //     itemCount = Math.ceil( ((Math.pow(2, pow))*ratio)/2 );

  //     rangeStart = prevRangeStart + Math.ceil(prevItemCount/2);
  //      // get new values
  //     var newValue = 0, total = 0;
  //     for (let k=rangeStart; k<rangeStart+itemCount; k++) {
  //       // add up items and divide by total
  //       total += frequencyData[k];
  //       newValue = parseInt(total/itemCount);
  //     }
  //     // add to new array
  //     newFreqs.push(newValue);

  //     prevItemCount = itemCount;
  //     prevRangeStart = rangeStart;
  //   }

  //   var oneThird = Math.floor(shapeNo/3);

  //   function avFreqs(arrPart) {
  //     var arrPart = arrPart;
  //     var avValue;
  //     var totalVal = 0;
  //     for (let l=0; l<arrPart.length; l++) {
  //       totalVal += arrPart[l];
  //     }
  //     avValue = Math.floor(totalVal/arrPart.length);
  //     return avValue;
  //   }

  //   lowFreqs = avFreqs(newFreqs.slice(0,oneThird));
  //   midFreqs = avFreqs(newFreqs.slice(oneThird, oneThird*2));
  //   highFreqs = avFreqs(newFreqs.slice(oneThird*2));
    
  //   return {
  //     newFreqs: newFreqs,
  //     lowFreqs: lowFreqs,
  //     midFreqs: midFreqs,
  //     highFreqs: highFreqs
  //   };
  // }
  
}