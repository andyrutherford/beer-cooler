import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ProductList from '../ProductList';
import { ProductPage } from '../ProductPage';
import Cooler from '../Cooler';

export const Routes = () => {
  return (
    <section className='container'>
      <Switch>
        <Route exact path='/' component={ProductList} />
        <Route exact path='/beers/:name' component={ProductPage} />
        <Route exact path='/cooler' component={Cooler} />
      </Switch>
    </section>
  );
};
