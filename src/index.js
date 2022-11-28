import React from 'react';

import { createRoot } from 'react-dom/client';

import App from './jsx/App.jsx';
import Figure07 from './jsx/Figure07.jsx';
import Figure10 from './jsx/Figure10.jsx';
import Figure01 from './jsx/Figure01.jsx';

const AppRoot = document.getElementById('app-root-2022-rmt_report');
if (AppRoot) {
  const root = createRoot(AppRoot);
  root.render(<App />);
}

const Figure07Root = document.getElementById('app-root-2022-rmt_report_figure_07');
if (Figure07Root) {
  const root = createRoot(Figure07Root);
  root.render(<Figure07 />);
}

const Figure10Root = document.getElementById('app-root-2022-rmt_report_figure_10');
if (Figure10Root) {
  const root = createRoot(Figure10Root);
  root.render(<Figure10 />);
}

const Figure01Root = document.getElementById('app-root-2022-rmt_report_figure_01');
if (Figure01Root) {
  const root = createRoot(Figure01Root);
  root.render(<Figure01 />);
}
