var form = document.getElementById('form');
var submitBtn = document.getElementById('submitBtn');
var invalid_text = document.getElementById('notValid');

var yVal;

form.addEventListener('submit', function (e) {
  e.preventDefault();
  let input = document.getElementById('yVal').value;
  var inputObject = parseJSONObject(input);
  xVal = [];
  yVal = [];
  for (var key in inputObject) {
    if (inputObject.hasOwnProperty(key)) {
      xVal.push(key);
      yVal.push(inputObject[key]);
    }
  }
  // yVal = input.split(",").map(function(item) {
  //     return parseFloat(item.trim());
  // });
  sessionStorage.setItem('xVal', xVal);
  sessionStorage.setItem('yVal', yVal);
  if (yVal.length != _numBars) {
    invalid_text.innerHTML = 'Invalid input';
  } else {
    window.location.assign(
      '/Users/y.yujun/Documents/Data accessiblization/accessible-graph/accessible-graphs/barplot.html'
    );
  }
});

function parseJSONObject(json) {
  try {
    var obj = JSON.parse(json);
    if (obj && typeof obj == 'object') {
      return obj;
    }
  } catch (e) {}
  return false;
}
