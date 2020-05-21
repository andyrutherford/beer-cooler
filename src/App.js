import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Navbar } from './components/layout/Navbar';
import { Routes } from './components/routing/Routes';
import { ProductList } from './components/ProductList';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route component={Routes} />
      </Switch>
    </Router>
  );
};

export default App;
