import configStore from '@/stores/config';
import statesStore from '@/stores/states';
import { unsupportedUserAgent } from '@/utils/mediapipe';

const config = configStore();
const states = statesStore();

const reloadFrameCaptureStates = () => {
  states.capture.direction = states.capture.stopped = states.capture.score = 0;
  states.capture.keyboard = { location: null, movement: 0 };
  states.capture.face = { location: null, movement: 0 };
  states.capture.hand = { location: null, movement: 0 };
  states.capture.mouse = { location: null, movement: 0 };
  states.frame.height = states.height; // dynamic set game canvas height
  states.frame.width = states.width; // dynamic set game canvas width
  states.frame.getContext('2d').clearRect(0, 0, states.width, states.height);
};

const reloadDimensionZooming = () => {
  states.variable.dimension.platform.h = states.height * config.zooming.dimension.platform.h;
  states.variable.dimension.platform.w = states.width * config.zooming.dimension.platform.w;
  states.variable.dimension.broken.h = states.height * config.zooming.dimension.broken.h;
  states.variable.dimension.broken.w = states.width * config.zooming.dimension.broken.w;
  states.variable.dimension.spring.h = states.height * config.zooming.dimension.spring.h;
  states.variable.dimension.spring.w = states.width * config.zooming.dimension.spring.w;
  states.variable.dimension.bomber.h = states.height * config.zooming.dimension.bomber.h;
  states.variable.dimension.bomber.w = states.width * config.zooming.dimension.bomber.w;
  states.variable.dimension.player.h = states.height * config.zooming.dimension.player.h;
  states.variable.dimension.player.w = states.width * config.zooming.dimension.player.w;
  states.variable.dimension.ground.h = states.height * config.zooming.dimension.ground.h;
  states.variable.dimension.ground.w = states.width * config.zooming.dimension.ground.w;
};

const reloadVerticalZooming = () => {
  states.variable.vertical.gravity = states.height * config.zooming.vertical.gravity;
  states.variable.vertical.upper = states.height * config.zooming.vertical.upper;
  states.variable.vertical.lower = states.height * config.zooming.vertical.lower;
  states.variable.vertical.falling = states.height * config.zooming.vertical.falling;
};

const reloadHorizontalZooming = () => {
  states.variable.horizontal.platform = states.width * config.zooming.horizontal.platform;
  states.variable.horizontal.activate = states.width * config.zooming.horizontal.activate;
  states.variable.horizontal.keyboard = states.width * config.zooming.horizontal.keyboard;
  states.variable.horizontal.face = states.width * config.zooming.horizontal.face;
  states.variable.horizontal.hand = states.width * config.zooming.horizontal.hand;
  states.variable.horizontal.mouse = states.width * config.zooming.horizontal.mouse;
};

const reloadSensitiveCustomize = () => {
  states.variable.vertical.gravity *= config.sensitive.gravity;
  states.variable.vertical.upper *= config.sensitive.strength;
  states.variable.vertical.lower *= config.sensitive.strength;
  states.variable.horizontal.platform *= config.sensitive.platform;
  states.variable.horizontal.keyboard *= config.sensitive.keyboard;
  states.variable.horizontal.face *= config.sensitive.face;
  states.variable.horizontal.hand *= config.sensitive.hand;
  states.variable.horizontal.mouse *= config.sensitive.mouse;
};

export const resetPlatformCounts = () => (config.platforms = 10);
export const resetKeyboardSwitcher = () => (config.operate.keyboard = !0);
export const resetFaceSwitcher = () => (config.operate.face = !0 && !unsupportedUserAgent(navigator.userAgent));
export const resetHandSwitcher = () => (config.operate.hand = !1 && !unsupportedUserAgent(navigator.userAgent));
export const resetMouseSwitcher = () => (config.operate.mouse = unsupportedUserAgent(navigator.userAgent));
export const resetSpringPercentage = () => (config.spring = 8 / 100);
export const resetBomberPercentage = () => (config.bomber = 1 / 100);
export const resetGravityAdapter = () => (config.sensitive.gravity = 1.0);
export const resetStrengthAdapter = () => (config.sensitive.strength = 1.0);
export const resetPlatformAdapter = () => (config.sensitive.platform = 1.0);
export const resetKeyboardSensitivity = () => (config.sensitive.keyboard = 1.0);
export const resetFaceSensitivity = () => (config.sensitive.face = 1.0);
export const resetHandSensitivity = () => (config.sensitive.hand = 1.0);
export const resetMouseSensitivity = () => (config.sensitive.mouse = 1.0);
export const resetStorage = () => localStorage.clear();

export const resetGameBasicConfig = () => {
  resetPlatformCounts();
  resetSpringPercentage();
  resetBomberPercentage();
};

export const resetSwitcherConfig = () => {
  resetKeyboardSwitcher();
  resetFaceSwitcher();
  resetHandSwitcher();
  resetMouseSwitcher();
};

export const resetAdapterConfig = () => {
  resetGravityAdapter();
  resetStrengthAdapter();
  resetPlatformAdapter();
};

export const resetSensitivityConfig = () => {
  resetKeyboardSensitivity();
  resetFaceSensitivity();
  resetHandSensitivity();
  resetMouseSensitivity();
};

export const resetConfig = () => {
  resetPlatformCounts();
  resetGameBasicConfig();
  resetSwitcherConfig();
  resetAdapterConfig();
  resetSensitivityConfig();
};

export const resetStates = () => {
  reloadFrameCaptureStates();
  reloadDimensionZooming();
  reloadVerticalZooming();
  reloadHorizontalZooming();
  reloadSensitiveCustomize();
};
