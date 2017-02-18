const spectrum01 = {

  dom: function dom() {
    screen.innerHTML = '<section><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></section>';
  },
  get allEls() {
    return document.querySelectorAll('#screen i'); 
  },
  set totalEls() {
    this.allEls.length;
  },

  // function css() {},

  animate: function animate() {
    for (let i=0; i<totalEls; i++) {
      //style i
      allEls[i].style.display = 'inline-block';
      allEls[i].style.width = '20px';
      allEls[i].style.backgroundColor = 'hsla(0,50%,50%,1)';

      var freqVol = frequencyData[i*16]/2;
      allEls[i].style.height = freqVol+'vh';
    }
  }
  
}
