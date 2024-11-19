document.addEventListener('DOMContentLoaded', function (e) {
  window.constants = new Constants();
  window.resources = new Resources();
  window.logError = new LogError();

  let maidrObjects = [];
  if (typeof maidr != 'undefined') {
    if (!Array.isArray(maidr)) {
      maidrObjects.push(maidr);
    } else {
      maidrObjects = maidr;
    }
  }

  DestroyMaidr();
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
    }
  }

  CreateChartComponents(firstMaidr, true);
});

function InitMaidr(thisMaidr) {
  if (typeof constants != 'undefined') {
    window.singleMaidr = thisMaidr;
    constants.chartId = singleMaidr.id;
    if (Array.isArray(singleMaidr.type)) {
      constants.chartType = singleMaidr.type[0];
    } else {
      constants.chartType = singleMaidr.type;
    }
    DestroyChartComponents();
    CreateChartComponents(singleMaidr);
    InitTracker();

    window.menu = new Menu();
    window.chatLLM = new ChatLLM();
    window.control = new Control();
    window.review = new Review();
    window.display = new Display();
    window.audio = new Audio();

    let controlElements = [
      constants.chart,
      constants.brailleInput,
      constants.review,
    ];
    for (let i = 0; i < controlElements.length; i++) {
      constants.events.push([controlElements[i], 'blur', ShouldWeDestroyMaidr]);
    }

    constants.events.push([document, 'keydown', KillAutoplayEvent]);

    this.SetEvents();

    constants.chart.setAttribute('role', 'img');

    if ('name' in singleMaidr) {
      constants.chart.setAttribute('aria-label', announceText);
      constants.chart.setAttribute('title', announceText);
    } else if (
      'title' in singleMaidr ||
      ('labels' in singleMaidr && 'title' in singleMaidr.labels)
    ) {
      let title =
        'title' in singleMaidr ? singleMaidr.title : singleMaidr.labels.title;

      let plotTypeString = Array.isArray(singleMaidr.type)
        ? singleMaidr.type.slice(0, -1).join(', ') +
          ' and ' +
          singleMaidr.type.slice(-1)
        : singleMaidr.type;

      let multiLayerInstruction =
        'This is a multi-layered plot. Use PageUp and PageDown to switch between layers.';

      let isMultiLayered =
        Array.isArray(singleMaidr.type) && singleMaidr.type.length > 1;

      let announceText = `${plotTypeString} plot of ${title}: Click to activate. Use Arrows to navigate data points. ${
        isMultiLayered ? multiLayerInstruction : ' '
      }Toggle B for Braille, T for Text, S for Sonification, and R for Review mode. Use H for Help.`;

      constants.chart.setAttribute('aria-label', announceText);
      constants.chart.setAttribute('title', announceText);
    }
  }
}

function ShouldWeInitMaidr(thisMaidr) {
  if (typeof singleMaidr == 'undefined') {
    InitMaidr(thisMaidr);
  } else if (!singleMaidr) {
    InitMaidr(thisMaidr);
  } else if (thisMaidr.id !== singleMaidr.id) {
    DestroyMaidr();
    InitMaidr(thisMaidr);
  }
}

function ShouldWeDestroyMaidr(e) {
  setTimeout(() => {
    if (constants.tabMovement == 0) {
      constants.tabMovement = null;
    } else {
      if (constants.tabMovement == 1 || constants.tabMovement == -1) {
        FocusBeforeOrAfter();
      }
      DestroyMaidr();
    }
  }, 0);
}

function FocusBeforeOrAfter() {
  if (constants.tabMovement == 1) {
    let focusTemp = document.createElement('div');
    focusTemp.setAttribute('tabindex', '0');
    constants.main_container.after(focusTemp);
    focusTemp.focus();
    focusTemp.remove();
  } else if (constants.tabMovement == -1) {
    let focusTemp = document.createElement('div');
    focusTemp.setAttribute('tabindex', '0');
    constants.main_container.before(focusTemp);
    focusTemp.focus();
    focusTemp.remove();
  }
}

function DestroyMaidr() {
  if (constants.chartType == 'bar' || constants.chartType == 'hist') {
    if (typeof plot.DeselectAll === 'function') {
      plot.DeselectAll();
    }
    if (typeof plot.UnSelectPrevious === 'function') {
      plot.UnSelectPrevious();
    }
  }

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

function KillAutoplayEvent(e) {
  if (
    constants.isMac
      ? e.key == 'Meta' || e.key == 'ContextMenu'
      : e.key == 'Control'
  ) {
    constants.KillAutoplay();
  }
}

function SetEvents() {
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

function CreateChartComponents(thisMaidr, chartOnly = false) {
  let chart = document.getElementById(thisMaidr.id);

  let main_container = document.createElement('div');
  main_container.id = constants.main_container_id;
  let chart_container = document.createElement('div');
  chart_container.id = constants.chart_container_id;
  chart.parentNode.replaceChild(main_container, chart);
  main_container.appendChild(chart);
  chart.parentNode.replaceChild(chart_container, chart);
  chart_container.appendChild(chart);
  if (!chartOnly) chart.focus();

  constants.chart = chart;
  constants.chart_container = chart_container;
  constants.main_container = main_container;

  if (!chartOnly) {
    constants.chart_container.insertAdjacentHTML(
      'beforebegin',
      '<div class="hidden" id="' +
        constants.braille_container_id +
        '">\n<input id="' +
        constants.braille_input_id +
        '" class="braille-input" type="text" size="' +
        constants.brailleDisplayLength +
        '" ' +
        'aria-brailleroledescription="" ' +
        'autocomplete="off" ' +
        '/>\n</div>\n'
    );

    constants.chart_container.insertAdjacentHTML(
      'afterend',
      '<br>\n<div id="' +
        constants.info_id +
        '" aria-live="assertive" aria-atomic="true">\n<p id="x"></p>\n<p id="y"></p>\n</div>\n'
    );

    document
      .getElementById(constants.info_id)
      .insertAdjacentHTML(
        'afterend',
        '<div id="announcements" aria-live="assertive" aria-atomic="true" class="mb-3"></div>\n'
      );

    document
      .getElementById(constants.info_id)
      .insertAdjacentHTML(
        'beforebegin',
        '<div id="' +
          constants.review_id_container +
          '" class="hidden sr-only sr-only-focusable"><input id="' +
          constants.review_id +
          '" type="email" size="50" autocomplete="off" aria-label="Email input field" /></div>'
      );

    constants.chart_container.setAttribute('role', 'application');

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
  }

  let altText = '';
  document.getElementById(thisMaidr.id).setAttribute('role', 'img');
  if ('name' in thisMaidr) {
    altText = thisMaidr.name;
  } else if (
    'title' in thisMaidr ||
    ('labels' in thisMaidr && 'title' in thisMaidr.labels)
  ) {
    let title = 'title' in thisMaidr ? thisMaidr.title : thisMaidr.labels.title;

    let plotTypeString = Array.isArray(thisMaidr.type)
      ? thisMaidr.type.slice(0, -1).join(', ') +
        ' and ' +
        thisMaidr.type.slice(-1)
      : thisMaidr.type;

    let multiLayerInstruction =
      'This is a multi-layered plot. Use PageUp and PageDown to switch between layers.';

    let isMultiLayered =
      Array.isArray(thisMaidr.type) && thisMaidr.type.length > 1;

    altText = `${plotTypeString} plot of ${title}: Click to activate. Use Arrows to navigate data points. ${
      isMultiLayered ? multiLayerInstruction : ' '
    }Toggle B for Braille, T for Text, S for Sonification, and R for Review mode. Use H for Help.`;
  }
  if (altText.length > 0) {
    document.getElementById(thisMaidr.id).setAttribute('aria-label', altText);
    document.getElementById(thisMaidr.id).setAttribute('title', altText);
  }
}

function InitTracker() {
  if (constants.canTrack) {
    window.tracker = new Tracker();
    if (document.getElementById('download_data_trigger')) {
      document
        .getElementById('download_data_trigger')
        .addEventListener('click', function (e) {
          tracker.DownloadTrackerData();
        });
    }

    document.addEventListener('keydown', function (e) {
      if (
        (e.key == 'F5' && (constants.isMac ? e.metaKey : e.ctrlKey)) ||
        (e.key == 'R' && (constants.isMac ? e.metaKey : e.ctrlKey))
      ) {
        e.preventDefault();
        tracker.Delete();
        location.reload(true);
      }

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

function DestroyChartComponents() {
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
