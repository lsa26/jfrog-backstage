import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { jfrogPlugin, JfrogPage } from '../src/plugin';

createDevApp()
  .registerPlugin(jfrogPlugin)
  .addPage({
    element: <JfrogPage />,
    title: 'Root Page',
    path: '/jfrog',
  })
  .render();
