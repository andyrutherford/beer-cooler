import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ProductList from '../ProductList';
import ProductPage from '../ProductPage';
import Cooler from '../cooler/Cooler';
import Alert from '../layout/Alert';

export const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/' component={ProductList} />
        <Route exact path='/beers/:id' component={ProductPage} />
        <Route exact path='/cooler' component={Cooler} />
      </Switch>
    </section>
  );
};
