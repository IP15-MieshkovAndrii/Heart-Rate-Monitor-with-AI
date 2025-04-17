import FFT from 'fft.js';

export const heartRateMonitor = (function () {
  const IMAGE_WIDTH = 30;
  const IMAGE_HEIGHT = 30;
  const SAMPLE_BUFFER = [];
  const MAX_SAMPLES = 512; 
  const SAMPLE_RATE = 60; 
  const MIN_BPM = 30;
  const MAX_BPM = 200; 
  const BPM_MOVING_AVERAGE_WINDOW = 5; 
  const BPM_HISTORY = [];
  const START_DELAY = 1500;

  let ON_BPM_CHANGE;
  let VIDEO_ELEMENT;
  let SAMPLING_CANVAS;
  let SAMPLING_CONTEXT;
  let GRAPH_CANVAS;
  let GRAPH_CONTEXT;
  let GRAPH_COLOR;
  let GRAPH_WIDTH;
  let VIDEO_STREAM;
  let MONITORING = false;

  const publicMethods = {};

  const averageBrightness = (canvas, context) => {
    const pixelData = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let sum = 0;
    for (let i = 0; i < pixelData.length; i += 4) {
      sum += pixelData[i] + pixelData[i + 1]; 
    }
    const avg = sum / (pixelData.length * 0.5);
    return avg / 255;
  };

  publicMethods.initialize = (config) => {
    VIDEO_ELEMENT = config.videoElement;
    SAMPLING_CANVAS = config.samplingCanvas;
    GRAPH_CANVAS = config.graphCanvas;
    GRAPH_COLOR = config.graphColor;
    GRAPH_WIDTH = config.graphWidth;
    ON_BPM_CHANGE = config.onBpmChange;
    SAMPLING_CONTEXT = SAMPLING_CANVAS.getContext('2d', { willReadFrequently: true });
    GRAPH_CONTEXT = GRAPH_CANVAS.getContext('2d');

    if (!navigator.mediaDevices) {
      console.error('Camera access is required but not supported.');
      return false;
    }

    window.addEventListener('resize', handleResize);
    handleResize();
  };

  const handleResize = () => {
    GRAPH_CANVAS.width = GRAPH_CANVAS.clientWidth;
    GRAPH_CANVAS.height = GRAPH_CANVAS.clientHeight;
  };

  publicMethods.startMonitoring = async () => {
    resetBuffer();
    handleResize();

    const camera = await getCamera();
    VIDEO_STREAM = await startCameraStream(camera);

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

    setTimeout(() => {
      monitorLoop();
    }, START_DELAY);
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
    } catch (error) {
      console.error('Error stopping monitoring:', error);
    }
  };

  const getCamera = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === 'videoinput');
    return cameras[cameras.length - 1];
  };

  const startCameraStream = async (camera) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: camera.deviceId,
          facingMode: ['user', 'environment'],
          width: { ideal: IMAGE_WIDTH },
          height: { ideal: IMAGE_HEIGHT },
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
    window.requestAnimationFrame(monitorLoop);
  };

  const resetBuffer = () => {
    SAMPLE_BUFFER.length = 0;
    BPM_HISTORY.length = 0;
  };

  const processFrame = () => {
    SAMPLING_CONTEXT.drawImage(VIDEO_ELEMENT, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
    const value = averageBrightness(SAMPLING_CANVAS, SAMPLING_CONTEXT);
    const time = Date.now();

    SAMPLE_BUFFER.push({ value, time });
    if (SAMPLE_BUFFER.length > MAX_SAMPLES) {
      SAMPLE_BUFFER.shift();
    }

    const dataStats = analyzeData(SAMPLE_BUFFER);
    const bpm = calculateBpm(SAMPLE_BUFFER);
    if (bpm && Number.isFinite(bpm) && bpm >= MIN_BPM && bpm <= MAX_BPM) {
      BPM_HISTORY.push(bpm);
      if (BPM_HISTORY.length > BPM_MOVING_AVERAGE_WINDOW) {
        BPM_HISTORY.shift();
      }
      const avgBpm =
        BPM_HISTORY.reduce((a, b) => a + b, 0) / BPM_HISTORY.length;
      ON_BPM_CHANGE(Math.round(avgBpm));
    }
    drawGraph(dataStats);
  };

  const analyzeData = (samples) => {
    if (samples.length === 0) {
      return { average: 0, min: 0, max: 0, range: 0 };
    }
    const average = samples.reduce((a, c) => a + c.value, 0) / samples.length;
    let min = samples[0].value;
    let max = samples[0].value;
    samples.forEach((sample) => {
      if (sample.value > max) max = sample.value;
      if (sample.value < min) min = sample.value;
    });
    const range = max - min;
    return { average, min, max, range };
  };

  const calculateBpm = (samples) => {
    if (samples.length < MAX_SAMPLES) return null;

    const values = samples.map((s) => s.value);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const signal = values.map((v) => v - mean);

    const fft = new FFT(MAX_SAMPLES);
    const out = fft.createComplexArray();
    fft.realTransform(out, signal);

    const magnitudes = new Array(MAX_SAMPLES / 2);
    for (let i = 0; i < MAX_SAMPLES / 2; i++) {
      const real = out[i * 2];
      const imag = out[i * 2 + 1];
      magnitudes[i] = Math.sqrt(real * real + imag * imag);
    }

    let maxMagnitude = 0;
    let maxIndex = 0;
    for (let i = 0; i < magnitudes.length; i++) {
      if (magnitudes[i] > maxMagnitude) {
        maxMagnitude = magnitudes[i];
        maxIndex = i;
      }
    }

    const freqPerBin = SAMPLE_RATE / MAX_SAMPLES;
    const dominantFreq = maxIndex * freqPerBin;
    const bpm = dominantFreq * 60;

    return bpm;
  };

  const drawGraph = (dataStats) => {
    const xScaling = GRAPH_CANVAS.width / MAX_SAMPLES;
    const xOffset = (MAX_SAMPLES - SAMPLE_BUFFER.length) * xScaling;

    GRAPH_CONTEXT.lineWidth = GRAPH_WIDTH;
    GRAPH_CONTEXT.strokeStyle = GRAPH_COLOR;
    GRAPH_CONTEXT.lineCap = 'round';
    GRAPH_CONTEXT.lineJoin = 'round';
    GRAPH_CONTEXT.clearRect(0, 0, GRAPH_CANVAS.width, GRAPH_CANVAS.height);
    GRAPH_CONTEXT.beginPath();

    const maxHeight = GRAPH_CANVAS.height - GRAPH_CONTEXT.lineWidth * 2;
    let previousY = 0;
    SAMPLE_BUFFER.forEach((sample, i) => {
      const x = xScaling * i + xOffset;
      let y = GRAPH_CONTEXT.lineWidth;
      if (dataStats.max !== dataStats.min) {
        y =
          (maxHeight * (sample.value - dataStats.min)) / (dataStats.max - dataStats.min) +
          GRAPH_CONTEXT.lineWidth;
      }
      if (y !== previousY && Number.isFinite(y)) {
        GRAPH_CONTEXT.lineTo(x, y);
      }
      previousY = y;
    });

    GRAPH_CONTEXT.stroke();
  };

  return publicMethods;
})();