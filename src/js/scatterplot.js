class ScatterPlot {
  constructor() {
    this.prefix = this.GetPrefix();
    this.SetVisualHighlight();
    this.SetScatterLayer();
    this.SetLineLayer();
    this.SetAxes();
    this.svgScaler = this.GetSVGScaler();
  }

  SetVisualHighlight() {
    let point_index = this.GetElementIndex('point');
    let smooth_index = this.GetElementIndex('smooth');
    if (point_index && smooth_index && elements < 2) {
      logError.LogAbsentElement('point or/and smooth line elements');
    }
    if (point_index != -1) {
      this.CheckData(point_index);
    }

    if (smooth_index != -1) {
      this.CheckData(smooth_index);
    }
  }

  // stop visual highlight for both layers even if only one layer is absent to avoid confusion
  CheckData(i) {
    let elements = 'elements' in singleMaidr ? singleMaidr.elements : null;

    // elements does not exist at all
    if (elements == null) {
      logError.LogAbsentElement('elements');
      // if (singleMaidr.type[i] == 'point') {
      //   constants.hasRect = 0;
      // } else if (singleMaidr.type[i] == 'smooth') {
      //   constants.hasSmooth = 0;
      // }
      constants.hasRect = 0;
      constants.hasSmooth = 0;
      return;
    }

    // elements exists but is empty
    if (elements.length == 0) {
      logError.LogAbsentElement('elements');
      // if (singleMaidr.type[i] == 'point') {
      //   constants.hasRect = 0;
      // } else if (singleMaidr.type[i] == 'smooth') {
      //   constants.hasSmooth = 0;
      // }
      constants.hasRect = 0;
      constants.hasSmooth = 0;
      return;
    }

    // elements exists but is not an array
    if (!Array.isArray(elements)) {
      logError.LogNotArray('elements');
      // if (singleMaidr.type[i] == 'point') {
      //   constants.hasRect = 0;
      // } else if (singleMaidr.type[i] == 'smooth') {
      //   constants.hasSmooth = 0;
      // }
      constants.hasRect = 0;
      constants.hasSmooth = 0;
      return;
    }

    // elements.length is more than 2
    if (elements.length > 2) {
      logError.LogTooManyElements('elements', 2);
    }

    if (singleMaidr.elements.length != singleMaidr.type.length) {
      constants.hasRect = 0;
      constants.hasSmooth = 0;
      if (singleMaidr.elements.length > singleMaidr.type.length) {
        logError.LogDifferentLengths('elements', 'type');
        throw new Error('elements and type have different lengths');
      }
    }

    // if ('data' in singleMaidr) {
    //   if (singleMaidr.type[i] == 'point') {
    //     // check point elements
    //     if (singleMaidr.data[i] == null) {
    //       constants.hasRect = 0;
    //       logError.LogDifferentLengths('point data', 'point elements');
    //     }
    //   } else if (singleMaidr.type[i] == 'smooth') {
    //     // check smooth line elements
    //     if (
    //       singleMaidr.data[i] == null ||
    //       !Array.isArray(singleMaidr.data[i])
    //     ) {
    //       constants.hasSmooth = 0;
    //       logError.LogDifferentLengths(
    //         'smooth line data',
    //         'smooth line elements'
    //       );
    //     }
    //   }
    // }
  }

  SetAxes() {
    this.x_group_label = '';
    this.y_group_label = '';
    this.title = '';
    if ('labels' in singleMaidr) {
      if ('x' in singleMaidr.labels) {
        this.x_group_label = singleMaidr.labels.x;
      }
      if ('y' in singleMaidr.labels) {
        this.y_group_label = singleMaidr.labels.y;
      }
      if ('title' in singleMaidr.labels) {
        this.title = singleMaidr.labels.title;
      }
    }
    if ('axes' in singleMaidr) {
      if ('x' in singleMaidr.axes) {
        if (this.x_group_label == '') {
          this.x_group_label = singleMaidr.axes.x.label;
        }
      }
      if ('y' in singleMaidr.axes) {
        if (this.y_group_label == '') {
          this.y_group_label = singleMaidr.axes.y.label;
        }
      }
    }
    if ('title' in singleMaidr) {
      if (this.title == '') {
        this.title = singleMaidr.title;
      }
    }
  }

  SetScatterLayer() {
    // initially set as smooth layer (layer 2), if possible
    let elIndex = this.GetElementIndex('point');
    if (elIndex != -1) {
      this.plotPoints = singleMaidr.elements[elIndex];
    } else if (singleMaidr.type == 'point') {
      this.plotPoints = singleMaidr.elements;
    }
    if (typeof this.plotPoints !== 'undefined') {
      let svgPointCoords = this.GetSvgPointCoords();

      this.chartPointsX = svgPointCoords[0]; // x coordinates of points
      this.chartPointsY = svgPointCoords[1]; // y coordinates of points
    }

    let pointValues = this.GetPointValues();
    this.x = pointValues[0]; // actual values of x
    this.y = pointValues[1]; // actual values of y
    // for sound weight use
    this.points_count = pointValues[2]; // number of each points
    this.max_count = pointValues[3];
  }

  SetLineLayer() {
    // layer = 2, smooth layer (from singleMaidr types)
    let elIndex = this.GetElementIndex('smooth');
    if (elIndex != -1) {
      this.plotLine = singleMaidr.elements[elIndex];
    } else if (singleMaidr.type == 'smooth') {
      this.plotLine = singleMaidr.elements;
    }
    if (typeof this.plotLine !== 'undefined') {
      let svgLineCoords = this.GetSvgLineCoords();

      this.chartLineX = svgLineCoords[0]; // x coordinates of curve
      this.chartLineY = svgLineCoords[1]; // y coordinates of curve
    }

    let smoothCurvePoints = this.GetSmoothCurvePoints();
    if (smoothCurvePoints) {
      this.curveX = smoothCurvePoints[0]; // actual values of x
      this.curvePoints = smoothCurvePoints[1]; // actual values of y

      this.curveMinY = Math.min(...this.curvePoints);
      this.curveMaxY = Math.max(...this.curvePoints);
      this.gradient = this.GetGradient();
    }
  }

  GetSvgPointCoords() {
    let points = new Map();

    for (let i = 0; i < this.plotPoints.length; i++) {
      let x = parseFloat(this.plotPoints[i].getAttribute(this.prefix + 'x')); // .toFixed(1);
      let y = parseFloat(this.plotPoints[i].getAttribute(this.prefix + 'y'));
      if (!points.has(x)) {
        points.set(x, new Set([y]));
      } else {
        points.get(x).add(y);
      }
    }

    points = new Map(
      [...points].sort(function (a, b) {
        return a[0] - b[0];
      })
    );

    points.forEach(function (value, key) {
      points[key] = Array.from(value).sort(function (a, b) {
        return a - b;
      });
    });

    let X = [...points.keys()];

    let Y = [];
    for (let i = 0; i < X.length; i++) {
      Y.push(points[X[i]]);
    }

    return [X, Y];
  }

  GetElementIndex(elementName = 'point') {
    let elIndex = -1;
    if ('type' in singleMaidr) {
      elIndex = singleMaidr.type.indexOf(elementName);
    }
    return elIndex;
  }

  GetDataXYFormat(dataIndex) {
    // detect if data is in form [{x: 1, y: 2}, {x: 2, y: 3}] (object) or {x: [1, 2], y: [2, 3]]} (array)
    let xyFormat = 'array';
    if (singleMaidr.data[dataIndex]) {
      if (Array.isArray(singleMaidr.data[dataIndex])) {
        xyFormat = 'object';
      }
    }
    return xyFormat;
  }

  GetSVGScaler() {
    let scaleX = 1;
    let scaleY = 1;
    // start with some square (first), look all the way up the parents to the svg, and record any scales along the way

    // but first, are we even in an svg that can be scaled?
    let isSvg = false;
    let element = this.plotPoints[0]; // a random start, may as well be the first
    while (element) {
      if (element.tagName.toLowerCase() == 'body') {
        break;
      }
      if (element.tagName && element.tagName.toLowerCase() === 'svg') {
        isSvg = true;
      }
      element = element.parentNode;
    }

    if (isSvg) {
      let element = this.plotPoints[0]; // a random start, may as well be the first
      while (element) {
        if (element.tagName.toLowerCase() == 'body') {
          break;
        }
        if (element.getAttribute('transform')) {
          let transform = element.getAttribute('transform');
          let match = transform.match(
            /scale\((-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)\)/
          );
          if (match) {
            if (!isNaN(match[1])) {
              scaleX *= parseFloat(match[1]);
            }
            if (!isNaN(match[3])) {
              scaleY *= parseFloat(match[3]);
            }
          }
        }
        element = element.parentNode;
      }
    }

    return [scaleX, scaleY];
  }

  GetPrefix() {
    let elIndex = this.GetElementIndex('point');
    let element;
    if (elIndex != -1) {
      element = singleMaidr.elements[elIndex][0];
    } else if (singleMaidr.type == 'point') {
      element = singleMaidr.elements[0];
    }
    let prefix = '';
    if ('element' in singleMaidr && element.tagName.toLowerCase() == 'circle') {
      prefix = 'c';
    }
    return prefix;
  }

  GetPointValues() {
    let points = new Map(); // keep track of x and y values

    let xValues = [];
    let yValues = [];

    // prepare to fetch data from the correct index in the correct format
    let elIndex = this.GetElementIndex('point');
    let xyFormat = this.GetDataXYFormat(elIndex);

    let data;
    if (elIndex > -1) {
      // data comes directly as an array, in a 'point' layer, so fetch directly as an array from that index
      data = singleMaidr.data[elIndex];
    } else if (singleMaidr.type == 'point') {
      // data comes directly as an array, no 'point' layer, so fetch directly as an array
      data = singleMaidr.data;
    }
    if (typeof data !== 'undefined') {
      // assuming we got something, loop through the data and extract the x and y values

      if (xyFormat == 'array') {
        if ('x' in singleMaidr.data[elIndex]) {
          xValues = singleMaidr.data[elIndex]['x'];
        }
        if ('y' in singleMaidr.data[elIndex]) {
          yValues = singleMaidr.data[elIndex]['y'];
        }
      } else if (xyFormat == 'object') {
        for (let i = 0; i < singleMaidr.data[elIndex].length; i++) {
          let x = singleMaidr.data[elIndex][i]['x'];
          let y = singleMaidr.data[elIndex][i]['y'];
          xValues.push(x);
          yValues.push(y);
        }
      }

      for (let i = 0; i < xValues.length; i++) {
        let x = xValues[i];
        let y = yValues[i];
        if (!points.has(x)) {
          points.set(x, new Map([[y, 1]]));
        } else {
          if (points.get(x).has(y)) {
            let mapy = points.get(x);
            mapy.set(y, mapy.get(y) + 1);
          } else {
            points.get(x).set(y, 1);
          }
        }
      }

      constants.minX = 0;
      constants.maxX = [...new Set(xValues)].length;

      constants.minY = Math.min(...yValues);
      constants.maxY = Math.max(...yValues);

      constants.autoPlayRate = Math.min(
        Math.ceil(constants.AUTOPLAY_DURATION / (constants.maxX + 1)),
        constants.MAX_SPEED
      );
      constants.DEFAULT_SPEED = constants.autoPlayRate;

      points = new Map(
        [...points].sort(function (a, b) {
          return a[0] - b[0];
        })
      );

      points.forEach(function (value, key) {
        points[key] = Array.from(value).sort(function (a, b) {
          return a[0] - b[0];
        });
      });

      let X = [];
      let Y = [];
      let points_count = [];
      for (const [x_val, y_val] of points) {
        X.push(x_val);
        let y_arr = [];
        let y_count = [];
        for (const [y, count] of y_val) {
          y_arr.push(y);
          y_count.push(count);
        }
        Y.push(y_arr.sort());
        points_count.push(y_count);
      }
      let max_points = Math.max(...points_count.map((a) => Math.max(...a)));

      return [X, Y, points_count, max_points];
    } else {
      return;
    }
  }

  PlayTones(audio) {
    // kill the previous separate-points play before starting the next play
    if (constants.sepPlayId) {
      constants.KillSepPlay();
    }
    if (constants.chartType == 'point') {
      // point layer
      // we play a run of tones
      position.z = 0;
      constants.sepPlayId = setInterval(
        function () {
          // play this tone
          audio.playTone();

          // and then set up for the next one
          position.z += 1;

          // and kill if we're done
          if (position.z + 1 > plot.y[position.x].length) {
            constants.KillSepPlay();
            position.z = -1;
          }
        },
        constants.sonifMode == 'on' ? constants.autoPlayPointsRate : 0
      ); // play all tones at the same time
    } else if (constants.chartType == 'smooth') {
      // best fit smooth layer
      audio.playTone();
    }
  }

  GetSvgLineCoords() {
    // extract all the y coordinates from the point attribute of polyline
    let str = this.plotLine.getAttribute('points');
    let coords = str.split(' ');

    let X = [];
    let Y = [];

    for (let i = 0; i < coords.length; i++) {
      let coord = coords[i].split(',');
      X.push(parseFloat(coord[0]));
      Y.push(parseFloat(coord[1]));
    }

    return [X, Y];
  }

  GetSmoothCurvePoints() {
    let x_points = [];
    let y_points = [];

    let elIndex = this.GetElementIndex('smooth');
    let xyFormat = this.GetDataXYFormat(elIndex);

    let data;
    if (elIndex > -1) {
      // data comes directly as an array, in a 'smooth' layer, so fetch directly as an array from that index
      data = singleMaidr.data[elIndex];
    } else if (singleMaidr.type == 'smooth') {
      // data comes directly as an array, no 'smooth' layer, so fetch directly as an array
      data = singleMaidr.data;
    }
    if (typeof data !== 'undefined') {
      if (xyFormat == 'object') {
        for (let i = 0; i < singleMaidr.data[elIndex].length; i++) {
          x_points.push(singleMaidr.data[elIndex][i]['x']);
          y_points.push(singleMaidr.data[elIndex][i]['y']);
        }
      } else if (xyFormat == 'array') {
        if ('x' in singleMaidr.data[elIndex]) {
          x_points = singleMaidr.data[elIndex]['x'];
        }
        if ('y' in singleMaidr.data[elIndex]) {
          y_points = singleMaidr.data[elIndex]['y'];
        }
      }

      return [x_points, y_points];
    } else {
      return;
    }
  }

  GetGradient() {
    let gradients = [];

    for (let i = 0; i < this.curvePoints.length - 1; i++) {
      let abs_grad = Math.abs(
        (this.curvePoints[i + 1] - this.curvePoints[i]) /
          (this.curveX[i + 1] - this.curveX[i])
      ).toFixed(3);
      gradients.push(abs_grad);
    }

    gradients.push('end');

    return gradients;
  }
}

class Layer0Point {
  // circles

  constructor() {
    this.x = plot.chartPointsX[0];
    this.y = plot.chartPointsY[0];
    this.strokeWidth = 1.35;
    this.circleIndex = [];
  }

  async UpdatePoints() {
    await this.ClearPoints();
    this.x = plot.chartPointsX[position.x];
    this.y = plot.chartPointsY[position.x];
    // find which circles we're on by searching for the x value
    this.circleIndex = [];
    for (let j = 0; j < this.y.length; j++) {
      for (let i = 0; i < plot.plotPoints.length; i++) {
        if (
          plot.plotPoints[i].getAttribute(plot.prefix + 'x') == this.x &&
          plot.plotPoints[i].getAttribute(plot.prefix + 'y') == this.y[j]
        ) {
          this.circleIndex.push(i);
          break;
        }
      }
    }
  }

  async PrintPoints() {
    await this.ClearPoints();
    await this.UpdatePoints();
    for (let i = 0; i < this.circleIndex.length; i++) {
      const svgns = 'http://www.w3.org/2000/svg';
      var point = document.createElementNS(svgns, 'circle');
      point.setAttribute('class', 'highlight_point');
      point.setAttribute('cx', this.x);
      if (plot.svgScaler[1] == -1) {
        point.setAttribute(
          'cy',
          constants.chart.getBoundingClientRect().height - this.y[i]
        );
      } else {
        point.setAttribute(
          'cy',
          plot.plotPoints[this.circleIndex[i]].getAttribute('cy')
        );
      }
      point.setAttribute('r', 3.95);
      point.setAttribute('stroke', constants.colorSelected);
      point.setAttribute('stroke-width', this.strokeWidth);
      point.setAttribute('fill', constants.colorSelected);
      if (plot.svgScaler[1] == -1) {
        constants.chart.appendChild(point);
      } else {
        plot.plotPoints[this.circleIndex[i]].parentNode.appendChild(point);
      }
    }
  }

  async ClearPoints() {
    if (document.getElementById('highlight_point'))
      document.getElementById('highlight_point').remove();
    let points = document.getElementsByClassName('highlight_point');
    for (let i = 0; i < points.length; i++) {
      document.getElementsByClassName('highlight_point')[i].remove();
    }
  }

  UpdatePointDisplay() {
    this.ClearPoints();
    this.UpdatePoints();
    this.PrintPoints();
  }
}

class Layer1Point {
  // smooth segments

  constructor() {
    this.x = plot.chartLineX[0];
    this.y = plot.chartLineY[0];
    this.strokeWidth = 1.35;
  }

  async UpdatePoints() {
    await this.ClearPoints();
    this.x = plot.chartLineX[positionL1.x];
    this.y = plot.chartLineY[positionL1.x];
  }

  async PrintPoints() {
    await this.ClearPoints();
    await this.UpdatePoints();
    const svgns = 'http://www.w3.org/2000/svg';
    var point = document.createElementNS(svgns, 'circle');
    point.setAttribute('id', 'highlight_point');
    point.setAttribute('cx', this.x);
    if (plot.svgScaler[1] == -1) {
      point.setAttribute(
        'cy',
        constants.chart.getBoundingClientRect().height - this.y
      );
    } else {
      point.setAttribute('cy', this.y);
    }
    point.setAttribute('r', 3.95);
    point.setAttribute('stroke', constants.colorSelected);
    point.setAttribute('stroke-width', this.strokeWidth);
    point.setAttribute('fill', constants.colorSelected);
    if (plot.svgScaler[1] == -1) {
      constants.chart.appendChild(point);
    } else {
      plot.plotLine.parentNode.appendChild(point);
    }
  }

  async ClearPoints() {
    let points = document.getElementsByClassName('highlight_point');
    for (let i = 0; i < points.length; i++) {
      document.getElementsByClassName('highlight_point')[i].remove();
    }
    if (document.getElementById('highlight_point'))
      document.getElementById('highlight_point').remove();
  }

  UpdatePointDisplay() {
    this.ClearPoints();
    this.UpdatePoints();
    this.PrintPoints();
  }
}
