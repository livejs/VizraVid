var vizraMake = {
  
  // make degrees into radians
  radians: function(degrees) {
    return degrees * Math.PI / 180;
  },

  // screen dimensions
  screen: {
    width: window.innerWidth,
    height: window.innerHeight,
    centerX: window.innerWidth/2,
    centerY: window.innerHeight/2,
    maxRadius: (window.innerHeight-(window.innerWidth/6))/2,
    minRadius: (window.innerHeight/10)/2
  };

  // 
  distribute: {

    // params = total number of items, how spaced out they are (int between 0-1), whether the distribution is uniform or random
    twoDee: function(itemCount, spaceHog, uniform = true) {

      const spaceHog = spaceHog;



    }

  }

}