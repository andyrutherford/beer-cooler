import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ProductList from '../ProductList';
import ProductPage from '../ProductPage';
import Cooler from '../cooler/Cooler';

export const Routes = () => {
  return (
    <section className='container'>
      <Switch>
        <Route exact path='/' component={ProductList} />
        <Route exact path='/beers/:id' component={ProductPage} />
        <Route exact path='/cooler' component={Cooler} />
      </Switch>
    </section>
  );
};
