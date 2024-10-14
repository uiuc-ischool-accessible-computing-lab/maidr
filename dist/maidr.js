/**
 * A class representing system vars, user config vars, and helper functions used throughout the application.
 * @class
 */
class Constants {
  /**
   * @namespace HtmlIds
   */
  /**
   * HTML id of the div containing the chart.
   * @type {string}
   * @memberof HtmlIds
   * @default 'chart-container'
   */
  chart_container_id = 'chart-container';
  /**
   * HTML id of the main container div.
   * @type {string}
   * @memberof HtmlIds
   * @default 'maidr-container'
   */
  main_container_id = 'maidr-container';
  /**
   * HTML id of the div containing the braille display input
   * @type {string}
   * @memberof HtmlIds
   * @default 'braille-div'
   */
  braille_container_id = 'braille-div';
  /**
   * HTML id of the actual braille input element.
   * @type {string}
   * @memberof HtmlIds
   * @default 'braille-input'
   */
  braille_input_id = 'braille-input';
  /**
   * HTML id of the div containing the info box.
   * @type {string}
   * @memberof HtmlIds
   * @default 'info'
   */
  info_id = 'info';
  /**
   * HTML id of the div containing announcements that hook directly into the screen reader via aria-live.
   * @type {string}
   * @memberof HtmlIds
   * @default 'announcements'
   */
  announcement_container_id = 'announcements';
  /**
   * HTML id of the div containing the end chime. To be implemented in the future.
   * @type {string}
   * @memberof HtmlIds
   * @default 'end_chime'
   */
  end_chime_id = 'end_chime';
  /**
   * HTML id of the main container div.
   * @type {string}
   * @memberof HtmlIds
   * @default 'container'
   */
  container_id = 'container';
  /**
   * The main project id, used throughout the application.
   * @type {string}
   * @memberof HtmlIds
   * @default 'maidr'
   */
  project_id = 'maidr';
  /**
   * HTML id of the div containing the review text.
   * @type {string}
   * @memberof HtmlIds
   * @default 'review_container'
   */
  review_id_container = 'review_container';
  /**
   * HTML id of the review input element.
   * @type {string}
   * @memberof HtmlIds
   * @default 'review'
   */
  review_id = 'review';
  /**
   * Storage element, used to store the last focused element before moving to the review input so we can switch back to it easily.
   * @type {HTMLElement}
   * @default null
   */
  reviewSaveSpot;
  /**
   * Storage setting for the braille mode when we enter review mode
   * @type {("on"|"off")}
   */
  reviewSaveBrailleMode;
  /**
   * HTML id of the actual chart element. Used to connect the application to the chart.
   * @type {string}
   * @memberof HtmlIds
   */
  chartId = '';
  /**
   * @typedef {Object} EventListenerSetupObject
   * @property {HTMLElement} element - The element to attach the event listener to.
   * @property {string} event - The event type to listen for.
   * @property {function(Event)} func - The function to run when the event is triggered.
   */
  /**
   * An array of event listeners to be added to the document. This is used so that we can properly create and destroy events when needed and not cause massive memory leaks when the system is run repeatedly.
   * @type {Array<EventListenerSetupObject>}
   * @default []
   */
  events = [];
  /**
   * An array of functions to run after the page has loaded. This is used to ensure that the page is fully loaded before running any functions that may rely on that.
   */
  postLoadEvents = [];

  constructor() {}

  /**
   * @namespace BTSModes
   */
  /**
   * The current text mode. Can be 'off', 'terse', or 'verbose'.
   * @type {("off"|"terse"|"verbose")}
   * @memberof BTSModes
   * @default 'verbose'
   */
  textMode = 'verbose';
  /**
   * The current braille mode. Can be 'off' or 'on'.
   * @type {("off"|"on")}
   * @memberof BTSModes
   * @default 'off'
   */
  brailleMode = 'off';

  /**
   * We lock the selection so we don't pick up programatic selection changes
   * @type {boolean}
   * @default false
   */
  lockSelection = false;

  /**
   * The current sonification mode. Can be 'on', 'off', 'sep' (seperated), or 'same' (all played at once).
   * @type {("on"|"off"|"sep"|"same")}
   * @memberof BTSModes
   * @default 'on'
   */
  sonifMode = 'on';
  /**
   * The current review mode. Can be 'on' or 'off'.
   * @type {("on"|"off")}
   * @memberof BTSModes
   * @default 'off'
   */
  reviewMode = 'off';

  // basic chart properties
  /**
   * @namespace BasicChartProperties
   */
  /**
   * The minimum x value of the chart, set during MAIDR initialization.
   * @type {number}
   * @memberof BasicChartProperties
   * @default 0
   */
  minX = 0;
  /**
   * The maximum x value of the chart, set during MAIDR initialization.
   * @type {number}
   * @memberof BasicChartProperties
   * @default 0
   */
  maxX = 0;
  /**
   * The minimum y value of the chart, set during MAIDR initialization.
   * @type {number}
   * @memberof BasicChartProperties
   * @default 0
   */
  minY = 0;
  /**
   * The maximum y value of the chart, set during MAIDR initialization.
   * @type {number}
   * @memberof BasicChartProperties
   * @default 0
   */
  maxY = 0;

  /**
   * The plotID of the chart, used interchangably with chartId.
   * @type {string}
   * @memberof HtmlIds
   * @default ''
   */
  plotId = ''; // update with id in chart specific js
  /**
   * The chart type, sort of a short name of the chart such as 'box', 'bar', 'line', etc.
   * @type {string}
   * @default ''
   * @memberof BasicChartProperties
   */
  chartType = '';
  /**
   * The navigation orientation of the chart. 0 = row navigation (up/down), 1 = col navigation (left/right).
   * @type {number}
   * @default 1
   * @memberof BasicChartProperties
   */
  navigation = 1; // 0 = row navigation (up/down), 1 = col navigation (left/right)
  /**
   * The orientation of the chart. 'horz' = horizontal, 'vert' = vertical
   * @type {string}
   * @default 'horz'
   * @memberof BasicChartProperties
   */
  plotOrientation = 'horz';

  /**
   * @namespace AudioProperties
   */
  // basic audio properties
  /**
   * The max frequency (Hz) of the audio tones to be played when sonifying the chart.
   * @type {number}
   * @default 1000
   * @memberof AudioProperties
   */
  MAX_FREQUENCY = 1000;
  /**
   * The min frequency (Hz) of the audio tones to be played when sonifying the chart.
   * @type {number}
   * @default 200
   * @memberof AudioProperties
   */
  MIN_FREQUENCY = 200;
  /**
   * Frequncy (Hz) to play when there is no data in a cell, plays twice quickly, recommend a low tone here.
   * @type {number}
   * @default 100
   * @memberof AudioProperties
   */
  NULL_FREQUENCY = 100;
  /**
   * Minimum volume of the audio tones to be played when sonifying the chart. Expected range is 0 to 2.
   * @type {number}
   * @default 0.25
   * @memberof AudioProperties
   */
  combinedVolMin = 0.25;
  /**
   * Maximum volume of the audio tones to be played when sonifying the chart. Expected range is 0 to 2.
   * @type {number}
   * @default 1.25
   * @memberof AudioProperties
   */
  combinedVolMax = 1.25; // volume for max amplitude combined tones

  // autoplay speed
  /**
   * The maximum speed of the autoplay feature, in milliseconds per tone.
   * @type {number}
   * @default 500
   * @memberof AudioProperties
   */
  MAX_SPEED = 500;
  /**
   * The minimum speed of the autoplay feature, in milliseconds per tone.
   * @type {number}
   * @default 50
   * @memberof AudioProperties
   */
  MIN_SPEED = 50; // 50;
  /**
   * The default speed of the autoplay feature, in milliseconds per tone.
   * @type {number}
   * @default 250
   * @memberof AudioProperties
   */
  DEFAULT_SPEED = 250;
  /**
   * The interval between tones in the autoplay feature, in milliseconds.
   * @type {number}
   * @default 20
   * @memberof AudioProperties
   */
  INTERVAL = 20;
  /**
   * The duration of the autoplay feature, in milliseconds.
   * @type {number}
   * @default 5000
   * @memberof AudioProperties
   */
  AUTOPLAY_DURATION = 5000; // 5s

  // user settings
  /**
   * @namespace UserSettings
   */
  /**
   * The volume of the audio tones to be played when sonifying the chart. Expected range is 0 to 1.
   * @type {number}
   * @default 0.5
   * @memberof UserSettings
   */
  vol = 0.5;
  /**
   * Max volume, used only to differentiate points in a scatterplot.
   * @type {number}
   * @default 30
   * @memberof UserSettings
   */
  MAX_VOL = 30;
  /**
   * The speed of the autoplay feature, in milliseconds per tone.
   * @type {number}
   * @default 250
   * @memberof UserSettings
   */
  autoPlayRate = this.DEFAULT_SPEED;
  /**
   * The color of the selected element in the chart in hex format.
   * @type {string}
   * @default '#03C809' (green)
   * @memberof UserSettings
   */
  colorSelected = '#03C809';
  /**
   * The length of the braille display in characters. Braille displays have a variety of sizes; 40 is pretty common, 32 is quite reliable. Set this to your actual display length so that the system can scale and display braille properly for you (where possible).
   * @type {number}
   * @default 32
   * @memberof UserSettings
   */
  brailleDisplayLength = 32;

  // advanced user settings
  /**
   * @namespace AdvancedUserSettings
   */
  /**
   * Whether or not to show the outline of the selected element in the chart.
   * @type {boolean}
   * @default true
   * @memberof AdvancedUserSettings
   */
  showRect = 1;
  /**
   * Whether or not the chart even has a rectangle to show.
   * @type {boolean}
   * @default true
   * @memberof AdvancedUserSettings
   */
  hasRect = 1; // true / false
  /**
   * Whether or not the chart has smooth line points.
   * @type {boolean}
   * @default true
   * @memberof AdvancedUserSettings
   */
  hasSmooth = 1;
  /**
   * Standard tone duration in seconds.
   * @type {number}
   * @default 0.3
   * @memberof AdvancedUserSettings
   */
  duration = 0.3;
  /**
   * Outlier tone duration in seconds.
   * @type {number}
   * @default 0.06
   * @memberof AdvancedUserSettings
   */
  outlierDuration = 0.06;
  /**
   * The rate at which to play outlier tones in the autoplay feature, in milliseconds per tone.
   * @type {number}
   * @default 50
   * @memberof AdvancedUserSettings
   */
  autoPlayOutlierRate = 50;
  /**
   * The rate at which to play points in the autoplay feature, in milliseconds per tone.
   * @type {number}
   * @default 50
   * @memberof AdvancedUserSettings
   */
  autoPlayPointsRate = 50;
  /**
   * The rate at which to play lines in the autoplay feature, in milliseconds per tone. Deprecated.
   * @type {number}
   * @default 50
   * @memberof AdvancedUserSettings
   */
  colorUnselected = '#595959'; // deprecated, todo: find all instances replace with storing old color method
  /**
   * Whether or not we're logging user data. This is off by default, but is used for research purposes.
   * @type {boolean}
   * @default 0
   * @memberof AdvancedUserSettings
   */
  canTrack = 0; // 0 / 1, can we track user data
  /**
   * Whether or not we're currently tracking user data.
   * @type {boolean}
   * @default 1
   * @memberof AdvancedUserSettings
   */
  isTracking = 0;
  /**
   * How are we representing braille? like, is it 1:1 with the chart, or do we do some compression and try to represent as accuratly as we can? Not currently in use.
   * @type {boolean}
   * @default false
   * @memberof AdvancedUserSettings
   */
  visualBraille = false; // do we want to represent braille based on what's visually there or actually there. Like if we have 2 outliers with the same position, do we show 1 (visualBraille true) or 2 (false)
  /**
   * The aria mode used throughout the application. Can be 'assertive' or 'polite'.
   * @type {("assertive"|"polite")}
   * @default 'assertive'
   * @memberof AdvancedUserSettings
   */
  ariaMode = 'assertive';

  /**
   * Full list of user settings, used internally to save and load settings.
   * @type {string[]}
   */
  userSettingsKeys = [
    'vol',
    'autoPlayRate',
    'brailleDisplayLength',
    'colorSelected',
    'MIN_FREQUENCY',
    'MAX_FREQUENCY',
    'keypressInterval',
    'ariaMode',
    'openAIAuthKey',
    'geminiAuthKey',
    'skillLevel',
    'skillLevelOther',
    'LLMModel',
    'LLMPreferences',
    'LLMOpenAiMulti',
    'LLMGeminiMulti',
    'autoInitLLM',
  ];

  // LLM settings
  /**
   * @namespace LLMSettings
   */
  /**
   * The OpenAI authentication key, set in the menu.
   * @type {string}
   * @default null
   * @memberof LLMSettings
   */
  openAIAuthKey = null;
  /**
   * The Gemini authentication key, set in the menu.
   * @type {string}
   * @default null
   * @memberof LLMSettings
   */
  geminiAuthKey = null;
  /**
   * The maximum number of tokens to send to the LLM, only used if the specific LLM has that feature.
   * @type {number}
   * @default 1000
   * @memberof LLMSettings
   */
  LLMmaxResponseTokens = 1000; // max tokens to send to LLM, 20 for testing, 1000 ish for real
  /**
   * Whether or not to play the LLM waiting sound. It's a 1/sec beep.
   * @type {boolean}
   * @default true
   * @memberof LLMSettings
   */
  playLLMWaitingSound = true;
  /**
   * The detail level of the LLM. Can be 'low' or 'high'. Only used if the specific LLM has that feature.
   * @type {"low"|"high"}
   * @default 'high'
   * @memberof LLMSettings
   */
  LLMDetail = 'high'; // low (default for testing, like 100 tokens) / high (default for real, like 1000 tokens)
  /**
   * Current LLM model in use. Can be 'openai' (default) or 'gemini' or 'multi'. More to be added.
   * @type {("openai"|"gemini"|"multi")}
   * @default 'openai'
   * @memberof LLMSettings
   */
  LLMModel = 'openai';
  /**
   * The default system message for the LLM. Helps the LLM understand the context of the chart and its role.
   * @type {string}
   * @default 'You are a helpful assistant describing the chart to a blind person. '
   * @memberof LLMSettings
   */
  LLMSystemMessage =
    'You are a helpful assistant describing the chart to a blind person. ';
  /**
   * The level of skill the user has with statistical charts. Can be 'basic', 'intermediate', 'expert', or 'other'. This is passed to the LLM on the initial message to help it speak correctly to the user. If 'other' is selected, the user can provide a custom skill level.
   * @type {("basic"|"intermediate"|"expert"|"other")}
   * @default 'basic'
   * @memberof LLMSettings
   */
  skillLevel = 'basic'; // basic / intermediate / expert
  /**
   * Custom skill level, used if the user selects 'other' as their skill level.
   * @type {string}
   * @default ''
   * @memberof LLMSettings
   */
  skillLevelOther = ''; // custom skill level
  /**
   * The LLM can send the first default message containing the chart image on initialization, so when the user opens the chat window the LLM already has an initial response and is ready for a conversation.
   * @type {boolean}
   * @default true
   * @memberof LLMSettings
   */
  autoInitLLM = true; // auto initialize LLM on page load
  /**
   * An internal variable used to store the current full verbose text, helps gives the LLM context on what's going on in the chart.
   * @type {string}
   * @default ''
   * @memberof LLMSettings
   */
  verboseText = '';
  /**
   * An internal variable used to turn the waiting beep on and off.
   * @type {number}
   * @default 0
   * @memberof LLMSettings
   */
  waitingQueue = 0;

  // user controls (not exposed to menu, with shortcuts usually)
  /**
   * Whether or not to show the main display.
   * @type {boolean}
   * @default true
   * @memberof AdvancedUserSettings
   */
  showDisplay = 1; // true / false
  /**
   * Whether or not to show the display in braille.
   * @type {boolean}
   * @default true
   * @memberof AdvancedUserSettings
   */
  showDisplayInBraille = 1; // true / false
  /**
   * Whether or not to show the display in autoplay.
   * @type {boolean}
   * @default false
   * @memberof AdvancedUserSettings
   */
  showDisplayInAutoplay = 0; // true / false
  /**
   * The interval for the outlier. This might not be used anymore.
   * @type {number}
   * @default null
   * @memberof AdvancedUserSettings
   */
  outlierInterval = null;

  // platform controls
  /**
   * @namespace PlatformControls
   */
  /**
   * Whether or not the user is on a Mac. Set automatically.
   * @type {boolean}
   * @memberof PlatformControls
   */
  isMac = navigator.userAgent.toLowerCase().includes('mac'); // true if macOS
  /**
   * The control key for the user's platform. Can be 'Cmd' or 'Ctrl'. Used in keyboard shortcut display in help.
   * @type {"Cmd"|"Ctrl"}
   * @memberof PlatformControls
   */
  control = this.isMac ? 'Cmd' : 'Ctrl';
  /**
   * The alt key for the user's platform. Can be 'option' or 'Alt'. Used in keyboard shortcut display in help.
   * @type {"option"|"Alt"}
   * @memberof PlatformControls
   */
  alt = this.isMac ? 'option' : 'Alt';
  /**
   * The home key for the user's platform. Can be 'fn + Left arrow' or 'Home'. Used in keyboard shortcut display in help.
   * @type {"fn + Left arrow"|"Home"}
   * @memberof PlatformControls
   */
  home = this.isMac ? 'fn + Left arrow' : 'Home';
  /**
   * The end key for the user's platform. Can be 'fn + Right arrow' or 'End'. Used in keyboard shortcut display in help.
   * @type {"fn + Right arrow"|"End"}
   * @memberof PlatformControls
   */
  end = this.isMac ? 'fn + Right arrow' : 'End';

  // internal controls
  // todo: are these even used? Sean doesn't think so (May 2024)
  keypressInterval = 2000; // ms or 2s
  tabMovement = null;

  // debug stuff
  /**
   * @namespace DebugSettings
   */
  /**
   * The debug level of the application. 0 = no console output, 1 = some console, 2 = more console, etc.
   * @type {number}
   * @default 3
   * @memberof DebugSettings
   */
  debugLevel = 3; // 0 = no console output, 1 = some console, 2 = more console, etc
  /**
   * Whether or not to display the end chime. This is not currently implemented as the end chime is not yet implemented.
   * @type {boolean}
   * @default false
   * @memberof DebugSettings
   */
  canPlayEndChime = false; //
  /**
   * Whether or not the LLM is connected, or generates a fake response for testing.
   * @type {boolean}
   * @default false
   * @memberof DebugSettings
   */
  manualData = true; // pull from manual data like chart2music (true), or do the old method where we pull from the chart (false)

  /**
   * Stops the autoplay if it is currently running.
   *
   * @return {void}
   */
  KillAutoplay() {
    clearInterval(this.autoplayId);
    this.autoplayId = null;
  }

  /**
   * Stops the autoplay if it is currently running.
   *
   * @return {void}
   */
  KillSepPlay() {
    if (this.sepPlayId) {
      clearInterval(this.sepPlayId);
      this.sepPlayId = null;
    }
  }

  /**
   * Speed up the autoplay rate by the specified interval.
   *
   * @return {void}
   */
  SpeedUp() {
    if (constants.autoPlayRate - this.INTERVAL > this.MIN_SPEED) {
      constants.autoPlayRate -= this.INTERVAL;
    }
  }

  /**
   * Speed down the autoplay rate by the specified interval.
   *
   * @return {void}
   */
  SpeedDown() {
    if (constants.autoPlayRate + this.INTERVAL <= this.MAX_SPEED) {
      constants.autoPlayRate += this.INTERVAL;
    }
  }

  /**
   * Reset the autoplay rate to the default.
   *
   * @return {void}
   */
  SpeedReset() {
    constants.autoPlayRate = constants.DEFAULT_SPEED;
  }

  /**
   * Function to convert hexadecimal color to string formatted rgb() functional notation.
   * @param hexColorString - hexadecimal color (e.g., "#595959").
   * @returns {string} - rgb() functional notation string (e.g., "rgb(100,100,100)").
   */
  ConvertHexToRGBString(hexColorString) {
    return (
      'rgb(' +
      parseInt(hexColorString.slice(1, 3), 16) +
      ',' +
      parseInt(hexColorString.slice(3, 5), 16) +
      ',' +
      parseInt(hexColorString.slice(5, 7), 16) +
      ')'
    );
  }

  /**
   * Function to convert an rgb() functional notation string to hexadecimal color.
   * @param rgbColorString - color in rgb() functional notation (e.g., "rgb(100,100,100)").
   * @returns {string} - hexadecimal color (e.g., "#595959").
   */
  ConvertRGBStringToHex(rgbColorString) {
    let rgb = rgbColorString.replace(/[^\d,]/g, '').split(',');
    return (
      '#' +
      rgb[0].toString(16).padStart(2, '0') +
      rgb[1].toString(16).padStart(2, '0') +
      rgb[2].toString(16).padStart(2, '0')
    );
  }

  /**
   * Inverts an RGB color by subtracting each color component from 255.
   *
   * @param {string} color - The RGB color to invert, in the format "rgb(r,g,b)".
   * @return {string} The inverted RGB color, in the format "rgb(r,g,b)".
   */
  ColorInvert(color) {
    // invert an rgb color
    let rgb = color.replace(/[^\d,]/g, '').split(',');
    let r = 255 - rgb[0];
    let g = 255 - rgb[1];
    let b = 255 - rgb[2];
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  /**
   * Determines the best contrast color for the given color, by inverting it if necessary, but if it's just a shade of gray, default to this.colorSelected
   * @param {string} oldColor - The color to make better
   * @returns {string} The better color
   */
  GetBetterColor(oldColor) {
    if (oldColor.indexOf('#') !== -1) {
      oldColor = this.ConvertHexToRGBString(oldColor);
    }
    let newColor = this.ColorInvert(oldColor);
    let rgb = newColor.replace(/[^\d,]/g, '').split(',');
    if (
      rgb[1] < rgb[0] + 10 &&
      rgb[1] > rgb[0] - 10 &&
      rgb[2] < rgb[0] + 10 &&
      rgb[2] > rgb[0] - 10 &&
      (rgb[0] > 86 || rgb[0] < 169)
    ) {
      // too gray and too close to center gray, use default
      newColor = this.colorSelected;
    }

    return newColor;
  }

  /**
   * Function to parse a string containing CSS styles and return an array of strings containing CSS style attributes and values.
   * @param styleString - a string containing CSS styles in inline format.
   * @returns {string[]} - an array of strings containing CSS style attributes and values.
   */
  GetStyleArrayFromString(styleString) {
    // Get an array of CSS style attributes and values from a style string
    return styleString.replaceAll(' ', '').split(/[:;]/);
  }

  /**
   * Function to parse an array of strings containing CSS style attributes and values and return a string containing CSS styles.
   * @param styleArray - an array of strings containing CSS style attributes and values.
   * @returns {string} - a string containing the CSS styles.
   */
  GetStyleStringFromArray(styleArray) {
    // Get CSS style string from an array of style attributes and values
    let styleString = '';
    for (let i = 0; i < styleArray.length; i++) {
      if (i % 2 === 0) {
        if (i !== styleArray.length - 1) {
          styleString += styleArray[i] + ': ';
        } else {
          styleString += styleArray[i];
        }
      } else {
        styleString += styleArray[i] + '; ';
      }
    }
    return styleString;
  }
}

/**
 * Resources class to hold localization strings
 */
class Resources {
  constructor() {}

  language = 'en'; // Current language, 2 char lang code
  knowledgeLevel = 'basic'; // basic, intermediate, expert

  // language strings, per 2 char language code
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
        openai: 'OpenAI Vision',
        gemini: 'Gemini Pro Vision',
        multi: 'Multiple AI',
        processing: 'Processing Chart...',
      },
    },
  };

  /**
   * Returns a string based on the provided ID, language, and knowledge level.
   * @param {string} id - The ID of the string to retrieve.
   * @returns {string} The string corresponding to the provided ID, language, and knowledge level.
   */
  GetString(id) {
    return this.strings[this.language][this.knowledgeLevel][id];
  }
}

/**
 * Represents a menu class that contains the settings menu
 */
class Menu {
  whereWasMyFocus = null;

  constructor() {
    this.CreateMenu();
    this.LoadDataFromLocalStorage();
  }

  // initial html for the menu
  menuHtml = `
        <div id="menu" class="modal hidden" role="dialog" tabindex="-1">
            <div class="modal-dialog" role="document" tabindex="0">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title">Menu</h2>
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
                                        <td>${
                                          constants.control
                                        } + Arrow key</td>
                                    </tr>
                                    <tr>
                                        <td>Select the first element</td>
                                        <td>${constants.control} + ${
    constants.home
  }</td>
                                    </tr>
                                    <tr>
                                        <td>Select the last element</td>
                                        <td>${constants.control} + ${
    constants.end
  }</td>
                                    </tr>
                                    <tr>
                                        <td>Toggle Braille Mode</td>
                                        <td>b</td>
                                    </tr>
                                    <tr>
                                        <td>Toggle Text Mode</td>
                                        <td>t</td>
                                    </tr>
                                                                        <tr>
                                        <td>Toggle Sonification Mode</td>
                                        <td>s</td>
                                    </tr>
                                                                                                            <tr>
                                        <td>Toggle Review Mode</td>
                                        <td>r</td>
                                    </tr>
                                    <tr>
                                        <td>Repeat current sound</td>
                                        <td>Space</td>
                                    </tr>
                                    <tr>
                                        <td>Auto-play outward in direction of arrow</td>
                                        <td>${
                                          constants.control
                                        } + Shift + Arrow key</td>
                                    </tr>
                                    <tr>
                                        <td>Auto-play inward in direction of arrow</td>
                                        <td>${
                                          constants.alt
                                        } + Shift + Arrow key</td>
                                    </tr>
                                    <tr>
                                        <td>Stop Auto-play</td>
                                        <td>${constants.control}</td>
                                    </tr>
                                    <tr>
                                        <td>Auto-play speed up</td>
                                        <td>Period (.)</td>
                                    </tr>
                                    <tr>
                                        <td>Auto-play speed down</td>
                                        <td>Comma (,)</td>
                                    </tr>
                                                                        <tr>
                                        <td>Check label for the title of current plot</td>
                                        <td>l t</td>
                                    </tr>
                                                                            <td>Check label for the x axis of current plot</td>
                                        <td>l x</td>
                                    </tr>
                                                                                                                <td>Check label for the y axis of current plot</td>
                                        <td>l y</td>
                                    </tr>
                                                                                                                <td>Check label for the fill (z) axis of current plot</td>
                                        <td>l f</td>
                                    </tr>
                                                                                                                <td>Check label for the subtitle of current plot</td>
                                        <td>l s</td>
                                    </tr>
                                                                                                                <td>Check label for the caption of current plot</td>
                                        <td>l c</td>
                                    </tr>
                                    <tr>
                                        <td>Toggle AI Chat View</td>
                                        <td>${
                                          constants.isMac
                                            ? constants.alt
                                            : constants.control
                                        } + Shift + /</td>
                                    </tr>
                                    <tr>
                                        <td>Copy last chat message in AI Chat View</td>
                                        <td>${constants.alt} + Shift + C</td>
                                    </tr>
                                    <tr>
                                        <td>Copy full chat history in AI Chat View</td>
                                        <td>${constants.alt} + Shift + A</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div>
                            <h5 class="modal-title">Settings</h5>
                            <p><input type="range" id="vol" name="vol" min="0" max="1" step=".05"><label for="vol">Volume</label></p>
                            <!-- <p><input type="checkbox" id="show_rect" name="show_rect"><label for="show_rect">Show Outline</label></p> //-->
                            <p><input type="number" min="4" max="2000" step="1" id="braille_display_length" name="braille_display_length"><label for="braille_display_length">Braille Display Size</label></p>
                            <p><input type="number" min="${
                              constants.MIN_SPEED
                            }" max="500" step="${
    constants.INTERVAL
  }" id="autoplay_rate" name="autoplay_rate"><label for="autoplay_rate">Autoplay Rate</label></p>
                            <p><input type="color" id="color_selected" name="color_selected"><label for="color_selected">Outline Color</label></p>
                            <p><input type="number" min="10" max="2000" step="10" id="min_freq" name="min_freq"><label for="min_freq">Min Frequency (Hz)</label></p>
                            <p><input type="number" min="20" max="2010" step="10" id="max_freq" name="max_freq"><label for="max_freq">Max Frequency (Hz)</label></p>
                            <p><input type="number" min="500" max="5000" step="500" id="keypress_interval" name="keypress_interval"><label for="keypress_interval">Keypress Interval (ms)</label></p>
                            <div><fieldset>
                              <legend>Aria Mode</legend>
                              <p><input type="radio" id="aria_mode_assertive" name="aria_mode" value="assertive" ${
                                constants.ariaMode == 'assertive'
                                  ? 'checked'
                                  : ''
                              }><label for="aria_mode_assertive">Assertive</label></p>
                              <p><input type="radio" id="aria_mode_polite" name="aria_mode" value="polite" ${
                                constants.ariaMode == 'polite' ? 'checked' : ''
                              }><label for="aria_mode_polite">Polite</label></p>
                              </fieldset></div>
                            <h5 class="modal-title">LLM Settings</h5>
                            <p>
                                <select id="LLM_model">
                                    <option value="openai">OpenAI Vision</option>
                                    <option value="gemini">Gemini Pro Vision</option>
                                    <option value="multi">Multiple</option>
                                </select>
                                <label for="LLM_model">LLM Model</label>
                            </p>
                            <p id="openai_auth_key_container" class="multi_container hidden">
                              <span id="openai_multi_container" class="hidden"><input type="checkbox" id="openai_multi" name="openai_multi" aria-label="Use OpenAI in Multi modal mode"></span>
                              <input type="password" size="50" id="openai_auth_key"><button aria-label="Delete OpenAI key" title="Delete OpenAI key" id="delete_openai_key" class="invis_button">&times;</button><label for="openai_auth_key">OpenAI Authentication Key</label>
                            </p>
                            <p id="gemini_auth_key_container" class="multi_container hidden">
                              <span id="gemini_multi_container" class="hidden"><input type="checkbox" id="gemini_multi" name="gemini_multi" aria-label="Use Gemini in Multi modal mode"></span>
                              <input type="password" size="50" id="gemini_auth_key"><button aria-label="Delete Gemini key" title="Delete Gemini key" id="delete_gemini_key" class="invis_button">&times;</button><label for="gemini_auth_key">Gemini Authentication Key</label>
                            </p>
                            <p><input type="checkbox" ${
                              constants.autoInitLLM ? 'checked' : ''
                            } id="init_llm_on_load" name="init_llm_on_load"><label for="init_llm_on_load">Start first LLM chat chart load</label></p>
                            <p>
                                <select id="skill_level">
                                    <option value="basic">Basic</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="expert">Expert</option>
                                    <option value="other">Other: describe in your own words</option>
                                </select>
                                <label for="skill_level">Level of skill in statistical charts</label>
                            </p>
                            <p id="skill_level_other_container" class="hidden"><input type="text" placeholder="Very basic" id="skill_level_other"> <label for="skill_level_other">Describe your level of skill in statistical charts</label></p>
                            <p><label for="LLM_preferences">Custom instructions for the chat response</label></p>
                            <p><textarea id="LLM_preferences" rows="4" cols="50" placeholder="I'm a stats undergrad and work with Python. I prefer a casual tone, and favor information accuracy over creative description; just the facts please!"></textarea></p>
                        </div>
                    </div>
                    <div class="modal-footer">
                      <p>
                        <button type="button" id="save_and_close_menu" aria-labelledby="save_and_close_text"><span id="save_and_close_text">Save and Close</span></button>
                        <button type="button" id="close_menu">Close</button>
                      </p>
                    </div>
                </div>
            </div>
        </div>
        <div id="menu_modal_backdrop" class="modal-backdrop hidden"></div>
        `;

  /**
   * Creates a menu element and sets up event listeners for opening and closing the menu,
   * and saving and loading data from local storage.
   *
   * @returns {void}
   */
  CreateMenu() {
    // menu element creation
    document
      .querySelector('body')
      .insertAdjacentHTML('beforeend', this.menuHtml);

    // menu close events
    let allClose = document.querySelectorAll('#close_menu, #menu .close');
    for (let i = 0; i < allClose.length; i++) {
      constants.events.push([
        allClose[i],
        'click',
        function (e) {
          menu.Toggle(false);
        },
      ]);
    }
    constants.events.push([
      document.getElementById('save_and_close_menu'),
      'click',
      function (e) {
        menu.SaveData();
        menu.Toggle(false);
      },
    ]);
    constants.events.push([
      document.getElementById('menu'),
      'keyup',
      function (e) {
        if (e.key == 'Esc') {
          // esc
          menu.Toggle(false);
        }
      },
    ]);

    // Menu open events
    constants.events.push([
      document,
      'keyup',
      function (e) {
        // don't fire on input elements
        if (
          e.target.tagName.toLowerCase() == 'input' ||
          e.target.tagName.toLowerCase() == 'textarea'
        ) {
          return;
        } else if (e.key == 'h') {
          menu.Toggle(true);
        }
      },
    ]);

    // toggle auth key fields
    constants.events.push([
      document.getElementById('LLM_model'),
      'change',
      function (e) {
        if (e.target.value == 'openai') {
          document
            .getElementById('openai_auth_key_container')
            .classList.remove('hidden');
          document
            .getElementById('gemini_auth_key_container')
            .classList.add('hidden');
          document
            .getElementById('openai_multi_container')
            .classList.add('hidden');
          document
            .getElementById('gemini_multi_container')
            .classList.add('hidden');
          document.getElementById('openai_multi').checked = true;
          document.getElementById('gemini_multi').checked = false;
        } else if (e.target.value == 'gemini') {
          document
            .getElementById('openai_auth_key_container')
            .classList.add('hidden');
          document
            .getElementById('gemini_auth_key_container')
            .classList.remove('hidden');
          document
            .getElementById('openai_multi_container')
            .classList.add('hidden');
          document
            .getElementById('gemini_multi_container')
            .classList.add('hidden');
          document.getElementById('openai_multi').checked = false;
          document.getElementById('gemini_multi').checked = true;
        } else if (e.target.value == 'multi') {
          document
            .getElementById('openai_auth_key_container')
            .classList.remove('hidden');
          document
            .getElementById('gemini_auth_key_container')
            .classList.remove('hidden');
          document
            .getElementById('openai_multi_container')
            .classList.remove('hidden');
          document
            .getElementById('gemini_multi_container')
            .classList.remove('hidden');
          document.getElementById('openai_multi').checked = true;
          document.getElementById('gemini_multi').checked = true;
        }
      },
    ]);

    // Skill level other events
    constants.events.push([
      document.getElementById('skill_level'),
      'change',
      function (e) {
        if (e.target.value == 'other') {
          document
            .getElementById('skill_level_other_container')
            .classList.remove('hidden');
        } else {
          document
            .getElementById('skill_level_other_container')
            .classList.add('hidden');
        }
      },
    ]);

    // trigger notification that LLM will be reset
    // this is done on change of LLM model, multi settings, or skill level
    let LLMResetIds = [
      'LLM_model',
      'openai_multi',
      'gemini_multi',
      'skill_level',
      'LLM_preferences',
    ];
    for (let i = 0; i < LLMResetIds.length; i++) {
      constants.events.push([
        document.getElementById(LLMResetIds[i]),
        'change',
        function (e) {
          menu.NotifyOfLLMReset();
        },
      ]);
    }
  }

  /**
   * Destroys the menu element and its backdrop.
   * @return {void}
   */
  Destroy() {
    // menu element destruction
    let menu = document.getElementById('menu');
    if (menu) {
      menu.remove();
    }
    let backdrop = document.getElementById('menu_modal_backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  }

  /**
   * Toggles the menu on and off, toggling the css 'hidden' class.
   * @param {boolean} [onoff=false] - Whether to turn the menu on or off. Defaults to false (close).
   * @return {void}
   */
  Toggle(onoff = false) {
    if (typeof onoff == 'undefined') {
      if (document.getElementById('menu').classList.contains('hidden')) {
        onoff = true;
      } else {
        onoff = false;
      }
    }
    // don't open if we have another modal open already
    if (onoff && document.getElementById('chatLLM')) {
      if (!document.getElementById('chatLLM').classList.contains('hidden')) {
        return;
      }
    }
    if (onoff) {
      // open
      this.whereWasMyFocus = document.activeElement;
      this.PopulateData();
      constants.tabMovement = 0;
      document.getElementById('menu').classList.remove('hidden');
      document.getElementById('menu_modal_backdrop').classList.remove('hidden');
      document.querySelector('#menu .close').focus();
    } else {
      // close
      document.getElementById('menu').classList.add('hidden');
      document.getElementById('menu_modal_backdrop').classList.add('hidden');
      this.whereWasMyFocus.focus();
      this.whereWasMyFocus = null;
    }
  }

  /**
   * Populates the form fields in the help menu with stored values in constants, which pulls from localStorage
   * @return {void}
   */
  PopulateData() {
    document.getElementById('vol').value = constants.vol;
    document.getElementById('autoplay_rate').value = constants.autoPlayRate;
    document.getElementById('braille_display_length').value =
      constants.brailleDisplayLength;
    document.getElementById('color_selected').value = constants.colorSelected;
    document.getElementById('min_freq').value = constants.MIN_FREQUENCY;
    document.getElementById('max_freq').value = constants.MAX_FREQUENCY;
    document.getElementById('keypress_interval').value =
      constants.keypressInterval;
    if (typeof constants.openAIAuthKey == 'string') {
      document.getElementById('openai_auth_key').value =
        constants.openAIAuthKey;
    }
    if (typeof constants.geminiAuthKey == 'string') {
      document.getElementById('gemini_auth_key').value =
        constants.geminiAuthKey;
    }
    document.getElementById('skill_level').value = constants.skillLevel;
    if (constants.skillLevelOther) {
      document.getElementById('skill_level_other').value =
        constants.skillLevelOther;
    }
    document.getElementById('LLM_model').value = constants.LLMModel;

    // aria mode
    if (constants.ariaMode == 'assertive') {
      document.getElementById('aria_mode_assertive').checked = true;
      document.getElementById('aria_mode_polite').checked = false;
    } else {
      document.getElementById('aria_mode_polite').checked = true;
      document.getElementById('aria_mode_assertive').checked = false;
    }
    // hide either openai or gemini auth key field
    if (constants.LLMModel == 'openai') {
      document
        .getElementById('openai_auth_key_container')
        .classList.remove('hidden');
      document
        .getElementById('gemini_auth_key_container')
        .classList.add('hidden');
    } else if (constants.LLMModel == 'gemini') {
      document
        .getElementById('openai_auth_key_container')
        .classList.add('hidden');
      document
        .getElementById('gemini_auth_key_container')
        .classList.remove('hidden');
    } else if (constants.LLMModel == 'multi') {
      // multi LLM mode
      document
        .getElementById('openai_auth_key_container')
        .classList.remove('hidden');
      document
        .getElementById('gemini_auth_key_container')
        .classList.remove('hidden');
      document
        .getElementById('openai_multi_container')
        .classList.remove('hidden');
      document
        .getElementById('gemini_multi_container')
        .classList.remove('hidden');
      document.getElementById('openai_multi').checked = false;
      if (constants.LLMOpenAiMulti) {
        document.getElementById('openai_multi').checked = true;
      }
      document.getElementById('gemini_multi').checked = false;
      if (constants.LLMGeminiMulti) {
        document.getElementById('gemini_multi').checked = true;
      }
    }
    // skill level other
    if (constants.skillLevel == 'other') {
      document
        .getElementById('skill_level_other_container')
        .classList.remove('hidden');
    }
    // LLM preferences
    if (constants.LLMPreferences) {
      document.getElementById('LLM_preferences').value =
        constants.LLMPreferences;
    }
    if (document.getElementById('LLM_reset_notification')) {
      document.getElementById('LLM_reset_notification').remove();
    }
  }

  /**
   * Saves the data from the HTML elements into the constants object, which is later stored in localStorage
   * @return {void}
   */
  SaveData() {
    let shouldReset = this.ShouldLLMReset();

    constants.vol = document.getElementById('vol').value;
    constants.autoPlayRate = document.getElementById('autoplay_rate').value;
    constants.brailleDisplayLength = document.getElementById(
      'braille_display_length'
    ).value;
    constants.colorSelected = document.getElementById('color_selected').value;
    constants.MIN_FREQUENCY = document.getElementById('min_freq').value;
    constants.MAX_FREQUENCY = document.getElementById('max_freq').value;
    constants.keypressInterval =
      document.getElementById('keypress_interval').value;

    constants.openAIAuthKey = document.getElementById('openai_auth_key').value;
    constants.geminiAuthKey = document.getElementById('gemini_auth_key').value;
    constants.skillLevel = document.getElementById('skill_level').value;
    constants.skillLevelOther =
      document.getElementById('skill_level_other').value;
    constants.LLMModel = document.getElementById('LLM_model').value;
    constants.LLMPreferences = document.getElementById('LLM_preferences').value;
    constants.LLMOpenAiMulti = document.getElementById('openai_multi').checked;
    constants.LLMGeminiMulti = document.getElementById('gemini_multi').checked;
    constants.autoInitLLM = document.getElementById('init_llm_on_load').checked;

    // aria
    if (document.getElementById('aria_mode_assertive').checked) {
      constants.ariaMode = 'assertive';
    } else if (document.getElementById('aria_mode_polite').checked) {
      constants.ariaMode = 'polite';
    }

    this.SaveDataToLocalStorage();
    this.UpdateHtml();

    if (shouldReset) {
      if (chatLLM) {
        chatLLM.ResetLLM();
      }
    }
  }

  /**
   * Sets the aria attributes on the HTML elements in the menu
   * @returns {void}
   */
  UpdateHtml() {
    // set aria attributes
    constants.infoDiv.setAttribute('aria-live', constants.ariaMode);
    document
      .getElementById(constants.announcement_container_id)
      .setAttribute('aria-live', constants.ariaMode);

    document.getElementById('init_llm_on_load').checked = constants.autoInitLLM;
    const scatter = document.getElementsByClassName('highlight_point');
    const heatmap = document.getElementById('highlight_rect');
    const line = document.getElementById('highlight_point');

    if (scatter !== null && scatter.length > 0) {
      for (let i = 0; i < scatter.length; i++) {
        scatter[i].setAttribute('stroke', constants.colorSelected);
        scatter[i].setAttribute('fill', constants.colorSelected);
      }
    }

    if (heatmap !== null) {
      heatmap.setAttribute('stroke', constants.colorSelected);
    }

    if (line !== null) {
      line.setAttribute('stroke', constants.colorSelected);
    }
  }

  /**
   * Adds a textual notification near the submit button to tell the user that the LLM history will be reset
   * @return {void}
   */
  NotifyOfLLMReset() {
    let html =
      '<p id="LLM_reset_notification">Note: Changes in LLM settings will reset any existing conversation.</p>';

    if (document.getElementById('LLM_reset_notification')) {
      document.getElementById('LLM_reset_notification').remove();
    }
    document
      .getElementById('save_and_close_menu')
      .parentElement.insertAdjacentHTML('afterend', html);

    // add to aria button text
    document
      .getElementById('save_and_close_menu')
      .setAttribute(
        'aria-labelledby',
        'save_and_close_text LLM_reset_notification'
      );
  }
  /**
   * Checks whether or not we should reset the LLM history.
   * Criteria: if we've changed the LLM model, multi settings, preferences, or skill level.
   * @return {boolean} - if we're resetting or not.
   */
  ShouldLLMReset() {
    let shouldReset = false;
    if (
      !shouldReset &&
      constants.skillLevel != document.getElementById('skill_level').value
    ) {
      shouldReset = true;
    }
    if (
      !shouldReset &&
      constants.LLMPreferences !=
        document.getElementById('LLM_preferences').value
    ) {
      shouldReset = true;
    }
    if (
      !shouldReset &&
      constants.LLMModel != document.getElementById('LLM_model').value
    ) {
      shouldReset = true;
    }
    if (
      !shouldReset &&
      (constants.LLMOpenAiMulti !=
        document.getElementById('openai_multi').checked ||
        constants.LLMGeminiMulti !=
          document.getElementById('gemini_multi').checked)
    ) {
      shouldReset = true;
    }

    return shouldReset;
  }

  /**
   * Saves all data settings data in local storage. Specifially this saves data in constants variables to settings_data localStorage
   * @returns {void}
   */
  SaveDataToLocalStorage() {
    let data = {};
    for (let i = 0; i < constants.userSettingsKeys.length; i++) {
      data[constants.userSettingsKeys[i]] =
        constants[constants.userSettingsKeys[i]];
    }
    localStorage.setItem('settings_data', JSON.stringify(data));

    // also save to tracking if we're doing that
    if (constants.isTracking) {
      // but not auth keys
      data.openAIAuthKey = 'hidden';
      data.geminiAuthKey = 'hidden';
      // and need a timestamp
      data.timestamp = new Date().toISOString();
      tracker.SetData('settings', data);
    }
  }
  /**
   * Loads data from 'settings_data' localStorage, and updates contants variables
   */
  LoadDataFromLocalStorage() {
    let data = JSON.parse(localStorage.getItem('settings_data'));
    if (data) {
      for (let i = 0; i < constants.userSettingsKeys.length; i++) {
        constants[constants.userSettingsKeys[i]] =
          data[constants.userSettingsKeys[i]];
      }
    }
    this.PopulateData();
    this.UpdateHtml();
  }
}

/**
 * This class creates the chat LLM window, handles events, and handles all of the LLM calls
 */
class ChatLLM {
  constructor() {
    this.firstTime = true;
    this.firstMulti = true;
    this.firstOpen = true;
    this.shown = false;
    this.CreateComponent();
    this.SetEvents();
    if (constants.autoInitLLM) {
      // only run if we have API keys set
      if (
        (constants.LLMModel == 'openai' && constants.openAIAuthKey) ||
        (constants.LLMModel == 'gemini' && constants.geminiAuthKey) ||
        (constants.LLMModel == 'multi' &&
          constants.openAIAuthKey &&
          constants.geminiAuthKey)
      ) {
        this.InitChatMessage();
      }
    }
  }

  /**
   * Creates a modal component containing basic text input
   * Sets events to toggle on and off chat window
   */
  CreateComponent() {
    let html = `
        <div id="chatLLM" class="modal hidden" role="dialog" tabindex="-1">
            <div class="modal-dialog" role="document" tabindex="0">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 id="chatLLM_title" class="modal-title">Ask a Question</h2>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div id="chatLLM_chat_history_wrapper">
                        <div id="chatLLM_chat_history" aria-live="${constants.ariaMode}" aria-relevant="additions">
                        </div>
                        <p id="chatLLM_copy_all_wrapper"><button id="chatLLM_copy_all">Copy all to clipboard</button></p>
                        </div>
                        <div id="chatLLM_content">
                          <p><input type="text" id="chatLLM_input" class="form-control" name="chatLLM_input" aria-labelledby="chatLLM_title" size="50"></p>
                          <div class="LLM_suggestions">
                            <p><button type="button">What is the title?</button></p>
                            <p><button type="button">What are the high and low values?</button></p>
                            <p><button type="button">What is the general shape of the chart?</button></p>
                          </div>
                          <div id="more_suggestions_container" class="LLM_suggestions">
                            <p><button type="button">Please provide the title of this visualization, then provide a description for someone who is blind or low vision. Include general overview of axes and the data at a high-level.</button></p>
                            <p><button type="button">For the visualization I shared, please provide the following (where applicable): mean, standard deviation, extreme, correlations, relational comparisons like greater than OR lesser than.</button></p>
                            <p><button type="button">Based on the visualization shared, address the following: Do you observe any unforeseen trends? If yes, what?  Please convey any complex multi-faceted patterns present. Can you identify any noteworthy exceptions that aren't readily apparent through non-visual methods of analysis?</button></p>
                            <p><button type="button">Provide context to help explain the data depicted in this visualization based on domain-specific insight.</button></p>
                          </div>
                          <p><button type="button" id="chatLLM_submit">Submit</button></p>
                        </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" id="reset_chatLLM">Reset</button>
                      <button type="button" id="close_chatLLM">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div id="chatLLM_modal_backdrop" class="modal-backdrop hidden"></div>
    `;
    document.querySelector('body').insertAdjacentHTML('beforeend', html);
  }

  /**
   * Sets events for the chatLLM modal
   * @return {void}
   */
  SetEvents() {
    // chatLLM close events
    let allClose = document.querySelectorAll('#close_chatLLM, #chatLLM .close');
    for (let i = 0; i < allClose.length; i++) {
      constants.events.push([
        allClose[i],
        'click',
        function (e) {
          chatLLM.Toggle(false);
        },
      ]);
    }
    constants.events.push([
      document.getElementById('chatLLM'),
      'keyup',
      function (e) {
        if (e.key == 'Esc') {
          // esc
          chatLLM.Toggle(false);
        }
      },
    ]);

    // ChatLLM open/close toggle
    constants.events.push([
      document,
      'keyup',
      function (e) {
        if ((e.key == '?' && (e.ctrlKey || e.metaKey)) || e.key == '¿') {
          chatLLM.Toggle();
        }
      },
    ]);

    // ChatLLM request events
    constants.events.push([
      document.getElementById('chatLLM_submit'),
      'click',
      function (e) {
        let text = document.getElementById('chatLLM_input').value;
        chatLLM.DisplayChatMessage('User', text);
        chatLLM.Submit(text);
      },
    ]);
    constants.events.push([
      document.getElementById('chatLLM_input'),
      'keyup',
      function (e) {
        if (e.key == 'Enter' && !e.shiftKey) {
          let text = document.getElementById('chatLLM_input').value;
          chatLLM.DisplayChatMessage('User', text);
          chatLLM.Submit(text);
        }
      },
    ]);

    // ChatLLM suggestion events
    // actual suggestions:
    let suggestions = document.querySelectorAll(
      '#chatLLM .LLM_suggestions button:not(#more_suggestions)'
    );
    for (let i = 0; i < suggestions.length; i++) {
      constants.events.push([
        suggestions[i],
        'click',
        function (e) {
          let text = e.target.innerHTML;
          chatLLM.DisplayChatMessage('User', text);
          chatLLM.Submit(text);
        },
      ]);
    }

    // Delete OpenAI and Gemini keys
    constants.events.push([
      document.getElementById('delete_openai_key'),
      'click',
      function (e) {
        document.getElementById('openai_auth_key').value = '';
      },
    ]);
    constants.events.push([
      document.getElementById('delete_gemini_key'),
      'click',
      function (e) {
        document.getElementById('gemini_auth_key').value = '';
      },
    ]);

    // Reset chatLLM
    constants.events.push([
      document.getElementById('reset_chatLLM'),
      'click',
      function (e) {
        chatLLM.ResetLLM();
      },
    ]);

    // copy to clipboard
    constants.events.push([
      document.getElementById('chatLLM'),
      'click',
      function (e) {
        chatLLM.CopyChatHistory(e);
      },
    ]);
    constants.events.push([
      document.getElementById('chatLLM'),
      'keyup',
      function (e) {
        chatLLM.CopyChatHistory(e);
      },
    ]);
  }

  /**
   * Copies the chat history to the clipboard in markdown format.
   * We do this by running on any click or keyup event on the chatLLM modal so we can handle all the cases.
   * If e is undefined, the entire chat history is copied.
   * If e.type is click, we see what button was clicked and copy just that block or the entire thing
   * If e.type is keyup, we check for alt shift c or ctrl shift c and copy the last message,
   * or ctrl shift a for the entire chat history
   *
   * @param {Event|undefined} e - The event that triggered the copy action. If undefined, the entire chat history is copied.
   */
  CopyChatHistory(e) {
    let text = '';
    if (typeof e == 'undefined') {
      // check for passthrough
      // get html of the full chat history
      text = document.getElementById('chatLLM_chat_history').innerHTML;
    } else if (e.type == 'click') {
      // check for buttons
      if (e.target.id == 'chatLLM_copy_all') {
        // get html of the full chat history
        text = document.getElementById('chatLLM_chat_history').innerHTML;
      } else if (e.target.classList.contains('chatLLM_message_copy_button')) {
        // get the text of the element before the button
        text = e.target.closest('p').previousElementSibling.innerHTML;
      }
    } else if (e.type == 'keyup') {
      // check for alt shift c or ctrl shift c
      if (e.key == 'C' && (e.ctrlKey || e.metaKey || e.altKey) && e.shiftKey) {
        e.preventDefault();
        // get the last message
        let elem = document.querySelector(
          '#chatLLM_chat_history > .chatLLM_message_other:last-of-type'
        );
        if (elem) {
          text = elem.innerHTML;
        }
      } else if (
        e.key == 'A' &&
        (e.ctrlKey || e.metaKey || e.altKey) &&
        e.shiftKey
      ) {
        e.preventDefault();
        // get html of the full chat history
        text = document.getElementById('chatLLM_chat_history').innerHTML;
      }
    }

    if (text == '') {
      return;
    } else {
      // clear the html, removing buttons etc
      let cleanElems = document.createElement('div');
      cleanElems.innerHTML = text;
      let removeThese = cleanElems.querySelectorAll('.chatLLM_message_copy');
      removeThese.forEach((elem) => elem.remove());

      // convert from html to markdown
      let markdown = this.htmlToMarkdown(cleanElems);
      // this messes up a bit with spacing, so kill more than 2 newlines in a row
      markdown = markdown.replace(/\n{3,}/g, '\n\n');

      try {
        navigator.clipboard.writeText(markdown); // note: this fails if you're on the inspector. That's fine as it'll never happen to real users
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
      return markdown;
    }
  }

  htmlToMarkdown(element) {
    let markdown = '';

    const convertElementToMarkdown = (element) => {
      switch (element.tagName) {
        case 'H1':
          return `# ${element.textContent}`;
        case 'H2':
          return `## ${element.textContent}`;
        case 'H3':
          return `### ${element.textContent}`;
        case 'H4':
          return `#### ${element.textContent}`;
        case 'H5':
          return `##### ${element.textContent}`;
        case 'H6':
          return `###### ${element.textContent}`;
        case 'P':
          return element.textContent;
        case 'DIV':
          // For divs, process each child and add newlines as needed
          return (
            Array.from(element.childNodes)
              .map((child) => convertElementToMarkdown(child))
              .join('\n') + '\n\n'
          );
        default:
          // For any other element, process its children recursively
          return Array.from(element.childNodes)
            .map((child) => convertElementToMarkdown(child))
            .join('');
      }
    };

    if (element.nodeType === Node.ELEMENT_NODE) {
      markdown += convertElementToMarkdown(element);
    } else if (
      element.nodeType === Node.TEXT_NODE &&
      element.textContent.trim() !== ''
    ) {
      markdown += element.textContent.trim();
    }

    return markdown.trim();
  }

  /**
   * Submits text to the LLM with a REST call, returns the response to the user.
   * Depends on the one or more LLMs being selected in the menu.
   * @function
   * @name Submit
   * @memberof module:constants
   * @text {string} - The text to send to the LLM.
   * @img {string} - The image to send to the LLM in base64 string format. Defaults to null (no image).
   * @returns {void}
   */
  async Submit(text, firsttime = false) {
    // misc init
    let img = null;
    this.firstMulti = true;

    // if this is the user's first message (or we're gemini, in which case we need to send every time), prepend prompt with user position
    if (
      (this.firstOpen || constants.LLMModel == 'gemini') &&
      !firsttime &&
      constants.verboseText.length > 0
    ) {
      text =
        "Here is the current position in the chart; no response necessarily needed, use this info only if it's relevant to future questions: " +
        constants.verboseText +
        '. My question is: ' +
        text;

      this.firstOpen = false;
    }

    // start waiting sound
    if (constants.playLLMWaitingSound) {
      this.WaitingSound(true);
    }

    if (constants.LLMOpenAiMulti || constants.LLMModel == 'openai') {
      if (firsttime) {
        img = await this.ConvertSVGtoJPG(singleMaidr.id, 'openai');
      }
      chatLLM.OpenAIPrompt(text, img);
    }
    if (constants.LLMGeminiMulti || constants.LLMModel == 'gemini') {
      if (firsttime) {
        img = await this.ConvertSVGtoJPG(singleMaidr.id, 'gemini');
      }
      chatLLM.GeminiPrompt(text, img);
    }
  }

  /*
   * Sets a waiting sound to play while waiting for the LLM to respond.
   * @function
   * @name SetWaitingSound
   * @memberof module:constants
   * @onoff {boolean} - Whether to turn the waiting sound on or off. Defaults to true (on).
   * @returns {void}
   */
  WaitingSound(onoff = true) {
    let delay = 1000;
    let freq = 440; // a440 babee
    let inprogressFreq = freq * 2;

    if (onoff) {
      // if turning on, clear old intervals and timeouts
      if (constants.waitingInterval) {
        // destroy old waiting sound
        clearInterval(constants.waitingInterval);
        constants.waitingInterval = null;
      }
      if (constants.waitingSoundOverride) {
        clearTimeout(constants.waitingSoundOverride);
        constants.waitingSoundOverride = null;
      }
    } else {
      // notify user that we're done waiting for this one
      if (audio && chatLLM.shown) {
        audio.playOscillator(inprogressFreq, 0.2, 0);
      }

      // turning off, but do we have more in the queue after this?
      if (constants.waitingQueue > 1) {
        // turning off and still have a queue, decrement by 1, and play a new sound
        constants.waitingQueue--;
      } else {
        // no queue, just turn off
        chatLLM.KillAllWaitingSounds();
      }
    }

    // turning it on: start playing a new waiting sound
    if (onoff) {
      // create new waiting sound
      constants.waitingInterval = setInterval(function () {
        if (audio && chatLLM.shown) {
          audio.playOscillator(freq, 0.2, 0);
        }
      }, delay);

      // clear automatically after 30 sec, assuming no response
      constants.waitingSoundOverride = setTimeout(function () {
        chatLLM.KillAllWaitingSounds();
      }, 30000);

      // set queue for multi
      if (constants.LLMModel != 'multi') {
        constants.waitingQueue = 1;
      } else {
        constants.waitingQueue = 0;
        if (constants.LLMGeminiMulti) {
          constants.waitingQueue++;
        }
        if (constants.LLMOpenAiMulti) {
          constants.waitingQueue++;
        }
      }
    }
  }
  /**
   * Overrides and kills all waiting sounds for LLM
   */
  KillAllWaitingSounds() {
    if (constants.waitingInterval) {
      clearInterval(constants.waitingInterval);
      constants.waitingInterval = null;
    }
    if (constants.waitingSoundOverride) {
      clearTimeout(constants.waitingSoundOverride);
      constants.waitingSoundOverride = null;
    }
    constants.waitingQueue = 0;
  }

  InitChatMessage() {
    // get name from resource
    let LLMName = resources.GetString(constants.LLMModel);
    this.firstTime = false;
    this.DisplayChatMessage(LLMName, resources.GetString('processing'), true);
    let defaultPrompt = this.GetDefaultPrompt();
    this.Submit(defaultPrompt, true);
  }

  /**
   * Processes the response from the LLM and displays it to the user.
   * @function
   * @returns {void}
   */
  ProcessLLMResponse(data, model) {
    chatLLM.WaitingSound(false);
    console.log('LLM response: ', data);
    let text = '';
    let LLMName = resources.GetString(model);

    if (model == 'openai') {
      text = data.choices[0].message.content;
      let i = this.requestJson.messages.length;
      this.requestJson.messages[i] = {};
      this.requestJson.messages[i].role = 'assistant';
      this.requestJson.messages[i].content = text;

      if (data.error) {
        chatLLM.DisplayChatMessage(LLMName, 'Error processing request.', true);
        chatLLM.WaitingSound(false);
      } else {
        chatLLM.DisplayChatMessage(LLMName, text);
      }
    } else if (model == 'gemini') {
      if (data.text()) {
        text = data.text();
        chatLLM.DisplayChatMessage(LLMName, text);
      } else {
        if (!data.error) {
          data.error = 'Error processing request.';
          chatLLM.WaitingSound(false);
        }
      }
      if (data.error) {
        chatLLM.DisplayChatMessage(LLMName, 'Error processing request.', true);
        chatLLM.WaitingSound(false);
      } else {
        // todo: display actual response
      }
    }

    // if we're tracking, log the data
    if (constants.isTracking) {
      let chatHist = chatLLM.CopyChatHistory();
      tracker.SetData('ChatHistory', chatHist);
    }
  }

  /**
   * Fakes an LLM response for testing purposes. Returns a JSON object formatted like the LLM response.
   * @function
   * @returns {json}
   */
  fakeLLMResponseData() {
    let responseText = {};
    if (this.requestJson.messages.length > 2) {
      // subsequent responses
      responseText = {
        id: 'chatcmpl-8Y44iRCRrohYbAqm8rfBbJqTUADC7',
        object: 'chat.completion',
        created: 1703129508,
        //model: 'gpt-4-1106-vision-preview',
        model: 'gpt4-o',
        usage: {
          prompt_tokens: 451,
          completion_tokens: 16,
          total_tokens: 467,
        },
        choices: [
          {
            message: {
              role: 'assistant',
              content: 'A fake response from the LLM. Nice.',
            },
            finish_reason: 'length',
            index: 0,
          },
        ],
      };
    } else {
      // first response
      responseText = {
        id: 'chatcmpl-8Y44iRCRrohYbAqm8rfBbJqTUADC7',
        object: 'chat.completion',
        created: 1703129508,
        model: 'gpt-4-1106-vision-preview',
        usage: {
          prompt_tokens: 451,
          completion_tokens: 16,
          total_tokens: 467,
        },
        choices: [
          {
            message: {
              role: 'assistant',
              content:
                'The chart you\'re referring to is a bar graph titled "The Number of Diamonds',
            },
            finish_reason: 'length',
            index: 0,
          },
        ],
      };
    }

    return responseText;
  }

  /**
   * Gets running prompt info, appends the latest request, and packages it into a JSON object for the LLM.
   * @function
   * @name OpenAIPrompt
   * @memberof module:constants
   * @returns {json}
   */
  OpenAIPrompt(text, img = null) {
    // request init
    let url = 'https://api.openai.com/v1/chat/completions';
    let auth = constants.openAIAuthKey;
    let requestJson = chatLLM.OpenAIJson(text, img);
    console.log('LLM request: ', requestJson);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth,
      },
      body: JSON.stringify(requestJson),
    })
      .then((response) => response.json())
      .then((data) => {
        chatLLM.ProcessLLMResponse(data, 'openai');
      })
      .catch((error) => {
        chatLLM.WaitingSound(false);
        console.error('Error:', error);
        chatLLM.DisplayChatMessage('OpenAI', 'Error processing request.', true);
        // also todo: handle errors somehow
      });
  }
  OpenAIJson(text, img = null) {
    let sysMessage = constants.LLMSystemMessage;
    let backupMessage =
      'Describe ' + singleMaidr.type + ' charts to a blind person';
    // headers and sys message
    if (!this.requestJson) {
      this.requestJson = {};
      //this.requestJson.model = 'gpt-4-vision-preview';
      this.requestJson.model = 'gpt-4o-2024-08-06';
      this.requestJson.max_tokens = constants.LLMmaxResponseTokens; // note: if this is too short (tested with less than 200), the response gets cut off

      // sys message
      this.requestJson.messages = [];
      this.requestJson.messages[0] = {};
      this.requestJson.messages[0].role = 'system';
      this.requestJson.messages[0].content = sysMessage;
      if (constants.LLMPreferences) {
        this.requestJson.messages[1] = {};
        this.requestJson.messages[1].role = 'system';
        this.requestJson.messages[1].content = constants.LLMPreferences;
      }
    }

    // user message
    // if we have an image (first time only), send the image and the text, otherwise just the text
    let i = this.requestJson.messages.length;
    this.requestJson.messages[i] = {};
    this.requestJson.messages[i].role = 'user';
    if (img) {
      // first message, include the img
      this.requestJson.messages[i].content = [
        {
          type: 'text',
          text: text,
        },
        {
          type: 'image_url',
          image_url: { url: img },
        },
      ];
    } else {
      // just the text
      this.requestJson.messages[i].content = text;
    }

    return this.requestJson;
  }

  async GeminiPrompt(text, imgBase64 = null) {
    // https://ai.google.dev/docs/gemini_api_overview#node.js
    try {
      // Save the image for next time
      if (imgBase64 == null) {
        imgBase64 = constants.LLMImage;
      } else {
        constants.LLMImage = imgBase64;
      }
      constants.LLMImage = imgBase64;

      // Import the module
      const { GoogleGenerativeAI } = await import(
        'https://esm.run/@google/generative-ai'
      );
      const API_KEY = constants.geminiAuthKey;
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-pro-latest',
      }); // old model was 'gemini-pro-vision'

      // Create the prompt
      let prompt = constants.LLMSystemMessage;
      if (constants.LLMPreferences) {
        prompt += constants.LLMPreferences;
      }
      prompt += '\n\n' + text; // Use the text parameter as the prompt
      const image = {
        inlineData: {
          data: imgBase64, // Use the base64 image string
          mimeType: 'image/png', // Or the appropriate mime type of your image
        },
      };

      // Generate the content
      console.log('LLM request: ', prompt, image);
      const result = await model.generateContent([prompt, image]);
      console.log(result.response.text());

      // Process the response
      chatLLM.ProcessLLMResponse(result.response, 'gemini');
    } catch (error) {
      chatLLM.WaitingSound(false);
      chatLLM.DisplayChatMessage('Gemini', 'Error processing request.', true);
      console.error('Error in GeminiPrompt:', error);
      throw error; // Rethrow the error for further handling if necessary
    }
  }

  /**
   * Displays chat message from the user and LLM in a chat history window
   * @function
   * @name DisplayChatMessage
   * @memberof module:constants
   * @returns {void}
   */
  DisplayChatMessage(user = 'User', text = '', isSystem = false) {
    let hLevel = 'h3';
    if (!isSystem && constants.LLMModel == 'multi' && user != 'User') {
      if (this.firstMulti) {
        let multiAIName = resources.GetString('multi');
        let titleHtml = `
          <div class="chatLLM_message chatLLM_message_other">
            <h3 class="chatLLM_message_user">${multiAIName} Responses</h3>
          </div>
        `;
        this.RenderChatMessage(titleHtml);
        this.firstMulti = false;
      }
      hLevel = 'h4';
    }
    let html = `
      <div class="chatLLM_message ${
        user == 'User' ? 'chatLLM_message_self' : 'chatLLM_message_other'
      }">`;
    if (text != resources.GetString('processing')) {
      html += `<${hLevel} class="chatLLM_message_user">${user}</${hLevel}>`;
    }
    html += `<p class="chatLLM_message_text">${text}</p>
      </div>
    `;
    // add a copy button to actual messages
    if (user != 'User' && text != resources.GetString('processing')) {
      html += `
        <p class="chatLLM_message_copy"><button class="chatLLM_message_copy_button">Copy</button></p>
      `;
    }

    this.RenderChatMessage(html);
  }
  RenderChatMessage(html) {
    document
      .getElementById('chatLLM_chat_history')
      .insertAdjacentHTML('beforeend', html);
    document.getElementById('chatLLM_input').value = '';

    // scroll to bottom
    document.getElementById('chatLLM_chat_history').scrollTop =
      document.getElementById('chatLLM_chat_history').scrollHeight;
  }

  /**
   * Resets the chat history window
   */
  ResetLLM() {
    // clear the main chat history
    document.getElementById('chatLLM_chat_history').innerHTML = '';

    // reset the data
    this.requestJson = null;
    this.firstTime = true;

    // and start over, if enabled, or window is open
    if (constants.autoInitLLM || chatLLM.shown) {
      chatLLM.InitChatMessage();
    }
  }

  /**
   * Destroys the chatLLM element and its backdrop.
   * @function
   * @name Destroy
   * @memberof module:constants
   * @returns {void}
   */
  Destroy() {
    // chatLLM element destruction
    let chatLLM = document.getElementById('chatLLM');
    if (chatLLM) {
      chatLLM.remove();
    }
    let backdrop = document.getElementById('chatLLM_modal_backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  }

  /**
   * Toggles the modal on and off.
   * @param {boolean} [onoff=false] - Whether to turn the chatLLM on or off. Defaults to false (close).
   */
  Toggle(onoff) {
    if (typeof onoff == 'undefined') {
      if (document.getElementById('chatLLM').classList.contains('hidden')) {
        onoff = true;
      } else {
        onoff = false;
      }
    }
    chatLLM.shown = onoff;
    if (onoff) {
      // open
      this.whereWasMyFocus = document.activeElement;
      constants.tabMovement = 0;
      document.getElementById('chatLLM').classList.remove('hidden');
      document
        .getElementById('chatLLM_modal_backdrop')
        .classList.remove('hidden');
      document.querySelector('#chatLLM .close').focus();

      if (this.firstTime) {
        this.InitChatMessage();
      }
    } else {
      // close
      document.getElementById('chatLLM').classList.add('hidden');
      document.getElementById('chatLLM_modal_backdrop').classList.add('hidden');
      this.whereWasMyFocus.focus();
      this.whereWasMyFocus = null;
      this.firstOpen = true;
    }
  }

  /**
   * Converts the active chart to a jpg image.
   * @id {string} - The html ID of the chart to convert.
   */
  async ConvertSVGtoJPG(id, model) {
    let svgElement = document.getElementById(id);
    return new Promise((resolve, reject) => {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');

      var svgData = new XMLSerializer().serializeToString(svgElement);
      if (!svgData.startsWith('<svg xmlns')) {
        svgData = `<svg xmlns="http://www.w3.org/2000/svg" ${svgData.slice(4)}`;
      }

      var svgSize =
        svgElement.viewBox.baseVal || svgElement.getBoundingClientRect();
      canvas.width = svgSize.width;
      canvas.height = svgSize.height;

      var img = new Image();
      img.onload = function () {
        ctx.drawImage(img, 0, 0, svgSize.width, svgSize.height);
        var jpegData = canvas.toDataURL('image/jpeg', 0.9); // 0.9 is the quality parameter
        if (model == 'openai') {
          resolve(jpegData);
        } else if (model == 'gemini') {
          let base64Data = jpegData.split(',')[1];
          resolve(base64Data);
          //resolve(jpegData);
        }
        URL.revokeObjectURL(url);
      };

      img.onerror = function () {
        reject(new Error('Error loading SVG'));
      };

      var svgBlob = new Blob([svgData], {
        type: 'image/svg+xml;charset=utf-8',
      });
      var url = URL.createObjectURL(svgBlob);
      img.src = url;
    });
  }

  /**
   * GetDefaultPrompt is an asynchronous function that generates a prompt for describing a chart to a blind person.
   * It converts the chart to a JPG image using the ConvertSVGtoJPG method and then submits the prompt to the chatLLM function.
   * The prompt includes information about the blind person's skill level and the chart's image and raw data, if available.
   */
  GetDefaultPrompt() {
    let text = 'Describe this chart to a blind person';
    if (constants.skillLevel) {
      if (constants.skillLevel == 'other' && constants.skillLevelOther) {
        text +=
          ' who has a ' +
          constants.skillLevelOther +
          ' understanding of statistical charts. ';
      } else {
        text +=
          ' who has a ' +
          constants.skillLevel +
          ' understanding of statistical charts. ';
      }
    } else {
      text += ' who has a basic understanding of statistical charts. ';
    }
    text += 'Here is a chart in image format';
    if (singleMaidr) {
      text += ' and raw data in json format: \n';
      text += JSON.stringify(singleMaidr);
    }

    return text;
  }
}
/**
 * Creates an html modal containing summary info of the active chart. Title, subtitle, data table, etc.
 * @class
 */
class Description {
  // This class creates an html modal containing summary info of the active chart
  // Trigger popup with 'D' key
  // Info is basically anything available, but stuff like:
  // - chart type
  // - chart labels, like title, subtitle, caption etc
  // - chart data (an accessible html table)

  constructor() {
    //this.CreateComponent(); // disabled as we're in development and have switched priorities
  }

  /**
   * Creates a modal component containing description summary stuff.
   */
  CreateComponent() {
    // modal containing description summary stuff
    let html = `
        <div id="description" class="modal hidden" role="dialog" tabindex="-1">
            <div class="modal-dialog" role="document" tabindex="0">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 id="desc_title" class="modal-title">Description</h2>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div id="desc_content">
                        content here
                        </div>
                        <div id="desc_table">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="close_desc">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div id="desc_modal_backdrop" class="modal-backdrop hidden"></div>

    `;

    document.querySelector('body').insertAdjacentHTML('beforeend', html);

    // close events
    let allClose = document.querySelectorAll(
      '#close_desc, #description .close'
    );
    for (let i = 0; i < allClose.length; i++) {
      constants.events.push([
        allClose[i],
        'click',
        function (e) {
          description.Toggle(false);
        },
      ]);
    }
    constants.events.push([
      document.getElementById('description'),
      'keyup',
      function (e) {
        if (e.key == 'Esc') {
          // esc
          description.Toggle(false);
        }
      },
    ]);

    // open events
    constants.events.push([
      document,
      'keyup',
      function (e) {
        if (e.key == 'd') {
          description.Toggle(true);
        }
      },
    ]);
  }

  /**
   * Removes the description element and backdrop from the DOM.
   */
  Destroy() {
    // description element destruction
    let description = document.getElementById('menu');
    if (description) {
      description.remove();
    }
    let backdrop = document.getElementById('desc_modal_backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  }

  /**
   * Toggles the visibility of the description element.
   * @param {boolean} [onoff=false] - Whether to turn the description element on or off.
   */
  Toggle(onoff = false) {
    if (typeof onoff == 'undefined') {
      if (document.getElementById('description').classList.contains('hidden')) {
        onoff = true;
      } else {
        onoff = false;
      }
    }
    if (onoff) {
      // open
      this.whereWasMyFocus = document.activeElement;
      constants.tabMovement = 0;
      this.PopulateData();
      document.getElementById('description').classList.remove('hidden');
      document.getElementById('desc_modal_backdrop').classList.remove('hidden');
      document.querySelector('#description .close').focus();
    } else {
      // close
      document.getElementById('description').classList.add('hidden');
      document.getElementById('desc_modal_backdrop').classList.add('hidden');
      this.whereWasMyFocus.focus();
      this.whereWasMyFocus = null;
    }
  }

  /**
   * Populates the data for the chart and table based on the chart type and plot data.
   */
  PopulateData() {
    let descHtml = '';

    // chart labels and descriptions
    let descType = '';
    if (constants.chartType == 'bar') {
      descType = 'Bar chart';
    } else if (constants.chartType == 'heat') {
      descType = 'Heatmap';
    } else if (constants.chartType == 'box') {
      descType = 'Box plot';
    } else if (constants.chartType == 'scatter') {
      descType = 'Scatter plot';
    } else if (constants.chartType == 'line') {
      descType = 'Line chart';
    } else if (constants.chartType == 'hist') {
      descType = 'Histogram';
    }

    if (descType) {
      descHtml += `<p>Type: ${descType}</p>`;
    }
    if (plot.title != null) {
      descHtml += `<p>Title: ${plot.title}</p>`;
    }
    if (plot.subtitle != null) {
      descHtml += `<p>Subtitle: ${plot.subtitle}</p>`;
    }
    if (plot.caption != null) {
      descHtml += `<p>Caption: ${plot.caption}</p>`;
    }

    // table of data, prep
    let descTableHtml = '';
    let descLabelX = null;
    let descLabelY = null;
    let descTickX = null;
    let descTickY = null;
    let descData = null;
    let descNumCols = 0;
    let descNumColsWithLabels = 0;
    let descNumRows = 0;
    let descNumRowsWithLabels = 0;
    if (constants.chartType == 'bar') {
      if (plot.plotLegend.x != null) {
        descLabelX = plot.plotLegend.x;
        descNumColsWithLabels += 1;
      }
      if (plot.plotLegend.y != null) {
        descLabelY = plot.plotLegend.y;
        descNumRowsWithLabels += 1;
      }
      if (plot.columnLabels != null) {
        descTickX = plot.columnLabels;
        descNumRowsWithLabels += 1;
      }
      if (plot.plotData != null) {
        descData = [];
        descData[0] = plot.plotData;
        descNumCols = plot.plotData.length;
        descNumRows = 1;
        descNumColsWithLabels += descNumCols;
        descNumRowsWithLabels += descNumRows;
      }
    }

    // table of data, create
    if (descData != null) {
      descTableHtml += '<table>';

      // header rows
      if (descLabelX != null || descTickX != null) {
        descTableHtml += '<thead>';
        if (descLabelX != null) {
          descTableHtml += '<tr>';
          if (descLabelY != null) {
            descTableHtml += '<td></td>';
          }
          if (descTickY != null) {
            descTableHtml += '<td></td>';
          }
          descTableHtml += `<th scope="col" colspan="${descNumCols}">${descLabelX}</th>`;
          descTableHtml += '</tr>';
        }
        if (descTickX != null) {
          descTableHtml += '<tr>';
          if (descLabelY != null) {
            descTableHtml += '<td></td>';
          }
          if (descTickY != null) {
            descTableHtml += '<td></td>';
          }
          for (let i = 0; i < descNumCols; i++) {
            descTableHtml += `<th scope="col">${descTickX[i]}</th>`;
          }
          descTableHtml += '</tr>';
        }
        descTableHtml += '</thead>';
      }

      // body rows
      if (descNumRows > 0) {
        descTableHtml += '<tbody>';
        for (let i = 0; i < descNumRows; i++) {
          descTableHtml += '<tr>';
          if (descLabelY != null && i == 0) {
            descTableHtml += `<th scope="row" rowspan="${descNumRows}">${descLabelY}</th>`;
          }
          if (descTickY != null) {
            descTableHtml += `<th scope="row">${descTickY[i]}</th>`;
          }
          for (let j = 0; j < descNumCols; j++) {
            descTableHtml += `<td>${descData[i][j]}</td>`;
          }
          descTableHtml += '</tr>';
        }
        descTableHtml += '</tbody>';
      }

      descTableHtml += '</table>';
    }

    // bar: don't need colspan or rowspan stuff, put legendX and Y as headers

    document.getElementById('desc_title').innerHTML = descType + ' description';
    document.getElementById('desc_content').innerHTML = descHtml;
    document.getElementById('desc_table').innerHTML = descTableHtml;
  }
}

/**
 * Represents a position in 3D space.
 * @class
 */
class Position {
  constructor(x = 0, y = 0, z = -1) {
    this.x = x;
    this.y = y;
    this.z = z; // rarely used
  }
}

// HELPER FUNCTIONS
/**
 * A helper class with static methods.
 */
class Helper {
  /**
   * Checks if an object is present in an array.
   * @param {Object} obj - The object to search for.
   * @param {Array} arr - The array to search in.
   * @returns {boolean} - True if the object is present in the array, false otherwise.
   */
  static containsObject(obj, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === obj) return true;
    }
    return false;
  }
}

/**
 * A class representing a Tracker.
 * @class
 */
class Tracker {
  constructor() {
    this.DataSetup();
    constants.isTracking = true;
  }

  /**
   * Sets up the tracker data by checking if previous data exists and creating new data if it doesn't.
   */
  DataSetup() {
    let prevData = this.GetTrackerData();
    if (prevData) {
      // good to go already, do nothing, but make sure we have our containers
    } else {
      let data = {};
      data.userAgent = Object.assign(navigator.userAgent);
      data.vendor = Object.assign(navigator.vendor);
      data.language = Object.assign(navigator.language);
      data.platform = Object.assign(navigator.platform);
      data.events = [];
      data.settings = [];

      this.SaveTrackerData(data);
      this.SaveSettings();
    }
  }

  /**
   * Downloads the tracker data as a JSON file.
   */
  DownloadTrackerData() {
    let link = document.createElement('a');
    let data = this.GetTrackerData();
    let fileStr = new Blob([JSON.stringify(data)], { type: 'text/plain' });
    link.href = URL.createObjectURL(fileStr);
    link.download = 'tracking.json';
    link.click();
  }

  /**
   * Saves the tracker data to local storage.
   * @param {Object} data - The data to be saved.
   */
  SaveTrackerData(data) {
    localStorage.setItem(constants.project_id, JSON.stringify(data));
  }

  /**
   * Retrieves tracker data from local storage.
   * @returns {Object} The tracker data.
   */
  GetTrackerData() {
    let data = JSON.parse(localStorage.getItem(constants.project_id));
    return data;
  }

  /**
   * Removes the project_id from localStorage, clears the tracking data, and sets up new data.
   */
  Delete() {
    localStorage.removeItem(constants.project_id);
    this.data = null;

    if (constants.debugLevel > 0) {
      console.log('tracking data cleared');
    }

    this.DataSetup();
  }

  SaveSettings() {
    // fetch all settings, push to data.settings
    let settings = JSON.parse(localStorage.getItem('settings_data'));
    if (settings) {
      // don't store their auth keys
      settings.openAIAuthKey = 'hidden';
      settings.geminiAuthKey = 'hidden';
      this.SetData('settings', settings);
    }
  }

  /**
   * Logs an event with various properties to the tracker data.
   * @param {Event} e - The event to log.
   */
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
      let sectionLabel = plot.sections[sectionPos];

      if (!this.isUndefinedOrNull(plot.x_group_label)) {
        x_label = plot.x_group_label;
      }
      if (!this.isUndefinedOrNull(plot.y_group_label)) {
        y_label = plot.y_group_label;
      }
      if (constants.plotOrientation == 'vert') {
        if (plotPos > -1 && sectionPos > -1) {
          if (!this.isUndefinedOrNull(sectionLabel)) {
            y_tickmark = sectionLabel;
          }
          if (!this.isUndefinedOrNull(plot.x_labels[position.x])) {
            x_tickmark = plot.x_labels[position.x];
          }
          if (!this.isUndefinedOrNull(plot.plotData[plotPos][sectionLabel])) {
            value = plot.plotData[plotPos][sectionLabel];
          }
        }
      } else {
        if (plotPos > -1 && sectionPos > -1) {
          if (!this.isUndefinedOrNull(sectionLabel)) {
            x_tickmark = sectionLabel;
          }
          if (!this.isUndefinedOrNull(plot.y_labels[position.y])) {
            y_tickmark = plot.y_labels[position.y];
          }
          if (!this.isUndefinedOrNull(plot.plotData[plotPos][sectionLabel])) {
            value = plot.plotData[plotPos][sectionLabel];
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

    this.SetData('events', eventToLog);
    //console.log('logged an event');
  }

  SetData(key, value) {
    let data = this.GetTrackerData();
    let arrayKeys = ['events', 'ChatHistory', 'settings'];
    if (!arrayKeys.includes(key)) {
      data[key] = value;
    } else {
      if (!data[key]) {
        data[key] = [];
      }
      data[key].push(value);
    }
    this.SaveTrackerData(data);
  }

  /**
   * Checks if the given item is undefined or null.
   * @param {*} item - The item to check.
   * @returns {boolean} - Returns true if the item is undefined or null, else false.
   */
  isUndefinedOrNull(item) {
    try {
      return item === undefined || item === null;
    } catch {
      return true;
    }
  }
}

/**
 * The Review class. Review mode is basically an input that users can toggle to that holds the last text output. Very useful for screen reader users who want to copy what was just said.
 * @class
 */
class Review {
  constructor() {}

  /**
   * Toggles the review mode on or off.
   * @param {boolean} [onoff=true] - Whether to turn review mode on or off. Default is true.
   */
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

/**
 * Represents a class for more easily sending custom errors to the console.
 * @class
 */
class LogError {
  constructor() {}

  /**
   * Logs the absent element and turns off visual highlighting.
   * @param {string} a - The absent element to log.
   */
  LogAbsentElement(a) {
    console.log(a, 'not found. Visual highlighting is turned off.');
  }

  /**
   * Logs a critical element and indicates that MAIDR is unable to run.
   * @param {string} a - The critical element to log.
   */
  LogCriticalElement(a) {
    consolelog(a, 'is critical. MAIDR unable to run');
  }

  /**
   * Logs a message indicating that two values do not have the same length.
   * @param {*} a - The first value to compare.
   * @param {*} b - The second value to compare.
   */
  LogDifferentLengths(a, b) {
    console.log(
      a,
      'and',
      b,
      'do not have the same length. Visual highlighting is turned off.'
    );
  }

  /**
   * Logs a message indicating that too many elements were found and only the first n elements will be highlighted.
   * @param {string} a - The type of element being highlighted.
   * @param {number} b - The maximum number of elements to highlight.
   */
  LogTooManyElements(a, b) {
    console.log(
      'Too many',
      a,
      'elements. Only the first',
      b,
      'will be highlighted.'
    );
  }

  /**
   * Logs a message indicating that the provided parameter is not an array.
   * @param {*} a - The parameter that is not an array.
   */
  LogNotArray(a) {
    console.log(a, 'is not an array. Visual highlighting is turned off.');
  }
}

/**
 * Audio class
 * Sets up audio stuff (compressor, gain),
 * sets up an oscillator that has good falloff (no clipping sounds) and can be instanced to be played anytime and can handle overlaps,
 * sets up an actual playTone function that plays tones based on current chart position
 *
 * @class
 */
class Audio {
  constructor() {
    this.AudioContext = window['AudioContext'] || window['webkitAudioContext'];
    this.audioContext = new AudioContext();
    this.compressor = this.compressorSetup(this.audioContext);
  }

  /**
   * Sets up a dynamics compressor for better audio quality.
   * @returns {DynamicsCompressorNode} The created compressor.
   */
  compressorSetup() {
    let compressor = this.audioContext.createDynamicsCompressor(); // create compressor for better audio quality

    compressor.threshold.value = -50;
    compressor.knee.value = 40;
    compressor.ratio.value = 12;
    compressor.attack.value = 0;
    compressor.release.value = 0.25;
    let gainMaster = this.audioContext.createGain(); // create master gain
    gainMaster.gain.value = constants.vol;
    compressor.connect(gainMaster);
    gainMaster.connect(this.audioContext.destination);

    return compressor;
  }

  /**
   * Initilizes a tone play based on the current chart type and position.
   * Triggers playOscillator() with the correct parameters.
   */
  playTone(params = null) {
    let currentDuration = constants.duration;
    let volume = constants.vol;
    if (params != null) {
      if (params.volScale != null) {
        volume = params.volScale * constants.vol;
      }
    }

    let rawPanning = 0;
    let rawFreq = 0;
    let frequency = 0;
    let panning = 0;

    let waveType = 'sine';

    // freq goes between min / max as rawFreq goes between min(0) / max
    if (constants.chartType == 'bar') {
      rawFreq = plot.plotData[position.x];
      rawPanning = position.x;
      frequency = this.SlideBetween(
        rawFreq,
        constants.minY,
        constants.maxY,
        constants.MIN_FREQUENCY,
        constants.MAX_FREQUENCY
      );
      panning = this.SlideBetween(
        rawPanning,
        constants.minX,
        constants.maxX,
        -1,
        1
      );
    } else if (constants.chartType == 'box') {
      let plotPos =
        constants.plotOrientation == 'vert' ? position.x : position.y;
      let sectionKey = plot.GetSectionKey(
        constants.plotOrientation == 'vert' ? position.y : position.x
      );
      if (Array.isArray(plot.plotData[plotPos][sectionKey])) {
        // outliers are stored in values with a separate itterator
        rawFreq = plot.plotData[plotPos][sectionKey][position.z];
      } else {
        // normal points
        rawFreq = plot.plotData[plotPos][sectionKey];
      }
      if (plot.plotData[plotPos][sectionKey] != null) {
        if (constants.plotOrientation == 'vert') {
          frequency = this.SlideBetween(
            rawFreq,
            constants.minY,
            constants.maxY,
            constants.MIN_FREQUENCY,
            constants.MAX_FREQUENCY
          );
          panning = this.SlideBetween(
            rawFreq,
            constants.minY,
            constants.maxY,
            -1,
            1
          );
        } else {
          frequency = this.SlideBetween(
            rawFreq,
            constants.minX,
            constants.maxX,
            constants.MIN_FREQUENCY,
            constants.MAX_FREQUENCY
          );
          panning = this.SlideBetween(
            rawFreq,
            constants.minX,
            constants.maxX,
            -1,
            1
          );
        }
      } else {
        frequency = constants.MIN_FREQUENCY;
        panning = 0;
      }
    } else if (constants.chartType == 'heat') {
      if (!plot.data || !plot.data[position.y]) return;
      rawFreq = plot.data[position.y][position.x];
      rawPanning = position.x;
      frequency = this.SlideBetween(
        rawFreq,
        constants.minY,
        constants.maxY,
        constants.MIN_FREQUENCY,
        constants.MAX_FREQUENCY
      );
      panning = this.SlideBetween(
        rawPanning,
        constants.minX,
        constants.maxX,
        -1,
        1
      );
    } else if (
      constants.chartType == 'point' ||
      constants.chartType == 'smooth'
    ) {
      // are we using global min / max, or just this layer?
      constants.globalMinMax = true;
      let chartMin = constants.minY;
      let chartMax = constants.maxY;
      if (constants.chartType == 'smooth') {
        chartMin = plot.curveMinY;
        chartMax = plot.curveMaxY;
      }
      if (constants.globalMinMax) {
        chartMin = Math.min(constants.minY, plot.curveMinY);
        chartMax = Math.max(constants.maxY, plot.curveMaxY);
      }
      if (constants.chartType == 'point') {
        // point layer
        // more than one point with same x-value
        rawFreq = plot.y[position.x][position.z];
        if (plot.max_count == 1) {
          volume = constants.vol;
        } else {
          volume = this.SlideBetween(
            plot.points_count[position.x][position.z],
            1,
            plot.max_count,
            constants.vol,
            constants.MAX_VOL
          );
        }

        rawPanning = position.x;
        frequency = this.SlideBetween(
          rawFreq,
          chartMin,
          chartMax,
          constants.MIN_FREQUENCY,
          constants.MAX_FREQUENCY
        );
        panning = this.SlideBetween(rawPanning, chartMin, chartMax, -1, 1);
      } else if (constants.chartType == 'smooth') {
        // best fit smooth layer

        rawFreq = plot.curvePoints[positionL1.x];
        rawPanning = positionL1.x;
        frequency = this.SlideBetween(
          rawFreq,
          chartMin,
          chartMax,
          constants.MIN_FREQUENCY,
          constants.MAX_FREQUENCY
        );
        panning = this.SlideBetween(rawPanning, chartMin, chartMax, -1, 1);
      }
    } else if (constants.chartType == 'hist') {
      rawFreq = plot.plotData[position.x].y;
      rawPanning = plot.plotData[position.x].x;
      frequency = this.SlideBetween(
        rawFreq,
        constants.minY,
        constants.maxY,
        constants.MIN_FREQUENCY,
        constants.MAX_FREQUENCY
      );
      panning = this.SlideBetween(
        rawPanning,
        constants.minX,
        constants.maxX,
        -1,
        1
      );
    } else if (constants.chartType == 'line') {
      rawFreq = plot.pointValuesY[position.x];
      rawPanning = position.x;
      frequency = this.SlideBetween(
        rawFreq,
        constants.minY,
        constants.maxY,
        constants.MIN_FREQUENCY,
        constants.MAX_FREQUENCY
      );
      panning = this.SlideBetween(
        rawPanning,
        constants.minX,
        constants.maxX,
        -1,
        1
      );
    } else if (
      constants.chartType == 'stacked_bar' ||
      constants.chartType == 'stacked_normalized_bar' ||
      constants.chartType == 'dodged_bar'
    ) {
      rawFreq = plot.plotData[position.x][position.y];
      if (rawFreq == 0) {
        this.PlayNull();
        return;
      } else if (Array.isArray(rawFreq)) {
        rawFreq = rawFreq[position.z];
      }
      rawPanning = position.x;
      frequency = this.SlideBetween(
        rawFreq,
        constants.minY,
        constants.maxY,
        constants.MIN_FREQUENCY,
        constants.MAX_FREQUENCY
      );
      panning = this.SlideBetween(
        rawPanning,
        constants.minX,
        constants.maxX,
        -1,
        1
      );
      let waveTypeArr = ['triangle', 'square', 'sawtooth', 'sine'];
      waveType = waveTypeArr[position.y];
    }

    if (constants.debugLevel > 5) {
      console.log('will play tone at freq', frequency);
      if (constants.chartType == 'box') {
        console.log(
          'based on',
          constants.minY,
          '<',
          rawFreq,
          '<',
          constants.maxY,
          ' | freq min',
          constants.MIN_FREQUENCY,
          'max',
          constants.MAX_FREQUENCY
        );
      } else {
        console.log(
          'based on',
          constants.minX,
          '<',
          rawFreq,
          '<',
          constants.maxX,
          ' | freq min',
          constants.MIN_FREQUENCY,
          'max',
          constants.MAX_FREQUENCY
        );
      }
    }

    if (constants.chartType == 'box') {
      // different types of sounds for different regions.
      // outlier = short tone
      // whisker = normal tone
      // range = chord
      let sectionKey = plot.GetSectionKey(
        constants.plotOrientation == 'vert' ? position.y : position.x
      );
      if (sectionKey == 'lower_outlier' || sectionKey == 'upper_outlier') {
        currentDuration = constants.outlierDuration;
      } else if (
        sectionKey == 'q1' ||
        sectionKey == 'q2' ||
        sectionKey == 'q3'
      ) {
        //currentDuration = constants.duration * 2;
      } else {
        //currentDuration = constants.duration * 2;
      }
    }

    // create tones
    this.playOscillator(frequency, currentDuration, panning, volume, waveType);
    if (constants.chartType == 'box') {
      let sectionKey = plot.GetSectionKey(
        constants.plotOrientation == 'vert' ? position.y : position.x
      );
      if (sectionKey == 'q1' || sectionKey == 'q2' || sectionKey == 'q3') {
        // also play an octive below at lower vol
        let freq2 = frequency / 2;
        this.playOscillator(
          freq2,
          currentDuration,
          panning,
          constants.vol / 4,
          'triangle'
        );
      }
    } else if (constants.chartType == 'heat') {
      // Added heatmap tone feature
      if (rawFreq == 0) {
        this.PlayNull();
      }
    }
  }

  /**
   * Plays an oscillator with the given frequency, duration, panning, volume, and wave type.
   * Typically used by playTone(), which does all the heavy lifting.
   * @param {number} frequency - The frequency of the oscillator.
   * @param {number} currentDuration - The duration of the oscillator in seconds.
   * @param {number} panning - The panning value of the oscillator.
   * @param {number} [currentVol=1] - The volume of the oscillator.
   * @param {string} [wave='sine'] - The wave type of the oscillator.
   */
  playOscillator(
    frequency,
    currentDuration,
    panning,
    currentVol = 1,
    wave = 'sine'
  ) {
    const t = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    oscillator.type = wave;
    oscillator.frequency.value = parseFloat(frequency);
    oscillator.start();

    // create gain for this event
    const gainThis = this.audioContext.createGain();
    gainThis.gain.setValueCurveAtTime(
      [
        0.5 * currentVol,
        1 * currentVol,
        0.5 * currentVol,
        0.5 * currentVol,
        0.5 * currentVol,
        0.1 * currentVol,
        1e-4 * currentVol,
      ],
      t,
      currentDuration
    ); // this is what makes the tones fade out properly and not clip

    let MAX_DISTANCE = 10000;
    let posZ = 1;
    const panner = new PannerNode(this.audioContext, {
      panningModel: 'HRTF',
      distanceModel: 'linear',
      positionX: position.x,
      positionY: position.y,
      positionZ: posZ,
      plotOrientationX: 0.0,
      plotOrientationY: 0.0,
      plotOrientationZ: -1.0,
      refDistance: 1,
      maxDistance: MAX_DISTANCE,
      rolloffFactor: 10,
      coneInnerAngle: 40,
      coneOuterAngle: 50,
      coneOuterGain: 0.4,
    });

    // create panning
    const stereoPanner = this.audioContext.createStereoPanner();
    stereoPanner.pan.value = panning;
    oscillator.connect(gainThis);
    gainThis.connect(stereoPanner);
    stereoPanner.connect(panner);
    panner.connect(this.compressor);

    // create panner node

    // play sound for duration
    setTimeout(() => {
      panner.disconnect();
      gainThis.disconnect();
      oscillator.stop();
      oscillator.disconnect();
    }, currentDuration * 1e3 * 2);
  }

  /**
   * Plays a smooth sound with the given frequency array, duration, panning array, volume, and wave type.
   * The idea here is you give it an array of frequencies, and it plays them smoothly in order, like listening to a whole line chart
   * @param {number[]} freqArr - The array of frequencies to play.
   * @param {number} currentDuration - The duration of the sound in seconds.
   * @param {number[]} panningArr - The array of panning values.
   * @param {number} currentVol - The volume of the sound.
   * @param {string} wave - The type of wave to use for the oscillator.
   */
  playSmooth(
    freqArr = [600, 500, 400, 300],
    currentDuration = 2,
    panningArr = [-1, 0, 1],
    currentVol = 1,
    wave = 'sine'
  ) {
    // todo: make smooth duration dependant on how much line there is to do. Like, at max it should be max duration, but if we only have like a tiny bit to play we should just play for a tiny bit

    let gainArr = new Array(freqArr.length * 3).fill(0.5 * currentVol);
    gainArr.push(1e-4 * currentVol);

    const t = this.audioContext.currentTime;
    const smoothOscillator = this.audioContext.createOscillator();
    smoothOscillator.type = wave;
    smoothOscillator.frequency.setValueCurveAtTime(freqArr, t, currentDuration);
    smoothOscillator.start();
    constants.isSmoothAutoplay = true;

    // create gain for this event
    this.smoothGain = this.audioContext.createGain();
    this.smoothGain.gain.setValueCurveAtTime(gainArr, t, currentDuration); // this is what makes the tones fade out properly and not clip

    let MAX_DISTANCE = 10000;
    let posZ = 1;
    const panner = new PannerNode(this.audioContext, {
      panningModel: 'HRTF',
      distanceModel: 'linear',
      positionX: position.x,
      positionY: position.y,
      positionZ: posZ,
      plotOrientationX: 0.0,
      plotOrientationY: 0.0,
      plotOrientationZ: -1.0,
      refDistance: 1,
      maxDistance: MAX_DISTANCE,
      rolloffFactor: 10,
      coneInnerAngle: 40,
      coneOuterAngle: 50,
      coneOuterGain: 0.4,
    });

    // create panning
    const stereoPanner = this.audioContext.createStereoPanner();
    stereoPanner.pan.setValueCurveAtTime(panningArr, t, currentDuration);
    smoothOscillator.connect(this.smoothGain);
    this.smoothGain.connect(stereoPanner);
    stereoPanner.connect(panner);
    panner.connect(this.compressor);

    // play sound for duration
    constants.smoothId = setTimeout(() => {
      panner.disconnect();
      this.smoothGain.disconnect();
      smoothOscillator.stop();
      smoothOscillator.disconnect();
      constants.isSmoothAutoplay = false;
    }, currentDuration * 1e3 * 2);
  }

  /**
   * Initializes play of a custom null frequency sound.
   * Calls the usual playOscillator() to do so.
   */
  PlayNull() {
    let frequency = constants.NULL_FREQUENCY;
    let duration = constants.duration;
    let panning = 0;
    let vol = constants.vol;
    let wave = 'triangle';

    this.playOscillator(frequency, duration, panning, vol, wave);

    setTimeout(
      function (audioThis) {
        audioThis.playOscillator(
          (frequency * 23) / 24,
          duration,
          panning,
          vol,
          wave
        );
      },
      Math.round((duration / 5) * 1000),
      this
    );
  }

  /**
   * Plays a pleasant end chime.
   * @function
   * @memberof audio
   * @returns {void}
   */
  playEnd() {
    // play a pleasent end chime. We'll use terminal chime from VSCode
    if (constants.canPlayEndChime) {
      let chimeClone = constants.endChime.cloneNode(true); // we clone so that we can trigger a tone while one is already playing
      /* 
             * the following (panning) only works if we're on a server
        let panning = 0;
        try {
            if ( constants.chartType == 'bar' ) {
                panning = this.SlideBetween(position.x, 0, plot.bars.length-1, -1, 1);
            } else if ( constants.chartType == 'box' ) {
                panning = this.SlideBetween(position.x, 0, plot.plotData[position.y].length-1, -1, 1);
            } else if ( constants.chartType == 'heat' ) {
                panning = this.SlideBetween(position.x, 0, plot.num_cols-1, -1, 1);
            } else if ( constants.chartType == 'point' ) {
                panning = this.SlideBetween(position.x, 0, plot.x.length-1, -1, 1);
            }
        } catch {
        }

        const track = this.audioContext.createMediaElementSource(chimeClone);
        const stereoNode = new StereoPannerNode(this.audioContext, {pan:panning} );
        track.connect(stereoNode).connect(this.audioContext.destination);
        */
      chimeClone.play();
      chimeClone = null;
    }
  }

  /**
   * Stops the smooth gain and cancels any scheduled values.
   * @function
   * @memberof Audio
   * @instance
   * @returns {void}
   */
  KillSmooth() {
    if (constants.smoothId) {
      this.smoothGain.gain.cancelScheduledValues(0);
      this.smoothGain.gain.exponentialRampToValueAtTime(
        0.0001,
        this.audioContext.currentTime + 0.03
      );

      clearTimeout(constants.smoothId);

      constants.isSmoothAutoplay = false;
    }
  }

  /**
   * Goes between min and max proportional to how val goes between a and b.
   * @param {number} val - The value to slide between a and b.
   * @param {number} a - The start value of the slide.
   * @param {number} b - The end value of the slide.
   * @param {number} min - The minimum value of the slide.
   * @param {number} max - The maximum value of the slide.
   * @returns {number} The new value between min and max.
   */
  SlideBetween(val, a, b, min, max) {
    val = Number(val);
    a = Number(a);
    b = Number(b);
    min = Number(min);
    max = Number(max);
    let newVal = ((val - a) / (b - a)) * (max - min) + min;
    if (a == 0 && b == 0) {
      newVal = 0;
    }
    return newVal;
  }
}

/**
 * A class representing the display of the chart.
 * @class
 */
class Display {
  /**
   * Creates a new instance of the Display class.
   * @constructor
   */
  constructor() {
    this.infoDiv = constants.infoDiv;

    this.x = {};
    this.x.id = 'x';
    this.x.textBase = 'x-value: ';

    this.y = {};
    this.y.id = 'y';
    this.y.textBase = 'y-value: ';

    this.boxplotGridPlaceholders = [
      resources.GetString('lower_outlier'),
      resources.GetString('min'),
      resources.GetString('25'),
      resources.GetString('50'),
      resources.GetString('75'),
      resources.GetString('max'),
      resources.GetString('upper_outlier'),
    ];
  }

  /**
   * Toggles the text mode between 'off', 'terse', and 'verbose'.
   * Updates the constants.textMode property and announces the new mode.
   */
  toggleTextMode() {
    if (constants.textMode == 'off') {
      constants.textMode = 'terse';
    } else if (constants.textMode == 'terse') {
      constants.textMode = 'verbose';
    } else if (constants.textMode == 'verbose') {
      constants.textMode = 'off';
    }

    this.announceText(
      '<span aria-hidden="true">Text mode:</span> ' + constants.textMode
    );
  }

  /**
   * Toggles braille mode on or off.
   * @param {string} [onoff] - Optional parameter to explicitly set braille mode on or off. If not supplied, defaults to toggling the current braille mode.
   * @returns {void}
   */
  toggleBrailleMode(onoff) {
    // exception: if we just initilized, position might not be in range
    if (position.x < 0) position.x = 0;
    if (position.y < 0) position.y = 0;

    if (constants.chartType == 'point') {
      this.announceText('Braille is not supported in point layer.');
      return;
    }
    if (typeof onoff === 'undefined') {
      if (typeof constants.brailleMode === 'undefined') {
        constants.brailleMode = 'off';
        onoff = constants.brailleMode == 'on';
      } else {
        // switch on/off
        if (constants.brailleMode == 'on') {
          onoff = 'off';
        } else {
          onoff = 'on';
        }
        constants.brailleMode = onoff;
      }
    }
    if (onoff == 'on') {
      constants.lockSelection = true;
      if (constants.chartType == 'box') {
        // braille mode is on before any plot is selected
        if (
          constants.plotOrientation != 'vert' &&
          position.x == -1 &&
          position.y == plot.plotData.length
        ) {
          position.x += 1;
          position.y -= 1;
        } else if (
          constants.plotOrientation == 'vert' &&
          position.x == 0 &&
          position.y == plot.plotData[0].length - 1
        ) {
          // do nothing; don't think there's any problem
        }
      }

      constants.brailleMode = 'on';
      document
        .getElementById(constants.braille_container_id)
        .classList.remove('hidden');
      constants.brailleInput.focus();
      constants.brailleInput.setSelectionRange(position.x, position.x);

      this.SetBraille();

      if (constants.chartType == 'heat') {
        let pos = position.y * (plot.num_cols + 1) + position.x;
        constants.brailleInput.setSelectionRange(pos, pos);
      }

      // braille mode is on before navigation of chart
      // very important to make sure braille works properly
      if (position.x == -1 && position.y == -1) {
        constants.brailleInput.setSelectionRange(0, 0);
      }
      setTimeout(function () {
        constants.lockSelection = false;
      }, 50);
    } else {
      constants.brailleMode = 'off';
      document
        .getElementById(constants.braille_container_id)
        .classList.add('hidden');

      if (constants.review_container) {
        if (!constants.review_container.classList.contains('hidden')) {
          constants.review.focus();
        } else {
          constants.chart.focus();
        }
      } else {
        constants.chart.focus();
      }
    }

    this.announceText('Braille ' + constants.brailleMode);
  }

  /**
   * Toggles the sonification mode based on the current chart type and sonification mode.
   * If the chart type is point, stacked_bar, stacked_normalized_bar, or dodged_bar, the sonification mode can be toggled between 'off', 'on', and 'same'.
   * If the chart type is not one of the above, the sonification mode can only be toggled between 'off' and 'on'.
   */
  toggleSonificationMode() {
    if (
      constants.chartType == 'point' ||
      constants.chartType == 'stacked_bar' ||
      constants.chartType == 'stacked_normalized_bar' ||
      constants.chartType == 'dodged_bar'
    ) {
      if (constants.sonifMode == 'off') {
        constants.sonifMode = 'on';
        this.announceText(resources.GetString('son_sep'));
      } else if (constants.sonifMode == 'on') {
        constants.sonifMode = 'same';
        this.announceText(resources.GetString('son_same'));
      } else if (constants.sonifMode == 'same') {
        constants.sonifMode = 'off';
        this.announceText(resources.GetString('son_off'));
      }
    } else {
      if (constants.sonifMode == 'off') {
        constants.sonifMode = 'on';
        this.announceText(resources.GetString('son_on'));
      } else {
        constants.sonifMode = 'off';
        this.announceText(resources.GetString('son_off'));
      }
    }
  }

  /**
   * Changes the chart layer up or down and updates the position relative to where we were on the previous layer.
   * This only applies to charts that have multiple layers, such as point and smooth in a standard scatterplot.
   * @param {string} [updown='down'] - The direction to change the chart layer. Can be 'up' or 'down'. Defaults to 'down'.
   */
  changeChartLayer(updown = 'down') {
    // get possible chart types, where we are, and move between them
    let chartTypes = maidr.type;
    if (Array.isArray(chartTypes)) {
      let currentIndex = chartTypes.indexOf(constants.chartType);
      if (updown == 'down') {
        if (currentIndex == 0) {
          //constants.chartType = chartTypes[chartTypes.length - 1];
        } else {
          constants.chartType = chartTypes[currentIndex - 1];
          this.announceText('Switched to ' + constants.chartType); // todo: connect this to a resource file so it can be localized
        }
      } else {
        if (currentIndex == chartTypes.length - 1) {
          //constants.chartType = chartTypes[0];
        } else {
          constants.chartType = chartTypes[currentIndex + 1];
          this.announceText('Switched to ' + constants.chartType); // todo: connect this to a resource file so it can be localized
        }
      }
    }

    // update position relative to where we were on the previous layer
    // newX = oldX * newLen / oldLen
    if (constants.chartType == 'point') {
      position.x = Math.round(
        ((plot.x.length - 1) * positionL1.x) / (plot.curvePoints.length - 1)
      );
    } else if (constants.chartType == 'smooth') {
      // reverse math of the above
      positionL1.x = Math.round(
        ((plot.curvePoints.length - 1) * position.x) / (plot.x.length - 1)
      );
    }
  }

  /**
   * Sets the text of the announce container element.
   * @param {string} txt - The text to be displayed in the announce container.
   */
  announceText(txt) {
    this.displayInfo('announce', txt, constants.announceContainer);
  }

  /**
   * Updates the position of the cursor in the braille display based on the current chart type and position.
   */
  UpdateBraillePos() {
    constants.lockSelection = true;
    if (
      constants.chartType == 'bar' ||
      constants.chartType == 'hist' ||
      constants.chartType == 'line'
    ) {
      constants.brailleInput.setSelectionRange(position.x, position.x);
    } else if (
      constants.chartType == 'stacked_bar' ||
      constants.chartType == 'stacked_normalized_bar' ||
      constants.chartType == 'dodged_bar'
    ) {
      // if we're not on the top y position
      let pos = null;
      if (position.y < plot.plotData[0].length - 1) {
        pos = position.x;
      } else {
        pos = position.x * (plot.fill.length + 1) + position.y;
      }
      constants.brailleInput.setSelectionRange(pos, pos);
    } else if (constants.chartType == 'heat') {
      let pos = position.y * (plot.num_cols + 1) + position.x;
      constants.brailleInput.setSelectionRange(pos, pos);
    } else if (constants.chartType == 'box') {
      // on box we extend characters a lot and have blanks, so we go to our type
      let sectionPos =
        constants.plotOrientation == 'vert' ? position.y : position.x;
      let targetLabel = this.boxplotGridPlaceholders[sectionPos];
      let haveTargetLabel = false;
      let adjustedPos = 0;
      // bookmark: shiny issue: this is being called twice??
      // and the issue happens on 2nd call, sometimes it skips like 75% or whatever
      //
      // on first call, we might call it multiple as we're setting up, I care but let's check that later

      if (constants.brailleData) {
        for (let i = 0; i < constants.brailleData.length; i++) {
          if (constants.brailleData[i].type != 'blank') {
            if (
              resources.GetString(constants.brailleData[i].type) == targetLabel
            ) {
              haveTargetLabel = true;
              break;
            }
          }
          adjustedPos += constants.brailleData[i].numChars;
        }
      } else {
        throw 'Braille data not set up, cannot move cursor in braille, sorry.';
      }
      // but sometimes we don't have our targetLabel, go to the start
      // future todo: look for nearby label and go to the nearby side of that
      if (!haveTargetLabel) {
        adjustedPos = 0;
      }

      constants.brailleInput.setSelectionRange(adjustedPos, adjustedPos);
    } else if (
      singleMaidr.type == 'smooth' ||
      singleMaidr.type.includes('smooth')
    ) {
      constants.brailleInput.setSelectionRange(positionL1.x, positionL1.x);
    }
    setTimeout(function () {
      constants.lockSelection = false;
    }, 50);
  }

  /**
   * Builds an html text string to output to both visual users and aria live based on what chart we're on, our position, and the mode.
   * Typical output is something like "x is 5, y is 10".
   * @function
   * @memberof module:display
   * @returns {void}
   */
  displayValues() {
    // we build an html text string to output to both visual users and aria live based on what chart we're on, our position, and the mode
    // note: we do this all as one string rather than changing individual element IDs so that aria-live receives a single update

    let output = '';
    let verboseText = '';
    let terseText = '';
    let reviewText = '';
    if (constants.chartType == 'bar') {
      // verbose: {legend x} is {colname x}, {legend y} is {value y}
      if (plot.columnLabels[position.x]) {
        if (plot.plotLegend.x.length > 0) {
          verboseText += plot.plotLegend.x + ' is ';
        }
        verboseText += plot.columnLabels[position.x] + ', ';
      }
      if (plot.plotData[position.x]) {
        if (plot.plotLegend) {
          verboseText += plot.plotLegend.y + ' is ';
        }
        verboseText += plot.plotData[position.x];
      }
      // terse: {colname} {value}
      terseText +=
        '<p>' +
        plot.columnLabels[position.x] +
        ' ' +
        plot.plotData[position.x] +
        '</p>\n';
      verboseText = '<p>' + verboseText + '</p>\n';
    } else if (constants.chartType == 'heat') {
      // verbose
      // col name and value
      if (constants.navigation == 1) {
        verboseText +=
          plot.x_group_label +
          ' ' +
          plot.x_labels[position.x] +
          ', ' +
          plot.y_group_label +
          ' ' +
          plot.y_labels[position.y] +
          ', ' +
          plot.fill +
          ' is ';
        // if (constants.hasRect) {
        verboseText += plot.data[position.y][position.x];
        // }
      } else {
        verboseText +=
          plot.y_group_label +
          ' ' +
          plot.y_labels[position.y] +
          ', ' +
          plot.x_group_label +
          ' ' +
          plot.x_labels[position.x] +
          ', ' +
          plot.fill +
          ' is ';
        // if (constants.hasRect) {
        verboseText += plot.data[position.y][position.x];
        // }
      }
      // terse: value only
      if (constants.navigation == 1) {
        // column navigation
        terseText +=
          '<p>' +
          plot.x_labels[position.x] +
          ', ' +
          plot.data[position.y][position.x] +
          '</p>\n';
      } else {
        // row navigation
        terseText +=
          '<p>' +
          plot.y_labels[position.y] +
          ', ' +
          plot.data[position.y][position.x] +
          '</p>\n';
      }
      verboseText = '<p>' + verboseText + '</p>\n';
    } else if (constants.chartType == 'box') {
      // setup
      let val = 0;
      let numPoints = 1;
      let isOutlier = false;
      let plotPos =
        constants.plotOrientation == 'vert' ? position.x : position.y;
      let sectionKey = plot.GetSectionKey(
        constants.plotOrientation == 'vert' ? position.y : position.x
      );

      if (sectionKey == 'lower_outlier' || sectionKey == 'upper_outlier') {
        isOutlier = true;
      }
      if (plot.plotData[plotPos][sectionKey] == null) {
        val = '';
        if (isOutlier) numPoints = 0;
      } else if (isOutlier) {
        val = plot.plotData[plotPos][sectionKey].join(', ');
        numPoints = plot.plotData[plotPos][sectionKey].length;
      } else {
        val = plot.plotData[plotPos][sectionKey];
      }

      // set output

      // group label for verbose
      if (constants.navigation) {
        if (plot.x_group_label) verboseText += plot.x_group_label;
      } else if (!constants.navigation) {
        if (plot.y_group_label) verboseText += plot.y_group_label;
      }
      // and axes label
      if (constants.navigation) {
        if (plot.x_labels[plotPos]) {
          verboseText += ' is ';
          terseText += plot.x_labels[plotPos] + ', ';
          verboseText += plot.x_labels[plotPos] + ', ';
        } else {
          verboseText += ', ';
        }
      } else if (!constants.navigation) {
        if (plot.y_labels[plotPos]) {
          verboseText += ' is ';
          terseText += plot.y_labels[plotPos] + ', ';
          verboseText += plot.y_labels[plotPos] + ', ';
        } else {
          verboseText += ', ';
        }
      }
      // outliers
      if (isOutlier) {
        terseText += numPoints + ' ';
        verboseText += numPoints + ' ';
      }
      // label
      verboseText += resources.GetString(sectionKey);
      if (numPoints == 1) verboseText += ' is ';
      else {
        verboseText += 's ';
        if (numPoints > 1) verboseText += ' are ';
      }
      if (
        isOutlier ||
        (constants.navigation && constants.plotOrientation == 'horz') ||
        (!constants.navigation && constants.plotOrientation == 'vert')
      ) {
        terseText += resources.GetString(sectionKey);

        // grammar
        if (numPoints != 1) {
          terseText += 's';
        }
        terseText += ' ';
      }
      // val
      if (plot.plotData[plotPos][sectionKey] == null && !isOutlier) {
        terseText += 'empty';
        verboseText += 'empty';
      } else {
        terseText += val;
        verboseText += val;
      }

      verboseText = '<p>' + verboseText + '</p>\n';
      terseText = '<p>' + terseText + '</p>\n';
    } else if (
      [].concat(singleMaidr.type).includes('point') ||
      [].concat(singleMaidr.type).includes('smooth')
    ) {
      if (constants.chartType == 'point') {
        // point layer
        verboseText +=
          plot.x_group_label +
          ' ' +
          plot.x[position.x] +
          ', ' +
          plot.y_group_label +
          ' [' +
          plot.y[position.x].join(', ') +
          ']';

        // terse
        terseText +=
          '<p>' +
          plot.x[position.x] +
          ', ' +
          '[' +
          plot.y[position.x].join(', ') +
          ']' +
          '</p>\n';
      } else if (constants.chartType == 'smooth') {
        // best fit smooth layer
        verboseText +=
          plot.x_group_label +
          ' ' +
          plot.curveX[positionL1.x] +
          ', ' +
          plot.y_group_label +
          ' ' +
          plot.curvePoints[positionL1.x]; // verbose mode: x and y values

        // terse mode: gradient trend

        // display absolute gradient of the graph
        terseText += '<p>' + plot.curvePoints[positionL1.x] + '<p>\n';
      }
      verboseText = '<p>' + verboseText + '</p>\n';
    } else if (constants.chartType == 'hist') {
      // terse: {x}, {y}
      terseText =
        '<p>' +
        plot.plotData[position.x].x +
        ', ' +
        plot.plotData[position.x].y +
        '</p>\n';
      // verbose: {xlabel} is xmin through xmax, {ylabel} is y
      verboseText = '<p>';
      if (plot.legendX) {
        verboseText = plot.legendX + ' is ';
      }
      verboseText += plot.plotData[position.x].xmin;
      verboseText += ' through ' + plot.plotData[position.x].xmax + ', ';
      if (plot.legendY) {
        verboseText += plot.legendY + ' is ';
      }
      verboseText += plot.plotData[position.x].y;
    } else if (constants.chartType == 'line') {
      // line layer
      if (plot.plotLegend) {
        verboseText += plot.plotLegend.x + ' is ';
      }
      verboseText += plot.pointValuesX[position.x] + ', ';
      if (plot.plotLegend) {
        plot.plotLegend.y + ' is ';
      }
      verboseText += plot.pointValuesY[position.x];

      // terse
      terseText +=
        '<p>' +
        plot.pointValuesX[position.x] +
        ', ' +
        plot.pointValuesY[position.x] +
        '</p>\n';

      verboseText = '<p>' + verboseText + '</p>\n';
    } else if (
      constants.chartType == 'stacked_bar' ||
      constants.chartType == 'stacked_normalized_bar' ||
      constants.chartType == 'dodged_bar'
    ) {
      // {legend x} is {colname x}, level is {colname y}, {legend y} is {plotData[x][y]}
      if (plot.plotLegend) {
        verboseText += plot.plotLegend.x + ' is ';
      }
      verboseText += plot.level[position.x] + ', ';
      verboseText += 'level is ' + plot.fill[position.y] + ', ';

      if (plot.plotLegend) {
        verboseText += plot.plotLegend.y + ' is ';
      }
      verboseText += plot.plotData[position.x][position.y];

      // navigation == 1 ? {colname x} : {colname y} is {plotData[x][y]}
      if (constants.navigation == 1) {
        terseText +=
          '<p>' +
          plot.level[position.x] +
          ' is ' +
          plot.plotData[position.x][position.y] +
          '</p>\n';
      } else {
        terseText +=
          '<p>' +
          plot.fill[position.y] +
          ' is ' +
          plot.plotData[position.x][position.y] +
          '</p>\n';
      }
      verboseText = '<p>' + verboseText + '</p>\n';
    }

    // set outout text
    if (constants.textMode == 'verbose') {
      output = verboseText;
    } else if (constants.textMode == 'terse') {
      output = terseText;
    }
    constants.verboseText = verboseText;
    // aria live hack. If we're repeating (Space), aria won't detect if text is the same, so we modify vey slightly by adding / removing period at the end
    if (output == constants.infoDiv.innerHTML) {
      if (constants.infoDiv.textContent.endsWith('.')) {
        if (output.endsWith('.</p>')) {
          output = output.replace('.</p>', '</p>');
        }
      } else {
        output = output.replace('</p>', '.</p>');
      }
    }

    // could also try this hack, but we'll need a time gap
    if (constants.infoDiv) {
      constants.infoDiv.innerHTML = '';
      constants.infoDiv.innerHTML = output;
    }
    if (constants.review) {
      if (output.length > 0) {
        constants.review.value = output.replace(/<[^>]*>?/gm, '');
      } else {
        constants.review.value = verboseText;
      }
    }
  }

  /**
   * Displays information on the webpage and an aria live region based on the textType and textValue provided.
   * @param {string} textType - The type of text to be displayed.
   * @param {string} textValue - The value of the text to be displayed.
   */
  displayInfo(textType, textValue, elem = constants.infoDiv) {
    let textToAdd = '';
    if (textType == 'announce') {
      if (textValue) {
        textToAdd = textValue;
      }
    } else if (textType) {
      if (textValue) {
        if (constants.textMode == 'terse') {
          textToAdd = textValue;
        } else if (constants.textMode == 'verbose') {
          let capsTextType =
            textType.charAt(0).toUpperCase() + textType.slice(1);
          textToAdd = capsTextType + ' is ' + textValue;
        }
      } else {
        let aOrAn = ['a', 'e', 'i', 'o', 'u'].includes(textType.charAt(0))
          ? 'an'
          : 'a';

        textToAdd = 'Plot does not have ' + aOrAn + ' ' + textType;
      }
    }
    if (textToAdd.length > 0) {
      elem.innerHTML = null;
      let p = document.createElement('p');
      p.innerHTML = textToAdd;
      elem.appendChild(p);
    }
  }

  /**
   * Sets the braille representation of the chart based on the current chart type and plot data.
   */
  SetBraille() {
    let brailleArray = [];

    if (constants.chartType == 'heat') {
      let range = (constants.maxY - constants.minY) / 3;
      let low = constants.minY + range;
      let medium = low + range;
      let high = medium + range;
      for (let i = 0; i < plot.data.length; i++) {
        for (let j = 0; j < plot.data[i].length; j++) {
          if (plot.data[i][j] == 0) {
            brailleArray.push('⠀');
          } else if (plot.data[i][j] <= low) {
            brailleArray.push('⠤');
          } else if (plot.data[i][j] <= medium) {
            brailleArray.push('⠒');
          } else {
            brailleArray.push('⠉');
          }
        }
        brailleArray.push('⠳');
      }
    } else if (
      constants.chartType == 'stacked_bar' ||
      constants.chartType == 'stacked_normalized_bar' ||
      constants.chartType == 'dodged_bar'
    ) {
      // if we're not on the top y position, display just this level, using local min max
      if (position.y < plot.plotData[0].length - 1) {
        let localMin = null;
        let localMax = null;
        for (let i = 0; i < plot.plotData.length; i++) {
          if (i == 0) {
            localMin = plot.plotData[i][position.y];
            localMax = plot.plotData[i][position.y];
          } else {
            if (plot.plotData[i][position.y] < localMin) {
              localMin = plot.plotData[i][position.y];
            }
            if (plot.plotData[i][position.y] > localMax) {
              localMax = plot.plotData[i][position.y];
            }
          }
        }
        let range = (localMax - localMin) / 4;
        let low = localMin + range;
        let medium = low + range;
        let medium_high = medium + range;
        for (let i = 0; i < plot.plotData.length; i++) {
          if (plot.plotData[i][position.y] == 0) {
            brailleArray.push('⠀');
          } else if (plot.plotData[i][position.y] <= low) {
            brailleArray.push('⣀');
          } else if (plot.plotData[i][position.y] <= medium) {
            brailleArray.push('⠤');
          } else if (plot.plotData[i][position.y] <= medium_high) {
            brailleArray.push('⠒');
          } else {
            brailleArray.push('⠉');
          }
        }
      } else {
        // all mode, do braille similar to heatmap, with all data and seperator
        for (let i = 0; i < plot.plotData.length; i++) {
          let range = (constants.maxY - constants.minY) / 4;
          let low = constants.minY + range;
          let medium = low + range;
          let medium_high = medium + range;
          for (let j = 0; j < plot.plotData[i].length; j++) {
            if (plot.plotData[i][j] == 0) {
              brailleArray.push('⠀');
            } else if (plot.plotData[i][j] <= low) {
              brailleArray.push('⣀');
            } else if (plot.plotData[i][j] <= medium) {
              brailleArray.push('⠤');
            } else if (plot.plotData[i][j] <= medium_high) {
              brailleArray.push('⠒');
            } else {
              brailleArray.push('⠉');
            }
          }
          brailleArray.push('⠳');
        }
      }
    } else if (constants.chartType == 'bar') {
      let range = (constants.maxY - constants.minY) / 4;
      let low = constants.minY + range;
      let medium = low + range;
      let medium_high = medium + range;
      for (let i = 0; i < plot.plotData.length; i++) {
        if (plot.plotData[i] <= low) {
          brailleArray.push('⣀');
        } else if (plot.plotData[i] <= medium) {
          brailleArray.push('⠤');
        } else if (plot.plotData[i] <= medium_high) {
          brailleArray.push('⠒');
        } else {
          brailleArray.push('⠉');
        }
      }
    } else if (constants.chartType == 'smooth') {
      let range = (plot.curveMaxY - plot.curveMinY) / 4;
      let low = plot.curveMinY + range;
      let medium = low + range;
      let medium_high = medium + range;
      let high = medium_high + range;
      for (let i = 0; i < plot.curvePoints.length; i++) {
        if (plot.curvePoints[i] <= low) {
          brailleArray.push('⣀');
        } else if (plot.curvePoints[i] <= medium) {
          brailleArray.push('⠤');
        } else if (plot.curvePoints[i] <= medium_high) {
          brailleArray.push('⠒');
        } else if (plot.curvePoints[i] <= high) {
          brailleArray.push('⠉');
        }
      }
    } else if (constants.chartType == 'hist') {
      let range = (constants.maxY - constants.minY) / 4;
      let low = constants.minY + range;
      let medium = low + range;
      let medium_high = medium + range;
      for (let i = 0; i < plot.plotData.length; i++) {
        if (plot.plotData[i].y <= low) {
          brailleArray.push('⣀');
        } else if (plot.plotData[i].y <= medium) {
          brailleArray.push('⠤');
        } else if (plot.plotData[i].y <= medium_high) {
          brailleArray.push('⠒');
        } else {
          brailleArray.push('⠉');
        }
      }
    } else if (constants.chartType == 'box' && position.y > -1) {
      // Idea here is to use different braille characters to physically represent the box
      // if sections are longer or shorter we'll add more characters
      // example: outlier, small space, long min, med 25/50/75, short max: ⠂ ⠒⠒⠒⠒⠒⠒⠿⠸⠿⠒
      //
      // So, we get weighted lengths of each section (or gaps between outliers, etc),
      // and then create the appropriate number of characters
      // Full explanation on readme
      //
      // This is messy and long (250 lines). If anyone wants to improve, be my guest

      // Some init stuff
      let plotPos;
      let globalMin;
      let globalMax;
      let numSections = plot.sections.length;
      if (constants.plotOrientation == 'vert') {
        plotPos = position.x;
        globalMin = constants.minY;
        globalMax = constants.maxY;
      } else {
        plotPos = position.y;
        globalMin = constants.minX;
        globalMax = constants.maxX;
      }

      // exception: return if we're out of bounds
      if (plotPos < 0 || plotPos >= plot.plotData.length) {
        return;
      }

      // We convert main plot data to array of values and types, including min and max, and seperating outliers and removing nulls
      let valData = [];
      valData.push({ type: 'global_min', value: globalMin });
      for (let i = 0; i < numSections; i++) {
        let sectionKey = plot.sections[i];
        let point = plot.plotData[plotPos][sectionKey];
        let charData = {};

        if (point != null) {
          if (sectionKey == 'lower_outlier' || sectionKey == 'upper_outlier') {
            for (let j = 0; j < point.length; j++) {
              charData = {
                type: sectionKey,
                value: point[j],
              };
              valData.push(charData);
            }
          } else {
            charData = {
              type: sectionKey,
              value: point,
            };
            valData.push(charData);
          }
        }
      }
      valData.push({ type: 'global_max', value: globalMax });

      // Then we convert to lengths and types
      // We assign lengths based on the difference between each point, and assign blanks if this comes before or after an outlier
      let lenData = [];
      let isBeforeMid = true;
      for (let i = 0; i < valData.length; i++) {
        let diff;
        // we compare inwardly, and midpoint is len 0
        if (isBeforeMid) {
          diff = Math.abs(valData[i + 1].value - valData[i].value);
        } else {
          diff = Math.abs(valData[i].value - valData[i - 1].value);
        }

        if (
          valData[i].type == 'global_min' ||
          valData[i].type == 'global_max'
        ) {
          lenData.push({ type: 'blank', length: diff });
        } else if (valData[i].type == 'lower_outlier') {
          // add diff as space, as well as a 0 len outlier point
          // add blank last, as the earlier point is covered by global_min
          lenData.push({ type: valData[i].type, length: 0 });
          lenData.push({ type: 'blank', length: diff });
        } else if (valData[i].type == 'upper_outlier') {
          // add diff as space, as well as a 0 len outlier point, but reverse order from lower_outlier obvs
          lenData.push({ type: 'blank', length: diff });
          lenData.push({ type: valData[i].type, length: 0 });
        } else if (valData[i].type == 'q2') {
          // change calc method after midpoint, as we want spacing to go outward from center (and so center has no length)
          isBeforeMid = false;
          lenData.push({ type: valData[i].type, length: 0 });
        } else {
          // normal points
          lenData.push({ type: valData[i].type, length: diff });
        }
      }

      // We create a set of braille characters based on the lengths

      // Method:
      // We normalize the lengths of each characters needed length
      // by the total number of characters we have availble
      // (including offset from characters requiring 1 character).
      // Then apply the appropriate number of characters to each

      // A few exceptions:
      // exception: each must have min 1 character (not blanks or length 0)
      // exception: for 25/75 and min/max, if they aren't exactly equal, assign different num characters
      // exception: center is always 456 123

      // Step 1, sorta init.
      // We prepopulate each non null section with a single character, and log for character offset
      let locMin = -1;
      let locQ1 = -1;
      let locQ3 = -1;
      let locMax = -1;
      let numAllocatedChars = 0; // counter for number of characters we've already assigned
      for (let i = 0; i < lenData.length; i++) {
        if (
          lenData[i].type != 'blank' &&
          (lenData[i].length > 0 ||
            lenData[i].type == 'lower_outlier' ||
            lenData[i].type == 'upper_outlier')
        ) {
          lenData[i].numChars = 1;
          numAllocatedChars++;
        } else {
          lenData[i].numChars = 0;
        }

        // store 25/75 min/max locations so we can check them later more easily
        if (lenData[i].type == 'min' && lenData[i].length > 0) locMin = i;
        if (lenData[i].type == 'max' && lenData[i].length > 0) locMax = i;
        if (lenData[i].type == 'q1') locQ1 = i;
        if (lenData[i].type == 'q3') locQ3 = i;

        // 50 gets 2 characters by default
        if (lenData[i].type == 'q2') {
          lenData[i].numChars = 2;
          numAllocatedChars++; // we just ++ here as we already ++'d above
        }
      }

      // make sure rules are set for pairs (q1 / q3, min / max)
      // if they're equal length, we don't need to do anything as they already each have 1 character
      // if they're not equal length, we need to add 1 character to the longer one
      if (locMin > -1 && locMax > -1) {
        // we do it this way as we don't always have both min and max

        if (lenData[locMin].length != lenData[locMax].length) {
          if (lenData[locMin].length > lenData[locMax].length) {
            lenData[locMin].numChars++;
            numAllocatedChars++;
          } else {
            lenData[locMax].numChars++;
            numAllocatedChars++;
          }
        }
      }
      // same for q1/q3
      if (lenData[locQ1].length != lenData[locQ3].length) {
        if (lenData[locQ1].length > lenData[locQ3].length) {
          lenData[locQ1].numChars++;
          numAllocatedChars++;
        } else {
          lenData[locQ3].numChars++;
          numAllocatedChars++;
        }
      }

      // Step 2: normalize and allocate remaining characters and add to our main braille array
      let charsAvailable = constants.brailleDisplayLength - numAllocatedChars;
      let allocateCharacters = this.AllocateCharacters(lenData, charsAvailable);
      // apply allocation
      let brailleData = lenData;
      for (let i = 0; i < allocateCharacters.length; i++) {
        if (allocateCharacters[i]) {
          brailleData[i].numChars += allocateCharacters[i];
        }
      }

      constants.brailleData = brailleData;
      if (constants.debugLevel > 5) {
        console.log('plotData[i]', plot.plotData[plotPos]);
        console.log('valData', valData);
        console.log('lenData', lenData);
        console.log('brailleData', brailleData);
      }

      // convert to braille characters
      for (let i = 0; i < brailleData.length; i++) {
        for (let j = 0; j < brailleData[i].numChars; j++) {
          let brailleChar = '⠀'; // blank
          if (brailleData[i].type == 'min' || brailleData[i].type == 'max') {
            brailleChar = '⠒';
          } else if (
            brailleData[i].type == 'q1' ||
            brailleData[i].type == 'q3'
          ) {
            brailleChar = '⠿';
          } else if (brailleData[i].type == 'q2') {
            if (j == 0) {
              brailleChar = '⠸';
            } else {
              brailleChar = '⠇';
            }
          } else if (
            brailleData[i].type == 'lower_outlier' ||
            brailleData[i].type == 'upper_outlier'
          ) {
            brailleChar = '⠂';
          }
          brailleArray.push(brailleChar);
        }
      }
    } else if (constants.chartType == 'line') {
      // TODO
      // ⠑
      let range = (constants.maxY - constants.minY) / 4;
      let low = constants.minY + range;
      let medium = low + range;
      let medium_high = medium + range;
      let high = medium_high + range;

      for (let i = 0; i < plot.pointValuesY.length; i++) {
        if (
          plot.pointValuesY[i] <= low &&
          i - 1 >= 0 &&
          plot.pointValuesY[i - 1] > low
        ) {
          // move from higher ranges to low
          if (plot.pointValuesY[i - 1] <= medium) {
            // move away from medium range
            brailleArray.push('⢄');
          } else if (plot.pointValuesY[i - 1] <= medium_high) {
            // move away from medium high range
            brailleArray.push('⢆');
          } else if (plot.pointValuesY[i - 1] > medium_high) {
            // move away from high range
            brailleArray.push('⢇');
          }
        } else if (plot.pointValuesY[i] <= low) {
          // in the low range
          brailleArray.push('⣀');
        } else if (i - 1 >= 0 && plot.pointValuesY[i - 1] <= low) {
          // move from low to higher ranges
          if (plot.pointValuesY[i] <= medium) {
            // move to medium range
            brailleArray.push('⡠');
          } else if (plot.pointValuesY[i] <= medium_high) {
            // move to medium high range
            brailleArray.push('⡰');
          } else if (plot.pointValuesY[i] > medium_high) {
            // move to high range
            brailleArray.push('⡸');
          }
        } else if (
          plot.pointValuesY[i] <= medium &&
          i - 1 >= 0 &&
          plot.pointValuesY[i - 1] > medium
        ) {
          if (plot.pointValuesY[i - 1] <= medium_high) {
            // move away from medium high range to medium
            brailleArray.push('⠢');
          } else if (plot.pointValuesY[i - 1] > medium_high) {
            // move away from high range
            brailleArray.push('⠣');
          }
        } else if (plot.pointValuesY[i] <= medium) {
          brailleArray.push('⠤');
        } else if (i - 1 >= 0 && plot.pointValuesY[i - 1] <= medium) {
          // move from medium to higher ranges
          if (plot.pointValuesY[i] <= medium_high) {
            // move to medium high range
            brailleArray.push('⠔');
          } else if (plot.pointValuesY[i] > medium_high) {
            // move to high range
            brailleArray.push('⠜');
          }
        } else if (
          plot.pointValuesY[i] <= medium_high &&
          i - 1 >= 0 &&
          plot.pointValuesY[i - 1] > medium_high
        ) {
          // move away from high range to medium high
          brailleArray.push('⠑');
        } else if (plot.pointValuesY[i] <= medium_high) {
          brailleArray.push('⠒');
        } else if (i - 1 >= 0 && plot.pointValuesY[i - 1] <= medium_high) {
          // move from medium high to high range
          brailleArray.push('⠊');
        } else if (plot.pointValuesY[i] <= high) {
          brailleArray.push('⠉');
        }
      }
    }

    constants.brailleInput.value = brailleArray.join('');
    if (constants.debugLevel > 5) {
      console.log('braille:', constants.brailleInput.value);
    }

    this.UpdateBraillePos();
  }

  /**
   * Calculates the impact of character length on the given character data.
   * Used by boxplots.
   * @param {Object} charData - The character data to calculate the impact for.
   * @param {number} charData.length - The total length of all characters.
   * @param {number} charData.numChars - The total number of characters.
   * @returns {number} The impact of character length on the given character data.
   */
  CharLenImpact(charData) {
    return charData.length / charData.numChars;
  }

  /**
   * This function allocates a total number of characters among an array of lengths,
   * proportionally to each length.
   *
   * @param {Array} arr - The array of objects containing lengths, type, and current numChars. Each length should be a positive number.
   * @param {number} charsToAllocate - The total number of characters to be allocated.
   *
   * The function first calculates the sum of all lengths in the array. Then, it
   * iterates over the array and calculates an initial allocation for each length,
   * rounded to the nearest integer, based on its proportion of the total length.
   *
   * If the sum of these initial allocations is not equal to the total number of
   * characters due to rounding errors, the function makes adjustments to the allocations.
   *
   * The adjustments are made in a loop that continues until the difference between
   * the total number of characters and the sum of the allocations is zero, or until
   * the loop has run a maximum number of iterations equal to the length of the array.
   *
   * In each iteration of the loop, the function calculates a rounding adjustment for
   * each length, again based on its proportion of the total length, and adds this
   * adjustment to the length's allocation.
   *
   * If there's still a difference after the maximum number of iterations, the function
   * falls back to a simpler method of distributing the difference: it sorts the lengths
   * by their allocations and adds or subtracts 1 from each length in this order until
   * the difference is zero.
   *
   * The function returns an array of the final allocations.
   *
   * @returns {Array} The array of allocations.
   */
  AllocateCharacters(arr, charsToAllocate) {
    // init
    let allocation = [];
    let sumLen = 0;
    for (let i = 0; i < arr.length; i++) {
      sumLen += arr[i].length;
    }
    let notAllowed = ['lower_outlier', 'upper_outlier', '50']; // these types only have the 1 char they were assigned above

    // main allocation
    for (let i = 0; i < arr.length; i++) {
      if (!notAllowed.includes(arr[i].type)) {
        allocation[i] = Math.round((arr[i].length / sumLen) * charsToAllocate);
      }
    }

    // main allocation is not perfect, so we need to adjust
    let allocatedSum = allocation.reduce((a, b) => a + b, 0);
    let difference = charsToAllocate - allocatedSum;

    // If there's a rounding error, add/subtract characters proportionally
    let maxIterations = arr.length; // inf loop handler :D
    while (difference !== 0 && maxIterations > 0) {
      // (same method as above)
      for (let i = 0; i < arr.length; i++) {
        if (!notAllowed.includes(arr[i].type)) {
          allocation[i] += Math.round((arr[i].length / sumLen) * difference);
        }
      }
      allocatedSum = allocation.reduce((a, b) => a + b, 0);
      difference = charsToAllocate - allocatedSum;

      maxIterations--;
    }

    // if there's still a rounding error after max iterations, fuck it, just distribute it evenly
    if (difference !== 0) {
      // create an array of indices sorted low to high based on current allocations
      let indices = [];
      for (let i = 0; i < arr.length; i++) {
        indices.push(i);
      }
      indices.sort((a, b) => allocation[a] - allocation[b]);

      // if we need to add or remove characters, do so from the beginning
      let plusminus = -1; // add or remove?
      if (difference > 0) {
        plusminus = 1;
      }
      let i = 0;
      let maxIterations = indices.length * 3; // run it for a while just in case
      while (difference > 0 && maxIterations > 0) {
        allocation[indices[i]] += plusminus;
        difference += -plusminus;

        i += 1;
        // loop back to start if we end
        if (i >= indices.length) {
          i = 0;
        }

        maxIterations += -1;
      }
    }

    return allocation;
  }
}

/**
 * Represents a bar chart.
 * @class
 */
class BarChart {
  /**
   * Creates a new instance of Barplot.
   * @constructor
   */
  constructor() {
    // initialize variables xlevel, data, and elements
    let xlevel = null;
    if ('axes' in singleMaidr) {
      if (singleMaidr.axes.x) {
        if (singleMaidr.axes.x.level) {
          xlevel = singleMaidr.axes.x.level;
        }
      }
      // todo: handle y for vertical bar charts
    }
    let data = null;
    if ('data' in singleMaidr) {
      data = singleMaidr.data;
    }
    let elements = null;
    if ('selector' in singleMaidr) {
      elements = document.querySelectorAll(singleMaidr.selector);
    } else if ('elements' in singleMaidr) {
      elements = singleMaidr.elements;
    }

    if (xlevel && data && elements) {
      if (elements.length != data.length) {
        // I didn't throw an error but give a warning
        constants.hasRect = 0;
        logError.LogDifferentLengths('elements', 'data');
      } else if (xlevel.length != elements.length) {
        constants.hasRect = 0;
        logError.LogDifferentLengths('x level', 'elements');
      } else if (data.length != xlevel.length) {
        constants.hasRect = 0;
        logError.LogDifferentLengths('x level', 'data');
      } else {
        this.bars = elements;
        constants.hasRect = 1;
      }
    } else if (data && elements) {
      if (data.length != elements.length) {
        constants.hasRect = 0;
        logError.LogDifferentLengths('data', 'elements');
      } else {
        this.bars = elements;
        constants.hasRect = 1;
      }
    } else if (xlevel && data) {
      if (xlevel.length != data.length) {
        constants.hasRect = 0;
        logError.LogDifferentLengths('x level', 'data');
      }
      logError.LogAbsentElement('elements');
    } else if (data) {
      logError.LogAbsentElement('x level');
      logError.LogAbsentElement('elements');
    }

    // column labels, both legend and tick
    this.columnLabels = [];
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

      // tick labels
      if (singleMaidr.axes.x) {
        if (singleMaidr.axes.x.level) {
          this.columnLabels = singleMaidr.axes.x.level;
        }
      }
      if (singleMaidr.axes.y) {
        if (singleMaidr.axes.y.level) {
          this.columnLabels = singleMaidr.axes.y.level;
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

    if (Array.isArray(singleMaidr)) {
      this.plotData = singleMaidr;
    } else if ('data' in singleMaidr) {
      this.plotData = singleMaidr.data;
    }

    // set the max and min values for the plot
    this.SetMaxMin();

    this.autoplay = null;
  }

  /**
   * Sets the maximum and minimum values for the plot data and calculates other constants.
   */
  SetMaxMin() {
    for (let i = 0; i < this.plotData.length; i++) {
      if (i == 0) {
        constants.maxY = this.plotData[i];
        constants.minY = this.plotData[i];
      } else {
        if (this.plotData[i] > constants.maxY) {
          constants.maxY = this.plotData[i];
        }
        if (this.plotData[i] < constants.minY) {
          constants.minY = this.plotData[i];
        }
      }
    }
    constants.maxX = this.columnLabels.length;
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
   * Plays a tone using the audio player.
   */
  PlayTones() {
    audio.playTone();
  }

  /**
   * Returns the legend object for the barplot based on manual data.
   * @returns {Object} The legend object with x and y coordinates.
   */
  GetLegendFromManualData() {
    let legend = {};

    legend.x = barplotLegend.x;
    legend.y = barplotLegend.y;

    return legend;
  }

  /**
   * Returns an array of heights for each bar in the plot.
   * @returns {Array} An array of heights for each bar in the plot.
   */
  GetData() {
    // set height for each bar

    let plotData = [];

    if (this.bars) {
      for (let i = 0; i < this.bars.length; i++) {
        plotData.push(this.bars[i].getAttribute('height'));
      }
    }

    return plotData;
  }

  /**
   * Returns an array of column names from the chart.
   * @returns {Array<string>} An array of column names.
   */
  GetColumns() {
    // get column names
    // the pattern seems to be a <tspan> with dy="10", but check this for future output (todo)

    let columnLabels = [];
    let els = constants.chart.querySelectorAll('tspan[dy="10"]'); // todo, generalize this selector
    for (var i = 0; i < els.length; i++) {
      columnLabels.push(els[i].innerHTML);
    }

    return columnLabels;
  }

  /**
   * Returns an object containing the x and y coordinates of the legend.
   * @returns {{x: string, y: string}} An object with x and y properties representing the coordinates of the legend.
   */
  GetLegend() {
    let legend = {};
    let els = constants.chart.querySelectorAll('tspan[dy="12"]'); // todo, generalize this selector
    legend.x = els[1].innerHTML;
    legend.y = els[0].innerHTML;

    return legend;
  }

  /**
   * Parses the innerHTML of elements.
   * @param {Array} els - The array of elements to parse.
   * @returns {Array} - The parsed innerHTML of the elements.
   */
  ParseInnerHTML(els) {
    // parse innerHTML of elements
    let parsed = [];
    for (var i = 0; i < els.length; i++) {
      parsed.push(els[i].innerHTML);
    }
    return parsed;
  }

  /**
   * Selects the active element and changes its color.
   */
  Select() {
    this.UnSelectPrevious();
    if (this.bars) {
      this.activeElement = this.bars[position.x];
      if (this.activeElement) {
        // Case where fill is a direct attribute
        if (this.activeElement.hasAttribute('fill')) {
          this.activeElementColor = this.activeElement.getAttribute('fill');
          // Get new color to highlight and replace fill value
          this.activeElement.setAttribute(
            'fill',
            constants.GetBetterColor(this.activeElementColor)
          );
          // Case where fill is within the style attribute
        } else if (
          this.activeElement.hasAttribute('style') &&
          this.activeElement.getAttribute('style').indexOf('fill') !== -1
        ) {
          let styleString = this.activeElement.getAttribute('style');
          // Extract all style attributes and values
          let styleArray = constants.GetStyleArrayFromString(styleString);
          this.activeElementColor = styleArray[styleArray.indexOf('fill') + 1];
          // Get new color to highlight and replace fill value in style array
          styleArray[styleArray.indexOf('fill') + 1] = constants.GetBetterColor(
            this.activeElementColor
          );
          // Recreate style string and set style attribute
          styleString = constants.GetStyleStringFromArray(styleArray);
          this.activeElement.setAttribute('style', styleString);
        }
      }
    }
  }

  /**
   * Unselects the previously selected element by setting its fill attribute to the original color.
   */
  UnSelectPrevious() {
    if (this.activeElement) {
      // set fill attribute to the original color
      if (this.activeElement.hasAttribute('fill')) {
        this.activeElement.setAttribute('fill', this.activeElementColor);
        this.activeElement = null;
      } else if (
        this.activeElement.hasAttribute('style') &&
        this.activeElement.getAttribute('style').indexOf('fill') !== -1
      ) {
        let styleString = this.activeElement.getAttribute('style');
        let styleArray = constants.GetStyleArrayFromString(styleString);
        styleArray[styleArray.indexOf('fill') + 1] = this.activeElementColor;
        // Recreate style string and set style attribute
        styleString = constants.GetStyleStringFromArray(styleArray);
        this.activeElement.setAttribute('style', styleString);
        this.activeElement = null;
      }
    }
  }
}

/**
 * A class representing a box plot.
 * @class
 */
class BoxPlot {
  /**
   * Creates a new instance of BoxPlot.
   * @constructor
   */
  constructor() {
    // the default sections for all boxplots
    this.sections = [
      'lower_outlier',
      'min',
      'q1',
      'q2',
      'q3',
      'max',
      'upper_outlier',
    ];

    // set orientation
    constants.plotOrientation = 'horz';
    if ('axes' in singleMaidr) {
      if ('x' in singleMaidr.axes) {
        if ('level' in singleMaidr.axes.x) {
          constants.plotOrientation = 'vert';
        }
      }
    }

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
    this.subtitle = '';
    if ('labels' in singleMaidr) {
      if ('subtitle' in singleMaidr.labels) {
        this.subtitle = singleMaidr.labels.subtitle;
      }
    }
    // caption
    this.caption = '';
    if ('labels' in singleMaidr) {
      if ('caption' in singleMaidr.labels) {
        this.caption = singleMaidr.labels.caption;
      }
    }

    // axes labels
    if ('labels' in singleMaidr) {
      if (!this.x_group_label) {
        if ('x' in singleMaidr.labels) {
          this.x_group_label = singleMaidr.labels.x;
        }
      }
      if (!this.y_group_label) {
        if ('y' in singleMaidr.labels) {
          this.y_group_label = singleMaidr.labels.y;
        }
      }
    }
    if ('axes' in singleMaidr) {
      if ('x' in singleMaidr.axes) {
        if ('label' in singleMaidr.axes.x) {
          if (!this.x_group_label) {
            this.x_group_label = singleMaidr.axes.x.label;
          }
        }
        if ('level' in singleMaidr.axes.x) {
          this.x_labels = singleMaidr.axes.x.level;
        } else {
          this.x_labels = [];
        }
      }
      if ('y' in singleMaidr.axes) {
        if ('label' in singleMaidr.axes.y) {
          if (!this.y_group_label) {
            this.y_group_label = singleMaidr.axes.y.label;
          }
        }
        if ('level' in singleMaidr.axes.y) {
          this.y_labels = singleMaidr.axes.y.level;
        } else {
          this.y_labels = [];
        }
      }
    }

    // main data
    this.plotData = singleMaidr.data;

    // bounds data
    if ('selector' in singleMaidr) {
      let elements = document.querySelector(singleMaidr.selector);
      this.plotBounds = this.GetPlotBounds(elements);
      constants.hasRect = true;
    } else if ('elements' in singleMaidr) {
      this.plotBounds = this.GetPlotBounds(singleMaidr.elements);
      constants.hasRect = true;
    } else {
      constants.hasRect = false;
    }

    this.CleanData();
  }

  /**
   * Cleans up data and extra variables like min/max stuff.
   */
  CleanData() {
    let min, max;
    for (let i = 0; i < this.plotData.length; i++) {
      if (this.plotData[i].lower_outlier) {
        let outlierMin = Math.min(...this.plotData[i].lower_outlier);
        let outlierMax = Math.max(...this.plotData[i].lower_outlier);

        if (min == undefined || outlierMin < min) min = outlierMin;
        if (max == undefined || outlierMax > max) max = outlierMax;
      }
      if (this.plotData[i].min) {
        if (min == undefined || this.plotData[i].min < min)
          min = this.plotData[i].min;
        if (max == undefined || this.plotData[i].max > max)
          max = this.plotData[i].max;
      }
      if (this.plotData[i].q1) {
        if (min == undefined || this.plotData[i].q1 < min)
          min = this.plotData[i].q1;
        if (max == undefined || this.plotData[i].q1 > max)
          max = this.plotData[i].q1;
      }
      if (this.plotData[i].q2) {
        if (min == undefined || this.plotData[i].q2 < min)
          min = this.plotData[i].q2;
        if (max == undefined || this.plotData[i].q2 > max)
          max = this.plotData[i].q2;
      }
      if (this.plotData[i].q3) {
        if (min == undefined || this.plotData[i].q3 < min)
          min = this.plotData[i].q3;
        if (max == undefined || this.plotData[i].q3 > max)
          max = this.plotData[i].q3;
      }
      if (this.plotData[i].max) {
        if (min == undefined || this.plotData[i].max < min)
          min = this.plotData[i].max;
        if (max == undefined || this.plotData[i].max > max)
          max = this.plotData[i].max;
      }
      if (this.plotData[i].upper_outlier) {
        let outlierMin = Math.min(...this.plotData[i].upper_outlier);
        let outlierMax = Math.max(...this.plotData[i].upper_outlier);

        if (min == undefined || outlierMin < min) min = outlierMin;
        if (max == undefined || outlierMax > max) max = outlierMax;
      }
    }

    if (constants.plotOrientation == 'vert') {
      constants.minY = min;
      constants.maxY = max;
      constants.minX = 0;
      constants.maxX = this.plotData.length - 1;
    } else {
      constants.minX = min;
      constants.maxX = max;
      constants.minY = 0;
      constants.maxY = this.plotData.length - 1;
    }
    constants.autoPlayRate = Math.min(
      Math.ceil(constants.AUTOPLAY_DURATION / this.plotData.length),
      constants.MAX_SPEED
    );
    constants.DEFAULT_SPEED = constants.autoPlayRate;
    if (constants.autoPlayRate < constants.MIN_SPEED) {
      constants.MIN_SPEED = constants.autoPlayRate;
    }
  }

  /**
   * Calculates the bounding boxes for all elements in the parent element, including outliers, whiskers, and range.
   * @returns {Array} An array of bounding boxes for all elements.
   */
  GetPlotBounds(elements) {
    // we fetch the elements in our parent,
    // and similar to old GetData we run through and get bounding boxes (or blanks) for everything,
    // and store in an identical structure

    let plotBounds = [];
    let allWeNeed = this.GetAllSegmentTypes();
    let re = /(?:\d+(?:\.\d*)?|\.\d+)/g;

    // get initial set of elements, a parent element for all outliers, whiskers, and range
    let initialElemSet = [];
    let plots = elements.children;
    for (let i = 0; i < plots.length; i++) {
      // each plot
      let plotSet = {};
      let sections = plots[i].children;
      for (let j = 0; j < sections.length; j++) {
        let elemType = this.GetBoxplotSegmentType(
          sections[j].getAttribute('id')
        );
        plotSet[elemType] = sections[j];
      }
      initialElemSet.push(plotSet);
    }

    // we build our structure based on the full set we need, and have blanks as placeholders
    // many of these overlap or are missing, so now we go through and make the actual array structure we need
    // like, all outliers are in 1 set, so we have to split those out and then get the bounding boxes
    for (let i = 0; i < initialElemSet.length; i++) {
      let plotBound = [];

      // we always have a range, and need those bounds to set others, so we'll do this first
      let rangeBounds = initialElemSet[i].range.getBoundingClientRect();

      // we get the midpoint from actual point values in the chart GRID.segments
      let midPoints = initialElemSet[i].range
        .querySelector('polyline[id^="GRID"]')
        .getAttribute('points')
        .match(re);
      let rangePoints = initialElemSet[i].range
        .querySelector('polygon[id^="geom_polygon"]')
        .getAttribute('points')
        .match(re);
      // get midpoint as percentage from bottom to mid to apply to bounding boxes
      // vert: top(rangePoints[1]) | mid(midPoints[1]) | bottom(rangePoints[3])
      // horz: top(rangePoints[0]) | mid(midPoints[0]) | bottom(rangePoints[2])
      let midPercent = 0;
      if (constants.plotOrientation == 'vert') {
        midPercent =
          (midPoints[1] - rangePoints[3]) / (rangePoints[1] - rangePoints[3]);
      } else {
        midPercent =
          (midPoints[0] - rangePoints[2]) / (rangePoints[0] - rangePoints[2]);
      }
      midPercent = Number.isNaN(midPercent) ? 0 : midPercent;
      let midSize = 0;
      if (constants.plotOrientation == 'vert') {
        midSize = rangeBounds.height * midPercent;
      } else {
        midSize = rangeBounds.width * midPercent;
      }

      // set bounding box values
      // we critically need x / left, y / top, width, height. We can ignore the rest or let it be wrong

      // 25%
      plotBound[2] = this.convertBoundingClientRectToObj(rangeBounds);
      plotBound[2].label = allWeNeed[2];
      plotBound[2].type = 'range';
      if (constants.plotOrientation == 'vert') {
        plotBound[2].height = midSize;
        plotBound[2].top = plotBound[2].bottom - midSize;
        plotBound[2].y = plotBound[2].top;
      } else {
        plotBound[2].width = midSize;
      }
      // 50%
      plotBound[3] = this.convertBoundingClientRectToObj(rangeBounds);
      plotBound[3].label = allWeNeed[3];
      plotBound[3].type = 'range';
      if (constants.plotOrientation == 'vert') {
        plotBound[3].height = 0;
        plotBound[3].top = rangeBounds.bottom - midSize;
        plotBound[3].y = plotBound[3].top;
        plotBound[3].bottom = plotBound[3].top;
      } else {
        plotBound[3].width = 0;
        plotBound[3].left = rangeBounds.left + midSize;
      }
      // 75%
      plotBound[4] = this.convertBoundingClientRectToObj(rangeBounds);
      plotBound[4].label = allWeNeed[4];
      plotBound[4].type = 'range';
      if (constants.plotOrientation == 'vert') {
        plotBound[4].height = rangeBounds.height - midSize;
        plotBound[4].bottom = plotBound[3].top;
      } else {
        plotBound[4].width = rangeBounds.width - midSize;
        plotBound[4].left = plotBound[3].left;
      }

      // now the tricky ones, outliers and whiskers, if we have them
      if (Object.hasOwn(initialElemSet[i], 'whisker')) {
        // ok great we have a whisker. It could be just above or below or span across the range (in which case we need to split it up). Let's check
        let whiskerBounds = initialElemSet[i].whisker.getBoundingClientRect();
        let hasBelow = false;
        let hasAbove = false;
        if (constants.plotOrientation == 'vert') {
          if (whiskerBounds.bottom > rangeBounds.bottom) hasBelow = true;
          if (whiskerBounds.top < rangeBounds.top) hasAbove = true;
        } else {
          if (whiskerBounds.left < rangeBounds.left) hasBelow = true;
          if (whiskerBounds.right > rangeBounds.right) hasAbove = true;
        }

        // lower whisker
        if (hasBelow) {
          plotBound[1] = this.convertBoundingClientRectToObj(whiskerBounds);
          plotBound[1].label = allWeNeed[1];
          plotBound[1].type = 'whisker';
          if (constants.plotOrientation == 'vert') {
            plotBound[1].top = plotBound[2].bottom;
            plotBound[1].y = plotBound[1].top;
            plotBound[1].height = plotBound[1].bottom - plotBound[1].top;
          } else {
            plotBound[1].width = plotBound[2].left - plotBound[1].left;
          }
        } else {
          plotBound[1] = {};
          plotBound[1].label = allWeNeed[1];
          plotBound[1].type = 'blank';
        }
        // upper whisker
        if (hasAbove) {
          plotBound[5] = this.convertBoundingClientRectToObj(whiskerBounds);
          plotBound[5].label = allWeNeed[5];
          plotBound[5].type = 'whisker';
          if (constants.plotOrientation == 'vert') {
            plotBound[5].bottom = plotBound[4].top;
            plotBound[5].height = plotBound[5].bottom - plotBound[5].top;
          } else {
            plotBound[5].left = plotBound[4].right;
            plotBound[5].x = plotBound[4].right;
            plotBound[5].width = plotBound[5].right - plotBound[5].left;
          }
        } else {
          plotBound[5] = {};
          plotBound[5].label = allWeNeed[5];
          plotBound[5].type = 'blank';
        }
      }
      if (Object.hasOwn(initialElemSet[i], 'outlier')) {
        // we have one or more outliers.
        // Where do they appear? above or below the range? both?
        // we want to split them up and put 1 bounding box around each above and below

        let outlierElems = initialElemSet[i].outlier.children;
        let outlierUpperBounds = null;
        let outlierLowerBounds = null;
        for (let j = 0; j < outlierElems.length; j++) {
          // add this outlier's bounds, or expand if more than one
          let newOutlierBounds = outlierElems[j].getBoundingClientRect();

          if (constants.plotOrientation == 'vert') {
            if (newOutlierBounds.y < rangeBounds.y) {
              // higher, remember y=0 is at the bottom of the page
              if (!outlierUpperBounds) {
                outlierUpperBounds =
                  this.convertBoundingClientRectToObj(newOutlierBounds);
              } else {
                if (newOutlierBounds.y < outlierUpperBounds.y)
                  outlierUpperBounds.y = newOutlierBounds.y;
                if (newOutlierBounds.top < outlierUpperBounds.top)
                  outlierUpperBounds.top = newOutlierBounds.top;
                if (newOutlierBounds.bottom > outlierUpperBounds.bottom)
                  outlierUpperBounds.bottom = newOutlierBounds.bottom;
              }
            } else {
              if (!outlierLowerBounds) {
                outlierLowerBounds =
                  this.convertBoundingClientRectToObj(newOutlierBounds);
              } else {
                if (newOutlierBounds.y < outlierLowerBounds.y)
                  outlierLowerBounds.y = newOutlierBounds.y;
                if (newOutlierBounds.top < outlierLowerBounds.top)
                  outlierLowerBounds.top = newOutlierBounds.top;
                if (newOutlierBounds.bottom > outlierLowerBounds.bottom)
                  outlierLowerBounds.bottom = newOutlierBounds.bottom;
              }
            }
          } else {
            if (newOutlierBounds.x > rangeBounds.x) {
              // higher, remember x=0 is at the left of the page
              if (!outlierUpperBounds) {
                outlierUpperBounds =
                  this.convertBoundingClientRectToObj(newOutlierBounds);
              } else {
                if (newOutlierBounds.x < outlierUpperBounds.x)
                  outlierUpperBounds.x = newOutlierBounds.x;
                if (newOutlierBounds.left < outlierUpperBounds.left)
                  outlierUpperBounds.left = newOutlierBounds.left;
                if (newOutlierBounds.right > outlierUpperBounds.right)
                  outlierUpperBounds.right = newOutlierBounds.right;
              }
            } else {
              if (!outlierLowerBounds) {
                outlierLowerBounds =
                  this.convertBoundingClientRectToObj(newOutlierBounds);
              } else {
                if (newOutlierBounds.x < outlierLowerBounds.x)
                  outlierLowerBounds.x = newOutlierBounds.x;
                if (newOutlierBounds.left < outlierLowerBounds.left)
                  outlierLowerBounds.left = newOutlierBounds.left;
                if (newOutlierBounds.right > outlierLowerBounds.right)
                  outlierLowerBounds.right = newOutlierBounds.right;
              }
            }
          }
        }

        // now we add plotBound outlier stuff
        if (outlierLowerBounds) {
          outlierLowerBounds.height =
            outlierLowerBounds.bottom - outlierLowerBounds.top;
          outlierLowerBounds.width =
            outlierLowerBounds.right - outlierLowerBounds.left;

          plotBound[0] =
            this.convertBoundingClientRectToObj(outlierLowerBounds);
          plotBound[0].label = allWeNeed[0];
          plotBound[0].type = 'outlier';
        } else {
          plotBound[0] = {};
          plotBound[0].label = allWeNeed[0];
          plotBound[0].type = 'blank';
        }
        if (outlierUpperBounds) {
          outlierUpperBounds.height =
            outlierUpperBounds.bottom - outlierUpperBounds.top;
          outlierUpperBounds.width =
            outlierUpperBounds.right - outlierUpperBounds.left;

          plotBound[6] =
            this.convertBoundingClientRectToObj(outlierUpperBounds);
          plotBound[6].label = allWeNeed[6];
          plotBound[6].type = 'outlier';
        } else {
          plotBound[6] = {};
          plotBound[6].label = allWeNeed[6];
          plotBound[6].type = 'blank';
        }
      } else {
        // add all blanks
        plotBound[0] = {};
        plotBound[0].label = allWeNeed[0];
        plotBound[0].type = 'blank';
        plotBound[6] = {};
        plotBound[6].label = allWeNeed[6];
        plotBound[6].type = 'blank';
      }

      plotBounds.push(plotBound);
    }

    if (constants.debugLevel > 5) {
      console.log('plotBounds', plotBounds);
    }

    return plotBounds;
  }

  /**
   * Returns an array of all segment types needed for a box plot.
   * @returns {string[]} Array of segment types.
   */
  GetAllSegmentTypes() {
    let allWeNeed = [];
    for (let i = 0; i < this.sections.length; i++) {
      allWeNeed.push(resources.GetString(this.sections[i]));
    }

    return allWeNeed;
  }

  /**
   * Returns the type of boxplot segment based on the section id.
   * @param {string} sectionId - The section id to determine the segment type.
   * @returns {string} - The type of boxplot segment ('range', 'whisker', or 'outlier').
   */
  GetBoxplotSegmentType(sectionId) {
    // Helper function for main GetData:
    // Fetch type, which comes from section id:
    // geom_polygon = range
    // GRID = whisker
    // points = outlier

    let segmentType = 'outlier'; // default? todo: should probably default null, and then throw error instead of return if not set after ifs
    if (sectionId.includes('geom_crossbar')) {
      segmentType = 'range';
    } else if (sectionId.includes('GRID')) {
      segmentType = 'whisker';
    } else if (sectionId.includes('points')) {
      segmentType = 'outlier';
    }

    return segmentType;
  }

  /**
   * Helper function for main GetData: Fetch x and y point data from chart
   * @param {Object} segment - The segment object to get points from
   * @param {string} segmentType - The type of segment ('range', 'outlier', or 'whisker')
   * @returns {Array} - An array of x and y point data from the chart
   */
  GetBoxplotSegmentPoints(segment, segmentType) {
    // Helper function for main GetData:
    // Fetch x and y point data from chart

    let re = /(?:\d+(?:\.\d*)?|\.\d+)/g;
    let pointString = '';
    let points = [];
    if (segmentType == 'range') {
      // ranges go a level deeper
      let matches = segment.children[0].getAttribute('points').match(re);
      points.push(matches[0], matches[1]);
      // the middle bar has 2 points but we just need one, check if they're the same
      if (matches[0] != matches[2]) {
        points.push(matches[2], matches[3]);
      }
    } else if (segmentType == 'outlier') {
      // outliers use x attr directly, but have multiple children
      points.push(segment.getAttribute('x'), segment.getAttribute('y'));
    } else {
      // whisker. Get first and third number from points attr
      // but sometimes it's null, giving the same for both, and don't add if that's true
      let matches = segment.getAttribute('points').match(re);
      if (constants.plotOrientation == 'vert') {
        if (matches[1] != matches[3]) {
          points.push(matches[0], matches[1], matches[2], matches[3]);
        }
      } else {
        if (matches[0] != matches[2]) {
          points.push(matches[0], matches[1], matches[2], matches[3]);
        }
      }
    }

    return points;
  }
  /**
   * Returns an array of all the segment types needed for a box plot.
   * @returns {string[]} Array of segment types.
   */
  GetAllSegmentTypes() {
    let allWeNeed = [
      resources.GetString('lower_outlier'),
      resources.GetString('min'),
      resources.GetString('25'),
      resources.GetString('50'),
      resources.GetString('75'),
      resources.GetString('max'),
      resources.GetString('upper_outlier'),
    ];

    return allWeNeed;
  }

  /**
   * Converts a DOMRect object to a plain object with properties for top, right, bottom, left, width, height, x, and y.
   * @param {DOMRect} rect - The DOMRect object to convert.
   * @returns {Object} An object with properties for top, right, bottom, left, width, height, x, and y.
   */
  convertBoundingClientRectToObj(rect) {
    return {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      x: rect.x,
      y: rect.y,
    };
  }

  /**
   * Plays tones based on the plot data and position.
   */
  PlayTones() {
    // init
    let plotPos = null;
    let sectionKey = null;
    if (constants.outlierInterval) clearInterval(constants.outlierInterval);
    if (constants.plotOrientation == 'vert') {
      plotPos = position.x;
      sectionKey = this.GetSectionKey(position.y);
    } else {
      plotPos = position.y;
      sectionKey = this.GetSectionKey(position.x);
    }

    // chose tone to play
    if (plot.plotData[plotPos][sectionKey] == null) {
      audio.PlayNull();
    } else if (sectionKey != 'lower_outlier' && sectionKey != 'upper_outlier') {
      // normal tone
      audio.playTone();
    } else if (plot.plotData[plotPos][sectionKey].length == 0) {
      audio.PlayNull();
    } else {
      // outlier(s): we play a run of tones
      position.z = 0;
      constants.outlierInterval = setInterval(function () {
        // play this tone
        audio.playTone();

        // and then set up for the next one
        position.z += 1;

        // and kill if we're done
        if (plot.plotData[plotPos][sectionKey] == null) {
          clearInterval(constants.outlierInterval);
          position.z = -1;
        } else if (position.z + 1 > plot.plotData[plotPos][sectionKey].length) {
          clearInterval(constants.outlierInterval);
          position.z = -1;
        }
      }, constants.autoPlayOutlierRate);
    }
  }

  /**
   * Returns the section key at the specified position.
   * @param {number} sectionPos - The position of the section.
   * @returns {string} The section key.
   */
  GetSectionKey(sectionPos) {
    return this.sections[sectionPos];
  }
}

// BoxplotRect class
// Initializes and updates the visual outline around sections of the chart
/**
 * Represents a rectangular box in a box plot chart.
 * @class
 */
class BoxplotRect {
  /**
   * The padding between rectangles in pixels.
   * @type {number}
   */
  rectPadding = 15; // px
  /**
   * The stroke width of the rectangle in the box plot.
   * @type {number}
   */
  rectStrokeWidth = 4; // px

  /**
   * Creates a new BoxPlot object.
   * @constructor
   */
  constructor() {
    this.x1 = 0;
    this.width = 0;
    this.y1 = 0;
    this.height = 0;
    this.chartOffsetLeft = constants.chart.getBoundingClientRect().left;
    this.chartOffsetTop = constants.chart.getBoundingClientRect().top;
  }

  /**
   * Updates the bounding box values from the object and gets bounds of visual outline to be drawn.
   */
  UpdateRect() {
    if (document.getElementById('highlight_rect'))
      document.getElementById('highlight_rect').remove(); // destroy to be recreated

    let plotPos = position.x;
    let sectionPos = position.y;
    let sectionKey = plot.GetSectionKey(position.y);
    if (constants.plotOrientation == 'vert') {
    } else {
      plotPos = position.y;
      sectionPos = position.x;
      sectionKey = plot.GetSectionKey(position.x);
    }

    if (
      (constants.plotOrientation == 'vert' && position.y > -1) ||
      (constants.plotOrientation == 'horz' && position.x > -1)
    ) {
      // initial value could be -1, which throws errors, so ignore that

      let bounds = plot.plotBounds[plotPos][sectionPos];

      if (bounds.type != 'blank') {
        //let chartBounds = constants.chart.getBoundingClientRect();

        this.x1 = bounds.left - this.rectPadding - this.chartOffsetLeft;
        this.width = bounds.width + this.rectPadding * 2;
        this.y1 = bounds.top - this.rectPadding - this.chartOffsetTop;
        this.height = bounds.height + this.rectPadding * 2;

        if (constants.debugLevel > 5) {
          console.log(
            'Point',
            sectionKey,
            'bottom:',
            bounds.bottom,
            'top:',
            bounds.top
          );
          console.log(
            'x1:',
            this.x1,
            'y1:',
            this.y1,
            'width:',
            this.width,
            'height:',
            this.height
          );
        }

        this.CreateRectDisplay();
      }
    }
  }

  /**
   * Creates a visual outline using the given bounding points.
   * @function
   * @memberof module:boxplot.js
   * @returns {void}
   */
  CreateRectDisplay() {
    // CreateRectDisplay takes bounding points and creates the visual outline

    const svgns = 'http://www.w3.org/2000/svg';
    let rect = document.createElementNS(svgns, 'rect');
    rect.setAttribute('id', 'highlight_rect');
    rect.setAttribute('x', this.x1);
    rect.setAttribute('y', this.y1); // y coord is inverse from plot data
    rect.setAttribute('width', this.width);
    rect.setAttribute('height', this.height);
    rect.setAttribute('stroke', constants.colorSelected);
    rect.setAttribute('stroke-width', this.rectStrokeWidth);
    rect.setAttribute('fill', 'none');
    constants.chart.appendChild(rect);
  }
}

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
    if ('data' in singleMaidr) {
      this.data = singleMaidr.data;
      this.num_rows = this.data.length;
      this.num_cols = this.data[0].length;
    } else {
      // critical error, no data
      console.error('No data found in singleMaidr object');
    }
    if ('selector' in singleMaidr) {
      this.elements = document.querySelectorAll(singleMaidr.selector);
      constants.hasRect = 1;
    } else if ('elements' in singleMaidr) {
      this.elements = singleMaidr.elements;
      constants.hasRect = 1;
    } else {
      this.elements = null;
      constants.hasRect = 0;
    }

    this.group_labels = this.getGroupLabels();
    this.x_labels = xlevel;
    this.y_labels = ylevel;
    this.title = this.getTitle();
    this.fill = this.getFill();

    if (constants.hasRect) {
      this.SetHeatmapRectData();
    }

    this.updateConstants();

    this.x_group_label = this.group_labels[0].trim();
    this.y_group_label = this.group_labels[1].trim();
  }

  /**
   * Returns an array of heatmap data containing unique x and y coordinates, norms, number of rows, and number of columns.
   * If 'data' exists in singleMaidr, it returns the norms from the data. Otherwise, it calculates the norms from the unique x and y coordinates.
   * @returns {Array} An array of heatmap data containing unique x and y coordinates, norms, number of rows, and number of columns.
   */
  SetHeatmapRectData() {
    // We get a set of x and y coordinates from the heatmap squares,
    // which is different and only sometimes connected to the actual data
    // note, only runs if constants.hasRect is true

    // get the x_coord and y_coord to check if a square exists at the coordinates
    let x_coord_check = [];
    let y_coord_check = [];
    let unique_x_coord = [];
    let unique_y_coord = [];
    for (let i = 0; i < this.elements.length; i++) {
      if (this.elements[i]) {
        // heatmap SVG containing path element instead of rect
        if (this.elements[i] instanceof SVGPathElement) {
          // Assuming the path data is in the format "M x y L x y L x y L x y"
          const path_d = this.elements[i].getAttribute('d');
          const regex = /[ML]\s*(-?\d+(\.\d+)?)\s+(-?\d+(\.\d+)?)/g;
          const match = regex.exec(path_d);

          const coords = [Number(match[1]), Number(match[3])];
          const x = coords[0];
          const y = coords[1];

          x_coord_check.push(parseFloat(x));
          y_coord_check.push(parseFloat(y));
        } else {
          x_coord_check.push(parseFloat(this.elements[i].getAttribute('x')));
          y_coord_check.push(parseFloat(this.elements[i].getAttribute('y')));
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
    // inverse scale if svg has a negative scale in the actual svg
    if (svgScaler[0] == -1) {
      x_coord_check = x_coord_check.reverse();
    }
    if (svgScaler[1] == -1) {
      y_coord_check = y_coord_check.reverse();
    }

    // get unique elements from x_coord and y_coord
    unique_x_coord = [...new Set(x_coord_check)];
    unique_y_coord = [...new Set(y_coord_check)];

    this.x_coord = unique_x_coord;
    this.y_coord = unique_y_coord;
  }

  /**
   * Updates the constants used in the heatmap.
   * minX: 0, always
   * maxX: the x length of the data array
   * minY: the minimum value of the data array
   * maxY: the maximum value of the data array
   * autoPlayRate: the rate at which the heatmap will autoplay, based on the number of columns
   *
   */
  updateConstants() {
    constants.minX = 0;
    constants.maxX = this.data[0].length - 1;
    constants.minY = Math.min(...this.data.map((row) => Math.min(...row)));
    constants.maxY = Math.max(...this.data.map((row) => Math.max(...row)));
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
   * Returns an array of the X and Y scales of the first SVG element found in the elements array.
   * @returns {Array<number>} An array containing the X and Y scales of the SVG element.
   */
  GetSVGScaler() {
    let scaleX = 1;
    let scaleY = 1;
    // start with some square (first), look all the way up the parents to the svg, and record any scales along the way

    // but first, are we even in an svg that can be scaled?
    let isSvg = false;
    let element = this.elements[0]; // a random start, may as well be the first
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
      let element = this.elements[0]; // a random start, may as well be the first
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
    let rgb_string = this.elements[i].getAttribute('fill');
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
    for (let i = 0; i < plot.elements.length; i++) {
      if (
        plot.elements[i].getAttribute('x') == this.x &&
        plot.elements[i].getAttribute('y') == this.y
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
    rect.setAttribute('y', this.y === undefined ? 0 : this.y);
    rect.setAttribute('width', this.width);
    rect.setAttribute('height', this.height);
    rect.setAttribute('stroke', constants.colorSelected);
    rect.setAttribute('stroke-width', this.rectStrokeWidth);
    rect.setAttribute('fill', 'none');
    plot.elements[this.squareIndex].parentNode.appendChild(rect);
    //constants.chart.appendChild(rect);
  }
}

/**
 * A class representing a scatter plot.
 * @class
 */
class ScatterPlot {
  /**
   * Creates a new Scatterplot object.
   * @constructor
   */
  constructor() {
    this.prefix = this.GetPrefix();
    this.SetScatterLayer();
    this.SetLineLayer();
    this.SetAxes();
    this.svgScaler = this.GetSVGScaler();
  }

  /**
   * Sets the x and y group labels and title for the scatterplot based on the data in singleMaidr.
   */
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

  /**
   * Sets the scatter layer for the chart.
   * @function
   * @memberof scatterplot
   * @returns {void}
   */
  SetScatterLayer() {
    // initially set as smooth layer (layer 2), if possible
    let elIndex = this.GetElementIndex('point'); // check if we have it
    if (elIndex != -1) {
      if ('selector' in singleMaidr) {
        this.plotPoints = document.querySelectorAll(
          singleMaidr.selector[elIndex]
        );
      } else if ('elements' in singleMaidr) {
        this.plotPoints = singleMaidr.elements[elIndex];
      }
    } else if (singleMaidr.type == 'point') {
      if ('selector' in singleMaidr) {
        this.plotPoints = document.querySelectorAll(singleMaidr.selector);
      } else if ('elements' in singleMaidr) {
        this.plotPoints = singleMaidr.elements;
      }
    }
    let svgPointCoords = this.GetSvgPointCoords();
    let pointValues = this.GetPointValues();

    this.chartPointsX = svgPointCoords[0]; // x coordinates of points
    this.chartPointsY = svgPointCoords[1]; // y coordinates of points

    this.x = pointValues[0]; // actual values of x
    this.y = pointValues[1]; // actual values of y

    // for sound weight use
    this.points_count = pointValues[2]; // number of each points
    this.max_count = pointValues[3];
  }

  /**
   * Sets the plot line layer for the scatterplot.
   */
  SetLineLayer() {
    // layer = 2, smooth layer (from singleMaidr types)
    let elIndex = this.GetElementIndex('smooth'); // check if we have it
    if (elIndex != -1) {
      if ('selector' in singleMaidr) {
        this.plotLine = document.querySelectorAll(
          singleMaidr.selector[elIndex]
        )[0];
      } else if ('elements' in singleMaidr) {
        this.plotLine = singleMaidr.elements[elIndex][0];
      }
    } else if (singleMaidr.type == 'smooth') {
      if ('selector' in singleMaidr) {
        this.plotLine = document.querySelectorAll(singleMaidr.selector)[0];
      } else if ('elements' in singleMaidr) {
        this.plotLine = singleMaidr.elements;
      }
    }
    let svgLineCoords = this.GetSvgLineCoords();
    let smoothCurvePoints = this.GetSmoothCurvePoints();

    this.chartLineX = svgLineCoords[0]; // x coordinates of curve
    this.chartLineY = svgLineCoords[1]; // y coordinates of curve

    this.curveX = smoothCurvePoints[0]; // actual values of x
    this.curvePoints = smoothCurvePoints[1]; // actual values of y

    // if there is only point layer, then curvePoints will be empty
    if (this.curvePoints && this.curvePoints.length > 0) {
      this.curveMinY = Math.min(...this.curvePoints);
      this.curveMaxY = Math.max(...this.curvePoints);
    } else {
      this.curveMinY = Number.MAX_VALUE;
      this.curveMaxY = Number.MIN_VALUE;
    }
    this.gradient = this.GetGradient();
  }

  /**
   * Returns an array of X and Y coordinates of the plot points.
   * @returns {Array<Array<number>>} An array of X and Y coordinates.
   */
  GetSvgPointCoords() {
    let points = new Map();

    if (this.plotPoints) {
      for (let i = 0; i < this.plotPoints.length; i++) {
        let x;
        let y;

        // extract x, y coordinates based on the SVG element type
        if (this.plotPoints[i] instanceof SVGPathElement) {
          let pathD = this.plotPoints[i].getAttribute('d');
          let regex = /M\s*(-?\d+(\.\d+)?)\s+(-?\d+(\.\d+)?)/g;

          let match = regex.exec(pathD);
          x = parseFloat(match[1]);
          y = parseFloat(match[3]);
        } else {
          x = parseFloat(this.plotPoints[i].getAttribute(this.prefix + 'x')); // .toFixed(1);
          y = parseFloat(this.plotPoints[i].getAttribute(this.prefix + 'y'));
        }

        if (!points.has(x)) {
          points.set(x, new Set([y]));
        } else {
          points.get(x).add(y);
        }
      }
    } else if ([].concat(singleMaidr.type).includes('point')) {
      // pull from data instead
      let elIndex = this.GetElementIndex('point');
      let xyFormat = this.GetDataXYFormat(elIndex);
      let data;
      if (elIndex > -1) {
        data = singleMaidr.data[elIndex];
      } else {
        data = singleMaidr.data;
      }
      let x = [];
      let y = [];
      if (xyFormat == 'array') {
        if ('x' in data) {
          x = data['x'];
        }
        if ('y' in data) {
          y = data['y'];
        }
      } else if (xyFormat == 'object') {
        for (let i = 0; i < data.length; i++) {
          let xValue = data[i]['x'];
          let yValue = data[i]['y'];
          x.push(xValue);
          y.push(yValue);
        }
      }
      for (let i = 0; i < x.length; i++) {
        let xValue = x[i];
        let yValue = y[i];
        if (!points.has(xValue)) {
          points.set(xValue, new Set([yValue]));
        } else {
          points.get(xValue).add(yValue);
        }
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

  /**
   * Returns the index of the specified element in the singleMaidr object.
   * @param {string} elementName - The name of the element to search for.
   * @returns {number} - The index of the element in the singleMaidr object, or -1 if not found.
   */
  GetElementIndex(elementName = 'point') {
    let elIndex = -1;
    if ('type' in singleMaidr && Array.isArray(singleMaidr.type)) {
      elIndex = singleMaidr.type.indexOf(elementName);
    }
    return elIndex;
  }

  /**
   * Determines the format of the data at the given index and returns it as either an object or an array.
   * @param {number} dataIndex - The index of the data to check.
   * @returns {string} - The format of the data as either 'object' or 'array'.
   */
  GetDataXYFormat(dataIndex) {
    // detect if data is in form [{x: 1, y: 2}, {x: 2, y: 3}] (object) or {x: [1, 2], y: [2, 3]]} (array)
    let data;
    if (dataIndex > -1) {
      data = singleMaidr.data[dataIndex];
    } else {
      data = singleMaidr.data;
    }

    let xyFormat;
    if (Array.isArray(data)) {
      xyFormat = 'object';
    } else {
      xyFormat = 'array';
    }

    return xyFormat;
  }

  /**
   * Returns an array of the X and Y scales of the first SVG element containing the plot points.
   * @returns {Array<number>} An array containing the X and Y scales of the first SVG element containing the plot points.
   */
  GetSVGScaler() {
    let scaleX = 1;
    let scaleY = 1;
    // start with some square (first), look all the way up the parents to the svg, and record any scales along the way

    // but first, are we even in an svg that can be scaled?
    let isSvg = false;
    if (this.plotPoints) {
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
    }

    return [scaleX, scaleY];
  }

  /**
   * Returns a prefix based on the element type.
   * This helps manipulate svg stuff, as the attribute info is slightly different depending on svg source
   * @returns {string} The prefix.
   */
  GetPrefix() {
    let pointIndex = this.GetElementIndex('point');

    let element = null;
    if (pointIndex != -1) {
      if ('selector' in singleMaidr) {
        element = document.querySelectorAll(
          singleMaidr.selector[pointIndex]
        )[0];
      } else if ('elements' in singleMaidr) {
        element = singleMaidr.elements[pointIndex][0];
      }
    } else if (singleMaidr.type == 'point') {
      if ('selector' in singleMaidr) {
        element = document.querySelectorAll(singleMaidr.selector)[0];
      } else if ('elements' in singleMaidr) {
        element = singleMaidr.elements[0];
      }
    }
    let prefix = '';
    if (element && element.tagName.toLowerCase() === 'circle') {
      prefix = 'c';
    }
    return prefix;
  }

  /**
   * Retrieves x and y values from data and returns them in a specific format.
   * @returns {Array} An array containing X, Y, points_count, and max_points.
   */
  GetPointValues() {
    let points = new Map(); // keep track of x and y values

    let X = [];
    let Y = [];
    let points_count = [];
    let max_points;

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
      let xValues = [];
      let yValues = [];
      if (xyFormat == 'array') {
        if ('x' in data) {
          xValues = data['x'];
        }
        if ('y' in data) {
          yValues = data['y'];
        }
      } else if (xyFormat == 'object') {
        for (let i = 0; i < data.length; i++) {
          let x = data[i]['x'];
          let y = data[i]['y'];
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
      if (constants.autoPlayRate < constants.MIN_SPEED) {
        constants.MIN_SPEED = constants.autoPlayRate;
      }

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
      max_points = Math.max(...points_count.map((a) => Math.max(...a)));
    }

    return [X, Y, points_count, max_points];
  }

  /**
   * Plays a run of tones for the point layer or a single tone for the best fit smooth layer.
   * @function
   * @memberof ClassName
   * @returns {void}
   */
  PlayTones() {
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
          if (!audio || !audio.playTone) {
            clearInterval(constants.sepPlayId);
            return;
          }
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
      if (!audio || !audio.playTone) {
        clearInterval(constants.sepPlayId);
        return;
      }
      audio.playTone();
    }
  }

  /**
   * Extracts the x and y coordinates from the point attribute of a polyline SVG element.
   * @returns {Array<Array<number>>} An array containing two arrays: the x-coordinates and y-coordinates.
   */
  GetSvgLineCoords() {
    let x_points = [];
    let y_points = [];

    if (this.plotLine) {
      // scatterplot SVG containing path element instead of polyline
      if (this.plotLine instanceof SVGPathElement) {
        // Assuming the path data is in the format "M x y L x y L x y L x y"
        const pathD = this.plotLine.getAttribute('d');
        const regex = /[ML]\s*(-?\d+(\.\d+)?)\s+(-?\d+(\.\d+)?)/g;

        let match;
        while ((match = regex.exec(pathD)) !== null) {
          x_points.push(match[1]); // x coordinate
          y_points.push(match[3]); // y coordinate
        }
      } else if (this.plotLine instanceof SVGPolylineElement) {
        // extract all the y coordinates from the point attribute of polyline
        let str = this.plotLine.getAttribute('points');
        let coords = str.split(' ');

        for (let i = 0; i < coords.length; i++) {
          let coord = coords[i].split(',');
          x_points.push(parseFloat(coord[0]));
          y_points.push(parseFloat(coord[1]));
        }
      }
    } else if ([].concat(singleMaidr.type).includes('smooth')) {
      // fetch from data instead
      let elIndex = this.GetElementIndex('smooth');
      let xyFormat = this.GetDataXYFormat(elIndex);
      let data;
      if (elIndex > -1) {
        data = singleMaidr.data[elIndex];
      } else {
        data = singleMaidr.data;
      }
      if (xyFormat == 'object') {
        for (let i = 0; i < data.length; i++) {
          x_points.push(data[i]['x']);
          y_points.push(data[i]['y']);
        }
      } else if (xyFormat == 'array') {
        if ('x' in data) {
          x_points = data['x'];
        }
        if ('y' in data) {
          y_points = data['y'];
        }
      }
    }

    return [x_points, y_points];
  }

  /**
   * Returns an array of x and y points for a smooth curve.
   * @returns {Array<Array<number>>|undefined} An array of x and y points or undefined if data is not defined.
   */
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
        for (let i = 0; i < data.length; i++) {
          x_points.push(data[i]['x']);
          y_points.push(data[i]['y']);
        }
      } else if (xyFormat == 'array') {
        if ('x' in data) {
          x_points = data['x'];
        }
        if ('y' in data) {
          y_points = data['y'];
        }
      }
    }

    return [x_points, y_points];
  }

  /**
   * Calculates the absolute gradient between each pair of consecutive points on the curve.
   * @returns {Array<string|number>} An array of absolute gradients between each pair of consecutive points on the curve, followed by the string 'end'.
   */
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

  /**
   * Returns whether or not we have elements / selectors for the given type.
   * @param {string} type - The type of element to check for. eg, 'point' or 'smooth'.
   * @returns {boolean} - True if we have elements / selectors for the given type, false otherwise.
   * @function
   * @memberof scatterplot
   */
  GetRectStatus(type) {
    let elIndex = this.GetElementIndex(type);
    if (elIndex > -1) {
      if ('selector' in singleMaidr) {
        return !!singleMaidr.selector[elIndex];
      } else if ('elements' in singleMaidr) {
        return !!singleMaidr.elements[elIndex];
      }
    } else {
      if ('selector' in singleMaidr) {
        return !!singleMaidr.selector;
      } else if ('elements' in singleMaidr) {
        return !!singleMaidr.elements;
      }
    }
  }
}

/**
 * Represents a point in Layer 0 of a scatterplot chart.
 * @class
 */
class Layer0Point {
  // circles

  /**
   * Creates a new Layer0Point object.
   * @constructor
   */
  constructor() {
    if ([].concat(singleMaidr.type).includes('point')) {
      this.x = plot.chartPointsX[0];
      this.y = plot.chartPointsY[0];
      this.strokeWidth = 1.35;
      this.hasRect = plot.GetRectStatus('point');
      this.circleIndex = [];
    }
  }

  /**
   * Clears the points and updates the chart with new data.
   * @returns {Promise<void>}
   */
  async UpdatePoints() {
    await this.ClearPoints();
    this.x = plot.chartPointsX[position.x];
    this.y = plot.chartPointsY[position.x];
    // find which circles we're on by searching for the x value
    this.circleIndex = [];
    for (let j = 0; j < this.y.length; j++) {
      for (let i = 0; i < plot.plotPoints.length; i++) {
        let x;
        let y;

        if (plot.plotPoints[i] instanceof SVGPathElement) {
          const pathD = plot.plotPoints[i].getAttribute('d');
          const regex = /M\s*(-?\d+(\.\d+)?)\s+(-?\d+(\.\d+)?)/g;

          let match = regex.exec(pathD);
          x = parseFloat(match[1]);
          y = parseFloat(match[3]);
        } else if (
          plot.plotPoints[i] instanceof SVGUseElement ||
          plot.plotPoints[i] instanceof SVGCircleElement
        ) {
          x = plot.plotPoints[i].getAttribute(plot.prefix + 'x');
          y = plot.plotPoints[i].getAttribute(plot.prefix + 'y');
        }

        if (x == this.x && y == this.y[j]) {
          this.circleIndex.push(i);
          break;
        }
      }
    }
  }

  /**
   * Clears the points, updates them, and prints them on the scatterplot.
   * @async
   * @function
   * @returns {Promise<void>}
   */
  async PrintPoints() {
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
        let y;

        if (plot.plotPoints[this.circleIndex[i]] instanceof SVGPathElement) {
          const pathD = plot.plotPoints[this.circleIndex[i]].getAttribute('d');
          const regex = /M\s*(-?\d+(\.\d+)?)\s+(-?\d+(\.\d+)?)/g;

          let match = regex.exec(pathD);
          y = parseFloat(match[3]);
        } else if (
          plot.plotPoints[this.circleIndex[i]] instanceof SVGUseElement ||
          plot.plotPoints[this.circleIndex[i]] instanceof SVGCircleElement
        ) {
          y = plot.plotPoints[this.circleIndex[i]].getAttribute(
            plot.prefix + 'y'
          );
        }

        point.setAttribute('cy', y);
      }
      point.setAttribute('r', 3.95);
      point.setAttribute('stroke', constants.colorSelected);
      point.setAttribute('stroke-width', this.strokeWidth);
      point.setAttribute('fill', constants.colorSelected);
      constants.chart.appendChild(point);
    }
  }

  /**
   * Clears all highlighted points from the scatterplot.
   * @async
   */
  async ClearPoints() {
    if (document.getElementById('highlight_point'))
      document.getElementById('highlight_point').remove();
    let points = document.getElementsByClassName('highlight_point');
    for (let i = 0; i < points.length; i++) {
      document.getElementsByClassName('highlight_point')[i].remove();
    }
  }

  /**
   * Clears the points, updates them, and prints them to the screen.
   */
  UpdatePointDisplay() {
    this.PrintPoints();
  }
}

/**
 * Represents a point in Layer 1 of a scatterplot chart.
 */
class Layer1Point {
  // smooth segments

  /**
   * Creates a new Layer1Point object.
   * @constructor
   */
  constructor() {
    if ([].concat(singleMaidr.type).includes('smooth')) {
      this.x = plot.chartLineX[0];
      this.y = plot.chartLineY[0];
      this.strokeWidth = 1.35;
      this.hasRect = plot.GetRectStatus('point');
    }
  }

  /**
   * Clears the existing points and updates the x and y coordinates of the chart line.
   * @async
   * @returns {Promise<void>}
   */
  async UpdatePoints() {
    await this.ClearPoints();
    this.x = plot.chartLineX[positionL1.x];
    this.y = plot.chartLineY[positionL1.x];
  }

  /**
   * Clears the points, updates them, and prints them on the scatterplot.
   * @async
   * @returns {Promise<void>}
   */
  async PrintPoints() {
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

  /**
   * Removes all highlighted points from the scatterplot.
   * @async
   */
  async ClearPoints() {
    let points = document.getElementsByClassName('highlight_point');
    for (let i = 0; i < points.length; i++) {
      document.getElementsByClassName('highlight_point')[i].remove();
    }
    if (document.getElementById('highlight_point'))
      document.getElementById('highlight_point').remove();
  }

  /**
   * Clears the points, updates them, and prints them to the screen.
   */
  UpdatePointDisplay() {
    this.PrintPoints();
  }
}

/**
 * A class representing a histogram.
 * @class
 */
class Histogram {
  /**
   * Creates a new Histogram object.
   * @constructor
   */
  constructor() {
    // initialize main data: data, elements

    // data (required)
    if ('data' in singleMaidr) {
      this.plotData = singleMaidr.data;
    } else {
      console.log('Error: no data found');
      return;
    }
    // elements (optional)
    this.bars = null;
    if ('selector' in singleMaidr) {
      this.bars = document.querySelectorAll(singleMaidr.selector);
    } else if ('elements' in singleMaidr) {
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

  /**
   * Plays a tone using the audio object.
   */
  PlayTones() {
    audio.playTone();
  }

  /**
   * Sets the maximum and minimum values for the plot data.
   */
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
    if (constants.autoPlayRate < constants.MIN_SPEED) {
      constants.MIN_SPEED = constants.autoPlayRate;
    }
  }

  /**
   * Selects an element and changes its color.
   */
  Select() {
    this.UnSelectPrevious();
    if (this.bars) {
      this.activeElement = this.bars[position.x];
      if (this.activeElement) {
        // Case where fill is a direct attribute
        if (this.activeElement.hasAttribute('fill')) {
          this.activeElementColor = this.activeElement.getAttribute('fill');
          // Get new color to highlight and replace fill value
          this.activeElement.setAttribute(
              'fill',
              constants.GetBetterColor(this.activeElementColor)
          );
          // Case where fill is within the style attribute
        } else if (
            this.activeElement.hasAttribute('style') &&
            this.activeElement.getAttribute('style').indexOf('fill') !== -1
        ) {
          let styleString = this.activeElement.getAttribute('style');
          // Extract all style attributes and values
          let styleArray = constants.GetStyleArrayFromString(styleString);
          this.activeElementColor = styleArray[styleArray.indexOf('fill') + 1];
          // Get new color to highlight and replace fill value in style array
          styleArray[styleArray.indexOf('fill') + 1] = constants.GetBetterColor(
              this.activeElementColor
          );
          // Recreate style string and set style attribute
          styleString = constants.GetStyleStringFromArray(styleArray);
          this.activeElement.setAttribute('style', styleString);
        }
      }
    }
  }

  /**
   * Unselects the previously selected element by setting its fill attribute to the original color.
   * @function
   * @name UnSelectPrevious
   * @memberof module:histogram
   * @instance
   * @returns {void}
   */
  UnSelectPrevious() {
    if (this.activeElement) {
      // set fill attribute to the original color
      if (this.activeElement.hasAttribute('fill')) {
        this.activeElement.setAttribute('fill', this.activeElementColor);
        this.activeElement = null;
      } else if (
          this.activeElement.hasAttribute('style') &&
          this.activeElement.getAttribute('style').indexOf('fill') !== -1
      ) {
        let styleString = this.activeElement.getAttribute('style');
        let styleArray = constants.GetStyleArrayFromString(styleString);
        styleArray[styleArray.indexOf('fill') + 1] = this.activeElementColor;
        // Recreate style string and set style attribute
        styleString = constants.GetStyleStringFromArray(styleArray);
        this.activeElement.setAttribute('style', styleString);
        this.activeElement = null;
      }
    }
  }
}

/**
 * Represents a line plot.
 * @class
 */
class LinePlot {
  /**
   * Creates a new instance of LinePlot.
   * @constructor
   */
  constructor() {
    this.SetLineLayer();
    this.SetAxes();
    this.UpdateConstants();
  }

  /**
   * Sets the line layer for the chart.
   */
  SetLineLayer() {
    let elements;
    if ('selector' in singleMaidr) {
      elements = document.querySelectorAll(singleMaidr.selector);
    } else if ('elements' in singleMaidr) {
      elements = singleMaidr.elements;
    }

    if (elements) {
      this.plotLine = elements[elements.length - 1];
    } else {
      constants.hasRect = 0;
    }

    let pointCoords = this.GetPointCoords();
    let pointValues = this.GetPoints();

    this.chartLineX = pointCoords[0]; // x coordinates of curve
    this.chartLineY = pointCoords[1]; // y coordinates of curve

    this.pointValuesX = pointValues[0]; // actual values of x
    this.pointValuesY = pointValues[1]; // actual values of y

    this.curveMinY = Math.min(...this.pointValuesY);
    this.curveMaxY = Math.max(...this.pointValuesY);
  }

  /**
   * Updates the constants for the line plot.
   * This includes the minimum and maximum x and y values, the autoplay rate, and the default speed.
   */
  UpdateConstants() {
    constants.minX = 0;
    constants.maxX = singleMaidr.data.length - 1;
    constants.minY = singleMaidr.data.reduce(
      (min, item) => (item.y < min ? item.y : min),
      singleMaidr.data[0].y
    );
    constants.maxY = singleMaidr.data.reduce(
      (max, item) => (item.y > max ? item.y : max),
      singleMaidr.data[0].y
    );

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
   * Returns an array of x and y coordinates of each point in the plot line.
   * @returns {Array<Array<string>>} An array of x and y coordinates of each point in the plot line.
   */
  GetPointCoords() {
    let svgLineCoords = [[], []];

    if (this.plotLine) {
      // lineplot SVG containing path element instead of polyline
      if (this.plotLine instanceof SVGPathElement) {
        // Assuming the path data is in the format "M x y L x y L x y L x y"
        const pathD = this.plotLine.getAttribute('d');
        const regex = /[ML]\s*(-?\d+(\.\d+)?)\s+(-?\d+(\.\d+)?)/g;

        let match;
        while ((match = regex.exec(pathD)) !== null) {
          svgLineCoords[0].push(match[1]); // x coordinate
          svgLineCoords[1].push(match[3]); // y coordinate
        }
      } else {
        let points = this.plotLine.getAttribute('points').split(' ');
        for (let i = 0; i < points.length; i++) {
          if (points[i] !== '') {
            let point = points[i].split(',');
            svgLineCoords[0].push(point[0]);
            svgLineCoords[1].push(point[1]);
          }
        }
      }
    } else {
      // fetch from data instead
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
      }
      return [x_points, y_points];
    }

    return svgLineCoords;
  }

  /**
   * Returns an array of x and y points from the data object in singleMaidr.
   * @returns {Array<Array<number>>|undefined} An array containing two arrays of numbers representing x and y points respectively, or undefined if data is not defined.
   */
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
    }
  }

  /**
   * Sets the x and y group labels and title for the line plot based on the axes and title properties of the singleMaidr object.
   */
  SetAxes() {
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

  /**
   * Plays a tone using the audio object.
   */
  PlayTones() {
    audio.playTone();
  }
}

/**
 * Represents a point on a chart.
 * @class
 */
class Point {
  /**
   * Creates a new instance of Point.
   * @constructor
   */
  constructor() {
    this.x = plot.chartLineX[0];
    this.y = plot.chartLineY[0];
  }

  /**
   * Clears the existing points and updates the x and y coordinates for the chart line.
   * @async
   * @returns {Promise<void>}
   */
  async UpdatePoints() {
    await this.ClearPoints();
    this.x = plot.chartLineX[position.x];
    this.y = plot.chartLineY[position.x];
  }

  /**
   * Clears existing points, updates the points, and prints a new point on the chart.
   * @async
   * @returns {Promise<void>}
   */
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

  /**
   * Removes all highlighted points from the line plot.
   * @async
   */
  async ClearPoints() {
    let points = document.getElementsByClassName('highlight_point');
    for (let i = 0; i < points.length; i++) {
      document.getElementsByClassName('highlight_point')[i].remove();
    }
    if (document.getElementById('highlight_point'))
      document.getElementById('highlight_point').remove();
  }

  /**
   * Clears the points, updates them, and prints them to the display.
   */
  UpdatePointDisplay() {
    this.ClearPoints();
    this.UpdatePoints();
    this.PrintPoints();
  }
}

/**
 * Represents a segmented chart.
 * @class
 */
class Segmented {
  /**
   * Creates a new Segmented object.
   * @constructor
   */
  constructor() {
    // initialize variables level, data, and elements
    let fill = null;
    let data = null;
    let elements = null;
    if ('axes' in singleMaidr) {
      //axes.x.level
      if ('x' in singleMaidr.axes) {
        if ('level' in singleMaidr.axes.x) {
          this.level = singleMaidr.axes.x.level;
        }
      } else if ('y' in singleMaidr.axes) {
        if ('level' in singleMaidr.axes.y) {
          this.level = singleMaidr.axes.y.level;
        }
      }
      // axes.fill
      if ('fill' in singleMaidr.axes) {
        if ('level' in singleMaidr.axes.fill) {
          this.fill = singleMaidr.axes.fill.level;
        }
      }
    }
    if ('data' in singleMaidr) {
      data = singleMaidr.data;
    }
    if ('selector' in singleMaidr) {
      elements = document.querySelectorAll(singleMaidr.selector);
    } else if ('elements' in singleMaidr) {
      elements = singleMaidr.elements;
    }

    // gracefull failure: must have level + fill + data, elements optional
    if (elements == null) {
      logError.LogAbsentElement('elements');
      constants.hasRect = 0;
    }
    if (data) {
      if (this.fill) {
        this.fill = this.fill.reverse(); // typically fill is in reverse order
      }
      let dataAndELements = this.ParseData(data, elements);
      this.plotData = dataAndELements[0];
      this.elements = dataAndELements[1];
    } else {
      console.log(
        'Segmented chart missing level, fill, or data. Unable to create chart.'
      );
      return;
    }

    // column labels, both legend and tick
    let legendX = '';
    let legendY = '';
    if ('axes' in singleMaidr) {
      // legend labels
      if (singleMaidr.axes.x) {
        if (singleMaidr.axes.x.label) {
          legendX = singleMaidr.axes.x.label;
        }
      }
      if (singleMaidr.axes.y) {
        if (singleMaidr.axes.y.label) {
          legendY = singleMaidr.axes.y.label;
        }
      }
    }
    // labels override axes
    if ('labels' in singleMaidr) {
      if ('x' in singleMaidr.labels) {
        legendX = singleMaidr.labels.x;
      }
      if ('y' in singleMaidr.labels) {
        legendY = singleMaidr.labels.y;
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

    // set the max and min values for the plot
    this.SetMaxMin();

    // create summary and all levels
    this.CreateSummaryLevel();
    this.CreateAllLevel();

    this.autoplay = null;
  }

  /**
   * Parses data and elements to create a full 2D array of data using level and fill.
   * @param {Array} data - The data to parse.
   * @param {Array} [elements=null] - The elements to parse.
   * @returns {Array} An array containing the parsed plot data and plot elements.
   */
  ParseData(data, elements = null) {
    let plotData = [];
    let plotElements = [];

    // override and kill elements if not same length as data
    if (elements) {
      if (elements.length != data.length) {
        plotElements = null;
      }
    } else {
      plotElements = null;
    }

    // create a full 2d array of data using level and fill
    for (let i = 0; i < this.level.length; i++) {
      for (let j = 0; j < this.fill.length; j++) {
        // loop through data, find matching level and fill, assign value
        // if no match, assign null
        for (let k = 0; k < data.length; k++) {
          // init
          if (!plotData[i]) {
            plotData[i] = [];
            if (plotElements != null) {
              if (!plotElements[i]) {
                plotElements[i] = [];
              }
            }
          }
          if (!plotData[i][j]) {
            plotData[i][j] = 0;
            if (plotElements != null) {
              if (!plotElements[i][j]) {
                plotElements[i][j] = null;
              }
            }
          }
          // set actual values
          if (data[k].x == this.level[i] && data[k].fill == this.fill[j]) {
            plotData[i][j] = data[k].y;
            if (elements) {
              plotElements[i][j] = elements[k];
            }
            break;
          }
        }
      }
    }

    return [plotData, plotElements];
  }

  /**
   * Creates another y level that is the sum of all the other levels.
   */
  CreateSummaryLevel() {
    for (let i = 0; i < this.plotData.length; i++) {
      let sum = 0;
      for (let j = 0; j < this.plotData[i].length; j++) {
        sum += this.plotData[i][j];
      }
      this.plotData[i].push(sum);
    }

    this.fill.push('Sum');
  }

  /**
   * Creates another y level that plays all the other levels separately.
   */
  CreateAllLevel() {
    for (let i = 0; i < this.plotData.length; i++) {
      let all = [];
      for (let j = 0; j < this.fill.length; j++) {
        if (this.fill[j] != 'Sum') {
          all.push(this.plotData[i][j]);
        }
      }
      this.plotData[i].push(all);
    }

    this.fill.push('All');
  }

  /**
   * Plays tones based on the plot data at the current position.
   * If sonifMode is 'on', it plays a run of tones. If sonifMode is 'same', it plays all tones at once.
   */
  PlayTones() {
    if (Array.isArray(this.plotData[position.x][position.y])) {
      if (constants.sonifMode == 'on') {
        // we play a run of tones
        position.z = 0;
        constants.KillSepPlay();
        constants.sepPlayId = setInterval(
          function () {
            // play this tone
            audio.playTone();

            // and then set up for the next one
            position.z += 1;

            // and kill if we're done
            if (!Array.isArray(plot.plotData[position.x][position.y])) {
              constants.KillSepPlay();
              position.z = -1;
            } else if (
              position.z + 1 >
              plot.plotData[position.x][position.y].length
            ) {
              constants.KillSepPlay();
              position.z = -1;
            }
          },
          constants.sonifMode == 'on' ? constants.autoPlayPointsRate : 0
        );
      } else {
        // sonifMode == 'same', so we play all at once

        // adjust these volumes by amplitude, min 50% max 125%
        let volMin = Math.min(...this.plotData[position.x][position.y]);
        let volMax = Math.max(...this.plotData[position.x][position.y]);
        for (let i = 0; i < this.plotData[position.x][position.y].length; i++) {
          position.z = i;
          let vol = audio.SlideBetween(
            this.plotData[position.x][position.y][i],
            volMin,
            volMax,
            constants.combinedVolMin,
            constants.combinedVolMax
          );
          audio.playTone({ volScale: vol });
        }
      }
    } else {
      audio.playTone();
    }
  }

  /**
   * Sets the maximum and minimum values for the y-axis based on the data in `singleMaidr.data`.
   * Also sets the maximum x value, auto play rate, default speed, and minimum speed.
   */
  SetMaxMin() {
    for (let i = 0; i < singleMaidr.data.length; i++) {
      if (i == 0) {
        constants.maxY = singleMaidr.data[i].y;
        constants.minY = singleMaidr.data[i].y;
      } else {
        if (singleMaidr.data[i].y > constants.maxY) {
          constants.maxY = singleMaidr.data[i].y;
        }
        if (singleMaidr.data[i].y < constants.minY) {
          constants.minY = singleMaidr.data[i].y;
        }
      }
    }
    constants.maxX = this.level.length;
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
   * Selects an element and changes its color to a better one.
   */
  Select() {
    this.UnSelectPrevious();
    if (this.elements) {
      this.activeElement = this.elements[position.x][position.y];
      if (this.activeElement) {
        this.activeElementColor = this.activeElement.style.fill;
        let newColor = constants.GetBetterColor(this.activeElementColor);
        this.activeElement.style.fill = newColor;
      }
    }
  }

  /**
   * Unselects the previously selected element by resetting its fill color to the active element color.
   * Also sets the active element to null.
   */
  UnSelectPrevious() {
    if (this.activeElement) {
      this.activeElement.style.fill = this.activeElementColor;
      this.activeElement = null;
    }
  }
}

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
    this.SetControls();
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
  async SetControls() {
    constants.events.push([
      document,
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

          // exception: don't let users click the seperator char
          let seperatorPositions = constants.brailleInput.value
            .split('')
            .reduce((positions, char, index) => {
              if (char === '⠳') positions.push(index);
              return positions;
            }, []);
          if (seperatorPositions.includes(pos)) {
            return;
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
        if (position.x < 0 || end - 1 < position.x) {
          constants.KillAutoplay();
          control.lockPosition();
        } else if (position.x >= end) {
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

// events and init functions
// we do some setup, but most of the work is done when user focuses on an element matching an id from maidr user data
document.addEventListener('DOMContentLoaded', function (e) {
  // we wrap in DOMContentLoaded to make sure everything has loaded before we run anything

  // create global vars
  window.constants = new Constants();
  window.resources = new Resources();
  window.logError = new LogError();

  // set focus events for all charts matching maidr ids
  let maidrObjects = [];
  if (typeof maidr != 'undefined') {
    if (!Array.isArray(maidr)) {
      maidrObjects.push(maidr);
    } else {
      maidrObjects = maidr;
    }
  }
  // set focus events for all maidr ids
  DestroyMaidr(); // just in case
  window.maidrIds = [];
  for (let i = 0; i < maidrObjects.length; i++) {
    let maidrId = maidrObjects[i].id;
    maidrIds.push(maidrId);
    let maidrElemn = document.getElementById(maidrId);
    if (maidrElemn) {
      maidrElemn.setAttribute('tabindex', '0');
      maidrElemn.addEventListener('focus', function (e) {
        ShouldWeInitMaidr(maidrObjects[i]);
      });
      // blur done elsewhere
    }
  }

  // events etc for user study page
  // run tracker stuff only on user study page
  if (constants.canTrack) {
    window.tracker = new Tracker();
    if (document.getElementById('download_data_trigger')) {
      // we're on the intro page, so enable the download data button
      document
        .getElementById('download_data_trigger')
        .addEventListener('click', function (e) {
          tracker.DownloadTrackerData();
        });
    }

    // general events
    document.addEventListener('keydown', function (e) {
      // reset tracking with Ctrl + F5 / command + F5, and Ctrl + Shift + R / command + Shift + R
      // future todo: this should probably be a button with a confirmation. This is dangerous
      if (
        (e.key == 'F5' && (constants.isMac ? e.metaKey : e.ctrlKey)) ||
        (e.key == 'R' && (constants.isMac ? e.metaKey : e.ctrlKey))
      ) {
        e.preventDefault();
        tracker.Delete();
        location.reload(true);
      }

      // main event tracker, built for individual charts
      if (e.key == 'F10') {
        tracker.DownloadTrackerData();
      } else {
        if (plot) {
          tracker.LogEvent(e);
        }
      }

      // Stuff to only run if we're on a chart (so check if the info div exists?)
      if (document.getElementById('info')) {
      }
    });
  }
});

/**
 * Initializes the Maidr app for a given chart, taken from the matching ID of the focused chart
 * @param {Object} thisMaidr - The json schema for the chart to be initialized.
 */
function InitMaidr(thisMaidr) {
  // there's a rare bug where constants isn't defined yet, so we check for that
  if (typeof constants != 'undefined') {
    // init vars and html
    window.singleMaidr = thisMaidr;
    constants.chartId = singleMaidr.id;
    if (Array.isArray(singleMaidr.type)) {
      constants.chartType = singleMaidr.type[0];
    } else {
      constants.chartType = singleMaidr.type;
    }
    CreateChartComponents(singleMaidr);
    window.control = new Control(); // this inits the actual chart object and Position
    window.review = new Review();
    window.display = new Display();
    window.audio = new Audio();

    // blur destruction events
    let controlElements = [
      constants.chart,
      constants.brailleInput,
      constants.review,
    ];
    for (let i = 0; i < controlElements.length; i++) {
      constants.events.push([controlElements[i], 'blur', ShouldWeDestroyMaidr]);
    }

    // kill autoplay event
    constants.events.push([document, 'keydown', KillAutoplayEvent]);

    // actually do eventlisteners for all events
    this.SetEvents();

    // once everything is set up, announce the chart name (or title as a backup) to the user
    setTimeout(function () {
      if ('name' in singleMaidr) {
        display.announceText(singleMaidr.name);
      } else if (
        'title' in singleMaidr ||
        ('labels' in singleMaidr && 'title' in singleMaidr.labels)
      ) {
        let title =
          'title' in singleMaidr ? singleMaidr.title : singleMaidr.labels.title;

        // Determine whether type is multiple or single. If multiple, put commas and "and" in between. If single, just put the type.
        let plotTypeString = Array.isArray(singleMaidr.type)
          ? singleMaidr.type.slice(0, -1).join(', ') +
            ' and ' +
            singleMaidr.type.slice(-1)
          : singleMaidr.type;

        // Prepare the instruction text for multi-layered plot
        let multiLayerInstruction =
          'This is a multi-layered plot. Use PageUp and PageDown to switch between layers.';

        // Check if plotTypeString has multiple types
        let isMultiLayered =
          Array.isArray(singleMaidr.type) && singleMaidr.type.length > 1;

        // Construct the final announceText string
        let announceText = `${plotTypeString} plot of ${title}: Use Arrows to navigate data points. ${
          isMultiLayered ? multiLayerInstruction : ' '
        }Toggle B for Braille, T for Text, S for Sonification, and R for Review mode. Use H for Help.`;

        // Display the announcement text
        display.announceText(announceText);
      }
    }, 100);
  }
}

/**
 * Determines whether to initialize Maidr based on conditions:
  - maidr isn't enabled (check if singleMaidr is undefined or false)
  - the chart we're moving to isn't the same as the one we're on
  If successful, calls InitMaidr. If not, does nothing.
  note: if we move from one to another, destroy the current first
 * @param {Object} thisMaidr - The Maidr object to be initialized.
 */
function ShouldWeInitMaidr(thisMaidr) {
  if (typeof singleMaidr == 'undefined') {
    // not enabled
    InitMaidr(thisMaidr);
  } else if (!singleMaidr) {
    // not enabled
    InitMaidr(thisMaidr);
  } else if (thisMaidr.id !== singleMaidr.id) {
    // different chart, destroy first
    DestroyMaidr();
    InitMaidr(thisMaidr);
  }
}

/**
 * Determines whether Maidr should be destroyed based conditions: 
   - we've tabbed away from the chart or any component
   - we're allowed to tab within the system (ie, braille input, review mode, etc)
 * If tab movement is 0, do nothing. If tab movement is 1 or -1, move to before/after and then destroy.
 * @param {Event} e - The blur event from the Tab key that triggers this function.
 */
function ShouldWeDestroyMaidr(e) {
  // timeout to delay blur event.
  // I forget why this is necessary, but it is. - smm
  setTimeout(() => {
    if (constants.tabMovement == 0) {
      // do nothing, this is an allowed move
      // but also reset so we can leave later
      constants.tabMovement = null;
    } else {
      if (constants.tabMovement == 1 || constants.tabMovement == -1) {
        // move to before / after, and then destroy
        FocusBeforeOrAfter();
      }
      DestroyMaidr();
    }
  }, 0);
}

/**
 * Creates a temporary div element and sets focus on it before or after the main container based on the tab movement direction.
 * @function
 * @name FocusBeforeOrAfter
 * @returns {void}
 */
function FocusBeforeOrAfter() {
  // Tab / forward
  if (constants.tabMovement == 1) {
    let focusTemp = document.createElement('div');
    focusTemp.setAttribute('tabindex', '0');
    constants.main_container.after(focusTemp);
    focusTemp.focus();
    focusTemp.remove();
  }
  // Shift + Tab / backward
  else if (constants.tabMovement == -1) {
    // create an element to focus on, add it before currentFocus, focus it, then remove it
    let focusTemp = document.createElement('div');
    focusTemp.setAttribute('tabindex', '0');
    constants.main_container.before(focusTemp);
    focusTemp.focus();
    focusTemp.remove();
  }
}

/**
 * Removes all events, global variables, and chart components associated with Maidr, resetting it to its uninitialized state.
 */
function DestroyMaidr() {
  // chart cleanup
  if (constants.chartType == 'bar' || constants.chartType == 'hist') {
    // deselect, if possible
    if (typeof plot.DeselectAll === 'function') {
      plot.DeselectAll();
    }
    if (typeof plot.UnSelectPrevious === 'function') {
      plot.UnSelectPrevious();
    }
  }

  // remove events
  for (let i = 0; i < constants.events.length; i++) {
    if (Array.isArray(constants.events[i][0])) {
      for (let j = 0; j < constants.events[i][0].length; j++) {
        constants.events[i][0][j].removeEventListener(
          constants.events[i][1],
          constants.events[i][2]
        );
      }
    } else {
      constants.events[i][0].removeEventListener(
        constants.events[i][1],
        constants.events[i][2]
      );
    }
  }
  for (let i = 0; i < constants.postLoadEvents.length; i++) {
    if (Array.isArray(constants.postLoadEvents[i][0])) {
      for (let j = 0; j < constants.postLoadEvents[i][0].length; j++) {
        constants.postLoadEvents[i][0][j].removeEventListener(
          constants.postLoadEvents[i][1],
          constants.postLoadEvents[i][2]
        );
      }
    } else {
      constants.postLoadEvents[i][0].removeEventListener(
        constants.postLoadEvents[i][1],
        constants.postLoadEvents[i][2]
      );
    }
  }
  constants.events = [];
  constants.postLoadEvents = [];

  // remove global vars
  constants.chartId = null;
  constants.chartType = null;
  constants.tabMovement = null;
  DestroyChartComponents();

  window.review = null;
  window.display = null;
  window.control = null;
  window.plot = null;
  window.audio = null;
  window.singleMaidr = null;
}
/**
 * Kills autoplay if the user presses the control key (Windows) or command key (Mac).
 * @param {KeyboardEvent} e - The keyboard event object.
 */
function KillAutoplayEvent(e) {
  // Kill autoplay
  if (
    constants.isMac
      ? e.key == 'Meta' || e.key == 'ContextMenu'
      : e.key == 'Control'
  ) {
    // ctrl (either one)
    constants.KillAutoplay();
  }
}

/**
 * Adds all events and post load events to the DOM elements.
 * Assumes that all events are in constants.events and all post load events are in constants.postLoadEvents.
 */
function SetEvents() {
  // add all events
  for (let i = 0; i < constants.events.length; i++) {
    if (Array.isArray(constants.events[i][0])) {
      for (let j = 0; j < constants.events[i][0].length; j++) {
        constants.events[i][0][j].addEventListener(
          constants.events[i][1],
          constants.events[i][2]
        );
      }
    } else {
      constants.events[i][0].addEventListener(
        constants.events[i][1],
        constants.events[i][2]
      );
    }
  }
  // add all post load events
  // we delay adding post load events just a tick so the chart loads
  setTimeout(function () {
    for (let i = 0; i < constants.postLoadEvents.length; i++) {
      if (Array.isArray(constants.postLoadEvents[i][0])) {
        for (let j = 0; j < constants.postLoadEvents[i][0].length; j++) {
          constants.postLoadEvents[i][0][j].addEventListener(
            constants.postLoadEvents[i][1],
            constants.postLoadEvents[i][2]
          );
        }
      } else {
        constants.postLoadEvents[i][0].addEventListener(
          constants.postLoadEvents[i][1],
          constants.postLoadEvents[i][2]
        );
      }
    }
  }, 100);
}

/**
 * Initializes the html chart components needed, such as:
 * - Creates a structure with a main container and a chart container
 * - Resets the parents from just chart to main container > chart container > chart
 * - Creates a braille input
 * - Creates an info aria live region
 * - Creates announcements aria live region
 * - Creates a review mode form field
 * - Also sets the constants associated with these elements
 *
 */
function CreateChartComponents() {
  // init html stuff. aria live regions, braille input, etc

  // core chart
  let chart = document.getElementById(singleMaidr.id);

  // we create a structure with a main container, and a chart container
  let main_container = document.createElement('div');
  main_container.id = constants.main_container_id;
  let chart_container = document.createElement('div');
  chart_container.id = constants.chart_container_id;
  // update parents from just chart, to main container > chart container > chart
  chart.parentNode.replaceChild(main_container, chart);
  main_container.appendChild(chart);
  chart.parentNode.replaceChild(chart_container, chart);
  chart_container.appendChild(chart);
  chart.focus(); // focus used to be on chart and just got lost as we rearranged, so redo focus

  constants.chart = chart;
  constants.chart_container = chart_container;
  constants.main_container = main_container;

  // braille input, pre sibling of chart container
  constants.chart_container.insertAdjacentHTML(
    'beforebegin',
    '<div class="hidden" id="' +
      constants.braille_container_id +
      '">\n<input id="' +
      constants.braille_input_id +
      '" class="braille-input" type="text" size="' +
      constants.brailleDisplayLength +
      '" ' +
      'aria-brailleroledescription="" ' + // this kills the 2 char 'edit' that screen readers add
      'autocomplete="off" ' +
      '/>\n</div>\n'
  );

  // info aria live, next sibling of chart container
  constants.chart_container.insertAdjacentHTML(
    'afterend',
    '<br>\n<div id="' +
      constants.info_id +
      '" aria-live="assertive" aria-atomic="true">\n<p id="x"></p>\n<p id="y"></p>\n</div>\n'
  );

  // announcements, next sibling of info
  document
    .getElementById(constants.info_id)
    .insertAdjacentHTML(
      'afterend',
      '<div id="announcements" aria-live="assertive" aria-atomic="true" class="mb-3"></div>\n'
    );

  // end chime audio element
  // TODO: external media file is not working as a stereo audio so commenting this out until we find a solution
  // document
  // .getElementById(constants.info_id)
  // .insertAdjacentHTML(
  // 'afterend',
  // '<div class="hidden"> <audio src="../src/terminalBell.mp3" id="end_chime"></audio> </div>'
  // );

  // review mode form field
  document
    .getElementById(constants.info_id)
    .insertAdjacentHTML(
      'beforebegin',
      '<div id="' +
        constants.review_id_container +
        '" class="hidden sr-only sr-only-focusable"><input id="' +
        constants.review_id +
        '" type="text" size="50" /></div>'
    );

  // some tweaks
  constants.chart_container.setAttribute('role', 'application');

  // set page elements
  constants.brailleContainer = document.getElementById(
    constants.braille_container_id
  );
  constants.brailleInput = document.getElementById(constants.braille_input_id);
  constants.infoDiv = document.getElementById(constants.info_id);
  constants.announceContainer = document.getElementById(
    constants.announcement_container_id
  );
  constants.nonMenuFocus = constants.chart;
  constants.endChime = document.getElementById(constants.end_chime_id);
  constants.review_container = document.querySelector(
    '#' + constants.review_id_container
  );
  constants.review = document.querySelector('#' + constants.review_id);

  // help menu
  window.menu = new Menu();

  // LLM question modal
  window.chatLLM = new ChatLLM();

  // Description modal
  window.description = new Description(); // developement on hold
}

/**
 * Removes all chart components from the DOM and resets related variables to null.
 * @function
 * @name DestroyChartComponents
 * @returns {void}
 */
function DestroyChartComponents() {
  // remove html stuff
  if (constants.chart_container != null) {
    if (constants.chart != null) {
      if (constants.chart_container.parentNode != null) {
        constants.chart_container.parentNode.replaceChild(
          constants.chart,
          constants.chart_container
        );
      }
    }
    constants.chart_container.remove();
  }
  if (constants.brailleContainer != null) {
    constants.brailleContainer.remove();
  }
  if (constants.infoDiv != null) {
    constants.infoDiv.remove();
  }
  if (constants.announceContainer != null) {
    constants.announceContainer.remove();
  }
  if (constants.endChime != null) {
    constants.endChime.remove();
  }
  if (constants.review_container != null) {
    constants.review_container.remove();
  }

  if (typeof menu != 'undefined') {
    menu.Destroy();
  }
  if (typeof description != 'undefined') {
    description.Destroy();
  }
  if (typeof chatLLM != 'undefined') {
    chatLLM.Destroy();
  }

  const scatterSvg = document.querySelector('svg#scatter');
  const lineSvg = document.querySelector('svg#line');
  const heatSvg = document.querySelector('svg#heat');
  // Incase autoplay was running when the highlighted plot points were being handled,
  // kill autoplay first before removing highlight_point elements
  if (scatterSvg) {
    constants.KillAutoplay();
    scatterSvg.querySelectorAll('.highlight_point').forEach((element) => {
      element.remove();
    });
  } else if (lineSvg || heatSvg) {
    const highlightPoint = lineSvg
      ? lineSvg.querySelector('#highlight_point')
      : heatSvg.querySelector('#highlight_rect');
    if (highlightPoint) {
      constants.KillAutoplay();
      highlightPoint.remove();
    }
  }

  constants.chart = null;
  constants.chart_container = null;
  constants.brailleContainer = null;
  constants.brailleInput = null;
  constants.infoDiv = null;
  constants.announceContainer = null;
  constants.endChime = null;
  constants.review_container = null;
  menu = null;
  description = null;
}
