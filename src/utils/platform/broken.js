import configStore from '@/stores/config';
import statesStore from '@/stores/states';
import { drawPlatformBroken } from '@/utils/draw';
import Platform from '@/utils/platform/platform';

const config = configStore();
const states = statesStore();

export default class BrokenPlatform extends Platform {
  constructor() {
    super(Math.random(), config.platforms, states.variable.dimension.broken);
    this.appear = false;
  }

  allowCollision() {
    return false; // deny all
  }

  drawCanvas() {
    this.appear && super.drawCanvas(drawPlatformBroken);
  }
}
