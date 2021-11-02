import React from 'react';
import { add } from './util';
const App = () => {
  return <h3>Welcome {add(Math.round(Math.random() * 5), 3)}</h3>;
};
export default App;
