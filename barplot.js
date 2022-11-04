
document.addEventListener('DOMContentLoaded', function(e) { // we wrap in DOMContentLoaded to make sure everything has loaded before we run anything

    // variable initialization

    window.constants = new Constants(); 
    constants.plotId = 'geom_rect.rect.2.1';
    window.position = new Position(-1, -1);
    window.plot = new BarChart();
    constants.chartType = "barchart";

    let audio = new Audio();
    let display = new Display();

    if ( constants.debugLevel > 0 ) {
        constants.svg_container.focus();
    }

    // control eventlisteners
    constants.svg_container.addEventListener("keydown", function (e) {
        let updateInfoThisRound = false; // we only update info and play tones on certain keys

        if (e.which === 39) { // right arrow 39
            if ( e.ctrlKey ) { 
                if ( e.shiftKey ) {
                    Autoplay('right');
                } else {
                    position.x = plot.bars.length - 1; // go all the way
                }
            } else {
                position.x += 1;
            }
            updateInfoThisRound = true;
        }
        if (e.which === 37) { // left arrow 37
            if ( e.ctrlKey ) { 
                if ( e.shiftKey ) {
                    Autoplay('left');
                } else {
                    position.x = 0; // go all the way
                }
            } else {
                position.x += -1;
            }
            updateInfoThisRound = true;
        }

        lockPosition();

        // update display / text / audio
        if ( updateInfoThisRound ) {
            UpdateAll();
        }

    });

    constants.brailleInput.addEventListener("keydown", function (e) {
        // We block all input, except if it's B or Tab so we move focus
        
        let updateInfoThisRound = false; // we only update info and play tones on certain keys
        
        if ( e.which == 9 ) { // tab
            // do nothing, let the user Tab away 
        } else if ( e.which == 39 ) { // right arrow
            // update position to match cursor
            // don't let cursor move past the final braillecharacter or it'll desync and look weird
            // future todo: this must be delayed, either by firing on keyup or doing a settimeout, because otherwise we change the position before it moves and it doesn't work. However, that means it moves to the wrong position for just a moment. Is that bad? If so, find other options
            if ( e.target.selectionStart > e.target.value.length - 2 ) 
            {
                e.preventDefault();
            } else {
                position.x += 1;
                updateInfoThisRound = true;
            }
        } else if ( e.which == 37 ) { // left arrow
            // update position to match cursor
            position.x += -1;
            updateInfoThisRound = true;
        } else {
            e.preventDefault();
        }

        lockPosition();

        // update display / text / audio
        if ( updateInfoThisRound ) {
            UpdateAll();
        }

    });

    document.addEventListener("keydown", function (e) {

        // B: braille mode
        if ( e.which == 66 ) {
            display.toggleBrailleMode();
            e.preventDefault();
        }
        // T: aria live text output mode
        if (e.which == 84) {
            display.toggleTextMode();
        }
        // S: sonification mode
        if (e.which == 83) {
            display.toggleSonificationMode();
        }

        if (e.which === 32) { // space 32, replay info but no other changes
            UpdateAll();
        }

    });

    constants.brailleInput.addEventListener('keydown', function(e) {
    });

    function lockPosition() {
        // lock to min / max postions
        if ( position.x < 0 ) {
            position.x = 0;
        }
        if ( position.x > plot.bars.length - 1 ) {
            position.x = plot.bars.length - 1;
        }
    }
    function UpdateAll() {
        if ( constants.showDisplay ) {
            display.displayValues(plot); 
        }
        if ( constants.showRect ) {
            plot.Select(); 
        }
        if ( constants.audioPlay ) {
            audio.playTone();
        }
    }
    function Autoplay(dir) {
        let step = 1 ; // default right
        if ( dir == "left" ) {
            step = -1;
        }

        // clear old autoplay if exists
        if ( this.autoplay != null ) {
            clearInterval(this.autoplay);
            this.autoplay = null;
        }

        this.autoplay = setInterval(function() {
            position.x += step;
            if ( position.x < 0 || plot.bars.length - 1 < position.x ) {
                clearInterval(this.autoplay);
                this.autoplay = null;
                lockPosition();
            } else {
                UpdateAll();
            }
        }, constants.autoPlayRate);
    }

});


class BarChart {

    constructor() {
        this.bars = document.querySelectorAll('#' + constants.plotId.replaceAll('\.', '\\.') + ' > rect'); // get rect children of plotId. Note that we have to escape the . in plotId
        this.plotData = this.GetData();
        this.plotColumns = this.GetColumns();

        constants.maxX = this.bars.length - 1;
        constants.maxY = Number(constants.svg.getAttribute('height').replace(/\D/g,'')); // set max height as entire chart height, not max across all bars

        this.autoplay = null;
    }

    GetData() {
        // set height for each bar

        let plotData = [];

        for ( let i = 0 ; i < this.bars.length; i++ ) {
            plotData.push(this.bars[i].getAttribute('height'));
        }

        return plotData;
    }

    GetColumns() {
        // get column names
        // the pattern seems to be a <tspan> with dy="10", but check this for future output (todo)

        let plotColumns = [];
        let els = document.querySelectorAll('tspan[dy="10"]');
        for ( var i = 0 ; i < els.length ; i++ ) {
            plotColumns.push(els[i].innerHTML);
        }

        return plotColumns;
    }

    Select() {
        this.DeselectAll();
        this.bars[position.x].style.fill = constants.colorSelected;
    }

    DeselectAll() {
        for ( let i = 0 ; i < this.bars.length; i++ ) {
            this.bars[i].style.fill = constants.colorUnselected;
        }
    }


}

