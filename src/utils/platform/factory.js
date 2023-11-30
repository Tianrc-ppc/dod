import configStore from '@/stores/config';
import statesStore from '@/stores/states';
import Bomber from '@/utils/common/bomber';
import Spring from '@/utils/common/spring';
import BrokenPlatform from '@/utils/platform/broken';
import FakePlatform from '@/utils/platform/fake';
import MovingPlatform from '@/utils/platform/moving';
import NormalPlatform from '@/utils/platform/normal';
import OncePlatform from '@/utils/platform/once';

const config = configStore();
const states = statesStore();

export default class PlatformFactory {
  constructor() {
    this.rules = Array.from(config.generator).reverse();
    this.mapper = {
      1: () => new NormalPlatform(),
      2: () => new MovingPlatform(),
      3: () => new FakePlatform(),
      4: () => new OncePlatform(),
      5: () => new BrokenPlatform()
    };
  }

  randomPlatform(match) {
    const length = match.kinds && match.kinds.length;
    const rand = match.kinds && Math.random;
    const wrap = match.kinds && Math.floor;
    return match.kinds[wrap(rand() * length)];
  }

  verifyPlatform(index) {
    const checker = (i) => states.platforms[mod(inc(i))].platform instanceof FakePlatform;
    const inc = (i) => i + states.platforms.length;
    const mod = (i) => i % states.platforms.length;
    return states.platforms.length && (checker(index - 1) || checker(index + 1));
  }

  generatePlatform(index, newy, newx) {
    const match = this.rules.find((i) => i.limit <= states.capture.score);
    const take = this.randomPlatform(match);
    const repl = this.verifyPlatform(index);
    const select = repl && take === 3 ? 1 : repl && take === 5 ? 1 : take;
    const lhs = (select === 1 || select === 2) && Math.random() < config.spring;
    const rhs = (select === 1 || select === 2) && Math.random() < config.bomber;
    const random = Math.random();
    const spring = lhs && rhs ? lhs && random < 0.5 : lhs;
    const bomber = lhs && rhs ? rhs && random > 0.5 : rhs;
    const platform = this.mapper[select]();
    newy !== null && newy !== undefined && (platform.y = newy);
    newx !== null && newx !== undefined && (platform.x = newx);
    states.platforms[index] = {
      spring: spring ? new Spring(platform) : null,
      bomber: bomber ? new Bomber(platform) : null,
      broken: null,
      platform: platform
    };
  }
}
