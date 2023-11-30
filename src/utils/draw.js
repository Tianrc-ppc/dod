import bomberUrlA from '@/assets/extensions/bomber-a.png';
import bomberUrlB from '@/assets/extensions/bomber-b.png';
import springUrlA from '@/assets/extensions/spring-a.png';
import springUrlB from '@/assets/extensions/spring-b.png';
import groundUrl from '@/assets/platforms/ground.png';
import platformUrlA from '@/assets/platforms/platform-a.png';
import platformUrlB from '@/assets/platforms/platform-b.png';
import platformUrlC from '@/assets/platforms/platform-c.png';
import platformUrlD from '@/assets/platforms/platform-d.png';
import platformUrlE from '@/assets/platforms/platform-e.png';
import platformUrlF from '@/assets/platforms/platform-f.png';
import platformUrlG from '@/assets/platforms/platform-g.png';
import playerUrlA from '@/assets/player-a.png';
import playerUrlB from '@/assets/player-b.png';
import playerUrlC from '@/assets/player-c.png';
import playerUrlD from '@/assets/player-d.png';
import configStore from '@/stores/config';
import statesStore from '@/stores/states';

const config = configStore();
const states = statesStore();

const images = {
  groundImage: null,
  springImageA: null,
  springImageB: null,
  bomberImageA: null,
  bomberImageB: null,
  playerImageA: null,
  playerImageB: null,
  playerImageC: null,
  playerImageD: null,
  platformImageA: null,
  platformImageB: null,
  platformImageC: null,
  platformImageD: null,
  platformImageE: null,
  platformImageF: null,
  platformImageG: null
};

// ----------------------------------------------------------------

const loadImage = (resolve, image, field) => {
  images[field] && resolve(true); // use images as cache so each image load once
  const element = new Image(); // load images[field] before draw
  resolve && image && field && (element.src = image);
  resolve && image && field && (element.alt = field);
  element.onload = () => (images[field] = element) && resolve(!!1);
  element.onerror = () => (images[field] = null) || resolve(!!0);
};

export const loadGround = () => new Promise((resolve) => loadImage(resolve, groundUrl, 'groundImage'));
export const loadSpringA = () => new Promise((resolve) => loadImage(resolve, springUrlA, 'springImageA'));
export const loadSpringB = () => new Promise((resolve) => loadImage(resolve, springUrlB, 'springImageB'));
export const loadBomberA = () => new Promise((resolve) => loadImage(resolve, bomberUrlA, 'bomberImageA'));
export const loadBomberB = () => new Promise((resolve) => loadImage(resolve, bomberUrlB, 'bomberImageB'));

export const loadPlayerA = () => new Promise((resolve) => loadImage(resolve, playerUrlA, 'playerImageA'));
export const loadPlayerB = () => new Promise((resolve) => loadImage(resolve, playerUrlB, 'playerImageB'));
export const loadPlayerC = () => new Promise((resolve) => loadImage(resolve, playerUrlC, 'playerImageC'));
export const loadPlayerD = () => new Promise((resolve) => loadImage(resolve, playerUrlD, 'playerImageD'));

export const loadPlatformA = () => new Promise((resolve) => loadImage(resolve, platformUrlA, 'platformImageA'));
export const loadPlatformB = () => new Promise((resolve) => loadImage(resolve, platformUrlB, 'platformImageB'));
export const loadPlatformC = () => new Promise((resolve) => loadImage(resolve, platformUrlC, 'platformImageC'));
export const loadPlatformD = () => new Promise((resolve) => loadImage(resolve, platformUrlD, 'platformImageD'));
export const loadPlatformE = () => new Promise((resolve) => loadImage(resolve, platformUrlE, 'platformImageE'));
export const loadPlatformF = () => new Promise((resolve) => loadImage(resolve, platformUrlF, 'platformImageF'));
export const loadPlatformG = () => new Promise((resolve) => loadImage(resolve, platformUrlG, 'platformImageG'));

// ----------------------------------------------------------------

const drawImage = (field, stroke, dx, dy, dw, dh) => {
  states.frame.getContext('2d').strokeStyle = stroke; // specify stroke's color
  const image = images[field]; // draw images[field] after load
  const draw = image !== null || config.stroke.enabled;
  const rect = image === null || config.stroke.enabled;
  draw && states.frame.getContext('2d').drawImage(image, dx, dy, dw, dh);
  rect && states.frame.getContext('2d').strokeRect(dx, dy, dw, dh);
};

export const drawGround = (stroke, dx, dy, dw, dh) => drawImage('groundImage', stroke, dx, dy, dw, dh);
export const drawSpringA = (stroke, dx, dy, dw, dh) => drawImage('springImageA', stroke, dx, dy, dw, dh);
export const drawSpringB = (stroke, dx, dy, dw, dh) => drawImage('springImageB', stroke, dx, dy, dw, dh);
export const drawBomberA = (stroke, dx, dy, dw, dh) => drawImage('bomberImageA', stroke, dx, dy, dw, dh);
export const drawBomberB = (stroke, dx, dy, dw, dh) => drawImage('bomberImageB', stroke, dx, dy, dw, dh);

export const drawPlayerA = (stroke, dx, dy, dw, dh) => drawImage('playerImageA', stroke, dx, dy, dw, dh);
export const drawPlayerB = (stroke, dx, dy, dw, dh) => drawImage('playerImageB', stroke, dx, dy, dw, dh);
export const drawPlayerC = (stroke, dx, dy, dw, dh) => drawImage('playerImageC', stroke, dx, dy, dw, dh);
export const drawPlayerD = (stroke, dx, dy, dw, dh) => drawImage('playerImageD', stroke, dx, dy, dw, dh);

export const drawPlatformNormal = (stroke, dx, dy, dw, dh) => drawImage('platformImageA', stroke, dx, dy, dw, dh);
export const drawPlatformMoving = (stroke, dx, dy, dw, dh) => drawImage('platformImageB', stroke, dx, dy, dw, dh);
export const drawPlatformFakeA = (stroke, dx, dy, dw, dh) => drawImage('platformImageC', stroke, dx, dy, dw, dh);
export const drawPlatformFakeB = (stroke, dx, dy, dw, dh) => drawImage('platformImageD', stroke, dx, dy, dw, dh);
export const drawPlatformOnceA = (stroke, dx, dy, dw, dh) => drawImage('platformImageE', stroke, dx, dy, dw, dh);
export const drawPlatformOnceB = (stroke, dx, dy, dw, dh) => drawImage('platformImageF', stroke, dx, dy, dw, dh);
export const drawPlatformBroken = (stroke, dx, dy, dw, dh) => drawImage('platformImageG', stroke, dx, dy, dw, dh);
