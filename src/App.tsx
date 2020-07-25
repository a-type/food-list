import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ListPage } from './pages/ListPage';
import { DevicesPage } from './pages/DevicesPage';

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <ListPage />
      </Route>
      <Route path="/devices">
        <DevicesPage />
      </Route>
    </Switch>
  );
}

export default App;
