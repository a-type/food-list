import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ListProvider } from './contexts/ListContext';
import { SnackbarProvider } from 'notistack';

import './index.css';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { lightTheme } from './theme/theme';
import { UpdateListener } from './components/UpdateListener';
import { SimpleNotifier } from './SimpleNotifier';

const notifier = new SimpleNotifier<ServiceWorkerRegistration>();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />

      <SnackbarProvider>
        <UpdateListener notifier={notifier} />
        <ListProvider>
          <App />
        </ListProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.register({
  onUpdate: notifier.notify,
});
