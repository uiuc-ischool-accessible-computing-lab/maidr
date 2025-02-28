// events and init functions
// we do some setup, but most of the work is done when user focuses on an element matching an id from maidr user data
function init(id) {
  // we wrap in DOMContentLoaded to make sure everything has loaded before we run anything

  // create global vars
  window.constants = new Constants();
  window.resources = new Resources();
  window.logError = new LogError();

  // set focus events for all charts matching maidr ids
  let maidrObjects = [];

  // First check for globally defined maidr variable (script tag method)
  if (typeof window.maidr !== 'undefined') {
    if (!Array.isArray(window.maidr)) {
      maidrObjects.push(window.maidr);
    } else {
      maidrObjects = maidrObjects.concat(window.maidr);
    }
  }
  if (id !== undefined) {
    const elementWithId = document.getElementById(id);
    if (elementWithId) {
      let maidrData;
      try {
        maidrData = JSON.parse(elementWithId.getAttribute('maidr-data'));
      } catch (e) {
        console.error('Failed to parse maidr attribute:', e);
        return;
      }
      // If id is not provided in the JSON, use the element's id
      if (!maidrData.id) {
        if (elementWithId.id) {
          maidrData.id = elementWithId.id;
        } else {
          // Generate a random id if none exists
          elementWithId.id = 'maidr-' + Math.random().toString(36).substr(2, 9);
          maidrData.id = elementWithId.id;
        }
      }
      // Check if this id already exists in maidrObjects to avoid duplicates
      if (!maidrObjects.some((obj) => obj.id === maidrData.id)) {
        maidrObjects.push(maidrData);
      }
    }
  } else {
    // Then look for elements with maidr attribute
    const elementsWithMaidrAttr = document.querySelectorAll('[maidr-data]');
    elementsWithMaidrAttr.forEach((element) => {
      try {
        const maidrData = JSON.parse(element.getAttribute('maidr-data'));
        // If id is not provided in the JSON, use the element's id
        if (!maidrData.id) {
          if (element.id) {
            maidrData.id = element.id;
          } else {
            // Generate a random id if none exists
            element.id = 'maidr-' + Math.random().toString(36).substr(2, 9);
            maidrData.id = element.id;
          }
        }
        // Check if this id already exists in maidrObjects to avoid duplicates
        if (!maidrObjects.some((obj) => obj.id === maidrData.id)) {
          maidrObjects.push(maidrData);
        }
      } catch (e) {
        console.error('Failed to parse maidr attribute:', e);
      }
    });
  }

  // set focus events for all maidr ids
  DestroyMaidr(); // just in case
  window.maidrIds = [];
  let firstMaidr;
  for (let i = 0; i < maidrObjects.length; i++) {
    let maidrId = maidrObjects[i].id;
    maidrIds.push(maidrId);
    if (!firstMaidr && maidrObjects[i]) {
      firstMaidr = maidrObjects[i];
    }
    let maidrElemn = document.getElementById(maidrId);
    if (maidrElemn) {
      maidrElemn.setAttribute('tabindex', '0');
      maidrElemn.addEventListener('focus', function (e) {
        ShouldWeInitMaidr(maidrObjects[i]);
      });
      // blur done elsewhere
    }
  }
  // init components like alt text on just the first chart
  CreateChartComponents(firstMaidr, true);
}

document.addEventListener('DOMContentLoaded', function (e) {
  init();
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
    DestroyChartComponents(); // destroy so that we start fresh, in case we've created on the wrong chart
    CreateChartComponents(singleMaidr);
    InitTracker();

    window.menu = new Menu();
    window.chatLLM = new ChatLLM();
    window.control = new Control(); // this inits the actual chart object and Position
    window.review = new Review();
    window.display = new Display();
    window.goto = new Goto();
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

    // Set img role for chart
    constants.chart.setAttribute('role', 'img');

    // once everything is set up, announce the chart name (or title as a backup) to the user
    // setTimeout(function () {
    if ('name' in singleMaidr) {
      // Add the aria-label and title attributes to the chart
      constants.chart.setAttribute('aria-label', announceText);
      constants.chart.setAttribute('title', announceText);

      // display.announceText(singleMaidr.name);
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
      let announceText = `${plotTypeString} plot of ${title}: Click to activate. Use Arrows to navigate data points. ${
        isMultiLayered ? multiLayerInstruction : ' '
      }Toggle B for Braille, T for Text, S for Sonification, and R for Review mode. Use H for Help.`;

      // Add the aria-label and title attributes to the chart
      constants.chart.setAttribute('aria-label', announceText);
      constants.chart.setAttribute('title', announceText);

      // Display the announcement text
      // display.announceText(announceText);
    }
    // }, 100);
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
        constants.events[i][0][j]?.removeEventListener(
          constants.events[i][1],
          constants.events[i][2]
        );
      }
    } else {
      constants.events[i][0]?.removeEventListener(
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
      // sometimes we have multiple elements to apply the same event to in the [i][0] spot
      for (let j = 0; j < constants.events[i][0].length; j++) {
        // and sometimes we have multiple event types in [i][1]
        if (Array.isArray(constants.events[i][1])) {
          for (let k = 0; k < constants.events[i][1].length; k++) {
            constants.events[i][0][j]?.addEventListener(
              constants.events[i][1][k],
              constants.events[i][2]
            );
          }
        } else {
          constants.events[i][0][j]?.addEventListener(
            constants.events[i][1],
            constants.events[i][2]
          );
        }
      }
    } else {
      if (Array.isArray(constants.events[i][1])) {
        for (let j = 0; j < constants.events[i][1].length; j++) {
          constants.events[i][0]?.addEventListener(
            constants.events[i][1][j],
            constants.events[i][2]
          );
        }
      } else {
        constants.events[i][0]?.addEventListener(
          constants.events[i][1],
          constants.events[i][2]
        );
      }
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
function CreateChartComponents(thisMaidr, chartOnly = false) {
  // init html stuff. aria live regions, braille input, etc

  // core chart
  let chart = document.getElementById(thisMaidr.id);

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
  if (!chartOnly) chart.focus(); // focus used to be on chart and just got lost as we rearranged, so redo focus

  constants.chart = chart;
  constants.chart_container = chart_container;
  constants.main_container = main_container;

  if (!chartOnly) {
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

    // review mode form field
    document
      .getElementById(constants.info_id)
      .insertAdjacentHTML(
        'beforebegin',
        '<div id="' +
          constants.review_id_container +
          '" class="hidden sr-only sr-only-focusable"><input id="' +
          constants.review_id +
          '" type="text" size="50" autocomplete="off" /></div>'
      );

    // some tweaks
    constants.chart_container.setAttribute('role', 'application');

    // set page elements
    constants.brailleContainer = document.getElementById(
      constants.braille_container_id
    );
    constants.brailleInput = document.getElementById(
      constants.braille_input_id
    );
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
    //window.description = new Description(); // developement on hold
  }

  // set screen reader text and attributes
  let altText = '';
  // set role of main chart
  document.getElementById(thisMaidr.id).setAttribute('role', 'img');
  if ('name' in thisMaidr) {
    altText = thisMaidr.name;
  } else if (
    'title' in thisMaidr ||
    ('labels' in thisMaidr && 'title' in thisMaidr.labels)
  ) {
    let title = 'title' in thisMaidr ? thisMaidr.title : thisMaidr.labels.title;

    // Determine whether type is multiple or single. If multiple, put commas and "and" in between. If single, just put the type.
    let plotTypeString = Array.isArray(thisMaidr.type)
      ? thisMaidr.type.slice(0, -1).join(', ') +
        ' and ' +
        thisMaidr.type.slice(-1)
      : thisMaidr.type;

    // Prepare the instruction text for multi-layered plot
    let multiLayerInstruction =
      'This is a multi-layered plot. Use PageUp and PageDown to switch between layers.';

    // Check if plotTypeString has multiple types
    let isMultiLayered =
      Array.isArray(thisMaidr.type) && thisMaidr.type.length > 1;

    // Construct the final announceText string
    altText = `${plotTypeString} plot of ${title}: Click to activate. Use Arrows to navigate data points. ${
      isMultiLayered ? multiLayerInstruction : ' '
    }Toggle B for Braille, T for Text, S for Sonification, and R for Review mode. Use H for Help.`;
  }
  if (altText.length > 0) {
    // Add the aria-label and title attributes to the chart
    document.getElementById(thisMaidr.id).setAttribute('aria-label', altText);
    document.getElementById(thisMaidr.id).setAttribute('title', altText);
  }
}

function InitTracker() {
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
    });
  }
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

  if (typeof menu !== 'undefined' && menu !== null) {
    menu.Destroy();
  }
  if (typeof description !== 'undefined' && description !== null) {
    description.Destroy();
  }
  if (typeof chatLLM !== 'undefined' && chatLLM !== null) {
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
