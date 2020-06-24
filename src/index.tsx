import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './web/routes'
import * as serviceWorker from './serviceWorker';
import { ConfigProvider } from 'antd';
import { AppContainer } from './containers/AppContainer';

ReactDOM.render(
  <AppContainer>
    <ConfigProvider>
      <AppRouter></AppRouter>
    </ConfigProvider>
  </AppContainer>


  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
