import configStore from '@/stores/config';
import statesStore from '@/stores/states';
import { drawPlatformFakeA, drawPlatformFakeB } from '@/utils/draw';
import Platform from '@/utils/platform/platform';

const config = configStore();
const states = statesStore();

export default class FakePlatform extends Platform {
  constructor() {
    super(Math.random(), config.platforms, states.variable.dimension.platform);
    this.activated = false;
  }

  allowCollision() {
    return !this.activated;
  }

  activatePlatform() {
    this.activated = true;
  }

  drawCanvas() {
    !this.activated && super.drawCanvas(drawPlatformFakeA);
    this.activated && super.drawCanvas(drawPlatformFakeB);
  }
}
