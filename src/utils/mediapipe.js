import { FilesetResolver, HandLandmarker, PoseLandmarker } from '@mediapipe/tasks-vision';

const unsupported = ['micromessenger', 'qq', 'alipayclient'];
const detectors = { face: null, hand: null };

export const unsupportedUserAgent = (agent) => unsupported.some((i) => agent.toLowerCase().includes(i));
export const waitForBeginning = (sleep) => new Promise((resolve) => setTimeout(resolve, sleep));
export const detectFaceLandmarker = (video) => detectors.face.detectForVideo(video, performance.now());
export const detectHandLandmarker = (video) => detectors.hand.detectForVideo(video, performance.now());

export const createWebCamera = (activate, writer) => {
  return new Promise((resolve) => {
    const enable = navigator && navigator.mediaDevices;
    const video = document.createElement('video');
    const size = { width: 320, height: 240 };
    !enable && resolve(null); // use http without localhost
    const promise = navigator.mediaDevices.getUserMedia({ video: size, audio: false });
    promise.then((stream) => (video.srcObject = stream)); // set video input stream from web camera
    promise.then(() => (video.playsInline = true)); // enable inline play for mobile browser
    promise.then(() => (video.autoplay = true)); // enable auto play for all web browser
    promise.then(() => video.play()); // manual play video for shit wei xin browser
    promise.then(() => video.addEventListener('canplay', () => writer('Web camera activated.')));
    promise.then(() => video.addEventListener('loadeddata', () => activate(video, resolve)));
    promise.catch(() => resolve(null)); // return null when failed to open web camera
  });
};

export const getFaceActivator = async (video, resolve) => {
  console.log('Face video detector is activating ...'); // detect once
  detectors.face.detectForVideo(video, performance.now());
  console.log('Face video detector activated.');
  resolve(video); // return video object
};

export const getHandActivator = async (video, resolve) => {
  console.log('Hand video detector is activating ...'); // detect once
  detectors.hand.detectForVideo(video, performance.now());
  console.log('Hand video detector activated.');
  resolve(video); // return video object
};

export const createFaceDetector = async () => {
  if (!detectors.face) {
    try /* got exception when webgl not supported, for example shit wei xin browser */ {
      const vision = await FilesetResolver.forVisionTasks('./mediapipe-wasm');
      const assets = { modelAssetPath: `./mediapipe-models/pose_landmarker.task`, delegate: 'GPU' };
      const config = { baseOptions: assets, numPoses: 1, runningMode: 'video' };
      detectors.face = await PoseLandmarker.createFromOptions(vision, config);
    } catch (exception) {
      alert(exception);
    }
  }
};

export const createHandDetector = async () => {
  if (!detectors.hand) {
    try /* got exception when webgl not supported, for example shit wei xin browser */ {
      const vision = await FilesetResolver.forVisionTasks('./mediapipe-wasm');
      const assets = { modelAssetPath: `./mediapipe-models/hand_landmarker.task`, delegate: 'GPU' };
      const config = { baseOptions: assets, numHands: 1, runningMode: 'video' };
      detectors.hand = await HandLandmarker.createFromOptions(vision, config);
    } catch (exception) {
      alert(exception);
    }
  }
};
