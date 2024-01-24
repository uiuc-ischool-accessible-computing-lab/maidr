/**
 * A class representing a heatmap.
 * @class
 */
class HeatMap {
  /**
   * Creates a new Heatmap object.
   * @constructor
   */
  constructor() {
    // initialize variables xlevel, data, and elements
    let xlevel = null;
    let ylevel = null;
    if ('axes' in singleMaidr) {
      if (singleMaidr.axes.x) {
        if (singleMaidr.axes.x.level) {
          xlevel = singleMaidr.axes.x.level;
        }
      }
      if (singleMaidr.axes.y) {
        if (singleMaidr.axes.y.level) {
          ylevel = singleMaidr.axes.y.level;
        }
      }
    }
    let data = null;
    let dataLength = 0;
    if ('data' in singleMaidr) {
      data = singleMaidr.data;
      for (let i = 0; i < data.length; i++) {
        dataLength += data[i].length;
      }
    }
    let elements = null;
    if ('selector' in singleMaidr) {
      elements = document.querySelectorAll(singleMaidr.selector);
    }

    // if (xlevel && ylevel && data && elements) {
    //   if (elements.length != dataLength) {
    //     // I didn't throw an error but give a warning
    //     constants.hasRect = 0;
    //     logError.LogDifferentLengths('data', 'elements');
    //   } else if (ylevel.length != data.length) {
    //     constants.hasRect = 0;
    //     logError.logDifferentLengths('y level', 'rows');
    //   } else if (data[0].length != xlevel.length) {
    //     constants.hasRect = 0;
    //     logError.logDifferentLengths('x level', 'columns');
    //   } else {
    //     this.plots = elements;
    //     constants.hasRect = 1;
    //   }
    // } else if (ylevel && data && elements) {
    //   if (dataLength != elements.length) {
    //     constants.hasRect = 0;
    //     logError.logDifferentLengths('data', 'elements');
    //   } else if (ylevel.length != data.length) {
    //     constants.hasRect = 0;
    //     logError.logDifferentLengths('y level', 'rows');
    //   } else {
    //     this.plots = elements;
    //     constants.hasRect = 1;
    //   }
    // } else if (xlevel && data && elements) {
    //   if (dataLength != elements.length) {
    //     constants.hasRect = 0;
    //     logError.logDifferentLengths('data', 'elements');
    //   } else if (xlevel.length != data[0].length) {
    //     constants.hasRect = 0;
    //     logError.logDifferentLengths('x level', 'columns');
    //   } else {
    //     this.plots = elements;
    //     constants.hasRect = 1;
    //   }
    // }
    // else if (xlevel && ylevel && data) {
    //   constants.hasRect = 0;
    //   if (ylevel.length != data.length) {
    //     logError.logDifferentLengths('y level', 'rows');
    //   } else if (data[0].length != xlevel.length) {
    //     logError.logDifferentLengths('x level', 'columns');
    //   }
    //   logError.LogAbsentElement('elements');
    // }
    // else if (data && elements) {
    //   if (dataLength != elements.length) {
    //     constants.hasRect = 0;
    //     logError.logDifferentLengths('data', 'elements');
    //   } else {
    //     this.plots = elements;
    //     constants.hasRect = 1;
    //   }
    // } else if (data) {
    //   constants.hasRect = 0;
    //   if (!xlevel) logError.LogAbsentElement('x level');
    //   if (!ylevel) logError.LogAbsentElement('y level');
    //   if (!elements) logError.LogAbsentElement('elements');
    // }

    this.plots = elements;
    constants.hasRect = 1;

    this.group_labels = this.getGroupLabels();
    // this.x_labels = this.getXLabels();
    // this.y_labels = this.getYLabels();
    this.x_labels = xlevel;
    this.y_labels = ylevel;
    this.title = this.getTitle();
    this.fill = this.getFill();

    this.plotData = this.getHeatMapData();
    this.updateConstants();

    this.x_coord = this.plotData[0];
    this.y_coord = this.plotData[1];
    this.values = this.plotData[2];
    this.num_rows = this.plotData[3];
    this.num_cols = this.plotData[4];

    this.x_group_label = this.group_labels[0].trim();
    this.y_group_label = this.group_labels[1].trim();
  }

  /**
   * Returns an array of heatmap data containing unique x and y coordinates, norms, number of rows, and number of columns.
   * If 'data' exists in singleMaidr, it returns the norms from the data. Otherwise, it calculates the norms from the unique x and y coordinates.
   * @returns {Array} An array of heatmap data containing unique x and y coordinates, norms, number of rows, and number of columns.
   */
  getHeatMapData() {
    // get the x_coord and y_coord to check if a square exists at the coordinates
    let x_coord_check = [];
    let y_coord_check = [];

    let unique_x_coord = [];
    let unique_y_coord = [];
    if (constants.hasRect) {
      for (let i = 0; i < this.plots.length; i++) {
        if (this.plots[i]) {
          // heatmap SVG containing path element instead of rect
          if (this.plots[i] instanceof SVGPathElement) {
            // Assuming the path data is in the format "M x y L x y L x y L x y"
            const path_d = this.plots[i].getAttribute('d');
            const coords = path_d.match(/[\d\.]+/g).map(Number);

            const x = coords[0];
            const y = coords[1];

            x_coord_check.push(parseFloat(x));
            y_coord_check.push(parseFloat(y));
          } else {
            x_coord_check.push(parseFloat(this.plots[i].getAttribute('x')));
            y_coord_check.push(parseFloat(this.plots[i].getAttribute('y')));
          }
        }
      }

      // sort the squares to access from left to right, up to down
      x_coord_check.sort(function (a, b) {
        return a - b;
      }); // ascending
      y_coord_check.sort(function (a, b) {
        return a - b;
      });

      let svgScaler = this.GetSVGScaler();
      // inverse scale if svg is scaled
      if (svgScaler[0] == -1) {
        x_coord_check = x_coord_check.reverse();
      }
      if (svgScaler[1] == -1) {
        y_coord_check = y_coord_check.reverse();
      }

      // get unique elements from x_coord and y_coord
      unique_x_coord = [...new Set(x_coord_check)];
      unique_y_coord = [...new Set(y_coord_check)];
    }

    // get num of rows, num of cols, and total numbers of squares
    let num_rows = 0;
    let num_cols = 0;
    let num_squares = 0;
    if ('data' in singleMaidr) {
      num_rows = singleMaidr.data.length;
      num_cols = singleMaidr.data[0].length;
    } else {
      num_rows = unique_y_coord.length;
      num_cols = unique_x_coord.length;
    }
    num_squares = num_rows * num_cols;

    let norms = [];
    if ('data' in singleMaidr) {
      norms = [...singleMaidr.data];
    } else {
      norms = Array(num_rows)
        .fill()
        .map(() => Array(num_cols).fill(0));
      let min_norm = 3 * Math.pow(255, 2);
      let max_norm = 0;

      for (var i = 0; i < this.plots.length; i++) {
        var x_index = unique_x_coord.indexOf(x_coord_check[i]);
        var y_index = unique_y_coord.indexOf(y_coord_check[i]);
        let norm = this.getRGBNorm(i);
        norms[y_index][x_index] = norm;

        if (norm < min_norm) min_norm = norm;
        if (norm > max_norm) max_norm = norm;
      }
    }

    let plotData = [unique_x_coord, unique_y_coord, norms, num_rows, num_cols];

    return plotData;
  }

  /**
   * Updates the constants used in the heatmap.
   */
  updateConstants() {
    constants.minX = 0;
    constants.maxX = this.plotData[4];
    constants.minY = this.plotData[2][0][0]; // initial val
    constants.maxY = this.plotData[2][0][0]; // initial val
    for (let i = 0; i < this.plotData[2].length; i++) {
      for (let j = 0; j < this.plotData[2][i].length; j++) {
        if (this.plotData[2][i][j] < constants.minY)
          constants.minY = this.plotData[2][i][j];
        if (this.plotData[2][i][j] > constants.maxY)
          constants.maxY = this.plotData[2][i][j];
      }
    }
    constants.autoPlayRate = Math.min(
      Math.ceil(constants.AUTOPLAY_DURATION / (constants.maxX + 1)),
      constants.MAX_SPEED
    );
    constants.DEFAULT_SPEED = constants.autoPlayRate;
    if (constants.autoPlayRate < constants.MIN_SPEED) {
      constants.MIN_SPEED = constants.autoPlayRate;
    }
  }

  /**
   * Plays a tone using the audio object.
   */
  PlayTones() {
    audio.playTone();
  }

  /**
   * Returns an array of the X and Y scales of the first SVG element found in the plots array.
   * @returns {Array<number>} An array containing the X and Y scales of the SVG element.
   */
  GetSVGScaler() {
    let scaleX = 1;
    let scaleY = 1;
    // start with some square (first), look all the way up the parents to the svg, and record any scales along the way

    // but first, are we even in an svg that can be scaled?
    let isSvg = false;
    let element = this.plots[0]; // a random start, may as well be the first
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
      let element = this.plots[0]; // a random start, may as well be the first
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

  /**
   * Returns the sum of squared values of the RGB color of a plot element.
   * @param {number} i - The index of the plot element.
   * @returns {number} The sum of squared values of the RGB color.
   */
  getRGBNorm(i) {
    let rgb_string = this.plots[i].getAttribute('fill');
    let rgb_array = rgb_string.slice(4, -1).split(',');
    // just get the sum of squared value of rgb, similar without sqrt, save computation
    return rgb_array
      .map(function (x) {
        return Math.pow(x, 2);
      })
      .reduce(function (a, b) {
        return a + b;
      });
  }

  /**
   * Returns an array of group labels for the heatmap.
   * @returns {Array<string>} An array containing the X and Y labels for the heatmap.
   */
  getGroupLabels() {
    let labels_nodelist;
    let legendX = '';
    let legendY = '';

    if ('labels' in singleMaidr) {
      if ('x' in singleMaidr.labels) {
        legendX = singleMaidr.labels.x;
      }
      if ('y' in singleMaidr.labels) {
        legendY = singleMaidr.labels.y;
      }
    }
    if ('axes' in singleMaidr) {
      if ('x' in singleMaidr.axes) {
        if ('label' in singleMaidr.axes.x) {
          if (legendX == '') {
            legendX = singleMaidr.axes.x.label;
          }
        }
      }
      if ('y' in singleMaidr.axes) {
        if ('label' in singleMaidr.axes.y) {
          if (legendY == '') {
            legendY = singleMaidr.axes.y.label;
          }
        }
      }
    }

    labels_nodelist = [legendX, legendY];

    return labels_nodelist;
  }

  /**
   * Returns the x-axis labels from the singleMaidr object.
   * @returns {Array} The x-axis labels.
   */
  getXLabels() {
    if ('axes' in singleMaidr) {
      if ('x' in singleMaidr.axes) {
        if ('level' in singleMaidr.axes.x) {
          return singleMaidr.axes.x.level;
        }
      }
    }
  }

  /**
   * Returns the y-axis labels from the singleMaidr object, if available.
   * @returns {Array<string>|undefined} The y-axis labels, or undefined if not available.
   */
  getYLabels() {
    if ('axes' in singleMaidr) {
      if ('y' in singleMaidr.axes) {
        if ('level' in singleMaidr.axes.y) {
          return singleMaidr.axes.y.level;
        }
      }
    }
  }

  /**
   * Returns the title of the singleMaidr object, if it exists.
   * If not, returns the title of the labels object within singleMaidr, if it exists.
   * @returns {string|undefined} The title of the singleMaidr or labels object, or undefined if neither exists.
   */
  getTitle() {
    if ('title' in singleMaidr) {
      return singleMaidr.title;
    } else if ('labels' in singleMaidr) {
      if ('title' in singleMaidr.labels) {
        return singleMaidr.labels.title;
      }
    }
  }

  /**
   * Returns the subtitle from the `singleMaidr` object if it exists.
   * @returns {string|undefined} The subtitle string if it exists, otherwise undefined.
   */
  getSubtitle() {
    if ('labels' in singleMaidr) {
      if ('subtitle' in singleMaidr.labels) {
        return singleMaidr.labels.subtitle;
      }
    }
  }

  /**
   * Returns the caption from the `singleMaidr` object's `labels` property, if it exists.
   * @returns {string|undefined} The caption string, or undefined if it doesn't exist.
   */
  getCaption() {
    if ('labels' in singleMaidr) {
      if ('caption' in singleMaidr.labels) {
        return singleMaidr.labels.caption;
      }
    }
  }

  /**
   * Returns the fill color for the heatmap based on the `fill` property in `singleMaidr.labels`.
   * @returns {string|undefined} The fill color or undefined if `singleMaidr.labels.fill` is not defined.
   */
  getFill() {
    if ('labels' in singleMaidr) {
      if ('fill' in singleMaidr.labels) {
        return singleMaidr.labels.fill;
      }
    }
  }
}

/**
 * Represents a rectangular heatmap.
 * @class
 */
class HeatMapRect {
  /**
   * Creates a new instance of Heatmap.
   * @constructor
   */
  constructor() {
    if (constants.hasRect) {
      this.x = plot.x_coord[0];
      this.y = plot.y_coord[0];
      this.squareIndex = 0;
      this.rectStrokeWidth = 4; // px
      this.height = Math.abs(plot.y_coord[1] - plot.y_coord[0]);
      this.width = Math.abs(plot.x_coord[1] - plot.x_coord[0]);
    }
  }

  /**
   * Updates the position of the rectangle based on the current x and y coordinates.
   */
  UpdateRect() {
    this.x = plot.x_coord[position.x];
    this.y = plot.y_coord[position.y];
    // find which square we're on by searching for the x and y coordinates
    for (let i = 0; i < plot.plots.length; i++) {
      if (
        plot.plots[i].getAttribute('x') == this.x &&
        plot.plots[i].getAttribute('y') == this.y
      ) {
        this.squareIndex = i;
        break;
      }
    }
  }

  /**
   * Updates the rectangle display.
   * @function
   * @memberof Heatmap
   * @returns {void}
   */
  UpdateRectDisplay() {
    this.UpdateRect();
    if (document.getElementById('highlight_rect'))
      document.getElementById('highlight_rect').remove(); // destroy and recreate
    const svgns = 'http://www.w3.org/2000/svg';
    var rect = document.createElementNS(svgns, 'rect');
    rect.setAttribute('id', 'highlight_rect');
    rect.setAttribute('x', this.x);
    rect.setAttribute('y', this.y);
    rect.setAttribute('width', this.width);
    rect.setAttribute('height', this.height);
    rect.setAttribute('stroke', constants.colorSelected);
    rect.setAttribute('stroke-width', this.rectStrokeWidth);
    rect.setAttribute('fill', 'none');
    plot.plots[this.squareIndex].parentNode.appendChild(rect);
    //constants.chart.appendChild(rect);
  }
}
