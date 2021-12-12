import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Appearance from './Appearance';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    <Appearance.Provider>
      <App />
    </Appearance.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorkerRegistration.register();
