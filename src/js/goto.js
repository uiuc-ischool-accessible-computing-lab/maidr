class Goto {
  //locations = ['Max Value', 'Min Value', 'Mean', 'Median'];
  locations = ['Max Value', 'Min Value'];

  constructor() {
    this.popupOpen = false;
    this.popupIndex = 0;
    this.attachBootstrapModal();
    this.attachEventListeners();
  }

  attachBootstrapModal() {
    // Create modal container
    const modalHtml = `
      <div class="modal fade hidden" id="goto-modal" tabindex="-1" aria-labelledby="navigationModalLabel">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="navigationModalLabel">Navigate to Location</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
            </div>
            <div class="modal-body">
              <ul class="list-group" id="goto-list">
                ${this.locations
                  .map(
                    (location, index) => `
                  <li class="list-group-item ${index === 0 ? 'active' : ''}">
                    <button type="button" class="btn btn-link">
                      ${location}
                    </button>
                  </li>`
                  )
                  .join('')}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div id="goto_modal_backdrop" class="modal-backdrop hidden"></div>
      `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    constants.gotoModal = document.getElementById('goto-modal');
  }

  openPopup() {
    this.popupOpen = true;
    this.popupIndex = 0;
    constants.tabMovement = 0;

    this.whereWasMyFocus = document.activeElement;
    document.getElementById('goto-modal').classList.remove('hidden');
    document.getElementById('goto_modal_backdrop').classList.remove('hidden');
    document.querySelector('#goto-modal .close').focus();
    this.updateSelection(this.popupIndex);
  }

  closePopup() {
    this.popupOpen = false;
    // close
    document.getElementById('goto-modal').classList.add('hidden');
    document.getElementById('goto_modal_backdrop').classList.add('hidden');
    this.whereWasMyFocus.focus();
    this.whereWasMyFocus = null;
  }

  updateSelection(index) {
    const items = document.querySelectorAll('#goto-list button');
    Array.from(items).forEach((item, idx) => {
      item.classList.toggle('active', idx === index);
    });
  }

  attachEventListeners() {
    // Open the modal when the user presses 'g'
    constants.events.push([
      [constants.chart, constants.brailleInput],
      'keydown',
      function (event) {
        if (event.key === 'g' && !goto.popupOpen) {
          goto.openPopup();
        }
      },
    ]);
    // arrow keys to navigate the list, enter to select, escape to close
    constants.events.push([
      constants.gotoModal,
      'keydown',
      function (event) {
        if (goto.popupOpen) {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            goto.popupIndex = (goto.popupIndex + 1) % goto.locations.length;
            goto.updateSelection(goto.popupIndex);
          } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            goto.popupIndex =
              (goto.popupIndex - 1 + goto.locations.length) %
              goto.locations.length;
            goto.updateSelection(goto.popupIndex);
          } else if (event.key === 'Enter') {
            event.preventDefault();
            const selectedLocation = goto.locations[goto.popupIndex];
            goto.closePopup();
            goto.goToLocation(selectedLocation);
          } else if (event.key === 'Escape') {
            goto.closePopup();
          }
        }
      },
    ]);
  }

  goToLocation(loc) {
    console.log(`Navigating to: ${loc}`);
    // Replace this with your actual navigation logic

    if (loc == 'Max Value') {
      if (constants.chartType == 'bar' || constants.chartType == 'hist') {
        // get the max value of this array and return the index
        let max = Math.max(...plot.plotData);
        let index = plot.plotData.indexOf(max);
        position.x = index;
        control.UpdateAll();
      } else if (constants.chartType == 'line') {
        let max = Math.max(...plot.pointValuesY);
        let index = plot.pointValuesY.indexOf(max);
        position.x = index;
        control.UpdateAll();
      } else if (constants.chartType == 'point') {
        let max = Math.max(...plot.curvePoints);
        let index = plot.curvePoints.indexOf(max);
        position.x = index;
        control.UpdateAll();
      } else if (constants.chartType == 'heat') {
        // here we have a 2d array to search, and we need both y (parent) and x (child) indexes
        let max = Math.max(...plot.data.flat());
        let index = plot.data.flat().indexOf(max);
        let y = Math.floor(index / plot.data[0].length);
        let x = index % plot.data[0].length;
        position.x = x;
        position.y = y;
        control.UpdateAll();
      }
    } else if (loc == 'Min Value') {
      if (constants.chartType == 'bar' || constants.chartType == 'hist') {
        // get the min value of this array and return the index
        let min = Math.min(...plot.plotData);
        let index = plot.plotData.indexOf(min);
        position.x = index;
        control.UpdateAll();
      } else if (constants.chartType == 'line') {
        let min = Math.min(...plot.pointValuesY);
        let index = plot.pointValuesY.indexOf(min);
        position.x = index;
        control.UpdateAll();
      } else if (constants.chartType == 'point') {
        let min = Math.min(...plot.curvePoints);
        let index = plot.curvePoints.indexOf(min);
        position.x = index;
        control.UpdateAll();
      } else if (constants.chartType == 'heat') {
        // here we have a 2d array to search, and we need both y (parent) and x (child) indexes
        let min = Math.min(...plot.data.flat());
        let index = plot.data.flat().indexOf(min);
        let y = Math.floor(index / plot.data[0].length);
        let x = index % plot.data[0].length;
        position.x = x;
        position.y = y;
        control.UpdateAll();
      }
    } else if (loc == 'Mean') {
    } else if (loc == 'Median') {
    }
  }
}
