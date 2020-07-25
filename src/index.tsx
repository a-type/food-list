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
import { BugoutProvider } from './contexts/BugoutContext';
import { BrowserRouter } from 'react-router-dom';

const notifier = new SimpleNotifier<ServiceWorkerRegistration>();

const anchorOrigin = {
  vertical: 'top' as const,
  horizontal: 'left' as const,
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <SnackbarProvider anchorOrigin={anchorOrigin}>
          <UpdateListener notifier={notifier} />
          <ListProvider>
            <BugoutProvider>
              <App />
            </BugoutProvider>
          </ListProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.register({
  onUpdate: notifier.notify,
});
