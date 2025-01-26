class Goto {
  //locations = ['Max Value', 'Min Value', 'Mean', 'Median'];
  static options = ['Max Value', 'Min Value'];

  constructor() {
    this.menuOpen = false;
    this.initMenu();
    this.attachEventListeners();
  }

  initMenu() {
    this.menu = document.createElement('div');
    this.menu.id = 'goto-menu';
    this.menu.style.display = 'none';
    this.menu.innerHTML = `
            <div class="menu-container">
                <input 
                    type="text" 
                    id="menu-search" 
                    placeholder="Search locations..." 
                    aria-label="Search locations to go to"
                />
                <ul id="menu-items">
                    ${Goto.options
                      .map((option) => `<li><button>${option}</button></li>`)
                      .join('')}
                </ul>
            </div>
        `;

    this.menuSearch = this.menu.querySelector('#menu-search');
    this.menuItems = Array.from(
      this.menu.querySelectorAll('#menu-items button')
    );

    constants.gotoMenu = this.menu;
    document.body.appendChild(this.menu);
  }

  openMenu() {
    this.whereWasMyFocus = document.activeElement;
    constants.tabMovement = 0; // to prevent maidr from being destroyed as we leave the chart

    this.menuOpen = true;
    this.menu.style.display = 'block';
    this.menuSearch.focus();
  }

  closeMenu() {
    this.menuOpen = false;
    this.menu.style.display = 'none';
    this.whereWasMyFocus.focus();
    this.whereWasMyFocus = null;
  }

  filterItems(query) {
    const lowerCaseQuery = query.toLowerCase();
    this.menuItems.forEach((item) => {
      if (item.textContent.toLowerCase().includes(lowerCaseQuery)) {
        item.parentElement.style.display = 'block';
      } else {
        item.parentElement.style.display = 'none';
      }
    });
  }

  attachEventListeners() {
    this.menuSearch.addEventListener('input', (event) =>
      this.filterItems(event.target.value)
    );

    // Open the modal when the user presses 'g'
    constants.events.push([
      [constants.chart, constants.brailleInput],
      'keyup',
      function (event) {
        if (event.key === 'g' && !goto.popupOpen) {
          goto.openMenu();
        }
      },
    ]);
    // arrow keys to navigate the list, escape to close
    constants.events.push([
      constants.gotoMenu,
      'keydown',
      function (event) {
        if (goto.menuOpen) {
          const focusableElements = [
            goto.menuSearch,
            ...goto.menuItems.filter(
              (item) => item.parentElement.style.display !== 'none'
            ),
          ];
          const currentIndex = focusableElements.indexOf(
            document.activeElement
          );

          if (event.key === 'ArrowDown') {
            event.preventDefault();
            const nextIndex = (currentIndex + 1) % focusableElements.length;
            focusableElements[nextIndex]?.focus();
          } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            const prevIndex =
              (currentIndex - 1 + focusableElements.length) %
              focusableElements.length;
            focusableElements[prevIndex]?.focus();
          } else {
            if (event.key === 'Escape') {
              goto.closeMenu();
            }
          }
        }
      },
    ]);
    // enter to select, which we register as a click event so it works with screen readers
    constants.events.push([
      constants.gotoMenu,
      'click',
      function (event) {
        if (event.target.tagName === 'BUTTON') {
          let loc = event.target.textContent;
          goto.closeMenu();
          goto.goToLocation(loc);
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
