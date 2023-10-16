class Constants {
  // element ids
  chart_container_id = 'chart-container';
  main_container_id = 'maidr-container';
  //chart_container_class = 'chart-container'; // remove later
  braille_container_id = 'braille-div';
  braille_input_id = 'braille-input';
  info_id = 'info';
  announcement_container_id = 'announcements';
  end_chime_id = 'end_chime';
  container_id = 'container';
  project_id = 'maidr';
  review_id_container = 'review_container';
  review_id = 'review';
  reviewSaveSpot;
  reviewSaveBrailleMode;
  chartId = '';
  events = [];
  postLoadEvents = [];

  // default constructor for all charts
  constructor() {}

  // BTS modes initial values
  textMode = 'verbose'; // off / terse / verbose
  brailleMode = 'off'; // on / off
  sonifMode = 'on'; // sep / same / off
  reviewMode = 'off'; // on / off

  // basic chart properties
  minX = 0;
  maxX = 0;
  minY = 0;
  maxY = 0;
  plotId = ''; // update with id in chart specific js
  chartType = ''; // set as 'box' or whatever later in chart specific js file
  navigation = 1; // 0 = row navigation (up/down), 1 = col navigation (left/right)

  // basic audio properties
  MAX_FREQUENCY = 1000;
  MIN_FREQUENCY = 200;
  NULL_FREQUENCY = 100;

  // autoplay speed
  MAX_SPEED = 500;
  MIN_SPEED = 1; // 50;
  DEFAULT_SPEED = 250;
  INTERVAL = 50;
  AUTOPLAY_DURATION = 5000; // 5s

  // user settings
  vol = 0.5;
  MAX_VOL = 30;
  // autoPlayRate = this.DEFAULT_SPEED; // ms per tone
  autoPlayRate = this.DEFAULT_SPEED; // ms per tone
  colorSelected = '#03C809';
  brailleDisplayLength = 32; // num characters in user's braille display.  40 is common length for desktop / mobile applications

  // advanced user settings
  showRect = 1; // true / false
  hasRect = 1; // true / false
  hasSmooth = 1; // true / false
  duration = 0.3;
  outlierDuration = 0.06;
  autoPlayOutlierRate = 50; // ms per tone
  autoPlayPointsRate = 30;
  colorUnselected = '#595959'; // we don't use this yet, but remember: don't rely on color! also do a shape or pattern fill
  isTracking = 1; // 0 / 1, is tracking on or off
  visualBraille = false; // do we want to represent braille based on what's visually there or actually there. Like if we have 2 outliers with the same position, do we show 1 (visualBraille true) or 2 (false)
  globalMinMax = true;

  // user controls (not exposed to menu, with shortcuts usually)
  showDisplay = 1; // true / false
  showDisplayInBraille = 1; // true / false
  showDisplayInAutoplay = 0; // true / false
  outlierInterval = null;

  // platform controls
  isMac = navigator.userAgent.toLowerCase().includes('mac'); // true if macOS
  control = this.isMac ? 'Cmd' : 'Ctrl';
  alt = this.isMac ? 'option' : 'Alt';
  home = this.isMac ? 'fn + Left arrow' : 'Home';
  end = this.isMac ? 'fn + Right arrow' : 'End';

  // internal controls
  keypressInterval = 2000; // ms or 2s
  tabMovement = null;

  // debug stuff
  debugLevel = 3; // 0 = no console output, 1 = some console, 2 = more console, etc
  canPlayEndChime = false; //
  manualData = true; // pull from manual data like chart2music (true), or do the old method where we pull from the chart (false)

  KillAutoplay() {
    if (this.autoplayId) {
      clearInterval(this.autoplayId);
      this.autoplayId = null;
    }
  }

  KillSepPlay() {
    if (this.sepPlayId) {
      clearInterval(this.sepPlayId);
      this.sepPlayId = null;
    }
  }

  SpeedUp() {
    if (constants.autoPlayRate - this.INTERVAL > this.MIN_SPEED) {
      constants.autoPlayRate -= this.INTERVAL;
    }
  }

  SpeedDown() {
    if (constants.autoPlayRate + this.INTERVAL <= this.MAX_SPEED) {
      constants.autoPlayRate += this.INTERVAL;
    }
  }

  SpeedReset() {
    constants.autoPlayRate = constants.DEFAULT_SPEED;
  }
}

class Resources {
  constructor() {}

  language = 'en'; // 2 char lang code
  knowledgeLevel = 'basic'; // basic, intermediate, expert

  // these strings run on getters, which pull in language, knowledgeLevel, chart, and actual requested string
  strings = {
    en: {
      basic: {
        upper_outlier: 'Upper Outlier',
        lower_outlier: 'Lower Outlier',
        min: 'Minimum',
        max: 'Maximum',
        25: '25%',
        50: '50%',
        75: '75%',
        q1: '25%',
        q2: '50%',
        q3: '75%',
        son_on: 'Sonification on',
        son_off: 'Sonification off',
        son_des: 'Sonification descrete',
        son_comp: 'Sonification compare',
        son_ch: 'Sonification chord',
        son_sep: 'Sonification separate',
        son_same: 'Sonification combined',
        empty: 'Empty',
      },
    },
  };

  GetString(id) {
    return this.strings[this.language][this.knowledgeLevel][id];
  }
}

class Menu {
  whereWasMyFocus = null;

  constructor() {
    this.CreateMenu();
    this.LoadDataFromLocalStorage();
  }

  menuHtml = `
        <div id="menu" class="modal hidden" role="dialog" tabindex="-1">
            <div class="modal-dialog" role="document" tabindex="0">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Menu</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div>
                            <h5 class="modal-title">Keyboard Shortcuts</h5>
                            <table>
                                <caption class="sr-only">Keyboard Shortcuts</caption>
                                <thead>
                                    <tr>
                                        <th scope="col">Function</th>
                                        <th scope="col">Key</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Move around plot</td>
                                        <td>Arrow keys</td>
                                    </tr>
                                    <tr>
                                        <td>Go to the very left right up down</td>
                                        <td>${constants.control} + Arrow key</td>
                                    </tr>
                                    <tr>
                                        <td>Select the first element</td>
                                        <td>${constants.control} + ${constants.home}</td>
                                    </tr>
                                    <tr>
                                        <td>Select the last element</td>
                                        <td>${constants.control} + ${constants.end}</td>
                                    </tr>
                                    <tr>
                                        <td>Toggle Braille Mode</td>
                                        <td>b</td>
                                    </tr>
                                    <tr>
                                        <td>Toggle Sonification Mode</td>
                                        <td>s</td>
                                    </tr>
                                    <tr>
                                        <td>Toggle Text Mode</td>
                                        <td>t</td>
                                    </tr>
                                    <tr>
                                        <td>Repeat current sound</td>
                                        <td>Space</td>
                                    </tr>
                                    <tr>
                                        <td>Auto-play outward in direction of arrow</td>
                                        <td>${constants.control} + Shift + Arrow key</td>
                                    </tr>
                                    <tr>
                                        <td>Auto-play inward in direction of arrow</td>
                                        <td>${constants.alt} + Shift + Arrow key</td>
                                    </tr>
                                    <tr>
                                        <td>Stop Auto-play</td>
                                        <td>${constants.control}</td>
                                    </tr>
                                    <tr>
                                        <td>Auto-play speed up</td>
                                        <td>Period</td>
                                    </tr>
                                    <tr>
                                        <td>Auto-play speed down</td>
                                        <td>Comma</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div>
                            <h5 class="modal-title">Settings</h5>
                            <p><input type="range" id="vol" name="vol" min="0" max="1" step=".05"><label for="vol">Volume</label></p>
                            <!-- <p><input type="checkbox" id="show_rect" name="show_rect"><label for="show_rect">Show Outline</label></p> //-->
                            <p><input type="number" min="4" max="2000" step="1" id="braille_display_length" name="braille_display_length"><label for="braille_display_length">Braille Display Size</label></p>
                            <p><input type="number" min="1" max="500" step="20" id="autoplay_rate" name="autoplay_rate"><label for="autoplay_rate">Autoplay Rate</label></p>
                            <p><input type="color" id="color_selected" name="color_selected"><label for="color_selected">Outline Color</label></p>
                            <p><input type="number" min="10" max="2000" step="10" id="min_freq" name="min_freq"><label for="min_freq">Min Frequency (Hz)</label></p>
                            <p><input type="number" min="20" max="2010" step="10" id="max_freq" name="max_freq"><label for="max_freq">Max Frequency (Hz)</label></p>
                            <p><input type="number" min="500" max="5000" step="500" id="keypress_interval" name="keypress_interval"><label for="keypress_interval">Keypress Interval (ms)</label></p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="save_and_close_menu">Save and close</button>
                        <button type="button" id="close_menu">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div id="modal_backdrop" class="modal-backdrop hidden"></div>
        `;

  CreateMenu() {
    // menu element creation
    document
      .querySelector('body')
      .insertAdjacentHTML('beforeend', this.menuHtml);

    // menu close events
    let allClose = document.querySelectorAll('#close_menu, #menu .close');
    for (let i = 0; i < allClose.length; i++) {
      allClose[i].addEventListener('click', function (e) {
        menu.Toggle(false);
      });
    }
    document
      .getElementById('save_and_close_menu')
      .addEventListener('click', function (e) {
        menu.SaveData();
        menu.Toggle(false);
      });
    document.getElementById('menu').addEventListener('keydown', function (e) {
      if (e.key == 'Esc') {
        // esc
        menu.Toggle(false);
      }
    });

    // menu open events
    // note: this triggers a maidr destroy
    document.addEventListener('keyup', function (e) {
      if (e.key == 'h') {
        // M(77) for menu, or H(72) for help? I don't like it
        menu.Toggle(true);
      }
    });
  }

  Toggle(onoff = false) {
    if (typeof onoff == 'undefined') {
      if (document.getElementById('menu').classList.contains('hidden')) {
        onoff = true;
      } else {
        onoff = false;
      }
    }
    if (onoff) {
      // open
      this.whereWasMyFocus = document.activeElement;
      this.PopulateData();
      document.getElementById('menu').classList.remove('hidden');
      document.getElementById('modal_backdrop').classList.remove('hidden');
      document.querySelector('#menu .close').focus();
    } else {
      // close
      document.getElementById('menu').classList.add('hidden');
      document.getElementById('modal_backdrop').classList.add('hidden');
      this.whereWasMyFocus.focus();
      this.whereWasMyFocus = null;
    }
  }

  PopulateData() {
    document.getElementById('vol').value = constants.vol;
    //document.getElementById('show_rect').checked = constants.showRect;
    document.getElementById('autoplay_rate').value = constants.autoPlayRate;
    document.getElementById('braille_display_length').value =
      constants.brailleDisplayLength;
    document.getElementById('color_selected').value = constants.colorSelected;
    document.getElementById('min_freq').value = constants.MIN_FREQUENCY;
    document.getElementById('max_freq').value = constants.MAX_FREQUENCY;
    document.getElementById('keypress_interval').value =
      constants.keypressInterval;
  }

  SaveData() {
    constants.vol = document.getElementById('vol').value;
    //constants.showRect = document.getElementById('show_rect').checked;
    constants.autoPlayRate = document.getElementById('autoplay_rate').value;
    constants.brailleDisplayLength = document.getElementById(
      'braille_display_length'
    ).value;
    constants.colorSelected = document.getElementById('color_selected').value;
    constants.MIN_FREQUENCY = document.getElementById('min_freq').value;
    constants.MAX_FREQUENCY = document.getElementById('max_freq').value;
    constants.keypressInterval =
      document.getElementById('keypress_interval').value;
  }

  SaveDataToLocalStorage() {
    // save all data in this.SaveData() to local storage
    let data = {};
    data.vol = constants.vol;
    //data.showRect = constants.showRect;
    data.autoPlayRate = constants.autoPlayRate;
    data.brailleDisplayLength = constants.brailleDisplayLength;
    data.colorSelected = constants.colorSelected;
    data.MIN_FREQUENCY = constants.MIN_FREQUENCY;
    data.MAX_FREQUENCY = constants.MAX_FREQUENCY;
    data.keypressInterval = constants.keypressInterval;
    localStorage.setItem('settings_data', JSON.stringify(data));
  }
  LoadDataFromLocalStorage() {
    let data = JSON.parse(localStorage.getItem('settings_data'));
    if (data) {
      constants.vol = data.vol;
      //constants.showRect = data.showRect;
      constants.autoPlayRate = data.autoPlayRate;
      constants.brailleDisplayLength = data.brailleDisplayLength;
      constants.colorSelected = data.colorSelected;
      constants.MIN_FREQUENCY = data.MIN_FREQUENCY;
      constants.MAX_FREQUENCY = data.MAX_FREQUENCY;
      constants.keypressInterval = data.keypressInterval;
    }
  }
}

class Position {
  constructor(x, y, z = -1) {
    this.x = x;
    this.y = y;
    this.z = z; // rarely used
  }
}

// HELPER FUNCTIONS
class Helper {
  static containsObject(obj, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === obj) return true;
    }
    return false;
  }
}

class Tracker {
  constructor() {
    this.DataSetup();
  }

  DataSetup() {
    let prevData = this.GetTrackerData();
    if (prevData) {
      // good to go already, do nothing
    } else {
      let data = {};
      data.userAgent = Object.assign(navigator.userAgent);
      data.vendor = Object.assign(navigator.vendor);
      data.language = Object.assign(navigator.language);
      data.platform = Object.assign(navigator.platform);
      data.events = [];

      this.SaveTrackerData(data);
    }
  }

  DownloadTrackerData() {
    let link = document.createElement('a');
    let data = this.GetTrackerData();
    let fileStr = new Blob([JSON.stringify(data)], { type: 'text/plain' });
    link.href = URL.createObjectURL(fileStr);
    link.download = 'tracking.json';
    link.click();
  }

  SaveTrackerData(data) {
    localStorage.setItem(constants.project_id, JSON.stringify(data));
  }

  GetTrackerData() {
    let data = JSON.parse(localStorage.getItem(constants.project_id));
    return data;
  }

  Delete() {
    localStorage.removeItem(constants.project_id);
    this.data = null;

    if (constants.debugLevel > 0) {
      console.log('tracking data cleared');
    }

    this.DataSetup();
  }

  LogEvent(e) {
    let eventToLog = {};

    // computer stuff
    eventToLog.timestamp = Object.assign(e.timeStamp);
    eventToLog.time = Date().toString();
    eventToLog.key = Object.assign(e.key);
    eventToLog.altKey = Object.assign(e.altKey);
    eventToLog.ctrlKey = Object.assign(e.ctrlKey);
    eventToLog.shiftKey = Object.assign(e.shiftKey);
    if (e.path) {
      eventToLog.focus = Object.assign(e.path[0].tagName);
    }

    // settings etc, which we have to reassign otherwise they'll all be the same val
    if (!this.isUndefinedOrNull(constants.position)) {
      eventToLog.position = Object.assign(constants.position);
    }
    if (!this.isUndefinedOrNull(constants.minX)) {
      eventToLog.min_x = Object.assign(constants.minX);
    }
    if (!this.isUndefinedOrNull(constants.maxX)) {
      eventToLog.max_x = Object.assign(constants.maxX);
    }
    if (!this.isUndefinedOrNull(constants.minY)) {
      eventToLog.min_y = Object.assign(constants.minY);
    }
    if (!this.isUndefinedOrNull(constants.MAX_FREQUENCY)) {
      eventToLog.max_frequency = Object.assign(constants.MAX_FREQUENCY);
    }
    if (!this.isUndefinedOrNull(constants.MIN_FREQUENCY)) {
      eventToLog.min_frequency = Object.assign(constants.MIN_FREQUENCY);
    }
    if (!this.isUndefinedOrNull(constants.NULL_FREQUENCY)) {
      eventToLog.null_frequency = Object.assign(constants.NULL_FREQUENCY);
    }
    if (!this.isUndefinedOrNull(constants.MAX_SPEED)) {
      eventToLog.max_speed = Object.assign(constants.MAX_SPEED);
    }
    if (!this.isUndefinedOrNull(constants.MIN_SPEED)) {
      eventToLog.min_speed = Object.assign(constants.MIN_SPEED);
    }
    if (!this.isUndefinedOrNull(constants.INTERVAL)) {
      eventToLog.interval = Object.assign(constants.INTERVAL);
    }
    if (!this.isUndefinedOrNull(constants.vol)) {
      eventToLog.volume = Object.assign(constants.vol);
    }
    if (!this.isUndefinedOrNull(constants.autoPlayRate)) {
      eventToLog.autoplay_rate = Object.assign(constants.autoPlayRate);
    }
    if (!this.isUndefinedOrNull(constants.colorSelected)) {
      eventToLog.color = Object.assign(constants.colorSelected);
    }
    if (!this.isUndefinedOrNull(constants.brailleDisplayLength)) {
      eventToLog.braille_display_length = Object.assign(
        constants.brailleDisplayLength
      );
    }
    if (!this.isUndefinedOrNull(constants.duration)) {
      eventToLog.tone_duration = Object.assign(constants.duration);
    }
    if (!this.isUndefinedOrNull(constants.autoPlayOutlierRate)) {
      eventToLog.autoplay_outlier_rate = Object.assign(
        constants.autoPlayOutlierRate
      );
    }
    if (!this.isUndefinedOrNull(constants.autoPlayPointsRate)) {
      eventToLog.autoplay_points_rate = Object.assign(
        constants.autoPlayPointsRate
      );
    }
    if (!this.isUndefinedOrNull(constants.textMode)) {
      eventToLog.text_mode = Object.assign(constants.textMode);
    }
    if (!this.isUndefinedOrNull(constants.sonifMode)) {
      eventToLog.sonification_mode = Object.assign(constants.sonifMode);
    }
    if (!this.isUndefinedOrNull(constants.brailleMode)) {
      eventToLog.braille_mode = Object.assign(constants.brailleMode);
    }
    if (!this.isUndefinedOrNull(constants.chartType)) {
      eventToLog.chart_type = Object.assign(constants.chartType);
    }
    if (!this.isUndefinedOrNull(constants.infoDiv.innerHTML)) {
      let textDisplay = Object.assign(constants.infoDiv.innerHTML);
      textDisplay = textDisplay.replaceAll(/<[^>]*>?/gm, '');
      eventToLog.text_display = textDisplay;
    }
    if (!this.isUndefinedOrNull(location.href)) {
      eventToLog.location = Object.assign(location.href);
    }

    // chart specific values
    let x_tickmark = '';
    let y_tickmark = '';
    let x_label = '';
    let y_label = '';
    let value = '';
    let fill_value = '';
    if (constants.chartType == 'bar') {
      if (!this.isUndefinedOrNull(plot.columnLabels[position.x])) {
        x_tickmark = plot.columnLabels[position.x];
      }
      if (!this.isUndefinedOrNull(plot.plotLegend.x)) {
        x_label = plot.plotLegend.x;
      }
      if (!this.isUndefinedOrNull(plot.plotLegend.y)) {
        y_label = plot.plotLegend.y;
      }
      if (!this.isUndefinedOrNull(plot.plotData[position.x])) {
        value = plot.plotData[position.x];
      }
    } else if (constants.chartType == 'heat') {
      if (!this.isUndefinedOrNull(plot.x_labels[position.x])) {
        x_tickmark = plot.x_labels[position.x].trim();
      }
      if (!this.isUndefinedOrNull(plot.y_labels[position.y])) {
        y_tickmark = plot.y_labels[position.y].trim();
      }
      if (!this.isUndefinedOrNull(plot.x_group_label)) {
        x_label = plot.x_group_label;
      }
      if (!this.isUndefinedOrNull(plot.y_group_label)) {
        y_label = plot.y_group_label;
      }
      if (!this.isUndefinedOrNull(plot.values)) {
        if (!this.isUndefinedOrNull(plot.values[position.x][position.y])) {
          value = plot.values[position.x][position.y];
        }
      }
      if (!this.isUndefinedOrNull(plot.group_labels[2])) {
        fill_value = plot.group_labels[2];
      }
    } else if (constants.chartType == 'box') {
      let plotPos =
        constants.plotOrientation == 'vert' ? position.x : position.y;
      let sectionPos =
        constants.plotOrientation == 'vert' ? position.y : position.x;

      if (!this.isUndefinedOrNull(plot.x_group_label)) {
        x_label = plot.x_group_label;
      }
      if (!this.isUndefinedOrNull(plot.y_group_label)) {
        y_label = plot.y_group_label;
      }
      if (constants.plotOrientation == 'vert') {
        if (plotPos > -1 && sectionPos > -1) {
          if (
            !this.isUndefinedOrNull(plot.plotData[plotPos][sectionPos].label)
          ) {
            y_tickmark = plot.plotData[plotPos][sectionPos].label;
          }
          if (!this.isUndefinedOrNull(plot.x_labels[position.x])) {
            x_tickmark = plot.x_labels[position.x];
          }
          if (
            !this.isUndefinedOrNull(plot.plotData[plotPos][sectionPos].values)
          ) {
            value = plot.plotData[plotPos][sectionPos].values;
          } else if (
            !this.isUndefinedOrNull(plot.plotData[plotPos][sectionPos].y)
          ) {
            value = plot.plotData[plotPos][sectionPos].y;
          }
        }
      } else {
        if (plotPos > -1 && sectionPos > -1) {
          if (
            !this.isUndefinedOrNull(plot.plotData[plotPos][sectionPos].label)
          ) {
            x_tickmark = plot.plotData[plotPos][sectionPos].label;
          }
          if (!this.isUndefinedOrNull(plot.y_labels[position.y])) {
            y_tickmark = plot.y_labels[position.y];
          }
          if (
            !this.isUndefinedOrNull(plot.plotData[plotPos][sectionPos].values)
          ) {
            value = plot.plotData[plotPos][sectionPos].values;
          } else if (
            !this.isUndefinedOrNull(plot.plotData[plotPos][sectionPos].x)
          ) {
            value = plot.plotData[plotPos][sectionPos].x;
          }
        }
      }
    } else if (constants.chartType == 'point') {
      if (!this.isUndefinedOrNull(plot.x_group_label)) {
        x_label = plot.x_group_label;
      }
      if (!this.isUndefinedOrNull(plot.y_group_label)) {
        y_label = plot.y_group_label;
      }

      if (!this.isUndefinedOrNull(plot.x[position.x])) {
        x_tickmark = plot.x[position.x];
      }
      if (!this.isUndefinedOrNull(plot.y[position.x])) {
        y_tickmark = plot.y[position.x];
      }

      value = [x_tickmark, y_tickmark];
    }

    eventToLog.x_tickmark = Object.assign(x_tickmark);
    eventToLog.y_tickmark = Object.assign(y_tickmark);
    eventToLog.x_label = Object.assign(x_label);
    eventToLog.y_label = Object.assign(y_label);
    eventToLog.value = Object.assign(value);
    eventToLog.fill_value = Object.assign(fill_value);

    //console.log("x_tickmark: '", x_tickmark, "', y_tickmark: '", y_tickmark, "', x_label: '", x_label, "', y_label: '", y_label, "', value: '", value, "', fill_value: '", fill_value);

    let data = this.GetTrackerData();
    data.events.push(eventToLog);
    this.SaveTrackerData(data);
  }

  isUndefinedOrNull(item) {
    try {
      return item === undefined || item === null;
    } catch {
      return true;
    }
  }
}

class Review {
  constructor() {}

  ToggleReviewMode(onoff = true) {
    // true means on or show
    if (onoff) {
      constants.reviewSaveSpot = document.activeElement;
      constants.review_container.classList.remove('hidden');
      constants.reviewSaveBrailleMode = constants.brailleMode;
      constants.review.focus();

      display.announceText('Review on');
    } else {
      constants.review_container.classList.add('hidden');
      if (constants.reviewSaveBrailleMode == 'on') {
        // we have to turn braille mode back on
        display.toggleBrailleMode('on');
      } else {
        constants.reviewSaveSpot.focus();
      }
      display.announceText('Review off');
    }
  }
}

class LogError {
  constructor() {}

  LogAbsentElement(a) {
    console.log(a, 'not found. Visual highlighting is turned off.');
  }

  LogDifferentLengths(a, b) {
    console.log(
      a,
      'and',
      b,
      'do not have the same length. Visual highlighting is turned off.'
    );
  }

  LogTooManyElements(a, b) {
    console.log(
      'Too many',
      a,
      'elements. Only the first',
      b,
      'will be highlighted.'
    );
  }

  LogNotArray(a) {
    console.log(a, 'is not an array. Visual highlighting is turned off.');
  }
}
