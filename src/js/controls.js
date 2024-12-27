/**
 * Represents a control object.
 * @class
 */
class Control {
  /**
   * Elements that are active and accept the standard control scheme (ie, arrow keys etc)
   */
  controlElements = [constants.chart, constants.brailleInput];
  allControlElements = [
    constants.chart,
    constants.brailleInput,
    constants.review_container,
  ];
  /**
   * We store whether the l key is pressed for preset mode
   */
  pressedL = false;

  /**
   * Creates a new instance of the Controls class.
   * @constructor
   */
  constructor() {
    constants.lastx = 0;

    this.InitChartClass();
    this.SetBTSControls();
    this.SetPrefixControls();
    this.SetKeyControls();
    this.SetMouseControls();
  }

  /**
   * We initialize the chart class.
   * We do this here because of javascript screwyness, it has to be done after Init, before controls are set, and in this file.
   */
  InitChartClass() {
    if ([].concat(singleMaidr.type).includes('bar')) {
      window.plot = new BarChart();
    } else if ([].concat(singleMaidr.type).includes('box')) {
      window.plot = new BoxPlot();
    } else if ([].concat(singleMaidr.type).includes('heat')) {
      window.plot = new HeatMap();
      singleMaidr.rect = new HeatMapRect();
    } else if (
      [].concat(singleMaidr.type).includes('point') ||
      [].concat(singleMaidr.type).includes('smooth')
    ) {
      window.plot = new ScatterPlot();
      window.layer0Point = new Layer0Point();
      window.layer1Point = new Layer1Point();
    } else if ([].concat(singleMaidr.type).includes('hist')) {
      window.plot = new Histogram();
    } else if (
      [].concat(singleMaidr.type).includes('stacked_bar') ||
      [].concat(singleMaidr.type).includes('stacked_normalized_bar') ||
      [].concat(singleMaidr.type).includes('dodged_bar')
    ) {
      window.plot = new Segmented();
    }
  }

  /**
   * Sets up event listeners for the main BTS controls:
   * - B: braille mode
   * - T: text mode
   * - S: sonification mode
   * - R: review mode
   *
   * @returns {void}
   */
  SetBTSControls() {
    // global controls

    // variable initialization

    // main BTS controls
    for (let i = 0; i < this.allControlElements.length; i++) {
      constants.events.push([
        this.allControlElements[i],
        'keydown',
        function (e) {
          if (constants.pressedL) {
            return;
          }
          // if we're awaiting an L + X prefix, we don't want to do anything else

          // B: braille mode
          if (e.key == 'b' && !control.pressedL) {
            constants.tabMovement = 0;
            e.preventDefault();
            display.toggleBrailleMode();
          }

          // T: aria live text output mode
          if (e.key == 't' && !control.pressedL) {
            display.toggleTextMode();
          }

          // S: sonification mode
          if (e.key == 's' && !control.pressedL) {
            display.toggleSonificationMode();
          }

          // R: review mode
          if (e.key == 'r' && !e.ctrlKey && !e.shiftKey && !control.pressedL) {
            // r, but let Ctrl and Shift R go through cause I use that to refresh
            constants.tabMovement = 0;
            e.preventDefault();
            if (constants.review_container.classList.contains('hidden')) {
              review.ToggleReviewMode(true);
            } else {
              review.ToggleReviewMode(false);
            }
          }

          if (e.key == ' ' && !control.pressedL) {
            // space 32, replay info but no other changes

            // exception: if we just initilized, position might not be in range
            if (position.x < 0) position.x = 0;
            if (position.y < 0) position.y = 0;

            if (constants.showDisplay) {
              display.displayValues();
            }
            if (constants.sonifMode != 'off') {
              plot.PlayTones();
            }
          }

          // switch layer controls
          if (
            Array.isArray(singleMaidr.type) &&
            [].concat(singleMaidr.type).includes('point') &&
            [].concat(singleMaidr.type).includes('smooth')
          ) {
            // page down /(fn+down arrow): change chart type (layer)
            if (e.key == 'PageDown' && constants.brailleMode == 'off') {
              display.changeChartLayer('down');
            }

            // page up / (fn+up arrow): change chart type (layer)
            if (e.key == 'PageUp' && constants.brailleMode == 'off') {
              display.changeChartLayer('up');
            }
          }

          // Debugging.
          // Because we destroy on blur, it's hard to debug, so here's throwaway code to put a breakpoint on
          // todo: on publish, remove this
          if (e.key == '-') {
            let nothing = null;
          }
        },
      ]);
    }

    // Review mode controls: disable everything but arrow keys
    constants.events.push([
      constants.review,
      'keydown',
      function (e) {
        // allow arrow keys only, shift arrow keys, ctrl a and ctrl c
        if (
          !e.key.startsWith('Arrow') && // Arrow keys
          !(e.shiftKey && e.key.startsWith('Arrow')) && // Shift + Arrow
          !(e.ctrlKey && e.key === 'a') && // Ctrl + A
          !(e.ctrlKey && e.key === 'c') // Ctrl + C
        ) {
          e.preventDefault();
        }
      },
    ]);

    // We want to tab or shift tab past the chart,
    for (let i = 0; i < this.allControlElements.length; i++) {
      constants.events.push([
        this.allControlElements[i],
        'keydown',
        function (e) {
          if (e.key == 'Tab') {
            // save key to be used on blur event later
            if (e.shiftKey) {
              constants.tabDirection = -1;
            } else {
              constants.tabDirection = 1;
            }
          }
        },
      ]);
    }
  }

  /**
   * Sets up event listeners for prefix events.
   * @returns {void}
   */
  SetPrefixControls() {
    // prefix events, l + x, where x is a key for the title, axis, etc
    // we listen for a moment when l is hit for a key to follow
    constants.events.push([
      document,
      'keydown',
      function (e) {
        // init
        let pressedTimeout = null;

        // enable / disable prefix mode
        if (e.key == 'l') {
          control.pressedL = true;
          if (pressedTimeout != null) {
            clearTimeout(pressedTimeout);
            pressedTimeout = null;
          }
          pressedTimeout = setTimeout(function () {
            control.pressedL = false;
          }, constants.keypressInterval);
        }

        // Prefix mode stuff: L is enabled, look for these keys
        if (control.pressedL) {
          if (e.key == 'x') {
            // X: x label
            let xlabel = '';
            if (singleMaidr.type == 'bar' || singleMaidr.type == 'line') {
              xlabel = plot.plotLegend.x;
            } else if (singleMaidr.type == 'hist') {
              xlabel = plot.legendX;
            } else if (
              singleMaidr.type == 'heat' ||
              singleMaidr.type == 'box' ||
              singleMaidr.type == 'point' ||
              singleMaidr.type.includes('point')
            ) {
              xlabel = plot.x_group_label;
            } else if (
              singleMaidr.type == 'stacked_bar' ||
              singleMaidr.type == 'stacked_normalized_bar' ||
              singleMaidr.type == 'dodged_bar'
            ) {
              xlabel = plot.plotLegend.x;
            }
            display.displayInfo('x label', xlabel);
            control.pressedL = false;
          } else if (e.key == 'y') {
            // Y: y label
            let ylabel = '';
            if (singleMaidr.type == 'bar' || singleMaidr.type == 'line') {
              ylabel = plot.plotLegend.y;
            } else if (singleMaidr.type == 'hist') {
              ylabel = plot.legendY;
            } else if (
              singleMaidr.type == 'heat' ||
              singleMaidr.type == 'box' ||
              singleMaidr.type == 'point' ||
              singleMaidr.type == 'line' ||
              singleMaidr.type.includes('point')
            ) {
              ylabel = plot.y_group_label;
            } else if (
              singleMaidr.type == 'stacked_bar' ||
              singleMaidr.type == 'stacked_normalized_bar' ||
              singleMaidr.type == 'dodged_bar'
            ) {
              ylabel = plot.plotLegend.y;
            }
            display.displayInfo('y label', ylabel);
            control.pressedL = false;
          } else if (e.key == 't') {
            // T: title
            display.displayInfo('title', plot.title);
            control.pressedL = false;
          } else if (e.key == 's') {
            // subtitle
            display.displayInfo('subtitle', plot.subtitle);
            control.pressedL = false;
          } else if (e.key == 'c') {
            // caption
            display.displayInfo('caption', plot.caption);
            control.pressedL = false;
          } else if (e.key == 'f') {
            display.displayInfo('fill', plot.fill);
            control.pressedL = false;
          } else if (e.key != 'l') {
            control.pressedL = false;
          }
        }
      },
    ]);
  }

  /**
   * Sets up event listeners for mouse controls
   * If you're on a chart, and within 24px of a point, set your position there and update the chart
   * If you're near multiple, figure it out.
   * This requires the selector to be set in the maidr object.
   * @returns {void}
   */
  SetMouseControls() {
    // to set this up, we run the event at the document level, and then deal with what we've hovered on in individual chart types
    // for bar hist stacked, we check if we've hovered on an element of the selector
    // for box line, we use coordinates and find the closest point
    if ('selector' in singleMaidr) {
      let selectorElems = document.querySelectorAll(singleMaidr.selector);
      if (selectorElems.length > 0) {
        constants.events.push([
          constants.chart,
          ['mousemove', 'touchmove'],
          function (e) {
            if (constants.chartType == 'bar' || constants.chartType == 'hist') {
              // check if we've hit a selector
              if (e.target.matches(singleMaidr.selector)) {
                let index = Array.from(selectorElems).indexOf(e.target);
                if (index != position.x) {
                  position.x = index;
                  control.UpdateAll();
                }
              }
            } else if (constants.chartType == 'box') {
              // here follows a nasty function where we use bounding boxes from the highlight feature compare to our hover coords
              let closestDistance = Infinity;
              let closestIndex = -1;
              let clickX = e.clientX;
              let clickY = e.clientY;
              let expandedBox = null;
              let padding = 15;
              const chartBounds = constants.chart.getBoundingClientRect();

              // Iterate through plot.plotBounds using regular loops
              for (
                let groupIndex = 0;
                groupIndex < plot.plotBounds.length;
                groupIndex++
              ) {
                const group = plot.plotBounds[groupIndex];

                for (let boxIndex = 0; boxIndex < group.length; boxIndex++) {
                  const box = group[boxIndex];

                  if (
                    box.top === undefined ||
                    box.left === undefined ||
                    box.bottom === undefined ||
                    box.right === undefined
                  ) {
                    continue; // Skip invalid boxes
                  }
                  // Expand the bounding box by 15px
                  let expandedBoxAdjustedCoords = {
                    x: box.left - padding - chartBounds.left,
                    y: box.top - padding - chartBounds.top,
                    width: box.width + padding * 2,
                    height: box.height + padding * 2,
                  };
                  expandedBox = {
                    top: expandedBoxAdjustedCoords.y,
                    left: expandedBoxAdjustedCoords.x,
                    bottom:
                      expandedBoxAdjustedCoords.y +
                      expandedBoxAdjustedCoords.height,
                    right:
                      expandedBoxAdjustedCoords.x +
                      expandedBoxAdjustedCoords.width,
                  };
                  // Calculate the center of the bounding box
                  const centerX = (expandedBox.left + expandedBox.right) / 2;
                  const centerY = (expandedBox.top + expandedBox.bottom) / 2;

                  // Calculate the Euclidean distance
                  const distance = Math.sqrt(
                    (centerX - clickX) ** 2 + (centerY - clickY) ** 2
                  );

                  //console.log( 'clicked coords: (', clickX, ', ', clickY, ') | box coords: (', centerX, ', ', centerY, ') | distance: ', distance, 'array index: [', groupIndex, ',', boxIndex, ']');

                  // Update the closest box if this one is nearer, and is inside the bounding box
                  if (distance < closestDistance) {
                    if (
                      clickX >= expandedBox.left &&
                      clickX <= expandedBox.right &&
                      clickY >= expandedBox.top &&
                      clickY <= expandedBox.bottom
                    ) {
                      closestDistance = distance;
                      closestIndex = [groupIndex, boxIndex];
                    }
                  }
                }
              }

              // did we get one?
              if (closestDistance < Infinity) {
                //console.log('found a box, index', closestIndex);
                if (constants.plotOrientation == 'horz') {
                  if (
                    position.x != closestIndex[0] ||
                    position.y != closestIndex[1]
                  ) {
                    position.x = closestIndex[1];
                    position.y = closestIndex[0];
                    control.UpdateAll();
                  }
                } else {
                  if (
                    position.x != closestIndex[0] ||
                    position.y != closestIndex[1]
                  ) {
                    position.x = closestIndex[0];
                    position.y = closestIndex[1];
                    control.UpdateAll();
                  }
                }
              }
            } else if (constants.chartType == 'heat') {
              // check if we've hit a selector
              let index = Array.from(selectorElems).indexOf(e.target);
              if (index != -1) {
                if (
                  position.x != Math.floor(index / plot.num_rows) ||
                  position.y != plot.num_rows - (index % plot.num_rows) - 1
                ) {
                  position.x = Math.floor(index / plot.num_rows);
                  position.y = plot.num_rows - (index % plot.num_rows) - 1;
                  control.UpdateAll();
                }
              }
            } else if (constants.chartType == 'line') {
              // compare coordinates and get the point we're closest to, if we're within 24px
              let chartBounds = constants.chart.getBoundingClientRect();
              let scaleX =
                constants.chart.viewBox.baseVal.width / chartBounds.width;
              let scaleY =
                constants.chart.viewBox.baseVal.height / chartBounds.height;

              let closestDistance = Infinity;
              let closestIndex = -1;
              let clickX = (e.clientX - chartBounds.left) * scaleX;
              let clickY = (e.clientY - chartBounds.top) * scaleY;
              let pointX, pointY;
              for (let i = 0; i < plot.chartLineX.length; i++) {
                pointX = plot.chartLineX[i] - chartBounds.left;
                pointY = plot.chartLineY[i] - chartBounds.top;
                let distance = Math.sqrt(
                  (pointX - clickX) ** 2 + (pointY - clickY) ** 2
                );
                //console.log( 'distance', distance, 'given clicked coords (', clickX, ', ', clickY, ') and target coords (', pointX, ', ', pointY, ')');
                if (distance < closestDistance) {
                  closestDistance = distance;
                  closestIndex = i;
                }
              }
              if (closestDistance < 24) {
                if (position.x != closestIndex) {
                  position.x = closestIndex;
                  control.UpdateAll();
                }
              }
            } else if (
              constants.chartType == 'stacked_bar' ||
              constants.chartType == 'stacked_normalized_bar' ||
              constants.chartType == 'dodged_bar'
            ) {
              // check if we've hit a selector
              if (e.target.matches(singleMaidr.selector)) {
                outerLoop: for (let i = 0; i < plot.elements.length; i++) {
                  for (let j = 0; j < plot.elements[i].length; j++) {
                    if (plot.elements[i][j] == e.target) {
                      if (position.x != i || position.y != j) {
                        position.x = i;
                        position.y = j;
                        control.UpdateAll();
                      }
                      break outerLoop;
                    }
                  }
                }
              }
            }
          },
        ]);
      }
    }
  }

  /**
   * Sets up event listeners for main controls
   *  - Arrow keys: basic motion
   *  - Shift + Arrow keys: Autoplay outward
   *  - Shift + Alt + Arrow keys: Autoplay inward
   *  - Ctrl: Stop autoplay
   *  - Ctrl + Arrow keys: Move to end
   *  - Period: Autoplay speed up
   *  - Comma: Autoplay slow down
   *
   * @returns {void}
   */
  async SetKeyControls() {
    // home / end: first / last element
    // not available in review mode
    constants.events.push([
      [constants.chart, constants.brailleInput],
      'keydown',
      function (e) {
        // ctrl/cmd: stop autoplay
        if (constants.isMac ? e.metaKey : e.ctrlKey) {
          // (ctrl/cmd)+(home/fn+left arrow): first element
          if (e.key == 'Home') {
            // chart types
            if (constants.chartType == 'bar' || constants.chartType == 'hist') {
              position.x = 0;
            } else if (constants.chartType == 'box') {
              position.x = 0;
              position.y = plot.sections.length - 1;
            } else if (constants.chartType == 'heat') {
              position.x = 0;
              position.y = 0;
            } else if (constants.chartType == 'point') {
              position.x = 0;
            } else if (constants.chartType == 'smooth') {
              positionL1.x = 0;
            }

            control.UpdateAllBraille();
          }

          // (ctrl/cmd)+(end/fn+right arrow): last element
          else if (e.key == 'End') {
            // chart types
            if (constants.chartType == 'bar' || constants.chartType == 'hist') {
              position.x = plot.bars.length - 1;
            } else if (constants.chartType == 'box') {
              position.x = plot.sections.length - 1;
              position.y = 0;
            } else if (constants.chartType == 'heat') {
              position.x = plot.num_cols - 1;
              position.y = plot.num_rows - 1;
            } else if (constants.chartType == 'point') {
              position.x = plot.y.length - 1;
            } else if (constants.chartType == 'smooth') {
              positionL1.x = plot.curvePoints.length - 1;
            }

            control.UpdateAllBraille();
          }
        }
      },
    ]);

    // mark and recall
    // mark with M + # (0-9), recall with m + # (0-9)
    // available in chart and braille, not review
    let lastKeytime = 0;
    let lastKey = null;
    constants.events.push([
      [constants.chart, constants.brailleInput],
      'keydown',
      function (e) {
        // setup
        const now = new Date().getTime();
        const key = e.key;

        // check for keypress within threshold
        if (now - lastKeytime < constants.keypressInterval) {
          // mark with M
          if (lastKey == 'M' && /[0-9]/.test(key)) {
            const markIndex = parseInt(key, 10);
            constants.mark[markIndex] = JSON.parse(JSON.stringify(position)); // deep copy
            display.announceText('Marked position ' + markIndex);
          }

          // recall with m
          if (lastKey == 'm' && /[0-9]/.test(key)) {
            const recallIndex = parseInt(key, 10);
            if (constants.mark[recallIndex]) {
              position = constants.mark[recallIndex];
              control.UpdateAll();
            }
          }
        }

        // update last key and time
        lastKey = key;
        lastKeytime = now;
      },
    ]);

    // Init a few things
    let lastPlayed = '';
    if ([].concat(singleMaidr.type).includes('bar')) {
      window.position = new Position(-1, -1);
    } else if ([].concat(singleMaidr.type).includes('box')) {
      // variable initialization
      constants.plotId = 'geom_boxplot.gTree.78.1';
      if (constants.plotOrientation == 'vert') {
        window.position = new Position(0, 6); // always 6
      } else {
        window.position = new Position(-1, plot.plotData.length);
      }
      if (constants.hasRect) {
        singleMaidr.rect = new BoxplotRect();
      }
    } else if ([].concat(singleMaidr.type).includes('heat')) {
      // variable initialization
      constants.plotId = 'geom_rect.rect.2.1';
      window.position = new Position(-1, -1);
      constants.lastx = 0;
    } else if (
      [].concat(singleMaidr.type).includes('point') ||
      [].concat(singleMaidr.type).includes('smooth')
    ) {
      constants.plotId = 'geom_point.points.12.1';
      window.position = new Position(-1, -1);

      constants.lastx = 0; // for scatter point layer autoplay use
      constants.lastx1 = 0; // for smooth layer autoplay use

      window.positionL1 = new Position(constants.lastx1, constants.lastx1);
    } else if ([].concat(singleMaidr.type).includes('hist')) {
      window.position = new Position(-1, -1);
    } else if (
      [].concat(singleMaidr.type).includes('stacked_bar') ||
      [].concat(singleMaidr.type).includes('stacked_normalized_bar') ||
      [].concat(singleMaidr.type).includes('dodged_bar')
    ) {
      window.position = new Position(-1, -1);
    }

    // Cursor routing
    if ([].concat(singleMaidr.type).includes('box')) {
      document.addEventListener('selectionchange', function (e) {
        e.preventDefault();
        if (
          constants.brailleMode == 'on' &&
          constants.brailleInput.selectionStart
        ) {
          if (constants.lockSelection) {
            return;
          }
          // we lock the selection while we're changing stuff so it doesn't loop
          constants.lockSelection = true;

          let cursorPos = constants.brailleInput.selectionStart;
          // we're using braille cursor, update the selection from what was clicked
          cursorPos = constants.brailleInput.selectionStart;
          if (cursorPos < 0) {
            pos = 0;
          }
          // convert braille position to start of whatever section we're in
          let walk = 0;
          let posType = '';
          if (constants.brailleData) {
            for (let i = 0; i < constants.brailleData.length; i++) {
              walk += constants.brailleData[i].numChars;
              if (walk > cursorPos) {
                if (constants.brailleData[i].type == 'blank') {
                  posType = constants.brailleData[i + 1].type;
                } else {
                  posType = constants.brailleData[i].type;
                }
                break;
              }
            }
          }
          let pos = plot.sections.indexOf(posType);

          if (posType.length > 0) {
            let xMax = 0;
            let yMax = 0;
            if (constants.plotOrientation == 'vert') {
              position.y = pos;
              xMax = plot.plotData.length - 1;
              yMax = plot.sections.length - 1;
            } else {
              position.x = pos;
              xMax = plot.sections.length - 1;
              yMax = plot.plotData.length - 1;
            }
            control.lockPosition(xMax, yMax);
            let testEnd = true;

            // update display / text / audio
            if (testEnd) {
              this.lockPosition = true;
              control.UpdateAll();
              this.lockPosition = false;
            }
            if (testEnd) {
              audio.playEnd();
            }
          }
          setTimeout(function () {
            constants.lockSelection = false;
          }, 50);
        }
      });
    } else if ([].concat(singleMaidr.type).includes('heat')) {
      document.addEventListener('selectionchange', function (e) {
        if (constants.brailleMode == 'on') {
          if (constants.lockSelection) {
            return;
          }

          let pos = constants.brailleInput.selectionStart;
          // we lock the selection while we're changing stuff so it doesn't loop
          constants.lockSelection = true;

          // exception: don't let users click the seperator char, so make them click just before
          let seperatorPositions = constants.brailleInput.value
            .split('')
            .reduce((positions, char, index) => {
              if (char === '⠳') positions.push(index);
              return positions;
            }, []);
          console.log('seperatorPositions', seperatorPositions);
          console.log('pos', pos);
          if (seperatorPositions.includes(pos)) {
            if (pos > 0) {
              pos += -1;
            }
          }

          // we're using braille cursor, update the selection from what was clicked
          pos = constants.brailleInput.selectionStart;
          if (pos < 0) {
            pos = 0;
          }

          // actual position is based on num_cols and num_rows and the spacer
          position.y = Math.floor(pos / (plot.num_cols + 1));
          position.x = pos % (plot.num_cols + 1);
          control.lockPosition(plot.num_cols - 1, plot.num_rows - 1);
          let testEnd = true;

          // update display / text / audio
          if (testEnd) {
            control.UpdateAll();
          }
          if (testEnd) {
            audio.playEnd();
          }
          setTimeout(function () {
            constants.lockSelection = false;
          }, 50);
        } else {
          // we're using normal cursor, let the default handle it
        }
      });
    } else if (
      [].concat(singleMaidr.type).includes('bar') ||
      [].concat(singleMaidr.type).includes('point') ||
      [].concat(singleMaidr.type).includes('smooth') ||
      [].concat(singleMaidr.type).includes('hist') ||
      [].concat(singleMaidr.type).includes('stacked_bar') ||
      [].concat(singleMaidr.type).includes('stacked_normalized_bar') ||
      [].concat(singleMaidr.type).includes('dodged_bar')
    ) {
      document.addEventListener('selectionchange', function (e) {
        if (constants.brailleMode == 'on') {
          if (constants.lockSelection) {
            return;
          }

          // we lock the selection while we're changing stuff so it doesn't loop
          constants.lockSelection = true;

          if (constants.brailleInput) {
            let pos = constants.brailleInput.selectionStart;
            // we're using braille cursor, update the selection from what was clicked
            pos = constants.brailleInput.selectionStart;
            if (pos < 0) {
              pos = 0;
            }
            position.x = pos;
            control.lockPosition(); // bar etc is default, no need to supply values
            let testEnd = true;

            // update display / text / audio
            if (testEnd) {
              control.UpdateAll();
            }
            if (testEnd) {
              audio.playEnd();
            }
          }
          setTimeout(function () {
            constants.lockSelection = false;
          }, 50);
        } else {
          // we're using normal cursor, let the default handle it
        }
      });
    }

    // #####################################################################################################
    // #####################################################################################################
    // #####################################################################################################
    if ([].concat(singleMaidr.type).includes('bar')) {
      // control eventlisteners
      constants.events.push([
        constants.chart,
        'keydown',
        function (e) {
          let updateInfoThisRound = false; // we only update info and play tones on certain keys
          let isAtEnd = false;

          if (e.key == 'ArrowRight') {
            if (constants.isMac ? e.metaKey : e.ctrlKey) {
              if (e.shiftKey) {
                position.x -= 1;
                control.Autoplay('right', position.x, plot.plotData.length);
              } else {
                position.x = plot.plotData.length - 1; // go all the way
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition();
              }
            } else if (
              e.altKey &&
              e.shiftKey &&
              position.x != plot.bars.length - 1
            ) {
              constants.lastx = position.x;
              control.Autoplay('reverse-right', plot.bars.length, position.x);
            } else {
              position.x += 1;
              updateInfoThisRound = true;
              isAtEnd = control.lockPosition();
              let test = true;
            }
          } else if (e.key == 'ArrowLeft') {
            // var prevLink = document.getElementById('prev');   // what is prev in the html?
            // if (prevLink) {
            // left arrow 37
            if (constants.isMac ? e.metaKey : e.ctrlKey) {
              if (e.shiftKey) {
                position.x += 1;
                control.Autoplay('left', position.x, -1);
              } else {
                position.x = 0; // go all the way
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition();
              }
            } else if (e.altKey && e.shiftKey && position.x != 0) {
              constants.lastx = position.x;
              control.Autoplay('reverse-left', -1, position.x);
            } else {
              position.x += -1;
              updateInfoThisRound = true;
              isAtEnd = control.lockPosition();
            }
            // }
          }

          // update display / text / audio
          if (updateInfoThisRound && !isAtEnd) {
            control.UpdateAll();
          }
          if (isAtEnd) {
            audio.playEnd();
          }
        },
      ]);

      constants.events.push([
        constants.brailleInput,
        'keydown',
        function (e) {
          let updateInfoThisRound = false; // we only update info and play tones on certain keys
          let isAtEnd = false;

          if (e.key == 'ArrowRight') {
            // right arrow
            e.preventDefault();
            if (e.target.selectionStart > e.target.value.length - 2) {
            } else if (constants.isMac ? e.metaKey : e.ctrlKey) {
              if (e.shiftKey) {
                position.x -= 1;
                control.Autoplay('right', position.x, plot.plotData.length);
              } else {
                position.x = plot.bars.length - 1; // go all the way
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition();
              }
            } else if (
              e.altKey &&
              e.shiftKey &&
              position.x != plot.bars.length - 1
            ) {
              constants.lastx = position.x;
              control.Autoplay('reverse-right', plot.bars.length, position.x);
            } else {
              position.x += 1;
              updateInfoThisRound = true;
              isAtEnd = control.lockPosition();
            }
          } else if (e.key == 'ArrowLeft') {
            // left arrow
            e.preventDefault();
            if (constants.isMac ? e.metaKey : e.ctrlKey) {
              if (e.shiftKey) {
                position.x += 1;
                control.Autoplay('left', position.x, -1);
              } else {
                position.x = 0; // go all the way
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition();
              }
            } else if (e.altKey && e.shiftKey && position.x != 0) {
              constants.lastx = position.x;
              control.Autoplay('reverse-left', -1, position.x);
            } else {
              position.x += -1;
              updateInfoThisRound = true;
              isAtEnd = control.lockPosition();
            }
          } else if (e.key == 'Tab') {
            // do nothing, we handle this in global events
          } else {
            e.preventDefault();
          }

          // update display / text / audio
          if (updateInfoThisRound && !isAtEnd) {
            control.UpdateAllBraille();
          }
          if (isAtEnd) {
            audio.playEnd();
          }
        },
      ]);

      for (let i = 0; i < this.controlElements.length; i++) {
        constants.events.push([
          this.controlElements[i],
          'keydown',
          function (e) {
            // period: speed up
            if (e.key == '.') {
              constants.SpeedUp();
              control.PlayDuringSpeedChange();
              display.announceText('Speed up');
            }

            // comma: speed down
            if (e.key == ',') {
              constants.SpeedDown();
              control.PlayDuringSpeedChange();
              display.announceText('Speed down');
            }

            // /: reset speed
            if (e.key == '/') {
              constants.SpeedReset();
              control.PlayDuringSpeedChange();
              display.announceText('Speed reset');
            }
          },
        ]);
      }
      // #####################################################################################################
      // #####################################################################################################
      // #####################################################################################################
    } else if ([].concat(singleMaidr.type).includes('box')) {
      let xMax = 0;
      let yMax = 0;
      if (constants.plotOrientation == 'vert') {
        xMax = plot.plotData.length - 1;
        yMax = plot.sections.length - 1;
      } else {
        xMax = plot.sections.length - 1;
        yMax = plot.plotData.length - 1;
      }

      // control eventlisteners
      constants.events.push([
        constants.chart,
        'keydown',
        function (e) {
          let updateInfoThisRound = false; // we only update info and play tones on certain keys
          let isAtEnd = false;

          // right arrow
          if (e.key == 'ArrowRight') {
            if (constants.isMac ? e.metaKey : e.ctrlKey) {
              if (e.shiftKey) {
                // autoplay
                if (constants.plotOrientation == 'vert') {
                  control.Autoplay(
                    'right',
                    position.x,
                    plot.plotData.length - 1
                  );
                } else {
                  control.Autoplay(
                    'right',
                    position.x,
                    plot.sections.length - 1
                  );
                }
              } else {
                // move to end
                isAtEnd = control.lockPosition(xMax, yMax);
                if (constants.plotOrientation == 'vert') {
                  position.x = plot.plotData.length - 1;
                } else {
                  position.x = plot.sections.length - 1;
                }
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition(xMax, yMax);
              }
            } else if (constants.plotOrientation == 'vert') {
              if (
                e.altKey &&
                e.shiftKey &&
                plot.sections.length - 1 != position.x
              ) {
                lastY = position.y;
                control.Autoplay(
                  'reverse-right',
                  plot.plotData.length - 1,
                  position.x
                );
              } else {
                // normal movement
                if (position.x == -1 && position.y == plot.sections.length) {
                  position.y -= 1;
                }
                position.x += 1;
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition(xMax, yMax);
              }
            } else {
              if (
                e.altKey &&
                e.shiftKey &&
                plot.sections.length - 1 != position.x
              ) {
                constants.lastx = position.x;
                control.Autoplay(
                  'reverse-right',
                  plot.sections.length - 1,
                  position.x
                );
              } else {
                if (position.x == -1 && position.y == plot.plotData.length) {
                  position.y -= 1;
                }
                position.x += 1;
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition(xMax, yMax);
              }
            }
            constants.navigation = 1;
          }
          // left arrow
          if (e.key == 'ArrowLeft') {
            if (constants.isMac ? e.metaKey : e.ctrlKey) {
              if (e.shiftKey) {
                control.Autoplay('left', position.x, -1);
              } else {
                position.x = 0;
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition(xMax, yMax);
              }
            } else if (e.altKey && e.shiftKey && position.x > 0) {
              if (constants.plotOrientation == 'vert') {
                lastY = position.y;
              } else {
                constants.lastx = position.x;
              }
              control.Autoplay('reverse-left', 0, position.x);
            } else {
              position.x += -1;
              updateInfoThisRound = true;
              isAtEnd = control.lockPosition(xMax, yMax);
            }
            constants.navigation = 1;
          }
          // up arrow
          if (e.key == 'ArrowUp') {
            let oldY = position.y;
            if (constants.isMac ? e.metaKey : e.ctrlKey) {
              if (e.shiftKey) {
                if (constants.plotOrientation == 'vert') {
                  control.Autoplay('up', position.y, plot.sections.length);
                } else {
                  control.Autoplay('up', position.y, plot.plotData.length);
                }
              } else {
                if (constants.plotOrientation == 'vert') {
                  position.y = plot.sections.length - 1;
                } else {
                  position.y = plot.plotData.length - 1;
                }
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition(xMax, yMax);
              }
            } else if (constants.plotOrientation == 'vert') {
              if (
                e.altKey &&
                e.shiftKey &&
                position.y != plot.sections.length - 1
              ) {
                lastY = position.y;
                control.Autoplay(
                  'reverse-up',
                  plot.sections.length - 1,
                  position.y
                );
              } else {
                position.y += 1;
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition(xMax, yMax);
              }
            } else {
              if (
                e.altKey &&
                e.shiftKey &&
                position.y != plot.sections.length - 1
              ) {
                constants.lastx = position.x;
                control.Autoplay(
                  'reverse-up',
                  plot.plotData.length - 1,
                  position.y
                );
              } else {
                position.y += 1;
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition(xMax, yMax);
              }
            }
            constants.navigation = 0;
          }
          // down arrow
          if (e.key == 'ArrowDown') {
            let oldY = position.y;
            if (constants.isMac ? e.metaKey : e.ctrlKey) {
              if (e.shiftKey) {
                control.Autoplay('down', position.y, -1);
              } else {
                position.y = 0;
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition(xMax, yMax);
              }
            } else if (e.altKey && e.shiftKey && position.y != 0) {
              if (constants.plotOrientation == 'vert') {
                lastY = position.y;
              } else {
                constants.lastx = position.x;
              }
              control.Autoplay('reverse-down', 0, position.y);
            } else {
              if (constants.plotOrientation == 'vert') {
                if (position.x == -1 && position.y == plot.sections.length) {
                  position.x += 1;
                }
              } else {
                if (position.x == -1 && position.y == plot.plotData.length) {
                  position.x += 1;
                }
              }
              position.y += -1;
              updateInfoThisRound = true;
              isAtEnd = control.lockPosition(xMax, yMax);
            }
            //position.x = GetRelativeBoxPosition(oldY, position.y);
            constants.navigation = 0;
          }

          // update display / text / audio
          if (updateInfoThisRound && !isAtEnd) {
            control.UpdateAll();
          }
          if (isAtEnd) {
            audio.playEnd();
          }
        },
      ]);

      constants.events.push([
        constants.brailleInput,
        'keydown',
        function (e) {
          let updateInfoThisRound = false; // we only update info and play tones on certain keys
          let setBrailleThisRound = false;
          let isAtEnd = false;

          if (e.key == 'ArrowRight') {
            // right arrow
            e.preventDefault();
            if (constants.isMac ? e.metaKey : e.ctrlKey) {
              if (e.shiftKey) {
                if (constants.plotOrientation == 'vert') {
                  control.Autoplay(
                    'right',
                    position.x,
                    plot.plotData.length - 1
                  );
                } else {
                  control.Autoplay('right', position.x, plot.sections.length);
                }
              } else {
                if (constants.plotOrientation == 'vert') {
                  position.x = plot.plotData.length - 1;
                } else {
                  position.x = plot.sections.length - 1;
                }
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition(xMax, yMax);
              }
            } else if (constants.plotOrientation == 'vert') {
              if (
                e.altKey &&
                e.shiftKey &&
                plot.plotData.length - 1 != position.x
              ) {
                lastY = position.y;
                control.Autoplay(
                  'reverse-right',
                  plot.plotData.length - 1,
                  position.x
                );
              } else {
                if (
                  position.x == -1 &&
                  position.y == plot.plotData[position.x].length
                ) {
                  position.y -= 1;
                }
                position.x += 1;
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition(xMax, yMax);
              }
            } else {
              if (
                e.altKey &&
                e.shiftKey &&
                plot.sections.length - 1 != position.x
              ) {
                constants.lastx = position.x;
                control.Autoplay(
                  'reverse-right',
                  plot.sections.length - 1,
                  position.x
                );
              } else {
                if (position.x == -1 && position.y == plot.plotData.length) {
                  position.y -= 1;
                }
                position.x += 1;
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition(xMax, yMax);
              }
            }
            setBrailleThisRound = true;
            constants.navigation = 1;
          } else if (e.key == 'ArrowLeft') {
            // left arrow
            e.preventDefault();
            if (constants.isMac ? e.metaKey : e.ctrlKey) {
              if (e.shiftKey) {
                control.Autoplay('left', position.x, -1);
              } else {
                position.x = 0;
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition(xMax, yMax);
              }
            } else if (e.altKey && e.shiftKey && position.x > 0) {
              if (constants.plotOrientation == 'vert') {
                lastY = position.y;
              } else {
                constants.lastx = position.x;
              }
              control.Autoplay('reverse-left', 0, position.x);
            } else {
              position.x += -1;
              updateInfoThisRound = true;
              isAtEnd = control.lockPosition(xMax, yMax);
            }
            setBrailleThisRound = true;
            constants.navigation = 1;
          } else if (e.key == 'ArrowUp') {
            // up arrow
            let oldY = position.y;
            if (constants.isMac ? e.metaKey : e.ctrlKey) {
              if (e.shiftKey) {
                if (constants.plotOrientation == 'vert') {
                  if (position.x < 0) position.x = 0;
                  control.Autoplay('up', position.y, plot.sections.length);
                } else {
                  control.Autoplay('up', position.y, plot.plotData.length);
                }
              } else if (constants.plotOrientation == 'vert') {
                position.y = plot.sections.length - 1;
                updateInfoThisRound = true;
              } else {
                position.y = plot.plotData.length - 1;
                updateInfoThisRound = true;
              }
            } else if (constants.plotOrientation == 'vert') {
              if (
                e.altKey &&
                e.shiftKey &&
                position.y != plot.sections.length - 1
              ) {
                lasY = position.y;
                control.Autoplay(
                  'reverse-up',
                  plot.sections.length - 1,
                  position.y
                );
              } else {
                position.y += 1;
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition(xMax, yMax);
              }
            } else {
              if (
                e.altKey &&
                e.shiftKey &&
                position.y != plot.plotData.length - 1
              ) {
                constants.lastx = position.x;
                control.Autoplay(
                  'reverse-up',
                  plot.plotData.length - 1,
                  position.y
                );
              } else {
                position.y += 1;
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition(xMax, yMax);
              }
            }
            if (constants.plotOrientation == 'vert') {
            } else {
              setBrailleThisRound = true;
            }
            constants.navigation = 0;
          } else if (e.key == 'ArrowDown') {
            // down arrow
            let oldY = position.y;
            if (constants.isMac ? e.metaKey : e.ctrlKey) {
              if (e.shiftKey) {
                control.Autoplay('down', position.y, -1);
              } else {
                position.y = 0;
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition(xMax, yMax);
              }
            } else if (e.altKey && e.shiftKey && position.y != 0) {
              if (constants.plotOrientation == 'vert') {
                lastY = position.y;
              } else {
                constants.lastx = position.x;
              }
              control.Autoplay('reverse-down', 0, position.y);
            } else {
              if (constants.plotOrientation == 'vert') {
                if (position.x == -1 && position.y == plot.sections.length) {
                  position.x += 1;
                }
              } else {
                if (position.x == -1 && position.y == plot.plotData.length) {
                  position.x += 1;
                }
              }
              position.y += -1;
              updateInfoThisRound = true;
              isAtEnd = control.lockPosition(xMax, yMax);
            }
            constants.navigation = 0;
            if (constants.plotOrientation == 'vert') {
            } else {
              setBrailleThisRound = true;
            }
            constants.navigation = 0;
          } else if (e.key == 'Tab') {
            // do nothing, we handle this in global events
          } else {
            e.preventDefault();
            // todo: allow some controls through like page refresh
          }

          // update audio. todo: add a setting for this later
          if (updateInfoThisRound && !isAtEnd) {
            if (setBrailleThisRound) display.SetBraille(plot);
            setTimeout(control.UpdateAllBraille, 50); // we delay this by just a moment as otherwise the cursor position doesn't get set
          }
          if (isAtEnd) {
            audio.playEnd();
          }
        },
      ]);

      let lastx = 0;
      for (let i = 0; i < this.controlElements.length; i++) {
        constants.events.push([
          this.controlElements[i],
          'keydown',
          function (e) {
            // period: speed up
            if (e.key == '.') {
              constants.SpeedUp();
              control.PlayDuringSpeedChange();
              display.announceText('Speed up');
            }

            // comma: speed down
            if (e.key == ',') {
              constants.SpeedDown();
              control.PlayDuringSpeedChange();
              display.announceText('Speed down');
            }

            // /: reset speed
            if (e.key == '/') {
              constants.SpeedReset();
              control.PlayDuringSpeedChange();
              display.announceText('Speed reset');
            }
          },
        ]);
      }
      // #####################################################################################################
      // #####################################################################################################
      // #####################################################################################################
    } else if ([].concat(singleMaidr.type).includes('heat')) {
      let xMax = plot.num_cols - 1;
      let yMax = plot.num_rows - 1;
      // control eventlisteners
      constants.events.push([
        constants.chart,
        'keydown',
        function (e) {
          let updateInfoThisRound = false;
          let isAtEnd = false;

          // right arrow 39
          if (e.key == 'ArrowRight') {
            if (constants.isMac ? e.metaKey : e.ctrlKey) {
              if (e.shiftKey) {
                position.x -= 1;
                control.Autoplay('right', position.x, plot.num_cols);
              } else {
                position.x = plot.num_cols - 1;
                updateInfoThisRound = true;
              }
            } else if (
              e.altKey &&
              e.shiftKey &&
              position.x != plot.num_cols - 1
            ) {
              constants.lastx = position.x;
              control.Autoplay('reverse-right', plot.num_cols, position.x);
            } else {
              if (position.x == -1 && position.y == -1) {
                position.y += 1;
              }
              position.x += 1;
              updateInfoThisRound = true;
              isAtEnd = control.lockPosition(xMax, yMax);
            }
            constants.navigation = 1;
          }

          // left arrow 37
          if (e.key == 'ArrowLeft') {
            if (constants.isMac ? e.metaKey : e.ctrlKey) {
              if (e.shiftKey) {
                position.x += 1;
                control.Autoplay('left', position.x, -1);
              } else {
                position.x = 0;
                updateInfoThisRound = true;
              }
            } else if (e.altKey && e.shiftKey && position.x != 0) {
              constants.lastx = position.x;
              control.Autoplay('reverse-left', -1, position.x);
            } else {
              position.x -= 1;
              updateInfoThisRound = true;
              isAtEnd = control.lockPosition(xMax, yMax);
            }
            constants.navigation = 1;
          }

          // up arrow 38
          if (e.key == 'ArrowUp') {
            if (constants.isMac ? e.metaKey : e.ctrlKey) {
              if (e.shiftKey) {
                position.y += 1;
                control.Autoplay('up', position.y, -1);
              } else {
                position.y = 0;
                updateInfoThisRound = true;
              }
            } else if (e.altKey && e.shiftKey && position.y != 0) {
              constants.lastx = position.x;
              control.Autoplay('reverse-up', -1, position.y);
            } else {
              position.y -= 1;
              updateInfoThisRound = true;
              isAtEnd = control.lockPosition(xMax, yMax);
            }
            constants.navigation = 0;
          }

          // down arrow 40
          if (e.key == 'ArrowDown') {
            if (constants.isMac ? e.metaKey : e.ctrlKey) {
              if (e.shiftKey) {
                position.y -= 1;
                control.Autoplay('down', position.y, plot.num_rows);
              } else {
                position.y = plot.num_rows - 1;
                updateInfoThisRound = true;
              }
            } else if (
              e.altKey &&
              e.shiftKey &&
              position.y != plot.num_rows - 1
            ) {
              constants.lastx = position.x;
              control.Autoplay('reverse-down', plot.num_rows, position.y);
            } else {
              if (position.x == -1 && position.y == -1) {
                position.x += 1;
              }
              position.y += 1;
              updateInfoThisRound = true;
              isAtEnd = control.lockPosition(xMax, yMax);
            }
            constants.navigation = 0;
          }

          // update text, display, and audio
          if (updateInfoThisRound && !isAtEnd) {
            control.UpdateAll();
          }
          if (isAtEnd) {
            audio.playEnd();
          }
        },
      ]);

      for (let i = 0; i < this.controlElements.length; i++) {
        constants.events.push([
          this.controlElements[i],
          'keydown',
          function (e) {
            // period: speed up
            if (e.key == '.') {
              constants.SpeedUp();
              control.PlayDuringSpeedChange();
              display.announceText('Speed up');
            }

            // comma: speed down
            if (e.key == ',') {
              constants.SpeedDown();
              control.PlayDuringSpeedChange();
              display.announceText('Speed down');
            }

            // /: reset speed
            if (e.key == '/') {
              constants.SpeedReset();
              control.PlayDuringSpeedChange();
              display.announceText('Speed reset');
            }
          },
        ]);
      }
      function PlayDuringSpeedChange() {}

      constants.events.push([
        constants.brailleInput,
        'keydown',
        function (e) {
          let updateInfoThisRound = false;
          let isAtEnd = false;

          if (e.key == 'ArrowRight') {
            // right arrow
            if (
              e.target.selectionStart > e.target.value.length - 3 ||
              e.target.value.substring(
                e.target.selectionStart + 1,
                e.target.selectionStart + 2
              ) == '⠳'
            ) {
              // already at the end, do nothing
              e.preventDefault();
            } else {
              if (constants.isMac ? e.metaKey : e.ctrlKey) {
                if (position.x == -1 && position.y == -1) {
                  position.x += 1;
                  position.y += 1;
                }
                if (e.shiftKey) {
                  position.x -= 1;
                  control.Autoplay('right', position.x, plot.num_cols);
                } else {
                  position.x = plot.num_cols - 1;
                  updateInfoThisRound = true;
                }
              } else if (
                e.altKey &&
                e.shiftKey &&
                position.x != plot.num_cols - 1
              ) {
                constants.lastx = position.x;
                control.Autoplay('reverse-right', plot.num_cols, position.x);
              } else {
                if (position.x == -1 && position.y == -1) {
                  position.y += 1;
                }
                position.x += 1;
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition(xMax, yMax);
              }

              // we need pos to be y*(num_cols+1), (and num_cols+1 because there's a spacer character)
              let pos = position.y * (plot.num_cols + 1) + position.x;
              e.target.setSelectionRange(pos, pos);
              e.preventDefault();

              constants.navigation = 1;
            }
          } else if (e.key == 'ArrowLeft') {
            // left
            if (
              e.target.selectionStart == 0 ||
              e.target.value.substring(
                e.target.selectionStart - 1,
                e.target.selectionStart
              ) == '⠳'
            ) {
              e.preventDefault();
            } else {
              if (constants.isMac ? e.metaKey : e.ctrlKey) {
                if (e.shiftKey) {
                  position.x += 1;
                  control.Autoplay('left', position.x, -1);
                } else {
                  position.x = 0;
                  updateInfoThisRound = true;
                }
              } else if (e.altKey && e.shiftKey && position.x != 0) {
                constants.lastx = position.x;
                control.Autoplay('reverse-left', -1, position.x);
              } else {
                position.x += -1;
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition(xMax, yMax);
              }

              let pos = position.y * (plot.num_cols + 1) + position.x;
              e.target.setSelectionRange(pos, pos);
              e.preventDefault();

              constants.navigation = 1;
            }
          } else if (e.key == 'ArrowDown') {
            // down
            if (position.y + 1 == plot.num_rows) {
              e.preventDefault();
            } else {
              if (constants.isMac ? e.metaKey : e.ctrlKey) {
                if (position.x == -1 && position.y == -1) {
                  position.x += 1;
                  position.y += 1;
                }
                if (e.shiftKey) {
                  position.y -= 1;
                  control.Autoplay('down', position.y, plot.num_rows);
                } else {
                  position.y = plot.num_rows - 1;
                  updateInfoThisRound = true;
                }
              } else if (
                e.altKey &&
                e.shiftKey &&
                position.y != plot.num_rows - 1
              ) {
                constants.lastx = position.x;
                control.Autoplay('reverse-down', plot.num_rows, position.y);
              } else {
                if (position.x == -1 && position.y == -1) {
                  position.x += 1;
                }
                position.y += 1;
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition(xMax, yMax);
              }

              let pos = position.y * (plot.num_cols + 1) + position.x;
              e.target.setSelectionRange(pos, pos);
              e.preventDefault();

              constants.navigation = 0;
            }
          } else if (e.key == 'ArrowUp') {
            // up
            if (e.target.selectionStart - plot.num_cols - 1 < 0) {
              e.preventDefault();
            } else {
              if (constants.isMac ? e.metaKey : e.ctrlKey) {
                if (e.shiftKey) {
                  position.y += 1;
                  control.Autoplay('up', position.y, -1);
                } else {
                  position.y = 0;
                  updateInfoThisRound = true;
                }
              } else if (e.altKey && e.shiftKey && position.y != 0) {
                constants.lastx = position.x;
                control.Autoplay('reverse-up', -1, position.y);
              } else {
                position.y += -1;
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition(xMax, yMax);
              }

              let pos = position.y * (plot.num_cols + 1) + position.x;
              e.target.setSelectionRange(pos, pos);
              e.preventDefault();

              constants.navigation = 0;
            }
          } else if (e.key == 'Tab') {
            // do nothing, we handle this in global events
          } else {
            e.preventDefault();
          }

          if (updateInfoThisRound && !isAtEnd) {
            control.UpdateAllBraille();
          }
          if (isAtEnd) {
            audio.playEnd();
          }
        },
      ]);
      // #####################################################################################################
      // #####################################################################################################
      // #####################################################################################################
    } else if (
      [].concat(singleMaidr.type).includes('point') ||
      [].concat(singleMaidr.type).includes('smooth')
    ) {
      let xMax = 0;
      let yMax = 0;
      if (constants.chartType == 'point') {
        xMax = plot.x.length - 1;
      } else if (constants.chartType == 'smooth') {
        xMax = plot.curvePoints.length - 1;
      }
      // control eventlisteners
      constants.events.push([
        [constants.chart, constants.brailleInput],
        'keydown',
        function (e) {
          let updateInfoThisRound = false;
          let isAtEnd = false;

          // left and right arrows are enabled only at point layer
          if (constants.chartType == 'point') {
            // right arrow 39
            if (e.key == 'ArrowRight') {
              if (constants.isMac ? e.metaKey : e.ctrlKey) {
                if (e.shiftKey) {
                  position.x -= 1;
                  control.Autoplay('right', position.x, plot.x.length);
                } else {
                  position.x = plot.x.length - 1;
                  updateInfoThisRound = true;
                  isAtEnd = control.lockPosition(xMax, yMax);
                }
              } else if (
                e.altKey &&
                e.shiftKey &&
                position.x != plot.x.length - 1
              ) {
                constants.lastx = position.x;
                control.Autoplay('reverse-right', plot.x.length, position.x);
              } else {
                position.x += 1;
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition(xMax, yMax);
              }
            }

            // left arrow 37
            if (e.key == 'ArrowLeft') {
              if (constants.isMac ? e.metaKey : e.ctrlKey) {
                if (e.shiftKey) {
                  position.x += 1;
                  control.Autoplay('left', position.x, -1);
                } else {
                  position.x = 0;
                  updateInfoThisRound = true;
                  isAtEnd = control.lockPosition(xMax, yMax);
                }
              } else if (e.altKey && e.shiftKey && position.x != 0) {
                constants.lastx = position.x;
                control.Autoplay('reverse-left', -1, position.x);
              } else {
                position.x -= 1;
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition(xMax, yMax);
              }
            }
          } else if (constants.chartType == 'smooth') {
            if (!positionL1.x) {
              positionL1.x = constants.lastx1;
            }

            if (e.key == 'ArrowRight' && e.shiftKey) {
              if (
                (constants.isMac ? e.metaKey : e.ctrlKey) &&
                constants.sonifMode != 'off'
              ) {
                control.PlayLine('right');
              } else if (e.altKey && constants.sonifMode != 'off') {
                control.PlayLine('reverse-right');
              }
            }

            if (e.key == 'ArrowLeft' && e.shiftKey) {
              if (
                (constants.isMac ? e.metaKey : e.ctrlKey) &&
                constants.sonifMode != 'off'
              ) {
                control.PlayLine('left');
              } else if (e.altKey && constants.sonifMode != 'off') {
                control.PlayLine('reverse-left');
              }
            }
          }

          // update text, display, and audio
          if (
            updateInfoThisRound &&
            constants.chartType == 'point' &&
            !isAtEnd
          ) {
            control.UpdateAll();
          }
          if (isAtEnd) {
            audio.playEnd();
          }
        },
      ]);

      let lastx = 0;
      for (let i = 0; i < this.controlElements.length; i++) {
        constants.events.push([
          this.controlElements[i],
          'keydown',
          function (e) {
            // period: speed up
            if (e.key == '.') {
              constants.SpeedUp();
              control.PlayDuringSpeedChange();
              display.announceText('Speed up');
            }

            // comma: speed down
            if (e.key == ',') {
              constants.SpeedDown();
              control.PlayDuringSpeedChange();
              display.announceText('Speed down');
            }

            // /: reset speed
            if (e.key == '/') {
              constants.SpeedReset();
              control.PlayDuringSpeedChange();
              display.announceText('Speed reset');
            }
          },
        ]);
      }

      constants.events.push([
        constants.brailleInput,
        'keydown',
        function (e) {
          let updateInfoThisRound = false;
          let isAtEnd = false;

          // @TODO
          // only smooth layer can access to braille display
          if (constants.chartType == 'smooth') {
            control.lockPosition(xMax, yMax);
            if (e.key == 'ArrowRight') {
              // right arrow
              e.preventDefault();
              constants.brailleInput.setSelectionRange(
                positionL1.x,
                positionL1.x
              );
              if (e.target.selectionStart > e.target.value.length - 2) {
                e.preventDefault();
              } else if (constants.isMac ? e.metaKey : e.ctrlKey) {
                if (e.shiftKey) {
                  positionL1.x -= 1;
                  control.Autoplay(
                    'right',
                    positionL1.x,
                    plot.curvePoints.length
                  );
                } else {
                  positionL1.x = plot.curvePoints.length - 1;
                  updateInfoThisRound = true;
                  isAtEnd = control.lockPosition(xMax, yMax);
                }
              } else if (
                e.altKey &&
                e.shiftKey &&
                positionL1.x != plot.curvePoints.length - 1
              ) {
                constants.lastx1 = positionL1.x;
                control.Autoplay(
                  'reverse-right',
                  plot.curvePoints.length,
                  positionL1.x
                );
              } else {
                positionL1.x += 1;
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition(xMax, yMax);
              }
            } else if (e.key == 'ArrowLeft') {
              // left
              e.preventDefault();
              if (constants.isMac ? e.metaKey : e.ctrlKey) {
                if (e.shiftKey) {
                  positionL1.x += 1;
                  control.Autoplay('left', positionL1.x, -1);
                } else {
                  positionL1.x = 0; // go all the way
                  updateInfoThisRound = true;
                  isAtEnd = control.lockPosition(xMax, yMax);
                }
              } else if (e.altKey && e.shiftKey && positionL1.x != 0) {
                control.Autoplay('reverse-left', -1, positionL1.x);
              } else {
                positionL1.x -= 1;
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition(xMax, yMax);
              }
            } else {
              e.preventDefault();
            }
          } else if (e.key == 'Tab') {
            // do nothing, we handle this in global events
          } else {
            e.preventDefault();
          }

          constants.lastx1 = positionL1.x;

          if (updateInfoThisRound && !isAtEnd) {
            control.UpdateAllBraille();
          }
          if (isAtEnd) {
            audio.playEnd();
          }
        },
      ]);
      // #####################################################################################################
      // #####################################################################################################
      // #####################################################################################################
    } else if ([].concat(singleMaidr.type).includes('hist')) {
      // control eventlisteners
      constants.events.push([
        [constants.chart, constants.brailleInput],
        'keydown',
        function (e) {
          let updateInfoThisRound = false; // we only update info and play tones on certain keys
          let isAtEnd = false;

          // Right
          if (
            e.key == 'ArrowRight' &&
            !(constants.isMac ? e.metaKey : e.ctrlKey) &&
            !e.shiftKey
          ) {
            // just right arrow, move right
            e.preventDefault();
            position.x += 1;
            updateInfoThisRound = true;
            isAtEnd = control.lockPosition();
          } else if (
            e.key == 'ArrowRight' &&
            (constants.isMac ? e.metaKey : e.ctrlKey) &&
            e.shiftKey
          ) {
            // ctrl shift right arrow, autoplay right
            e.preventDefault();
            position.x -= 1;
            control.Autoplay('right', position.x, plot.plotData.length);
          } else if (
            e.key == 'ArrowRight' &&
            !(constants.isMac ? e.metaKey : e.ctrlKey) &&
            e.altKey &&
            e.shiftKey
          ) {
            // alt shift right, autoplay from right
            e.preventDefault();
            constants.lastx = position.x;
            control.Autoplay('reverse-right', plot.bars.length, position.x);
          } else if (
            e.key == 'ArrowRight' &&
            (constants.isMac ? e.metaKey : e.ctrlKey) &&
            !e.shiftKey
          ) {
            // ctrl right arrow, go to end
            e.preventDefault();
            position.x = plot.plotData.length - 1;
            updateInfoThisRound = true;
            isAtEnd = control.lockPosition();
          }

          // Left
          if (
            e.key == 'ArrowLeft' &&
            !(constants.isMac ? e.metaKey : e.ctrlKey) &&
            !e.shiftKey
          ) {
            // just left arrow, move left
            e.preventDefault();
            position.x += -1;
            updateInfoThisRound = true;
            isAtEnd = control.lockPosition();
          } else if (
            e.key == 'ArrowLeft' &&
            (constants.isMac ? e.metaKey : e.ctrlKey) &&
            e.shiftKey
          ) {
            // ctrl shift left arrow, autoplay left
            e.preventDefault();
            position.x += 1;
            control.Autoplay('left', position.x, -1);
          } else if (
            e.key == 'ArrowLeft' &&
            !(constants.isMac ? e.metaKey : e.ctrlKey) &&
            e.altKey &&
            e.shiftKey
          ) {
            // alt shift left, autoplay from left
            e.preventDefault();
            constants.lastx = position.x;
            control.Autoplay('reverse-left', -1, position.x);
          } else if (
            e.key == 'ArrowLeft' &&
            (constants.isMac ? e.metaKey : e.ctrlKey) &&
            !e.shiftKey
          ) {
            // ctrl left arrow, go to beginning
            e.preventDefault();
            position.x = 0;
            updateInfoThisRound = true;
            isAtEnd = control.lockPosition();
          }

          // update display / text / audio
          if (updateInfoThisRound && !isAtEnd) {
            if (constants.brailleMode == 'off') {
              control.UpdateAll();
            } else {
              control.UpdateAllBraille();
            }
          }
          if (isAtEnd) {
            audio.playEnd();
          }
        },
      ]);

      let lastx = 0;
      for (let i = 0; i < this.controlElements.length; i++) {
        constants.events.push([
          this.controlElements[i],
          'keydown',
          function (e) {
            // period: speed up
            if (e.key == '.') {
              e.preventDefault();
              constants.SpeedUp();
              control.PlayDuringSpeedChange();
              display.announceText('Speed up');
            }

            // comma: speed down
            if (e.key == ',') {
              e.preventDefault();
              constants.SpeedDown();
              control.PlayDuringSpeedChange();
              display.announceText('Speed down');
            }

            // /: reset speed
            if (e.key == '/') {
              e.preventDefault();
              constants.SpeedReset();
              control.PlayDuringSpeedChange();
              display.announceText('Speed reset');
            }
          },
        ]);
      }
      // #####################################################################################################
      // #####################################################################################################
      // #####################################################################################################
    } else if (
      [].concat(singleMaidr.type).includes('stacked_bar') ||
      [].concat(singleMaidr.type).includes('stacked_normalized_bar') ||
      [].concat(singleMaidr.type).includes('dodged_bar')
    ) {
      // control eventlisteners
      constants.events.push([
        [constants.chart, constants.brailleInput],
        'keydown',
        function (e) {
          let updateInfoThisRound = false; // we only update info and play tones on certain keys
          let isAtEnd = false;
          constants.navigation = 0; // 0 for up/down, 1 for left/right

          if (constants.brailleMode == 'on') {
            if (e.key == 'Tab') {
              // allow
            } else {
              e.preventDefault();
            }
          }

          // Right
          if (
            e.key == 'ArrowRight' &&
            !(constants.isMac ? e.metaKey : e.ctrlKey) &&
            !e.shiftKey
          ) {
            // just right arrow, move right
            position.x += 1;
            updateInfoThisRound = true;
            constants.navigation = 1;
            isAtEnd = control.lockPosition();
          } else if (
            e.key == 'ArrowRight' &&
            (constants.isMac ? e.metaKey : e.ctrlKey) &&
            e.shiftKey
          ) {
            // ctrl shift right arrow, autoplay right
            position.x -= 1;
            control.Autoplay('right', position.x, plot.plotData.length);
          } else if (
            e.key == 'ArrowRight' &&
            !(constants.isMac ? e.metaKey : e.ctrlKey) &&
            e.altKey &&
            e.shiftKey
          ) {
            // alt shift right, autoplay from right
            constants.lastx = position.x;
            control.Autoplay('reverse-right', plot.plotData.length, position.x);
          } else if (
            e.key == 'ArrowRight' &&
            (constants.isMac ? e.metaKey : e.ctrlKey) &&
            !e.shiftKey
          ) {
            // ctrl right arrow, go to end
            position.x = plot.plotData.length - 1;
            updateInfoThisRound = true;
            isAtEnd = control.lockPosition();
          }

          // Left
          if (
            e.key == 'ArrowLeft' &&
            !(constants.isMac ? e.metaKey : e.ctrlKey) &&
            !e.shiftKey
          ) {
            // just left arrow, move left
            position.x += -1;
            updateInfoThisRound = true;
            constants.navigation = 1;
            isAtEnd = control.lockPosition();
          } else if (
            e.key == 'ArrowLeft' &&
            (constants.isMac ? e.metaKey : e.ctrlKey) &&
            e.shiftKey
          ) {
            // ctrl shift left arrow, autoplay left
            position.x += 1;
            control.Autoplay('left', position.x, -1);
          } else if (
            e.key == 'ArrowLeft' &&
            !(constants.isMac ? e.metaKey : e.ctrlKey) &&
            e.altKey &&
            e.shiftKey
          ) {
            // alt shift left, autoplay from left
            constants.lastx = position.x;
            control.Autoplay('reverse-left', -1, position.x);
          } else if (
            e.key == 'ArrowLeft' &&
            (constants.isMac ? e.metaKey : e.ctrlKey) &&
            !e.shiftKey
          ) {
            // ctrl left arrow, go to beginning
            position.x = 0;
            updateInfoThisRound = true;
            isAtEnd = control.lockPosition();
          }

          // Up
          if (
            e.key == 'ArrowUp' &&
            !(constants.isMac ? e.metaKey : e.ctrlKey) &&
            !e.shiftKey
          ) {
            // just up arrow, move up
            position.y += 1;
            updateInfoThisRound = true;
            constants.navigation = 0;
            isAtEnd = control.lockPosition();
          } else if (
            e.key == 'ArrowUp' &&
            (constants.isMac ? e.metaKey : e.ctrlKey) &&
            e.shiftKey
          ) {
            // ctrl shift up arrow, autoplay up
            control.Autoplay('up', position.y, plot.plotData[0].length);
          } else if (
            e.key == 'ArrowUp' &&
            !(constants.isMac ? e.metaKey : e.ctrlKey) &&
            e.altKey &&
            e.shiftKey
          ) {
            // alt shift up, autoplay from up
            constants.lastx = position.x;
            control.Autoplay('reverse-up', -1, plot.plotData[0].length);
          } else if (
            e.key == 'ArrowUp' &&
            (constants.isMac ? e.metaKey : e.ctrlKey) &&
            !e.shiftKey
          ) {
            // ctrl up arrow, go to top
            position.y = plot.plotData[0].length - 1;
            updateInfoThisRound = true;
          }

          // Down
          if (
            e.key == 'ArrowDown' &&
            !(constants.isMac ? e.metaKey : e.ctrlKey) &&
            !e.shiftKey
          ) {
            // just down arrow, move down
            position.y += -1;
            updateInfoThisRound = true;
            constants.navigation = 0;
            isAtEnd = control.lockPosition();
          } else if (
            e.key == 'ArrowDown' &&
            (constants.isMac ? e.metaKey : e.ctrlKey) &&
            e.shiftKey
          ) {
            // ctrl shift down arrow, autoplay down
            control.Autoplay('down', position.y, -1);
          } else if (
            e.key == 'ArrowDown' &&
            !(constants.isMac ? e.metaKey : e.ctrlKey) &&
            e.altKey &&
            e.shiftKey
          ) {
            // alt shift down, autoplay from down
            constants.lastx = position.x;
            control.Autoplay('reverse-down', -1, position.y);
          } else if (
            e.key == 'ArrowDown' &&
            (constants.isMac ? e.metaKey : e.ctrlKey) &&
            !e.shiftKey
          ) {
            // ctrl down arrow, go to bottom
            position.y = 0;
            updateInfoThisRound = true;
          }

          // update display / text / audio
          if (updateInfoThisRound && !isAtEnd) {
            if (constants.brailleMode == 'off') {
              control.UpdateAll();
            } else {
              control.UpdateAllBraille();
            }
          }
        },
      ]);

      let lastx = 0;
      for (let i = 0; i < this.controlElements.length; i++) {
        constants.events.push([
          this.controlElements[i],
          'keydown',
          function (e) {
            // period: speed up
            if (e.key == '.') {
              constants.SpeedUp();
              control.PlayDuringSpeedChange();
              display.announceText('Speed up');
            }

            // comma: speed down
            if (e.key == ',') {
              constants.SpeedDown();
              control.PlayDuringSpeedChange();
              display.announceText('Speed down');
            }

            // /: reset speed
            if (e.key == '/') {
              constants.SpeedReset();
              control.PlayDuringSpeedChange();
              display.announceText('Speed reset');
            }
          },
        ]);
      }
      // #####################################################################################################
      // #####################################################################################################
      // #####################################################################################################
    } else if ([].concat(singleMaidr.type).includes('line')) {
      window.position = new Position(-1, -1);
      window.plot = new LinePlot();

      // global variables
      let lastPlayed = '';
      constants.lastx = 0;

      // braille cursor routing
      document.addEventListener('selectionchange', function (e) {
        if (constants.brailleMode == 'on') {
          if (constants.lockSelection) {
            return;
          }
          // we lock the selection while we're changing stuff so it doesn't loop
          constants.lockSelection = true;

          // we're using braille cursor, update the selection from what was clicked
          let pos = constants.brailleInput.selectionStart;
          pos = constants.brailleInput.selectionStart;
          if (pos < 0) {
            pos = 0;
          }
          position.x = pos;
          control.lockPosition();
          let testEnd = true;

          // update display / text / audio
          if (testEnd) {
            control.UpdateAll();
          }
          if (testEnd) {
            audio.playEnd();
          }
          setTimeout(function () {
            constants.lockSelection = false;
          }, 50);
        }
      });

      // control eventlisteners
      constants.events.push([
        constants.chart,
        'keydown',
        function (e) {
          let updateInfoThisRound = false; // we only update info and play tones on certain keys
          let isAtEnd = false;

          if (e.key == 'ArrowRight') {
            if (constants.isMac ? e.metaKey : e.ctrlKey) {
              if (e.shiftKey) {
                position.x -= 1;
                control.Autoplay('right', position.x, plot.pointValuesY.length);
              } else {
                position.x = plot.pointValuesY.length - 1; // go all the way
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition();
              }
            } else if (
              e.altKey &&
              e.shiftKey &&
              position.x != plot.pointValuesY.length - 1
            ) {
              constants.lastx = position.x;
              control.Autoplay(
                'reverse-right',
                plot.pointValuesY.length,
                position.x
              );
            } else {
              position.x += 1;
              updateInfoThisRound = true;
              isAtEnd = control.lockPosition();
            }
          } else if (e.key == 'ArrowLeft') {
            // var prevLink = document.getElementById('prev');   // what is prev in the html?
            // if (prevLink) {
            // left arrow 37
            if (constants.isMac ? e.metaKey : e.ctrlKey) {
              if (e.shiftKey) {
                position.x += 1;
                control.Autoplay('left', position.x, -1);
              } else {
                position.x = 0; // go all the way
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition();
              }
            } else if (e.altKey && e.shiftKey && position.x != 0) {
              constants.lastx = position.x;
              control.Autoplay('reverse-left', -1, position.x);
            } else {
              position.x += -1;
              updateInfoThisRound = true;
              isAtEnd = control.lockPosition();
            }
            // }
          }

          // update display / text / audio
          if (updateInfoThisRound && !isAtEnd) {
            control.UpdateAll();
          }
          if (isAtEnd) {
            audio.playEnd();
          }
        },
      ]);

      constants.events.push([
        constants.brailleInput,
        'keydown',
        function (e) {
          let updateInfoThisRound = false; // we only update info and play tones on certain keys
          let isAtEnd = false;

          if (e.key == 'ArrowRight') {
            // right arrow
            e.preventDefault();
            if (e.target.selectionStart > e.target.value.length - 2) {
            } else if (constants.isMac ? e.metaKey : e.ctrlKey) {
              if (e.shiftKey) {
                position.x -= 1;
                control.Autoplay('right', position.x, plot.pointValuesY.length);
              } else {
                position.x = plot.pointValuesY.length - 1; // go all the way
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition();
              }
            } else if (
              e.altKey &&
              e.shiftKey &&
              position.x != plot.pointValues.length - 1
            ) {
              constants.lastx = position.x;
              control.Autoplay(
                'reverse-right',
                plot.pointValuesY.length,
                position.x
              );
            } else {
              position.x += 1;
              updateInfoThisRound = true;
              isAtEnd = control.lockPosition();
            }
          } else if (e.key == 'ArrowLeft') {
            // left arrow
            e.preventDefault();
            if (constants.isMac ? e.metaKey : e.ctrlKey) {
              if (e.shiftKey) {
                position.x += 1;
                control.Autoplay('left', position.x, -1);
              } else {
                position.x = 0; // go all the way
                updateInfoThisRound = true;
                isAtEnd = control.lockPosition();
              }
            } else if (e.altKey && e.shiftKey && position.x != 0) {
              constants.lastx = position.x;
              control.Autoplay('reverse-left', -1, position.x);
            } else {
              position.x += -1;
              updateInfoThisRound = true;
              isAtEnd = control.lockPosition();
            }
          } else if (e.key == 'Tab') {
            // do nothing, we handle this in global events
          } else {
            e.preventDefault();
          }

          // update display / text / audio
          if (updateInfoThisRound && !isAtEnd) {
            control.UpdateAllBraille();
          }
          if (isAtEnd) {
            audio.playEnd();
          }
        },
      ]);

      let lastx = 0;
      for (let i = 0; i < this.controlElements.length; i++) {
        constants.events.push([
          this.controlElements[i],
          'keydown',
          function (e) {
            // period: speed up
            if (e.key == '.') {
              constants.SpeedUp();
              control.PlayDuringSpeedChange();
              display.announceText('Speed up');
            }

            // comma: speed down
            if (e.key == ',') {
              constants.SpeedDown();
              control.PlayDuringSpeedChange();
              display.announceText('Speed down');
            }

            // /: reset speed
            if (e.key == '/') {
              constants.SpeedReset();
              control.PlayDuringSpeedChange();
              display.announceText('Speed reset');
            }
          },
        ]);
      }
      //bookmark
      // working through moving these functions and consolidating below, got to here
    }
  }
  PlayDuringSpeedChange() {
    if (constants.autoplayId != null) {
      constants.KillAutoplay();
      audio.KillSmooth();
      if (lastPlayed == 'reverse-left') {
        if (constants.chartType == 'point') {
          control.Autoplay('right', position.x, lastx);
        } else if (constants.chartType == 'smooth') {
          control.Autoplay('right', positionL1.x, constants.lastx1);
        } else if (constants.plotOrientation == 'vert') {
          control.Autoplay('right', position.y, lastY);
        } else {
          control.Autoplay('right', position.x, lastx);
        }
      } else if (lastPlayed == 'reverse-right') {
        if (constants.chartType == 'point') {
          control.Autoplay('left', position.x, lastx);
        } else if (constants.chartType == 'smooth') {
          control.Autoplay('left', positionL1.x, constants.lastx1);
        } else if (constants.plotOrientation == 'vert') {
          control.Autoplay('left', position.y, lastY);
        } else {
          control.Autoplay('left', position.x, lastx);
        }
      } else if (lastPlayed == 'reverse-up') {
        if (constants.plotOrientation == 'vert') {
          control.Autoplay('down', position.y, lastY);
        } else {
          control.Autoplay('down', position.x, lastx);
        }
      } else if (lastPlayed == 'reverse-down') {
        if (constants.plotOrientation == 'vert') {
          control.Autoplay('up', position.y, lastY);
        } else {
          control.Autoplay('up', position.x, lastx);
        }
      } else {
        if (constants.chartType == 'point') {
          control.Autoplay(lastPlayed, position.x, lastx);
        } else if (constants.chartType == 'smooth') {
          control.Autoplay(lastPlayed, positionL1.x, constants.lastx1);
        } else if (constants.plotOrientation == 'vert') {
          control.Autoplay(lastPlayed, position.y, lastY);
        } else {
          control.Autoplay(lastPlayed, position.x, lastx);
        }
      }
    }
  }
  lockPosition(xMax, yMax) {
    let didLockHappen = false;
    // default values, which works for bar like charts
    if (
      control.isUndefinedOrNull(xMax) &&
      constants.chartType != 'smooth' &&
      constants.chartType != 'line'
    ) {
      if (constants.plotOrientation == 'vert') {
        xMax = 0;
        yMax = plot.sections.length - 1;
      } else {
        xMax = plot.plotData.length - 1;
        yMax = 0;
      }
    }

    // exceptions first:
    // smooth
    if (constants.chartType == 'smooth') {
      if (positionL1.x < 0) {
        positionL1.x = 0;
        didLockHappen = true;
      }
      if (positionL1.x > plot.curvePoints.length - 1) {
        positionL1.x = plot.curvePoints.length - 1;
        didLockHappen = true;
      }
    } else if (constants.chartType == 'line') {
      if (position.x < 0) {
        position.x = 0;
        didLockHappen = true;
      }
      if (position.x > plot.pointValuesY.length - 1) {
        position.x = plot.pointValuesY.length - 1;
        didLockHappen = true;
      }
    } else if (
      constants.chartType == 'stacked_bar' ||
      constants.chartType == 'stacked_normalized_bar' ||
      constants.chartType == 'dodged_bar'
    ) {
      if (position.x < 0) {
        position.x = 0;
        didLockHappen = true;
      } else if (position.x > plot.level.length - 1) {
        position.x = plot.level.length - 1;
        didLockHappen = true;
      }
      if (position.y < 0) {
        position.y = 0;
        didLockHappen = true;
      } else if (position.y > plot.fill.length - 1) {
        position.y = plot.fill.length - 1;
        didLockHappen = true;
      }
    } else {
      // lock to min / max postions
      if (position.y < 0) {
        position.y = 0;
        didLockHappen = true;
        if (constants.brailleMode != 'off') {
          // change selection to match postion as well
          constants.brailleInput.selectionEnd = 0;
        }
      }
      if (position.x < 0) {
        position.x = 0;
        didLockHappen = true;
        if (constants.brailleMode != 'off') {
          // change selection to match postion as well
          constants.brailleInput.selectionEnd = 0;
        }
      }
      if (position.x > xMax) {
        position.x = xMax;
        didLockHappen = true;
        constants.brailleInput.selectionStart =
          constants.brailleInput.value.length;
      }
      if (position.y > yMax) {
        position.y = yMax;
        didLockHappen = true;
        constants.brailleInput.selectionStart =
          constants.brailleInput.value.length;
      }
    }
    return didLockHappen;
  }
  UpdateAll() {
    if (constants.showDisplay) {
      display.displayValues();
    }
    if (constants.showRect && constants.hasRect) {
      if ([].concat(singleMaidr.type).includes('bar')) {
        plot.Select();
      } else if ([].concat(singleMaidr.type).includes('box')) {
        singleMaidr.rect.UpdateRect();
      } else if ([].concat(singleMaidr.type).includes('heat')) {
        singleMaidr.rect.UpdateRectDisplay();
      } else if ([].concat(singleMaidr.type).includes('point')) {
        if (layer0Point.hasRect) {
          layer0Point.UpdatePointDisplay();
        }
      } else if ([].concat(singleMaidr.type).includes('smooth')) {
        if (layer1Point.hasRect) {
          layer1Point.UpdatePointDisplay();
        }
      } else if ([].concat(singleMaidr.type).includes('hist')) {
        if (constants.showRect && constants.hasRect) {
          plot.Select();
        }
      } else if (
        [].concat(singleMaidr.type).includes('stacked_bar') ||
        [].concat(singleMaidr.type).includes('stacked_normalized_bar') ||
        [].concat(singleMaidr.type).includes('dodged_bar')
      ) {
        if (constants.showRect && constants.hasRect) {
          plot.Select();
        }
      } else if ([].concat(singleMaidr.type).includes('line')) {
        if (constants.showRect && constants.hasRect) {
          let point = new Point();
          point.UpdatePointDisplay();
        }
      }
    }
    if (constants.sonifMode != 'off') {
      plot.PlayTones();
    }
  }
  UpdateAllAutoPlay() {
    if (constants.showDisplayInAutoplay) {
      display.displayValues();
    }
    if (constants.showRect && constants.hasRect) {
      if ([].concat(singleMaidr.type).includes('bar')) {
        plot.Select();
      } else if ([].concat(singleMaidr.type).includes('box')) {
        singleMaidr.rect.UpdateRect();
      } else if ([].concat(singleMaidr.type).includes('heat')) {
        singleMaidr.rect.UpdateRectDisplay();
      } else if (
        [].concat(singleMaidr.type).includes('point') ||
        [].concat(singleMaidr.type).includes('smooth')
      ) {
        if (constants.showRect) {
          if (constants.chartType == 'point' && layer0Point.hasRect) {
            layer0Point.UpdatePointDisplay();
          } else if (constants.chartType == 'smooth' && layer1Point.hasRect) {
            layer1Point.UpdatePointDisplay();
          }
        }
      } else if ([].concat(singleMaidr.type).includes('hist')) {
        if (constants.showRect && constants.hasRect) {
          plot.Select();
        }
      } else if (
        [].concat(singleMaidr.type).includes('stacked_bar') ||
        [].concat(singleMaidr.type).includes('stacked_normalized_bar') ||
        [].concat(singleMaidr.type).includes('dodged_bar')
      ) {
        if (constants.showRect && constants.hasRect) {
          plot.Select();
        }
      } else if ([].concat(singleMaidr.type).includes('line')) {
        if (constants.showRect) {
          let point = new Point();
          point.UpdatePointDisplay();
        }
      }
    }
    if (constants.sonifMode != 'off') {
      plot.PlayTones();
    }

    if (constants.brailleMode != 'off') {
      display.UpdateBraillePos();
    }
  }
  UpdateAllBraille() {
    if (constants.showDisplayInBraille) {
      if (
        [].concat(singleMaidr.type).includes('stacked_bar') ||
        [].concat(singleMaidr.type).includes('stacked_normalized_bar') ||
        [].concat(singleMaidr.type).includes('dodged_bar')
      ) {
        display.SetBraille();
      }
      display.displayValues();
    }
    if (constants.showRect && constants.hasRect) {
      if ([].concat(singleMaidr.type).includes('bar')) {
        plot.Select();
      } else if ([].concat(singleMaidr.type).includes('box')) {
        singleMaidr.rect.UpdateRect();
      } else if ([].concat(singleMaidr.type).includes('heat')) {
        singleMaidr.rect.UpdateRectDisplay();
      } else if (
        [].concat(singleMaidr.type).includes('point') ||
        [].concat(singleMaidr.type).includes('smooth')
      ) {
        if (layer1Point.hasRect) {
          layer1Point.UpdatePointDisplay();
        }
      } else if ([].concat(singleMaidr.type).includes('hist')) {
        if (constants.showRect && constants.hasRect) {
          plot.Select();
        }
      } else if (
        [].concat(singleMaidr.type).includes('stacked_bar') ||
        [].concat(singleMaidr.type).includes('stacked_normalized_bar') ||
        [].concat(singleMaidr.type).includes('dodged_bar')
      ) {
        if (constants.showRect && constants.hasRect) {
          plot.Select();
        }
      } else if ([].concat(singleMaidr.type).includes('line')) {
        if (constants.showRect) {
          let point = new Point();
          point.UpdatePointDisplay();
        }
      }
    }
    if (constants.sonifMode != 'off') {
      plot.PlayTones();
    }
    display.UpdateBraillePos();
  }
  Autoplay(dir, start, end) {
    let lastPlayed = dir;
    if ([].concat(singleMaidr.type).includes('bar')) {
      let step = 1; // default right and reverse-left
      if (dir == 'left' || dir == 'reverse-right') {
        step = -1;
      }

      // clear old autoplay if exists
      if (constants.autoplayId != null) {
        constants.KillAutoplay();
      }

      if (dir == 'reverse-right' || dir == 'reverse-left') {
        position.x = start;
      }

      constants.autoplayId = setInterval(function () {
        position.x += step;
        if (position.x < 0 || plot.plotData.length - 1 < position.x) {
          constants.KillAutoplay();
          control.lockPosition();
        } else if (position.x == end) {
          constants.KillAutoplay();
          control.UpdateAllAutoPlay();
        } else {
          control.UpdateAllAutoPlay();
        }
      }, constants.autoPlayRate);
    } else if ([].concat(singleMaidr.type).includes('box')) {
      lastPlayed = dir;
      let step = 1; // default right / up / reverse-left / reverse-down
      if (
        dir == 'left' ||
        dir == 'down' ||
        dir == 'reverse-right' ||
        dir == 'reverse-up'
      ) {
        step = -1;
      }

      // clear old autoplay if exists
      if (constants.autoplayId != null) {
        constants.KillAutoplay();
      }

      if (dir == 'reverse-left' || dir == 'reverse-right') {
        position.x = start;
      } else if (dir == 'reverse-up' || dir == 'reverse-down') {
        position.y = start;
      }

      if (constants.debugLevel > 0) {
        console.log('starting autoplay', dir, start, end);
      }

      control.UpdateAllAutoPlay(); // play current tone before we move
      constants.autoplayId = setInterval(function () {
        let doneNext = false;
        if (dir == 'left' || dir == 'right' || dir == 'up' || dir == 'down') {
          if (
            (position.x < 1 && dir == 'left') ||
            (constants.plotOrientation == 'vert' &&
              dir == 'up' &&
              position.y > plot.sections.length - 2) ||
            (constants.plotOrientation == 'horz' &&
              dir == 'up' &&
              position.y > plot.plotData.length - 2) ||
            (constants.plotOrientation == 'horz' &&
              dir == 'right' &&
              position.x > plot.sections.length - 2) ||
            (constants.plotOrientation == 'vert' &&
              dir == 'right' &&
              position.x > plot.plotData.length - 2) ||
            (constants.plotOrientation == 'horz' &&
              dir == 'down' &&
              position.y < 1) ||
            (constants.plotOrientation == 'vert' &&
              dir == 'down' &&
              position.y < 1)
          ) {
            doneNext = true;
          }
        } else {
          if (
            (dir == 'reverse-left' && position.x >= end) ||
            (dir == 'reverse-right' && position.x <= end) ||
            (dir == 'reverse-up' && position.y <= end) ||
            (dir == 'reverse-down' && position.y >= end)
          ) {
            doneNext = true;
          }
        }

        if (doneNext) {
          constants.KillAutoplay();
        } else {
          if (
            dir == 'left' ||
            dir == 'right' ||
            dir == 'reverse-left' ||
            dir == 'reverse-right'
          ) {
            position.x += step;
          } else {
            position.y += step;
          }
          control.UpdateAllAutoPlay();
        }
        if (constants.debugLevel > 5) {
          console.log('autoplay pos', position);
        }
      }, constants.autoPlayRate);
    } else if ([].concat(singleMaidr.type).includes('heat')) {
      lastPlayed = dir;
      let xMax = plot.num_cols - 1;
      let yMax = plot.num_rows - 1;
      let step = 1; // default right, down, reverse-left, and reverse-up
      if (
        dir == 'left' ||
        dir == 'up' ||
        dir == 'reverse-right' ||
        dir == 'reverse-down'
      ) {
        step = -1;
      }

      // clear old autoplay if exists
      if (constants.autoplayId != null) {
        constants.KillAutoplay();
      }

      if (dir == 'reverse-left' || dir == 'reverse-right') {
        position.x = start;
      } else if (dir == 'reverse-up' || dir == 'reverse-down') {
        position.y = start;
      }

      constants.autoplayId = setInterval(function () {
        if (
          dir == 'left' ||
          dir == 'right' ||
          dir == 'reverse-left' ||
          dir == 'reverse-right'
        ) {
          position.x += step;
          if (position.x < 0 || plot.num_cols - 1 < position.x) {
            constants.KillAutoplay();
            control.lockPosition(xMax, yMax);
          } else if (position.x == end) {
            constants.KillAutoplay();
            control.UpdateAllAutoPlay();
          } else {
            control.UpdateAllAutoPlay();
          }
        } else {
          // up or down
          position.y += step;
          if (position.y < 0 || plot.num_rows - 1 < position.y) {
            constants.KillAutoplay();
            control.lockPosition(xMax, yMax);
          } else if (position.y == end) {
            constants.KillAutoplay();
            control.UpdateAllAutoPlay();
          } else {
            control.UpdateAllAutoPlay();
          }
        }
      }, constants.autoPlayRate);
    } else if (
      [].concat(singleMaidr.type).includes('point') ||
      [].concat(singleMaidr.type).includes('smooth')
    ) {
      lastPlayed = dir;
      let xMax = 0;
      let yMax = 0;
      if (constants.chartType == 'point') {
        xMax = plot.x.length - 1;
      } else if (constants.chartType == 'smooth') {
        xMax = plot.curvePoints.length - 1;
      }
      let step = 1; // default right and reverse left
      if (dir == 'left' || dir == 'reverse-right') {
        step = -1;
      }

      // clear old autoplay if exists
      if (constants.autoplayId) {
        constants.KillAutoplay();
      }
      if (constants.isSmoothAutoplay) {
        audio.KillSmooth();
      }

      if (dir == 'reverse-left' || dir == 'reverse-right') {
        position.x = start;
        position.L1x = start;
      }

      if (constants.chartType == 'point') {
        constants.autoplayId = setInterval(function () {
          position.x += step;
          if (position.x < 0 || position.x > plot.y.length - 1) {
            constants.KillAutoplay();
            control.lockPosition(xMax, yMax);
          } else if (position.x == end) {
            constants.KillAutoplay();
            control.UpdateAllAutoPlay();
          } else {
            control.UpdateAllAutoPlay();
          }
        }, constants.autoPlayRate);
      } else if (constants.chartType == 'smooth') {
        constants.autoplayId = setInterval(function () {
          positionL1.x += step;
          if (positionL1.x < 0 || positionL1.x > plot.curvePoints.length - 1) {
            constants.KillAutoplay();
            control.lockPosition(xMax, yMax);
          } else if (positionL1.x == end) {
            constants.KillAutoplay();
            control.UpdateAllAutoPlay();
          } else {
            control.UpdateAllAutoPlay();
          }
        }, constants.autoPlayRate);
      }
    } else if ([].concat(singleMaidr.type).includes('hist')) {
      lastPlayed = dir;
      let step = 1; // default right and reverse-left
      if (dir == 'left' || dir == 'reverse-right') {
        step = -1;
      }

      // clear old autoplay if exists
      if (constants.autoplayId != null) {
        constants.KillAutoplay();
      }

      if (dir == 'reverse-right' || dir == 'reverse-left') {
        position.x = start;
      }

      constants.autoplayId = setInterval(function () {
        position.x += step;
        if (position.x < 0 || plot.plotData.length - 1 < position.x) {
          constants.KillAutoplay();
          control.lockPosition();
        } else if (position.x == end) {
          constants.KillAutoplay();
          control.UpdateAllAutoPlay();
        } else {
          control.UpdateAllAutoPlay();
        }
      }, constants.autoPlayRate);
    } else if (
      [].concat(singleMaidr.type).includes('stacked_bar') ||
      [].concat(singleMaidr.type).includes('stacked_normalized_bar') ||
      [].concat(singleMaidr.type).includes('dodged_bar')
    ) {
      lastPlayed = dir;
      let step = 1; // default right, up, reverse-left, and reverse-down
      if (
        dir == 'left' ||
        dir == 'down' ||
        dir == 'reverse-right' ||
        dir == 'reverse-up'
      ) {
        step = -1;
      }

      // clear old autoplay if exists
      if (constants.autoplayId != null) {
        constants.KillAutoplay();
      }

      if (dir == 'reverse-left' || dir == 'reverse-right') {
        position.x = start;
      } else if (dir == 'reverse-up' || dir == 'reverse-down') {
        position.y = start;
      }

      constants.autoplayId = setInterval(function () {
        if (
          dir == 'left' ||
          dir == 'right' ||
          dir == 'reverse-left' ||
          dir == 'reverse-right'
        ) {
          position.x += step;
          if (position.x < 0 || plot.plotData.length - 1 < position.x) {
            constants.KillAutoplay();
            control.lockPosition();
          } else if (position.x == end) {
            constants.KillAutoplay();
            control.UpdateAllAutoPlay();
          } else {
            control.UpdateAllAutoPlay();
          }
        } else {
          // up or down
          position.y += step;
          if (position.y < 0 || plot.plotData[0].length - 1 < position.y) {
            constants.KillAutoplay();
            control.lockPosition();
          } else if (position.y == end) {
            constants.KillAutoplay();
            control.UpdateAllAutoPlay();
          } else {
            control.UpdateAllAutoPlay();
          }
        }
      }, constants.autoPlayRate);
    } else if ([].concat(singleMaidr.type).includes('line')) {
      lastPlayed = dir;
      let step = 1; // default right and reverse-left
      if (dir == 'left' || dir == 'reverse-right') {
        step = -1;
      }

      // clear old autoplay if exists
      if (constants.autoplayId != null) {
        constants.KillAutoplay();
      }

      if (dir == 'reverse-right' || dir == 'reverse-left') {
        position.x = start;
      }

      constants.autoplayId = setInterval(function () {
        position.x += step;
        if (position.x < 0 || plot.pointValuesY.length - 1 < position.x) {
          constants.KillAutoplay();
          control.lockPosition();
        } else if (position.x == end) {
          constants.KillAutoplay();
          control.UpdateAllAutoPlay();
        } else {
          control.UpdateAllAutoPlay();
        }
      }, constants.autoPlayRate);
    }
  }
  PlayLine(dir) {
    let freqArr = [];
    let panningArr = [];
    let panPoint = audio.SlideBetween(
      positionL1.x,
      0,
      plot.curvePoints.length - 1,
      -1,
      1
    );
    let x = positionL1.x < 0 ? 0 : positionL1.x;
    let duration = 0;
    if (dir == 'right') {
      for (let i = x; i < plot.curvePoints.length; i++) {
        freqArr.push(
          audio.SlideBetween(
            plot.curvePoints[i],
            plot.curveMinY,
            plot.curveMaxY,
            constants.MIN_FREQUENCY,
            constants.MAX_FREQUENCY
          )
        );
      }
      panningArr = [panPoint, 1];
      duration =
        (Math.abs(plot.curvePoints.length - x) / plot.curvePoints.length) * 3;
    } else if (dir == 'left') {
      for (let i = x; i >= 0; i--) {
        freqArr.push(
          audio.SlideBetween(
            plot.curvePoints[i],
            plot.curveMinY,
            plot.curveMaxY,
            constants.MIN_FREQUENCY,
            constants.MAX_FREQUENCY
          )
        );
      }
      panningArr = [panPoint, -1];
      duration = (Math.abs(x) / plot.curvePoints.length) * 3;
    } else if (dir == 'reverse-right') {
      for (let i = plot.curvePoints.length - 1; i >= x; i--) {
        freqArr.push(
          audio.SlideBetween(
            plot.curvePoints[i],
            plot.curveMinY,
            plot.curveMaxY,
            constants.MIN_FREQUENCY,
            constants.MAX_FREQUENCY
          )
        );
      }
      panningArr = [1, panPoint];
      duration =
        (Math.abs(plot.curvePoints.length - x) / plot.curvePoints.length) * 3;
    } else if (dir == 'reverse-left') {
      for (let i = 0; i <= x; i++) {
        freqArr.push(
          audio.SlideBetween(
            plot.curvePoints[i],
            plot.curveMinY,
            plot.curveMaxY,
            constants.MIN_FREQUENCY,
            constants.MAX_FREQUENCY
          )
        );
      }
      panningArr = [-1, panPoint];
      duration = (Math.abs(x) / plot.curvePoints.length) * 3;
    }

    if (constants.isSmoothAutoplay) {
      audio.KillSmooth();
    }

    // audio.playSmooth(freqArr, 2, panningArr, constants.vol, 'sine');
    audio.playSmooth(freqArr, duration, panningArr, constants.vol, 'sine');
  }

  /**
   * Gets the next or previous focusable element based on the current focus.
   * @param {string} nextprev - Determines whether to get the next or previous focusable element. Defaults to 'next'.
   * @returns {HTMLElement|null} - The next or previous focusable element, or null if it does not exist.
   */
  GetNextPrevFocusable() {
    // store all focusable elements for future tabbing away from chart
    let focusableSelectors =
      'a[href], button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    constants.focusables = Array.from(
      document.querySelectorAll(focusableSelectors)
    );

    // get index of chart in focusables
    let chartIndex = constants.focusables.indexOf(constants.chart);

    // remove all the stuff we add manually from focusables
    let maidrFocusables =
      constants.main_container.querySelectorAll(focusableSelectors);
    for (let i = 0; i < maidrFocusables.length; i++) {
      let index = constants.focusables.indexOf(maidrFocusables[i]);
      if (index > -1) {
        constants.focusables.splice(index, 1);
      }
      // and adjust chartIndex
      if (chartIndex > index) {
        chartIndex--;
      }
    }

    // now we get next / prev based on chartIndex. If DNE, return null
  }
  /**
   * Checks if the given item is undefined or null.
   * @param {*} item - The item to check.
   * @returns {boolean} - Returns true if the item is undefined or null, else false.
   */
  // todo: this is duplicated in Tracker. Consolidate both somewhere sensible
  isUndefinedOrNull(item) {
    try {
      return item === undefined || item === null;
    } catch {
      return true;
    }
  }
}
