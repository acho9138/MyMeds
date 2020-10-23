// React libraries
import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

// Pages
import { Login, Signup, Home } from './pages';

const App = () => {
  return (
    <>
      <Router basename='/'>
        <Switch>
          <Route exact path='/login'><Login /></Route>
          <Route exact path='/signup'><Signup /></Route>
          <Route exact path='/home'><Home /></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
