import React from 'react';
import { render } from 'react-dom';

import { Home } from './components/home/Home';

// Renders Home component on #app id
render(
  <Home />,
  document.getElementById('app')
);