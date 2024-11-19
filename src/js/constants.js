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
  AUTOPLAY_DURATION = 2000; // 5s

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
    'AUTOPLAY_DURATION',
    'ariaMode',
    'openAIAuthKey',
    'geminiAuthKey',
    'claudeAuthKey',
    'emailAuthKey',
    'skillLevel',
    'skillLevelOther',
    'LLMModel',
    'LLMPreferences',
    'LLMOpenAiMulti',
    'LLMGeminiMulti',
    'LLMModels',
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
   * Current LLM model in use. Can be 'openai' (default) or 'gemini' or 'claude'. More to be added.
   * @type {("openai"|"gemini"|"claude")}
   * @default 'openai'
   * @memberof LLMSettings
   */
  LLMModels = { openai: true };
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
  /**
   * The interval we wait for an L + X prefix event
   */
  keypressInterval = 2000; // ms or 2s

  // internal controls
  // todo: are these even used? Sean doesn't think so (May 2024)
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
        claude: 'Claude',
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
                                        <td>Auto-play speed reset</td>
                                        <td>Slash (/)</td>
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
                            <p><input type="color" id="color_selected" name="color_selected"><label for="color_selected">Outline Color</label></p>
                            <p><input type="number" min="4" max="2000" step="1" id="braille_display_length" name="braille_display_length"><label for="braille_display_length">Braille Display Size</label></p>
                            <p><input type="number" min="10" max="2000" step="10" id="min_freq" name="min_freq"><label for="min_freq">Min Frequency (Hz)</label></p>
                            <p><input type="number" min="20" max="2010" step="10" id="max_freq" name="max_freq"><label for="max_freq">Max Frequency (Hz)</label></p>
                                                     <p>                            <p><input type="number" min="500" max="500000" step="500" id="AUTOPLAY_DURATION">Autoplay Duration (ms)</label></p>
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
                            <p class="hidden">
                                <select id="LLM_model">
                                    <option value="openai">OpenAI Vision</option>
                                    <option value="gemini">Gemini Pro Vision</option>
                                    <option value="multi">Multiple</option>
                                </select>
                                <label for="LLM_model">LLM Model</label>
                            </p>
                            <h5 class="modal-title">LLM Settings</h5>
                            <p>
                              <fieldset>
                                <legend>LLM Models (select up to 2)</legend>
                                <p><input type="checkbox" id="LLM_model_openai" name="LLM_model" value="openai"><label for="LLM_model_openai">OpenAI Vision</label></p>
                                <p><input type="checkbox" id="LLM_model_gemini" name="LLM_model" value="gemini"><label for="LLM_model_gemini">Gemini Pro Vision</label></p>
                                <p><input type="checkbox" id="LLM_model_claude" name="LLM_model" value="claude"><label for="LLM_model_claude">Claude</label></p>
                              </fieldset>
                            </p>
                            <p id="email_auth_key_container" class="multi_container">
                              <input type="email" size="50" id="email_auth_key" aria-label="Enter your email address">
                              <button aria-label="Delete Email Address" title="Delete Email Address" id="delete_email_key" class="invis_button">&times;</button>
                              <label for="gemini_auth_key">Email Authentication</label>
                              <button type="button" id="verify">Verify</button>
                            </p>
                            <p id="openai_auth_key_container" class="multi_container hidden">
                              <span id="openai_multi_container" class="hidden"><input type="checkbox" id="openai_multi" name="openai_multi" aria-label="Use OpenAI in Multi modal mode"></span>
                              <input type="password" size="50" id="openai_auth_key"><button aria-label="Delete OpenAI key" title="Delete OpenAI key" id="delete_openai_key" class="invis_button">&times;</button><label for="openai_auth_key">OpenAI Authentication Key</label>
                            </p>
                            <p id="gemini_auth_key_container" class="multi_container hidden">
                              <span id="gemini_multi_container" class="hidden"><input type="checkbox" id="gemini_multi" name="gemini_multi" aria-label="Use Gemini in Multi modal mode"></span>
                              <input type="password" size="50" id="gemini_auth_key"><button aria-label="Delete Gemini key" title="Delete Gemini key" id="delete_gemini_key" class="invis_button">&times;</button><label for="gemini_auth_key">Gemini Authentication Key</label>
                            </p>
                             <p id="claude_auth_key_container" class="multi_container hidden">
                              <span id="claude_multi_container" class="hidden"><input type="checkbox" id="claude_multi" name="claude_multi" aria-label="Use Claude in Multi modal mode"></span>
                              <input type="password" size="50" id="claude_auth_key"><button aria-label="Delete Claude key" title="Delete Claude key" id="delete_claude_key" class="invis_button">&times;</button><label for="claude_auth_key">Claude Authentication Key</label>
                            </p>
                            <p><input type="checkbox" ${
                              constants.autoInitLLM ? 'checked' : ''
                            } id="init_llm_on_load" name="init_llm_on_load"><label for="init_llm_on_load">Start LLM right away</label></p>
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
      document.getElementById('verify'),
      'click',
      function (e) {
        menu.VerifyEmail();
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

    constants.events.push([
      document.getElementById('LLM_model_openai'),
      'change',
      function (e) {
        if (e.target.checked) {
          document
            .getElementById('openai_auth_key_container')
            .classList.remove('hidden');
        } else {
          document
            .getElementById('openai_auth_key_container')
            .classList.add('hidden');
        }
      },
    ]);

    constants.events.push([
      document.getElementById('LLM_model_gemini'),
      'change',
      function (e) {
        if (e.target.checked) {
          document
            .getElementById('gemini_auth_key_container')
            .classList.remove('hidden');
        } else {
          document
            .getElementById('gemini_auth_key_container')
            .classList.add('hidden');
        }
      },
    ]);

    constants.events.push([
      document.getElementById('LLM_model_claude'),
      'change',
      function (e) {
        // if (e.target.checked) {
        document
          .getElementById('claude_auth_key_container')
          .classList.add('hidden');
        // } else {
        //   document
        //     .getElementById('claude_auth_key_container')
        //     .classList.add('hidden');
        // }
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

    // Limit selections to 2 AI models
    const llmCheckboxes = document.querySelectorAll('input[name="LLM_model"]');
    llmCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        const checked = document.querySelectorAll(
          'input[name="LLM_model"]:checked'
        );
        if (checked.length > 2) {
          checkbox.checked = false;
          alert('You can select up to 2 AI models.');
        }
      });
    });
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
    document.getElementById('braille_display_length').value =
      constants.brailleDisplayLength;
    document.getElementById('color_selected').value = constants.colorSelected;
    document.getElementById('min_freq').value = constants.MIN_FREQUENCY;
    document.getElementById('max_freq').value = constants.MAX_FREQUENCY;
    document.getElementById('AUTOPLAY_DURATION').value =
      constants.AUTOPLAY_DURATION;
    if (typeof constants.openAIAuthKey == 'string') {
      document.getElementById('openai_auth_key').value =
        constants.openAIAuthKey;
    }
    if (typeof constants.emailAuthKey == 'string') {
      document.getElementById('email_auth_key').value = constants.emailAuthKey;
    }
    if (typeof constants.geminiAuthKey == 'string') {
      document.getElementById('gemini_auth_key').value =
        constants.geminiAuthKey;
    }
    if (typeof constants.claudeAuthKey == 'string') {
      document.getElementById('claude_auth_key').value =
        constants.claudeAuthKey;
    }
    document.getElementById('skill_level').value = constants.skillLevel;
    if (constants.skillLevelOther) {
      document.getElementById('skill_level_other').value =
        constants.skillLevelOther;
    }

    // aria mode
    if (constants.ariaMode == 'assertive') {
      document.getElementById('aria_mode_assertive').checked = true;
      document.getElementById('aria_mode_polite').checked = false;
    } else {
      document.getElementById('aria_mode_polite').checked = true;
      document.getElementById('aria_mode_assertive').checked = false;
    }

    for (let model in constants.LLMModels) {
      document.getElementById(`LLM_model_${model}`).checked = true;

      document
        .getElementById(`${model}_auth_key_container`)
        .classList.remove('hidden');
    }
    document
      .getElementById(`claude_auth_key_container`)
      .classList.add('hidden');

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
    constants.brailleDisplayLength = document.getElementById(
      'braille_display_length'
    ).value;
    constants.colorSelected = document.getElementById('color_selected').value;
    constants.MIN_FREQUENCY = document.getElementById('min_freq').value;
    constants.MAX_FREQUENCY = document.getElementById('max_freq').value;
    constants.AUTOPLAY_DURATION =
      document.getElementById('AUTOPLAY_DURATION').value;

    constants.openAIAuthKey = document.getElementById('openai_auth_key').value;
    constants.geminiAuthKey = document.getElementById('gemini_auth_key').value;
    constants.claudeAuthKey = document.getElementById('claude_auth_key').value;
    constants.emailAuthKey = document.getElementById('email_auth_key').value;
    constants.skillLevel = document.getElementById('skill_level').value;
    constants.skillLevelOther =
      document.getElementById('skill_level_other').value;
    // constants.LLMModel = document.getElementById('LLM_model').value;

    const llmCheckboxes = document.querySelectorAll('input[name="LLM_model"]');
    llmCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        constants.LLMModels[checkbox.value] = true;
      } else {
        delete constants.LLMModels[checkbox.value];
      }
    });

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

  VerifyEmail() {
    let email = document.getElementById('email_auth_key').value;
    if (email && email.indexOf('@') !== -1) {
      let url = `https://maidr-service.azurewebsites.net/api/send_email?code=I8Aa2PlPspjQ8Hks0QzGyszP8_i2-XJ3bq7Xh8-ykEe4AzFuYn_QWA%3D%3D`;

      let requestJson = {
        email: email,
      };

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authentication: constants.emailAuthKey,
        },
        body: JSON.stringify(requestJson),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.success) {
            alert('Link sent to email address: ' + email);
          } else {
            console.log(data);
            alert(data.data);
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error.data);
        });
    } else {
      alert('Please enter a valid email address.');
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

    // check if LLMModels have changed
    let llmCheckboxes = document.querySelectorAll('input[name="LLM_model"]');
    for (let i = 0; i < llmCheckboxes.length; i++) {
      if (
        !shouldReset &&
        constants.LLMModels[llmCheckboxes[i].value] != llmCheckboxes[i].checked
      ) {
        shouldReset = true;
      }
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
    if (constants.canTrack) {
      // but not auth keys
      data.openAIAuthKey = 'hidden';
      data.geminiAuthKey = 'hidden';
      data.claudeAuthKey = 'hidden';
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
        const key = constants.userSettingsKeys[i];
        if (key in data) {
          constants[key] = data[key];
        }
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
        ('gemini' in constants.LLMModels && constants.geminiAuthKey) ||
        ('openai' in constants.LLMModels && constants.openAIAuthKey) ||
        ('claude' in constants.LLMModels && constants.claudeAuthKey)
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
      document.getElementById('delete_email_key'),
      'click',
      function (e) {
        document.getElementById('email_auth_key').value = '';
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
      (this.firstOpen || 'gemini' in constants.LLMModels) &&
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

    if ('openai' in constants.LLMModels) {
      if (firsttime) {
        img = await this.ConvertSVGtoJPG(singleMaidr.id, 'openai');
      }
      if (constants.openAIAuthKey) {
        chatLLM.OpenAIPrompt(text, img);
      } else {
        chatLLM.OpenAIPromptAPI(text, img);
      }
    }
    if ('gemini' in constants.LLMModels) {
      if (firsttime) {
        img = await this.ConvertSVGtoJPG(singleMaidr.id, 'gemini');
      }
      if (constants.geminiAuthKey) {
        chatLLM.GeminiPrompt(text, img);
      } else {
        chatLLM.GeminiPromptAPI(text, img);
      }
    }

    if ('claude' in constants.LLMModels) {
      if (firsttime) {
        img = await this.ConvertSVGtoJPG(singleMaidr.id, 'claude');
      }
      if (constants.claudeAuthKey) {
        chatLLM.ClaudePrompt(text, img);
      } else {
        chatLLM.ClaudePromptAPI(text, img);
      }
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
    // get name from resource]
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
    if (model == 'claude') {
      console.log('Claude response: ', data);
      if (data.text()) {
        text = data.text();
        chatLLM.DisplayChatMessage(LLMName, text);
      }
      if (data.error) {
        chatLLM.DisplayChatMessage(LLMName, 'Error processing request.', true);
        chatLLM.WaitingSound(false);
      }
    }

    // if we're tracking, log the data
    if (constants.canTrack) {
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

  ClaudeJson(text, img = null) {
    const anthropicVersion = 'vertex-2023-10-16';
    const maxTokens = 256;

    const payload = {
      anthropic_version: anthropicVersion,
      max_tokens: maxTokens,
      messages: [],
    };

    // Construct the user message object
    const userMessage = {
      role: 'user',
      content: [],
    };

    // Add the image content if provided
    if (img) {
      userMessage.content.push(
        {
          type: 'image',
          source: {
            type: 'base64',
            media_type: 'image/jpeg', // Update if other formats are supported
            data: img,
          },
        },
        {
          type: 'text',
          text: text,
        }
      );
    } else {
      // Add only the text content if no image is provided
      userMessage.content.push({
        type: 'text',
        text: text,
      });
    }

    // Add the user message to the messages array
    payload.messages.push(userMessage);

    return payload;
  }

  ClaudePromptAPI(text, imgBase64 = null) {
    console.log('Claude prompt API');
    let url =
      'https://maidr-service.azurewebsites.net/api/claude?code=I8Aa2PlPspjQ8Hks0QzGyszP8_i2-XJ3bq7Xh8-ykEe4AzFuYn_QWA%3D%3D';

    // Create the prompt
    let prompt = constants.LLMSystemMessage;
    if (constants.LLMPreferences) {
      prompt += constants.LLMPreferences;
    }
    prompt += '\n\n' + text; // Use the text parameter as the prompt

    if (imgBase64 == null) {
      imgBase64 = constants.LLMImage;
    } else {
      constants.LLMImage = imgBase64;
    }
    constants.LLMImage = imgBase64;

    let requestJson = chatLLM.ClaudeJson(prompt, imgBase64);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authentication: constants.emailAuthKey,
      },
      body: JSON.stringify(requestJson),
    })
      .then((response) => response.json())
      .then((data) => {
        data.text = function () {
          return data.content[0].text;
        };
        chatLLM.ProcessLLMResponse(data, 'claude');
      })
      .catch((error) => {
        chatLLM.WaitingSound(false);
        console.error('Error:', error);
        chatLLM.DisplayChatMessage('Claude', 'Error processing request.', true);
        // also todo: handle errors somehow
      });
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
    //console.log('LLM request: ', requestJson);

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

  OpenAIPromptAPI(text, img = null) {
    // request init
    let url =
      'https://maidr-service.azurewebsites.net/api/openai?code=I8Aa2PlPspjQ8Hks0QzGyszP8_i2-XJ3bq7Xh8-ykEe4AzFuYn_QWA%3D%3D';
    let auth = constants.openAIAuthKey;
    let requestJson = chatLLM.OpenAIJson(text, img);
    console.log('LLM request: ', requestJson);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authentication: constants.emailAuthKey,
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

  GeminiJson(text, img = null) {
    let sysMessage = constants.LLMSystemMessage;
    let backupMessage =
      'Describe ' + singleMaidr.type + ' charts to a blind person';

    let payload = {
      generationConfig: {},
      safetySettings: [],
      contents: [],
    };

    // System message as the initial "role" and "text" content for context
    let sysContent = {
      role: 'user',
      parts: [
        {
          text: sysMessage || backupMessage, // Fallback if sysMessage is unavailable
        },
      ],
    };

    // Add preferences if available
    if (constants.LLMPreferences) {
      sysContent.parts.push({
        text: constants.LLMPreferences,
      });
    }

    payload.contents.push(sysContent);

    // Add user input content, including image if available
    let userContent = {
      role: 'user',
      parts: [],
    };

    if (img) {
      // If there’s an image, add both text and image data
      userContent.parts.push(
        {
          text: text,
        },
        {
          inlineData: {
            data: img, // Expecting base64-encoded image data
            mimeType: 'image/png', // Adjust if different image formats are possible
          },
        }
      );
    } else {
      // If no image, only add the text
      userContent.parts.push({
        text: text,
      });
    }

    // Add user content to the contents array
    payload.contents.push(userContent);

    return payload;
  }

  async GeminiPromptAPI(text, imgBase64 = null) {
    let url =
      'https://maidr-service.azurewebsites.net/api/gemini?code=I8Aa2PlPspjQ8Hks0QzGyszP8_i2-XJ3bq7Xh8-ykEe4AzFuYn_QWA%3D%3D';

    // Create the prompt
    let prompt = constants.LLMSystemMessage;
    if (constants.LLMPreferences) {
      prompt += constants.LLMPreferences;
    }
    prompt += '\n\n' + text; // Use the text parameter as the prompt

    if (imgBase64 == null) {
      imgBase64 = constants.LLMImage;
    } else {
      constants.LLMImage = imgBase64;
    }
    constants.LLMImage = imgBase64;

    let requestJson = chatLLM.GeminiJson(prompt, imgBase64);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authentication: constants.emailAuthKey,
      },
      body: JSON.stringify(requestJson),
    });
    if (response.ok) {
      const responseJson = await response.json();
      responseJson.text = () => {
        return responseJson.candidates[0].content.parts[0].text;
      };
      chatLLM.ProcessLLMResponse(responseJson, 'gemini');
    } else {
      chatLLM.WaitingSound(false);
      console.error('Error:', error);
      chatLLM.DisplayChatMessage('OpenAI', 'Error processing request.', true);
      // also todo: handle errors somehow
    }
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
      //console.log('LLM request: ', prompt, image);
      const result = await model.generateContent([prompt, image]);
      //console.log(result.response.text());

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
        } else if (model == 'gemini' || model == 'claude') {
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
  // URL
  logUrl =
    'https://maidr-service.azurewebsites.net/api/log?code=I8Aa2PlPspjQ8Hks0QzGyszP8_i2-XJ3bq7Xh8-ykEe4AzFuYn_QWA%3D%3D'; // TODO Replace
  isLocal = false;

  constructor() {
    this.DataSetup();
  }

  /**
   * Sets up the tracker data by checking if previous data exists and creating new data if it doesn't.
   */
  DataSetup() {
    let prevData = this.GetTrackerData();
    if (!this.isLocal || !prevData) {
      let data = {};
      data.userAgent = Object.assign(navigator.userAgent);
      data.vendor = Object.assign(navigator.vendor);
      data.language = Object.assign(navigator.language);
      data.platform = Object.assign(navigator.platform);
      data.geolocation = Object.assign(navigator.geolocation);
      data.log_type = 'system_data';
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
  async SaveTrackerData(data) {
    console.log('about to save data', data);
    if (this.isLocal) {
      localStorage.setItem(constants.project_id, JSON.stringify(data));
    } else {
      // test this first
      try {
        const response = await fetch(this.logUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Data saved successfully:', result);
        return result;
      } catch (error) {
        console.error('Error saving data:', error);
        return null;
      }
    }
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
      if (constants.emailAuthKey) {
        settings.username = constants.emailAuthKey;
      }
      settings;
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
    if (constants.emailAuthKey) {
      eventToLog.username = Object.assign(constants.emailAuthKey);
    }
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
    if (!this.isUndefinedOrNull(constants.AUTOPLAY_DURATION)) {
      eventToLog.AUTOPLAY_DURATION = Object.assign(constants.AUTOPLAY_DURATION);
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

  /**
   * Saves data to the server using a POST request.
   * @param {Object} logData - The data to be saved.
   * @returns {Promise<Object>} The result of the save operation.
   */

  SetData(key, value) {
    if (this.isLocal) {
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
    } else {
      value['log_type'] = key;
      this.SaveTrackerData(value);
    }
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
