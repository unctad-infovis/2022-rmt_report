import React from 'react';

import { createRoot } from 'react-dom/client';

import App from './jsx/App.jsx';
import Figure01 from './jsx/Figure01.jsx';
import Figure02 from './jsx/Figure02.jsx';
import Figure022 from './jsx/Figure022.jsx';
import Figure032 from './jsx/Figure032.jsx';
import Figure041 from './jsx/Figure041.jsx';
import Figure0431 from './jsx/Figure0431.jsx';
import Figure05 from './jsx/Figure05.jsx';
import Figure07 from './jsx/Figure07.jsx';
import Figure10 from './jsx/Figure10.jsx';

const AppRoot = document.getElementById('app-root-2022-rmt_report');
if (AppRoot) {
  const root = createRoot(AppRoot);
  root.render(<App />);
}

const Figure01Root = document.getElementById('app-root-2022-rmt_report_figure_01');
if (Figure01Root) {
  const root = createRoot(Figure01Root);
  root.render(<Figure01 />);
}

const Figure02Root = document.getElementById('app-root-2022-rmt_report_figure_02');
if (Figure02Root) {
  const root = createRoot(Figure02Root);
  root.render(<Figure02 />);
}

const Figure022Root = document.getElementById('app-root-2022-rmt_report_figure_022');
if (Figure022Root) {
  const root = createRoot(Figure022Root);
  root.render(<Figure022 />);
}

const Figure032Root = document.getElementById('app-root-2022-rmt_report_figure_032');
if (Figure032Root) {
  const root = createRoot(Figure032Root);
  root.render(<Figure032 />);
}

const Figure041Root = document.getElementById('app-root-2022-rmt_report_figure_041');
if (Figure041Root) {
  const root = createRoot(Figure041Root);
  root.render(<Figure041 />);
}

const Figure0431Root = document.getElementById('app-root-2022-rmt_report_figure_0431');
if (Figure0431Root) {
  const root = createRoot(Figure0431Root);
  root.render(<Figure0431 />);
}

const Figure05Root = document.getElementById('app-root-2022-rmt_report_figure_05');
if (Figure05Root) {
  const root = createRoot(Figure05Root);
  root.render(<Figure05 />);
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
