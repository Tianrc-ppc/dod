import configStore from '@/stores/config';
import statesStore from '@/stores/states';
import { detectBomber, detectGround, detectPlatform, detectSpring } from '@/utils/collision';
import BrokenPlatform from '@/utils/platform/broken';
import FakePlatform from '@/utils/platform/fake';
import MovingPlatform from '@/utils/platform/moving';
import NormalPlatform from '@/utils/platform/normal';
import OncePlatform from '@/utils/platform/once';

const config = configStore();
const states = statesStore();

export const processMovementA = () => {
  const limit = (states.height - states.player.height) / 2;
  const lhs = states.capture.keyboard.movement + states.capture.face.movement;
  const rhs = states.capture.mouse.movement + states.capture.hand.movement;
  lhs + rhs > 0 && (states.capture.direction = 1);
  lhs + rhs < 0 && (states.capture.direction = 0);
  const movement = { position: { x: true, y: false }, speed: { x: false, y: true } };
  states.player.updateSpeedX(movement.speed.x ? states.variable.vertical.gravity : null);
  states.player.updateSpeedY(movement.speed.y ? states.variable.vertical.gravity : null);
  states.player.movePositionX(movement.position.x ? lhs + rhs : 0);
  states.player.movePositionY(movement.position.y ? lhs + rhs : 0);
  const scroll = states.player.y < limit && states.player.speed.y < 0;
  scroll || states.player.movePositionY();
};

export const processMovementB = () => {
  const upper = (cmp, val) => states.player.x > cmp && (states.player.x = val);
  const lower = (cmp, val) => states.player.x < cmp && (states.player.x = val);
  const exceed = states.player.y + states.player.height > states.height;
  states.player && upper(states.width, -states.player.width);
  states.player && lower(-states.player.width, states.width);
  const lhs = states.platforms.filter((i) => i.platform instanceof NormalPlatform);
  const rhs = states.platforms.filter((i) => i.platform instanceof MovingPlatform);
  const broken = states.platforms.map((i) => i.broken).filter((i) => i);
  lhs.map((i) => i.platform).forEach((i) => (i.x < 0 || i.x + i.width > states.width) && (i.speed *= -1));
  rhs.map((i) => i.platform).forEach((i) => (i.x < 0 || i.x + i.width > states.width) && (i.speed *= -1));
  lhs.forEach((i) => (i.platform.x += i.platform.speed));
  lhs.forEach((i) => i.spring && (i.spring.x += i.platform.speed));
  lhs.forEach((i) => i.bomber && (i.bomber.x += i.platform.speed));
  rhs.forEach((i) => (i.platform.x += i.platform.speed));
  rhs.forEach((i) => i.spring && (i.spring.x += i.platform.speed));
  rhs.forEach((i) => i.bomber && (i.bomber.x += i.platform.speed));
  broken.forEach((i) => (i.y += states.variable.vertical.falling));
  states.ground.removed && exceed && states.player.killPlayer();
};

export const processScrolling = () => {
  const limit = (states.height - states.player.height) / 2;
  const scroll = states.player.y < limit && states.player.speed.y < 0;
  const spring = scroll && states.platforms.map((i) => i.spring).filter((i) => i);
  const bomber = scroll && states.platforms.map((i) => i.bomber).filter((i) => i);
  const broken = scroll && states.platforms.map((i) => i.broken).filter((i) => i);
  const platform = scroll && states.platforms.map((i) => i.platform).filter((i) => i);
  states.capture.score += scroll; // add score when scroll activated
  scroll && spring.forEach((i) => (i.y -= states.player.speed.y));
  scroll && bomber.forEach((i) => (i.y -= states.player.speed.y));
  scroll && broken.forEach((i) => (i.y -= states.player.speed.y));
  scroll && platform.forEach((i) => (i.y -= states.player.speed.y));
  scroll && (states.ground.y -= states.player.speed.y);
};

export const processVisualize = () => {
  states.frame.getContext('2d').clearRect(0, 0, states.width, states.height);
  states.player && states.player.finalizeFacing();
  states.player && states.player.drawCanvas();
  states.ground && states.ground.drawCanvas();
  const spring = states.platforms.map((i) => i.spring).filter((i) => i);
  const bomber = states.platforms.map((i) => i.bomber).filter((i) => i);
  const broken = states.platforms.map((i) => i.broken).filter((i) => i);
  const platform = states.platforms.map((i) => i.platform).filter((i) => i);
  spring.forEach((i) => i.drawCanvas());
  bomber.forEach((i) => i.drawCanvas());
  broken.forEach((i) => i.drawCanvas());
  platform.forEach((i) => i.drawCanvas());
};

export const processCollision = () => {
  detectGround(() => states.player.jumpLower());
  detectSpring((node) => node.spring.activateSpring() || states.player.jumpUpper());
  detectBomber((node) => node.bomber.activateBomber() || states.player.killPlayer());
  detectPlatform((node) => {
    const normal = node.platform instanceof NormalPlatform;
    const moving = node.platform instanceof MovingPlatform;
    const once = node.platform instanceof OncePlatform;
    const valid = normal || moving || once;
    valid && states.player.jumpLower();
    node.platform instanceof FakePlatform && node.platform.activatePlatform();
    node.platform instanceof OncePlatform && node.platform.activatePlatform();
    if (node.platform instanceof FakePlatform) {
      node.broken = new BrokenPlatform();
      node.broken.x = node.platform.x;
      node.broken.y = node.platform.y;
      node.broken.appear = true;
    }
  });
};

export const processRefreshes = () => {
  const dead = states.player.status.dead;
  const spring = dead && states.platforms.map((i) => i.spring).filter((i) => i);
  const bomber = dead && states.platforms.map((i) => i.bomber).filter((i) => i);
  const broken = dead && states.platforms.map((i) => i.broken).filter((i) => i);
  const platform = dead && states.platforms.map((i) => i.platform).filter((i) => i);
  dead && spring.forEach((i) => (i.y += states.variable.vertical.falling * 1.5));
  dead && bomber.forEach((i) => (i.y += states.variable.vertical.falling * 1.5));
  dead && broken.forEach((i) => (i.y += states.variable.vertical.falling * 1.5));
  dead && platform.forEach((i) => (i.y += states.variable.vertical.falling * 1.5));
  dead && (states.player.speed.y *= 0);
  dead && (states.player.speed.x *= 1);
  dead && (states.player.y += states.variable.vertical.falling);
  dead && states.player.y > states.height && (states.capture.stopped = 1) && states.logout();
  states.ground.y > states.height && (states.ground.removed = true);
  for (let i = 0; i < config.platforms; ++i) {
    if (states.platforms[i].platform.y > states.height) {
      const rewrite = states.platforms[i].platform.y - states.height;
      states.platforms[i].spring = null;
      states.platforms[i].bomber = null;
      states.platforms[i].broken = null;
      states.platforms[i].platform = null;
      states.factory.generatePlatform(i, rewrite);
    }
  }
};
