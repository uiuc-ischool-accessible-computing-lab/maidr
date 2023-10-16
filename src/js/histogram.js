class Histogram {
  constructor() {
    // initialize main data: data, elements
    let elements = null;
    if ('elements' in singleMaidr) {
      elements = singleMaidr.elements;
    }

    if (elements == null) {
      constants.hasRect = 0;
      logError.LogAbsentElement('elements');
    }

    let data = null;
    if ('data' in singleMaidr) {
      data = singleMaidr.data;
    }
    if (elements && data && elements.length != data.length) {
      constants.hasRect = 0;
      logError.logDifferentLengths('elements', 'data');
    }

    // data (required)
    if ('data' in singleMaidr) {
      this.plotData = singleMaidr.data;
    } else {
      console.log('Error: no data found');
      return;
    }
    // elements (optional)
    this.bars = null;
    if ('elements' in singleMaidr) {
      this.bars = singleMaidr.elements;
    }

    // labels (optional)
    this.legendX = null;
    this.legendY = null;
    if ('labels' in singleMaidr) {
      if ('x' in singleMaidr.labels) {
        this.legendX = singleMaidr.labels.x;
      }
      if ('y' in singleMaidr.labels) {
        this.legendY = singleMaidr.labels.y;
      }
    }
    if ('axes' in singleMaidr) {
      if ('x' in singleMaidr.axes) {
        if ('label' in singleMaidr.axes.x) {
          if (!this.legendX) {
            this.legendX = singleMaidr.axes.x.label;
          }
        }
      }
      if ('y' in singleMaidr.axes) {
        if ('label' in singleMaidr.axes.y) {
          if (!this.legendY) {
            this.legendY = singleMaidr.axes.y.label;
          }
        }
      }
    }

    // tick labels: todo, not sure if they'll exist or not

    // title (optional)
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

    // title (optional)
    if ('labels' in singleMaidr) {
      if ('subtitle' in singleMaidr.labels) {
        this.subtitle = singleMaidr.labels.subtitle;
      }
    }
    // title (optional)
    if ('labels' in singleMaidr) {
      if ('caption' in singleMaidr.labels) {
        this.caption = singleMaidr.labels.caption;
      }
    }

    this.SetMaxMin();

    this.autoplay = null;
  }

  SetMaxMin() {
    for (let i = 0; i < this.plotData.length; i++) {
      if (i == 0) {
        constants.maxY = this.plotData[i].y;
        constants.minY = this.plotData[i].y;
        constants.maxX = this.plotData[i].xmax;
        constants.minX = this.plotData[i].xmin;
      } else {
        if (this.plotData[i].y > constants.maxY) {
          constants.maxY = this.plotData[i].y;
        }
        if (this.plotData[i].y < constants.minY) {
          constants.minY = this.plotData[i].y;
        }
        if (this.plotData[i].xmax > constants.maxX) {
          constants.maxX = this.plotData[i].xmax;
        }
        if (this.plotData[i].xmin < constants.minX) {
          constants.minX = this.plotData[i].xmin;
        }
      }
    }
    constants.autoPlayRate = Math.min(
      Math.ceil(constants.AUTOPLAY_DURATION / (constants.maxX + 1)),
      constants.MAX_SPEED
    );
    constants.DEFAULT_SPEED = constants.autoPlayRate;
  }

  Select() {
    this.DeselectAll();
    if (this.bars) {
      this.bars[position.x].style.fill = constants.colorSelected;
    }
  }

  DeselectAll() {
    if (this.bars) {
      for (let i = 0; i < this.bars.length; i++) {
        this.bars[i].style.fill = constants.colorUnselected;
      }
    }
  }
}
