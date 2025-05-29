import { v4 as uuidv4 } from 'uuid';

export const heartRateMonitor = (function () {
  const IMAGE_WIDTH = 300;
  const IMAGE_HEIGHT = 300;
  const FPS = 30;
  const SAMPLE_BUFFER = [];
  const VALID_FRAME_THRESHOLD = 60;
  const PULSE_THRESHOLD = -60;
  const MAX_PERIODS = 20;
  const AVERAGE_SIZE = 20;
  const MIN_PERIOD = 0.4; 
  const MAX_PERIOD = 1.5;
  const INVALID_ENTRY = -100;

  let VIDEO_ELEMENT;
  let SAMPLING_CANVAS;
  let SAMPLING_CONTEXT;
  let ON_BPM_CHANGE;
  let ON_STATUS_CHANGE;
  let VIDEO_STREAM;
  let MONITORING = false;
  let VALID_FRAME_COUNTER = 0;
  let MEASUREMENT_STARTED = false;
  let PULSE_DETECTOR;
  let HUE_FILTER;
  let TIMER;
  let LAST_VALID_BPM = 0; 

  const publicMethods = {};

  class PulseDetector {
    constructor() {
      this.upVals = new Array(AVERAGE_SIZE).fill(INVALID_ENTRY);
      this.downVals = new Array(AVERAGE_SIZE).fill(INVALID_ENTRY);
      this.upValIndex = 0;
      this.downValIndex = 0;
      this.lastVal = 0;
      this.periods = new Array(MAX_PERIODS).fill(INVALID_ENTRY);
      this.periodTimes = new Array(MAX_PERIODS).fill(INVALID_ENTRY);
      this.periodIndex = 0;
      this.wasDown = false;
      this.periodStart = 0;
    }

    addNewValue(newVal, time) {
      if (newVal > 0) {
        this.upVals[this.upValIndex] = newVal;
        this.upValIndex = (this.upValIndex + 1) % AVERAGE_SIZE;
      }
      if (newVal < 0) {
        this.downVals[this.downValIndex] = -newVal;
        this.downValIndex = (this.downValIndex + 1) % AVERAGE_SIZE;
      }

      const averageUp =
        this.upVals.filter((v) => v !== INVALID_ENTRY).reduce((sum, v) => sum + v, 0) /
          this.upVals.filter((v) => v !== INVALID_ENTRY).length || 1;
      const averageDown =
        this.downVals.filter((v) => v !== INVALID_ENTRY).reduce((sum, v) => sum + v, 0) /
          this.downVals.filter((v) => v !== INVALID_ENTRY).length || 1;

      if (newVal < -0.5 * averageDown) {
        this.wasDown = true;
      }
      if (newVal >= 0.5 * averageUp && this.wasDown) {
        this.wasDown = false;
        const period = time - this.periodStart;
        if (period < MAX_PERIOD && period > MIN_PERIOD) {
          this.periods[this.periodIndex] = period;
          this.periodTimes[this.periodIndex] = time;
          this.periodIndex = (this.periodIndex + 1) % MAX_PERIODS;
          // console.log('Period:', period); 
        }
        this.periodStart = time;
      }

      return newVal < -0.5 * averageDown ? -1 : newVal > 0.5 * averageUp ? 1 : 0;
    }

    getAverage() {
      const now = performance.now() / 1000;
      const validPeriods = this.periods
        .map((p, i) => ({ period: p, time: this.periodTimes[i] }))
        .filter((p) => p.period !== INVALID_ENTRY && now - p.time < 10);
      if (validPeriods.length > 1) {
        const recentPeriods = validPeriods.slice(-5);
        const avgPeriod =
          recentPeriods.reduce((sum, p) => sum + p.period, 0) / recentPeriods.length;
        return avgPeriod;
      }
      return PULSE_THRESHOLD;
    }

    reset() {
      this.upVals.fill(INVALID_ENTRY);
      this.downVals.fill(INVALID_ENTRY);
      this.periods.fill(INVALID_ENTRY);
      this.periodTimes.fill(INVALID_ENTRY);
      this.upValIndex = 0;
      this.downValIndex = 0;
      this.periodIndex = 0;
      this.wasDown = false;
      this.periodStart = 0;
    }

    getPeriods() {
      return this.periods.filter((p) => p !== INVALID_ENTRY);
    }
  }

  class BandPassFilter {
    constructor() {
      this.lastValue = 0;
      this.lastFiltered = 0;
      this.alpha = 0.1; 
      this.beta = 0.1;
    }

    processValue(value) {
      const highPass = value - this.lastValue;
      this.lastValue = value;
      const lowPass = this.alpha * highPass + (1 - this.alpha) * this.lastFiltered;
      this.lastFiltered = lowPass;
      return lowPass;
    }
  }

  function rgb2hsv({ red, green, blue }) {
    const r = red / 255;
    const g = green / 255;
    const b = blue / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    let h = 0;
    if (delta !== 0) {
      if (max === r) h = ((g - b) / delta) % 6;
      else if (max === g) h = (b - r) / delta + 2;
      else h = (r - g) / delta + 4;
      h *= 60;
      if (h < 0) h += 360;
    }
    const s = max === 0 ? 0 : delta / max;
    const v = max;
    return { h, s, v };
  }

  publicMethods.initialize = (config) => {
    VIDEO_ELEMENT = config.videoElement;
    SAMPLING_CANVAS = config.samplingCanvas;
    ON_BPM_CHANGE = config.onBpmChange;
    ON_STATUS_CHANGE = config.onStatusChange;
    SAMPLING_CONTEXT = SAMPLING_CANVAS.getContext('2d', { willReadFrequently: true });
    PULSE_DETECTOR = new PulseDetector();
    HUE_FILTER = new BandPassFilter();

    if (!navigator.mediaDevices) {
      console.error('Camera access is required but not supported.');
      return false;
    }
  };

  publicMethods.startMonitoring = async () => {
    VALID_FRAME_COUNTER = 0;
    MEASUREMENT_STARTED = false;
    PULSE_DETECTOR.reset();
    SAMPLE_BUFFER.length = 0;
    LAST_VALID_BPM = 0;

    VIDEO_STREAM = await startCameraStream();

    if (!VIDEO_STREAM) {
      throw new Error('Unable to start video stream');
    }

    try {
      await setTorchStatus(VIDEO_STREAM, true);
    } catch (e) {
      console.warn('Torch setup failed:', e);
    }

    SAMPLING_CANVAS.width = IMAGE_WIDTH;
    SAMPLING_CANVAS.height = IMAGE_HEIGHT;
    VIDEO_ELEMENT.srcObject = VIDEO_STREAM;
    VIDEO_ELEMENT.play();
    MONITORING = true;

    ON_BPM_CHANGE(0);
    monitorLoop();
  };

  publicMethods.stopMonitoring = async () => {
    try {
      if (VIDEO_STREAM) {
        VIDEO_STREAM.getVideoTracks().forEach((track) => track.stop());
        VIDEO_STREAM = null;
      }
      await setTorchStatus(VIDEO_STREAM, false);
      if (VIDEO_ELEMENT) {
        VIDEO_ELEMENT.pause();
        VIDEO_ELEMENT.srcObject = null;
      }
      MONITORING = false;
      if (TIMER) {
        clearInterval(TIMER);
        TIMER = null;
      }
      const periods = PULSE_DETECTOR.getPeriods();
      let intervalsMs = periods.map(seconds => seconds * 1000);

      let hrv = 0;
      if (intervalsMs.length > 4) {
          intervalsMs = intervalsMs.slice(3);
      }
      
      if (intervalsMs.length >= 2) {
          const successiveDifferences = intervalsMs.slice(1).map((val, i) => Math.abs(val - intervalsMs[i]));
          const squaredDifferences = successiveDifferences.map(val => val * val);
          
          if (squaredDifferences.length === 0) {
              hrv = 0;
          } else {
              const meanOfSquares = squaredDifferences.reduce((sum, val) => sum + val, 0) / squaredDifferences.length;
              hrv = Math.sqrt(meanOfSquares);
          }
      }

      let stress = 0;
      if (hrv > 0) {
          stress = Math.max(0, Math.min(100, 100 - hrv * 1.5));
      }

      const id = uuidv4();
      localStorage.setItem('heartRateData', JSON.stringify({
        id,
        bpm: LAST_VALID_BPM,
        hrv: parseInt(hrv),
        stress: parseInt(stress),
      }));

      let healthHistory = localStorage.getItem('healthHistory');
      healthHistory = healthHistory ? JSON.parse(healthHistory) : [];

      if (!Array.isArray(healthHistory)) {
          healthHistory = [];
      }
      healthHistory.push({
          id,
          date: Date.now(),
          data: {
              bpm: LAST_VALID_BPM,
              hrv: parseInt(hrv),
              stress: parseInt(stress)
          }
      });

      localStorage.setItem('healthHistory', JSON.stringify(healthHistory));
      ON_BPM_CHANGE(LAST_VALID_BPM);
      ON_STATUS_CHANGE('Cover the back camera until the image turns red 🟥');
    } catch (error) {
      console.error('Error stopping monitoring:', error);
    }
  };

  const getCamera = async () => {
    try {
      const initialStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment'
        }
      });

      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((device) => device.kind === 'videoinput' && device.deviceId !== '');
      initialStream.getTracks().forEach(track => track.stop());
      return cameras[cameras.length - 2] || null;
    } catch (error) {
      console.error('Failed to access camera:', error.message);
      return null;
    }
  };

  const startCameraStream = async () => {
    try {
      const camera = await getCamera();
      if (!camera || !camera.deviceId) {
        throw new Error('No valid camera found');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: { exact: camera.deviceId },
          facingMode: 'environment',
          width: { ideal: IMAGE_WIDTH },
          height: { ideal: IMAGE_HEIGHT },
          frameRate: { ideal: FPS },
        },
      });
      return stream;
    } catch (error) {
      console.error('Failed to access camera:', error.message);
      return null;
    }
  };

  const setTorchStatus = async (stream, status) => {
    try {
      if (!stream) return;
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities();
      if ('torch' in capabilities) {
        await track.applyConstraints({
          advanced: [{ torch: status }],
        });
      } else {
        console.warn('Torch is not supported on this device.');
      }
    } catch (error) {
      console.warn('Torch failed:', error.name, error.message);
    }
  };

  const monitorLoop = () => {
    if (!MONITORING) return;
    processFrame();
    requestAnimationFrame(monitorLoop);
  };

  const processFrame = () => {
    SAMPLING_CONTEXT.drawImage(VIDEO_ELEMENT, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
    const pixelData = SAMPLING_CONTEXT.getImageData(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT).data;
    let redSum = 0,
      greenSum = 0,
      blueSum = 0;
    for (let i = 0; i < pixelData.length; i += 4) {
      redSum += pixelData[i];
      greenSum += pixelData[i + 1];
      blueSum += pixelData[i + 2];
    }
    const pixelCount = pixelData.length / 4;
    const rgb = {
      red: redSum / pixelCount,
      green: greenSum / pixelCount,
      blue: blueSum / pixelCount,
    };
    const hsv = rgb2hsv(rgb);

    if (hsv.s > 0.4 && hsv.v > 0.4) {
      VALID_FRAME_COUNTER++;
      // console.log('Valid frame:', VALID_FRAME_COUNTER);
      ON_STATUS_CHANGE('Hold your index finger ☝️ still.');
      if (!MEASUREMENT_STARTED) {
        startMeasurement();
        MEASUREMENT_STARTED = true;
      }
      if (VALID_FRAME_COUNTER > VALID_FRAME_THRESHOLD) {
        const filtered = HUE_FILTER.processValue(hsv.h);
        // console.log('Filtered Hue:', filtered);
        PULSE_DETECTOR.addNewValue(filtered, performance.now() / 1000);
      }
    } else {
      VALID_FRAME_COUNTER = 0;
      MEASUREMENT_STARTED = false;
      PULSE_DETECTOR.reset();
      ON_STATUS_CHANGE('Cover the back camera until the image turns red 🟥');
      ON_BPM_CHANGE(0);
    }
  };

  const startMeasurement = () => {
    // console.log('Starting measurement');
    TIMER = setInterval(() => {
      const averagePeriod = PULSE_DETECTOR.getAverage();
      const pulse = averagePeriod !== PULSE_THRESHOLD ? Math.round(60 / averagePeriod) : 0;
      if (pulse > 0) LAST_VALID_BPM = pulse; // Store valid BPM
      // console.log('Calculated pulse:', pulse);
      ON_BPM_CHANGE(pulse);
    }, 1000);
  };

  return publicMethods;
})();