import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import RichContentApp from '../shared/RichContentApp';
import 'react-reflex/styles.css';
import ExampleApp from './ExampleApp';
import './styles.global.scss';
import { isMobile } from './utils';

const locales = require.context(
  'wix-rich-content-common/dist/statics/locale', // context folder
  false, // include subdirectories
  /.json/ // RegExp
);
const allLocales = locales
  .keys()
  .map(name => name.substring(name.indexOf('_') + 1, name.indexOf('.json')));

ReactDOM.render(
  <RichContentApp
    app={ExampleApp}
    allLocales={allLocales}
    mode="demo"
    debounce={1000}
    isMobile={isMobile()}
  />,
  document.getElementById('root')
);
registerServiceWorker();
