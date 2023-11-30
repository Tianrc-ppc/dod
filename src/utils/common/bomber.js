import statesStore from '@/stores/states';
import GameComponent from '@/utils/common/basic';
import { drawBomberA, drawBomberB } from '@/utils/draw';

const states = statesStore();

export default class Bomber extends GameComponent {
  constructor(platform) {
    super(null, states.variable.dimension.bomber);
    this.y = platform.y - platform.height - this.height / 3;
    this.x = platform.x + (platform.width - this.width) / 2;
    this.activated = false;
  }

  allowCollision() {
    return !this.activated;
  }

  activateBomber() {
    this.activated = true;
  }

  drawCanvas() {
    !this.activated && super.drawCanvas(drawBomberA);
    this.activated && super.drawCanvas(drawBomberB);
  }
}
