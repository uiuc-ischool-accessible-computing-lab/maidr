class LinePlot {
  constructor() {
    this.SetLineLayer();
    this.SetAxes();

    let elements = null;
    if ('elements' in singleMaidr) {
      elements = singleMaidr.elements;
    }

    if (elements == null) {
      constants.hasRect = 0;
      logError.LogAbsentElement('elements');
    }

    let legendX = '';
    let legendY = '';
    if ('axes' in singleMaidr) {
      // legend labels
      if (singleMaidr.axes.x) {
        if (singleMaidr.axes.x.label) {
          if (legendX == '') {
            legendX = singleMaidr.axes.x.label;
          }
        }
      }
      if (singleMaidr.axes.y) {
        if (singleMaidr.axes.y.label) {
          if (legendY == '') {
            legendY = singleMaidr.axes.y.label;
          }
        }
      }
    }

    this.plotLegend = {
      x: legendX,
      y: legendY,
    };

    // title
    this.title = '';
    if ('labels' in singleMaidr) {
      if ('title' in singleMaidr.labels) {
        this.title = singleMaidr.labels.title;
      }
    }
    if (this.title == '') {
      if ('title' in singleMaidr) {
        this.title = singleMaidr.title;
      }
    }

    // subtitle
    if ('labels' in singleMaidr) {
      if ('subtitle' in singleMaidr.labels) {
        this.subtitle = singleMaidr.labels.subtitle;
      }
    }
    // caption
    if ('labels' in singleMaidr) {
      if ('caption' in singleMaidr.labels) {
        this.caption = singleMaidr.labels.caption;
      }
    }
  }

  SetLineLayer() {
    if ('elements' in singleMaidr) {
      let len = maidr.elements.length;
      this.plotLine = maidr.elements[len - 1];
    }
    if (typeof this.plotLine !== 'undefined') {
      let pointCoords = this.GetPointCoords();

      this.chartLineX = pointCoords[0]; // x coordinates of curve
      this.chartLineY = pointCoords[1]; // y coordinates of curve
    }

    let pointValues = this.GetPoints();
    this.pointValuesX = pointValues[0]; // actual values of x
    this.pointValuesY = pointValues[1]; // actual values of y

    this.curveMinY = Math.min(...this.pointValuesY);
    this.curveMaxY = Math.max(...this.pointValuesY);
    constants.minX = 0;
    constants.maxX = this.pointValuesX.length - 1;
    constants.minY = this.curveMinY;
    constants.maxY = this.curveMaxY;

    constants.autoPlayRate = Math.min(
      Math.ceil(constants.AUTOPLAY_DURATION / (constants.maxX + 1)),
      constants.MAX_SPEED
    );
    constants.DEFAULT_SPEED = constants.autoPlayRate;

    // this.gradient = this.GetGradient();
  }

  GetPointCoords() {
    let svgLineCoords = [[], []];
    let points = this.plotLine.getAttribute('points').split(' ');
    for (let i = 0; i < points.length; i++) {
      if (points[i] !== '') {
        let point = points[i].split(',');
        svgLineCoords[0].push(point[0]);
        svgLineCoords[1].push(point[1]);
      }
    }
    return svgLineCoords;
  }

  GetPoints() {
    let x_points = [];
    let y_points = [];

    let data;
    if ('data' in singleMaidr) {
      data = singleMaidr.data;
    }
    if (typeof data !== 'undefined') {
      for (let i = 0; i < data.length; i++) {
        x_points.push(data[i].x);
        y_points.push(data[i].y);
      }
      return [x_points, y_points];
    } else {
      return;
    }
  }

  // GetGradient() {
  //   let gradients = [];

  //   for (let i = 0; i < this.pointValuesY.length - 1; i++) {
  //     let abs_grad = Math.abs(
  //       (this.pointValuesY[i + 1] - this.pointValuesY[i]) /
  //         (this.pointValuesX[i + 1] - this.pointValuesX[i])
  //     ).toFixed(3);
  //     gradients.push(abs_grad);
  //   }

  //   gradients.push('end');

  //   return gradients;
  // }

  SetAxes() {
    this.x_group_label = '';
    this.y_group_label = '';
    this.title = '';
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
}

class Point {
  constructor() {
    this.x = plot.chartLineX[0];
    this.y = plot.chartLineY[0];
  }

  async UpdatePoints() {
    await this.ClearPoints();
    this.x = plot.chartLineX[position.x];
    this.y = plot.chartLineY[position.x];
  }

  async PrintPoints() {
    await this.ClearPoints();
    await this.UpdatePoints();
    const svgns = 'http://www.w3.org/2000/svg';
    var point = document.createElementNS(svgns, 'circle');
    point.setAttribute('id', 'highlight_point');
    point.setAttribute('cx', this.x);
    point.setAttribute('cy', this.y);
    point.setAttribute('r', 1.75);
    point.setAttribute(
      'style',
      'fill:' + constants.colorSelected + ';stroke:' + constants.colorSelected
    );
    constants.chart.appendChild(point);
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
