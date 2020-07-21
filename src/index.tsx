import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ListProvider } from './contexts/ListContext';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider>
      <ListProvider>
        <App />
      </ListProvider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.register();
