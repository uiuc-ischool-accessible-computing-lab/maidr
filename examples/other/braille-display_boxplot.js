// get div that displays braille
const barContainer = document.getElementById('bar-container');
const brailleDiv = document.getElementById('braille-div');
const brailleDisplay = document.getElementById('braille-display');

// focus on braille display
// brailleDisplay.tabIndex = "0";

var range1 = ymin + range;
var range2 = range1 + range;
var range3 = range2 + range;
var range4 = range3 + range;

// Cursor variables
// var currCursor = -1;

// var allowedKeys = {
//     "37" : "arrow-left",
//     "39" : "arrow-right"
// }

var brailleArray = [];
console.log(y_values);
for (var i = 0; i < y_values.length; i++) {
  if (y_values[i] <= range1) {
    brailleArray.push('⣀');
  } else if (y_values[i] <= range2) {
    brailleArray.push('⠤');
  } else if (y_values[i] <= range3) {
    brailleArray.push('⠒');
  } else if (y_values[i] <= range4) {
    brailleArray.push('⠉');
  }
}

var display = false;
var brailleText = brailleArray.join('');
brailleDisplay.innerHTML = brailleText;
brailleDiv.style.display = 'none';

// For input
// brailleDisplay.value = brailleText;
// brailleDisplay.setSelectionRange(0,0);

barContainer.addEventListener('keydown', function (e) {
  if (e.which == 66) {
    if (display) {
      brailleDiv.style.display = 'none';
    } else {
      brailleDiv.style.display = 'block';
    }
    display = !display;
  }

  // Cursor function
  // if (!allowedKeys[e.which]) {
  //     e.preventDefault();
  // }

  // if (currCursor < 0 && e.which == 39) {
  //     e.preventDefault();
  //     currCursor++;
  // } else if (currCursor >= _numBars - 1 && e.which == 39) {
  //     e.preventDefault();
  // } else if (e.which == 39) {
  //     brailleDisplay.setSelectionRange(currCursor, currCursor);
  //     currCursor++;
  // }

  // if (currCursor > _numBars - 1 && e.which == 37) {
  //     e.preventDefault();
  //     currCursor--;
  // } else if (currCursor <= 0 && e.which == 37) {
  //     e.preventDefault();
  // } else if (e.which == 37) {
  //     brailleDisplay.setSelectionRange(currCursor, currCursor);
  //     currCursor--;
  // }
});
