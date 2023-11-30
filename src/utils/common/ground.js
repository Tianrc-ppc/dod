import statesStore from '@/stores/states';
import GameComponent from '@/utils/common/basic';
import { drawGround } from '@/utils/draw';

const states = statesStore();

export default class Ground extends GameComponent {
  constructor() {
    super(null, states.variable.dimension.ground);
    this.specifyPositionX('m');
    this.specifyPositionY('d');
    this.removed = false;
  }

  allowCollision() {
    return !this.removed;
  }

  drawCanvas() {
    !this.removed && super.drawCanvas(drawGround);
  }
}
