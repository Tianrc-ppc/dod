import configStore from '@/stores/config';
import statesStore from '@/stores/states';

const config = configStore();
const states = statesStore();

export default class GameComponent {
  constructor(position, dimension) {
    this.y = position instanceof Array ? position[1] : 0;
    this.x = position instanceof Array ? position[0] : 0;
    this.height = dimension ? dimension.h : 0;
    this.width = dimension ? dimension.w : 0;
    this.stroke = config.stroke.colors[config.stroke.current++];
    config.stroke.current %= config.stroke.colors.length;
  }

  specifyPositionY(type) {
    const gap = states.height - this.height;
    type === 'm' && (this.y = gap / 2);
    type === 'd' && (this.y = gap);
    type === 'u' && (this.y = 0);
  }

  specifyPositionX(type) {
    const gap = states.width - this.width;
    type === 'm' && (this.x = gap / 2);
    type === 'r' && (this.x = gap);
    type === 'l' && (this.x = 0);
  }

  drawCanvas(action) {
    action(this.stroke, this.x, this.y, this.width, this.height);
  }
}
