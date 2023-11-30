import statesStore from '@/stores/states';
import GameComponent from '@/utils/common/basic';
import { drawPlayerA, drawPlayerB, drawPlayerC, drawPlayerD } from '@/utils/draw';

const states = statesStore();

export default class Player extends GameComponent {
  constructor() {
    super(null, states.variable.dimension.player);
    this.specifyPositionX('m');
    this.specifyPositionY('d');
    this.status = { face: 0, dead: false };
    this.upper = states.variable.vertical.upper;
    this.lower = states.variable.vertical.lower;
    this.speed = { x: 0, y: -this.lower };
  }

  killPlayer() {
    this.status.dead = true;
  }

  jumpUpper() {
    this.speed.y = -this.upper;
  }

  jumpLower() {
    this.speed.y = -this.lower;
  }

  movePositionY(moving) {
    this.y += moving !== null && moving !== undefined ? moving : this.speed.y;
  }

  movePositionX(moving) {
    this.x += moving !== null && moving !== undefined ? moving : this.speed.x;
  }

  updateSpeedY(moving) {
    this.speed.y += moving !== null && moving !== undefined ? moving : 0;
  }

  updateSpeedX(moving) {
    this.speed.x += moving !== null && moving !== undefined ? moving : 0;
  }

  finalizeFacing() {
    const gap = 5 * states.variable.vertical.gravity;
    const lhs = -this.upper - gap <= this.speed.y && this.speed.y <= -this.upper;
    const rhs = -this.lower - gap <= this.speed.y && this.speed.y <= -this.lower;
    states.capture.direction !== 0 && (this.status.face = 0);
    states.capture.direction !== 1 && (this.status.face = 1);
    this.status.face === 0 && (lhs || rhs) && (this.status.face = 2);
    this.status.face === 1 && (lhs || rhs) && (this.status.face = 3);
  }

  drawCanvas() {
    this.status.face === 0 && super.drawCanvas(drawPlayerA);
    this.status.face === 1 && super.drawCanvas(drawPlayerB);
    this.status.face === 2 && super.drawCanvas(drawPlayerC);
    this.status.face === 3 && super.drawCanvas(drawPlayerD);
  }
}
