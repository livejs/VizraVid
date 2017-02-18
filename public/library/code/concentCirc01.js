const concentCirc01 {
  // center all the things
  var width = window.innerWidth,
      height = window.innerHeight,
      radius = Math.min(width, height) / 2;

  var svg = d3.select("svg")
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height * .52 + ")");
  var g = d3.select("g");
  var arcs = g.selectAll("path");

  var arc = d3.svg.arc()
      .startAngle(0)
      .endAngle(function(d) {return d/40;})
      .innerRadius(function(d,i) {return i*30;})
      .outerRadius(function(d,i) {return (i+1)*30});

  function animate() {
    requestAnimationFrame(drawSunburst);
    analyserNode.getByteFrequencyData(frequencyData);

    arcs = arcs.data(frequencyData);

    arcs
      .enter().append("path")
      .style("stroke", "#fff");

    arcs
      .attr("d", arc)
      .style("fill", function(d,i) { return 'hsla('+i*6+',60%,'+Math.floor(d/1.5)+'%,'+d/255+')'; })
      .exit().remove();
  }
}