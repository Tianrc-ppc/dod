import configStore from '@/stores/config';
import statesStore from '@/stores/states';
import { drawPlatformMoving } from '@/utils/draw';
import Platform from '@/utils/platform/platform';

const config = configStore();
const states = statesStore();

export default class MovingPlatform extends Platform {
  constructor() {
    super(Math.random(), config.platforms, states.variable.dimension.platform);
    this.speed = 1 * states.variable.horizontal.platform;
  }

  allowCollision() {
    return true; // allow all
  }

  drawCanvas() {
    super.drawCanvas(drawPlatformMoving);
  }
}
