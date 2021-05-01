import { $ } from './$';
import * as event from './event';
import * as scroll from './scroll';
import * as clipboard from './clipboard';
import * as page from './page';
import * as viewport from './viewport';
import * as style from './style';
import * as router from './router';

import { canUseDom } from './canUseDom';

export * from './types';

export {
  $,
  canUseDom,
  event,
  scroll,
  clipboard,
  page,
  viewport,
  style,
  router,
};

export default {
  $,
  canUseDom,
  event,
  scroll,
  clipboard,
  page,
  viewport,
  style,
  router,
};
