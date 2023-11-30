import statesStore from '@/stores/states';
import GameComponent from '@/utils/common/basic';
import { drawSpringA, drawSpringB } from '@/utils/draw';

const states = statesStore();

export default class Spring extends GameComponent {
  constructor(platform) {
    super(null, states.variable.dimension.spring);
    this.y = platform.y - platform.height - this.height / 3;
    this.x = platform.x + (platform.width - this.width) / 2;
    this.activated = false;
  }

  allowCollision() {
    return !this.activated;
  }

  activateSpring() {
    this.activated = true;
  }

  drawCanvas() {
    !this.activated && super.drawCanvas(drawSpringA);
    this.activated && super.drawCanvas(drawSpringB);
  }
}
