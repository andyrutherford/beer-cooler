import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from './PrivateRoute';
import ProductList from '../ProductList';
import ProductPage from '../ProductPage';
import Cooler from '../cooler/Cooler';
import Signup from '../Signup';
import Login from '../Login';
import Profile from '../profile/Profile';

export const Routes = () => {
  return (
    <section className='container'>
      <ToastContainer />
      <Switch>
        <Route exact path='/' component={ProductList} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/my-profile' component={Profile} />
        <Route exact path='/beers/:id' component={ProductPage} />
        <Route exact path='/cooler' component={Cooler} />
      </Switch>
    </section>
  );
};
