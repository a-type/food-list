import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ListPage } from './pages/ListPage';
import { DevicesPage } from './pages/DevicesPage';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Switch>
        <Route path="/" exact>
          <ListPage />
        </Route>
        <Route path="/devices">
          <DevicesPage />
        </Route>
      </Switch>
    </ErrorBoundary>
  );
}

export default App;
