// React libraries
import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

// Pages
import { Login, Signup } from './pages';

const App = () => {
  return (
    <>
      <Router basename='/'>
        <Switch>
          <Route exact path='/login'><Login /></Route>
          <Route exact path='/signup'><Signup /></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
