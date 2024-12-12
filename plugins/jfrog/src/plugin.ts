import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const jfrogPlugin = createPlugin({
  id: 'jfrog',
  routes: {
    root: rootRouteRef,
  },
});

export const JfrogPage = jfrogPlugin.provide(
  createRoutableExtension({
    name: 'JfrogPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
