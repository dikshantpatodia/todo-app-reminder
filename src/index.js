import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Root from './containers/root';
import configureStore from './redux/configureStore';

import './css/index.scss';

function appInitializer({ store }) {
  render(
    <React.Fragment>
      <Provider store={store}>
        <Root />
      </Provider>
    </React.Fragment>,
    document.getElementById('root'),
  );
  return store;
}

const main = () => {
  // create the redux store instance
  const store = configureStore();
  appInitializer({ store });
};

try {
  main();
  console.info('App initialized');
} catch (err) {
  console.error('Unable to initialize app. See following error', err);
}
