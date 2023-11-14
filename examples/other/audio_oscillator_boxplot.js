// variables for audio
// put these in user controls ater
var currAudio = -1;
var audioPlay = true;
var duration = 0.3;
var vol = 0.5;

// audio setup
const AudioContext = window["AudioContext"] || window["webkitAudioContext"];
const audioContext = new AudioContext();
const compressor = audioContext.createDynamicsCompressor(); // create compressor for better audio quality
compressor.threshold.value = -50;
compressor.knee.value = 40;
compressor.ratio.value = 12;
compressor.attack.value = 0;
compressor.release.value = 0.25;
var gainMaster = audioContext.createGain(); // create master gain
gainMaster.gain.value = vol;
compressor.connect(gainMaster);
gainMaster.connect(audioContext.destination);

svg.addEventListener("keydown", function (e) {
  if (e.which == 32) {
    if (audioPlay) {
      playOscillator(currAudio);
    }
  }

  if (e.which === 39) {
    if (currAudio >= -1 && currAudio < _numBars - 1) {
      currAudio += 1;
      if (audioPlay) {
        playOscillator(currAudio);
      }
    }
  }

  if (e.which === 37) {
    if (currAudio > 0 && currAudio < _numBars) {
      currAudio -= 1;
      if (audioPlay) {
        playOscillator(currAudio);
      }
    }
  }

  if (e.which == 83) {
    audioPlay = !audioPlay;
  }
});

// an oscillator is created and destroyed whenever a window key (left arrow, right arrow, spacebar)
function playOscillator(curr_audio) {
  const t = audioContext.currentTime;

  // create oscillator
  const oscillator = audioContext.createOscillator();
  oscillator.type = "sine";

  let frequency = MIN_FREQUENCY;
  if (ymax != ymin && curr_audio > 0) {
    if (y_values == null) {
      frequency += ((height[curr_audio] - ymin) * (1000 - 100)) / (ymax - ymin);
    } else {
      frequency +=
        ((y_values[curr_audio] - ymin) * (1000 - 100)) / (ymax - ymin);
    }
  }
  oscillator.frequency.value = parseFloat(frequency);
  oscillator.start();

  // create gain for this event
  const gainThis = audioContext.createGain();
  gainThis.gain.setValueCurveAtTime(
    [0.5, 1, 0.5, 0.5, 0.5, 0.1, 1e-4],
    t,
    duration
  ); // this is what makes the tones fade out properly and not clip

  // create panning
  var panning = (curr_audio - _numBars / 2) / (_numBars / 2); // panning = -1 (left) to 1 (right) as x axis (curr_audio) goes from min to max
  const panner = audioContext.createStereoPanner();
  panner.pan.value = panning;
  oscillator.connect(gainThis);
  gainThis.connect(panner);
  panner.connect(compressor);

  // play sound for duration
  setTimeout(() => {
    panner.disconnect();
    gainThis.disconnect();
    oscillator.stop();
    oscillator.disconnect();
  }, duration * 1e3 * 2);
}
