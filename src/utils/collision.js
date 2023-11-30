import statesStore from '@/stores/states';

const states = statesStore();

const detectCollision = (lhs, rhs) => {
  const ly = { a: lhs.y, b: lhs.y + lhs.height };
  const lx = { a: lhs.x, b: lhs.x + lhs.width };
  const ry = { a: rhs.y, b: rhs.y + rhs.height };
  const rx = { a: rhs.x, b: rhs.x + rhs.width };
  const horizontal = Math.min(lx.b, rx.b) - Math.max(lx.a, rx.a);
  const vertical = Math.min(ly.b, ry.b) - Math.max(ly.a, ry.a);
  return horizontal >= 0 && vertical >= 0;
};

export const detectGround = (action) => {
  const alive = !states.player.status.dead && states.player.speed.y > 0;
  const match = () => states.ground && detectCollision(states.player, states.ground);
  const valid = () => states.ground && states.ground.allowCollision();
  alive && valid() && match() && action(states.ground);
};

export const detectSpring = (action) => {
  const alive = !states.player.status.dead && states.player.speed.y > 0;
  const select = states.platforms.filter((i) => alive && i.spring && i.spring.allowCollision());
  const matched = select.filter((i) => detectCollision(states.player, i.spring));
  matched.forEach((i) => action(i));
};

export const detectBomber = (action) => {
  const alive = !states.player.status.dead && states.player.speed.y > 0;
  const select = states.platforms.filter((i) => alive && i.bomber && i.bomber.allowCollision());
  const matched = select.filter((i) => detectCollision(states.player, i.bomber));
  matched.forEach((i) => action(i));
};

export const detectPlatform = (action) => {
  const alive = !states.player.status.dead && states.player.speed.y > 0;
  const select = states.platforms.filter((i) => alive && i.platform && i.platform.allowCollision());
  const matched = select.filter((i) => detectCollision(states.player, i.platform));
  matched.forEach((i) => action(i));
};
