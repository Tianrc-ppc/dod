import statesStore from '@/stores/states';
import GameComponent from '@/utils/common/basic';

const states = statesStore();

export default class Platform extends GameComponent {
  constructor(random, counts, dimension) {
    super(null, dimension);
    const status = { length: states.platforms.length, offset: this.width };
    this.y = (states.height * status.length) / counts;
    this.x = (states.width - status.offset) * random;
  }
}
