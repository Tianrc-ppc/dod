import statesStore from '@/stores/states';

const states = statesStore();

export const keyboardHandler = (key, down, up) => {
  const ratio = states.variable.horizontal.keyboard;
  up && (key === 'ArrowRight' || key === '6') && (states.capture.keyboard.movement = 0);
  up && (key === 'ArrowLeft' || key === '4') && (states.capture.keyboard.movement = 0);
  up && key.toUpperCase() === 'D' && (states.capture.keyboard.movement = 0);
  up && key.toUpperCase() === 'A' && (states.capture.keyboard.movement = 0);
  down && (key === 'ArrowRight' || key === '6') && (states.capture.keyboard.movement = +1.0 * ratio);
  down && (key === 'ArrowLeft' || key === '4') && (states.capture.keyboard.movement = -1.0 * ratio);
  down && key.toUpperCase() === 'D' && (states.capture.keyboard.movement = +1.0 * ratio);
  down && key.toUpperCase() === 'A' && (states.capture.keyboard.movement = -1.0 * ratio);
  down && key === ' ' && (states.capture.stopped = !states.capture.stopped);
  down && key === 'Enter' && (states.capture.stopped = !states.capture.stopped);
};

export const faceHandler = (current) => {
  const previous = states.capture.face.location;
  states.capture.face.location = current;
  if (previous !== null) {
    const ratio = -states.variable.horizontal.face;
    const gap = (current - previous) * ratio;
    const lhs = -states.variable.horizontal.activate <= gap;
    const rhs = states.variable.horizontal.activate >= gap;
    states.capture.face.movement = lhs && rhs ? 0 : gap;
  }
};

export const handHandler = (current) => {
  const previous = states.capture.hand.location;
  states.capture.hand.location = current;
  if (previous !== null) {
    const ratio = -states.variable.horizontal.hand;
    const gap = (current - previous) * ratio;
    const lhs = -states.variable.horizontal.activate <= gap;
    const rhs = states.variable.horizontal.activate >= gap;
    states.capture.hand.movement = lhs && rhs ? 0 : gap;
  }
};

export const mouseHandler = (current) => {
  const previous = states.capture.mouse.location;
  states.capture.mouse.location = current;
  if (previous !== null) {
    const ratio = states.variable.horizontal.mouse;
    const gap = (current - previous) * ratio;
    const lhs = -states.variable.horizontal.activate <= gap;
    const rhs = states.variable.horizontal.activate >= gap;
    states.capture.mouse.movement = lhs && rhs ? 0 : gap;
  }
};
