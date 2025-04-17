<template>
    <section class="instructions">
      <h2>How to Use the Heart Rate Monitor</h2>
      <ol>
        <li>
          <strong>Open the Application</strong>:
          Launch the app in a web browser on a device with a camera and flashlight (preferably a smartphone). Ensure you’re in a well-lit environment and have granted camera permissions.
        </li>
        <li>
          <strong>Position Your Finger</strong>:
          Place your fingertip gently over the camera lens, ensuring it covers both the camera and the flashlight (if available). Hold your finger steady to minimize movement.
        </li>
        <li>
          <strong>Start Monitoring</strong>:
          Tap the BPM display to begin heart rate monitoring. The camera and flashlight will activate, and a graph will show brightness changes.
        </li>
        <li>
          <strong>Wait for Stabilization</strong>:
          Keep your finger in place and wait at least 10 seconds for the measurement to stabilize. The BPM value will update as it refines, typically settling within 30–200 BPM.
        </li>
        <li>
          <strong>Stop Monitoring to Fixate the Number</strong>:
          Once the BPM value stabilizes, tap the BPM display again to stop monitoring. This will fixate the final heart rate number, and the camera will turn off.
        </li>
        <li>
          <strong>Review the Result</strong>:
          Note the final BPM value. The graph will freeze, showing the captured signal.
        </li>
        <li>
          <strong>Repeat if Needed</strong>:
          To take another measurement, repeat from step 2.
        </li>
      </ol>
      <p><strong>Tips for Best Results</strong>:</p>
      <ul>
        <li>Avoid sudden movements or changes in lighting.</li>
        <li>Ensure your finger fully covers the camera and flashlight.</li>
        <li>Use strong ambient lighting if the flashlight is unavailable.</li>
      </ul>
      <p><strong>Note</strong>: This app is for general wellness and not a medical device. Consult a healthcare professional for medical-grade assessments.</p>
    </section>
  </template>
  
  <script>
  export default {
    name: 'Instructions',
  };
  </script>
  
  <style scoped>
  .instructions {
    padding: 20px;
    background: var(--graph-background, #313244);
    border-radius: var(--border-radius-large, 12px);
    color: var(--page-color, #cdd6f4);
    max-width: 600px;
    margin: 20px auto;
    text-align: justify;
  }
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
  
  ol, ul {
    padding-left: 20px;
    margin-bottom: 15px;
  }
  
  li {
    margin-bottom: 10px;
    line-height: 1.5;
  }
  
  p {
    margin: 10px 0;
  }
  
  strong {
    color: var(--graph-color, #f38ba8);
  }
  </style>