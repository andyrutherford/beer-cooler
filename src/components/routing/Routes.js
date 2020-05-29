import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ProductList from '../ProductList';
import ProductPage from '../ProductPage';
import Cooler from '../cooler/Cooler';
import Alert from '../layout/Alert';
import Signup from '../Signup';
import Login from '../Login';

export const Routes = () => {
  return (
    <section className='container'>
      <Alert />

      <Switch>
        <Route exact path='/' component={ProductList} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/beers/:id' component={ProductPage} />
        <Route exact path='/cooler' component={Cooler} />
      </Switch>
    </section>
  );
};
