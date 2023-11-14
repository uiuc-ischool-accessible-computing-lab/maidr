// Ths file records all the trials.

// First trial
/*
var svg = document.getElementById("barplotsvg");
var barplot = svg.contentDocument;
window.addEventListener("load" ,function() {
  console.log(barplot);
  var firstBar = barplot.getElementsByTagName("rect")[0];
  console.log(firstBar);
  document.addEventListener("keydown", function(e) {
    if (e.key === 39) {
      firstBar.setAttribute('fill', 'rgb(3,200,9)');
    }
  });
});
*/

// sample addEventListener
/*
var input = document.getElementById("demo");
input.addEventListener("keydown", function(e) {
    if (e.which === 39) input.style.backgroundColor = "red";
});
*/

/*$(document).ready(function() {
    $("#barplotsvg").contents().find("#geom_rect.rect.56.1.1").attr({"fill":"red"});
});
$(window).on("keypress", function(e) {
    if (e.keyCode === 39) {
        alert("it works!");
        $("#barplotsvg").contents().find("#geom_rect.rect.56.1.1").addClass("animated shake");
    }
});*/

// D3.js method
/*
import * as d3 from "/Users/y.yujun/Documents/accessible-graphs/node_modules";
d3.xml("/Users/y.yujun/Documents/accessible-graphs/barplot.svg", function(error, xml) {
  if (error) throw error;
                
  var svg = xml.documentElement;
  document.body.appendChild(svg);
  console.log(svg);
  document.body.append("rect").attr("x", 47.88).attr("y", 63.4).attr("width", 86.4).attr("height", 50.79).style("stroke", "black").style("fill", "black");
});
*/

// const audioElement = document.querySelector('audio');
// const track = audioContext.createMediaElementSource(audioElement);

// var stereoNode = new StereoPannerNode(audioContext, { pan: 0 });
// stereoNode.pan.value = -1;

// track.connect(merger).connect(audioContext.destination);
