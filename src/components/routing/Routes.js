import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from './PrivateRoute';
import ProductList from '../ProductList';
import ProductPage from '../ProductPage';
import Cooler from '../cooler/Cooler';
import ReviewOrder from '../cooler/ReviewOrder';
import Signup from '../Signup';
import Login from '../Login';
import ForgotPassword from '../profile/forgotPassword/ForgotPassword';
import ResetPassword from '../profile/forgotPassword/ResetPassword';
import Profile from '../profile/Profile';

export const Routes = () => {
  return (
    <section className='container'>
      <ToastContainer />
      <Switch>
        <Route exact path='/beers' component={ProductList} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/forgot_password' component={ForgotPassword} />
        <Route exact path='/reset_password/:token' component={ResetPassword} />
        <PrivateRoute exact path='/my-profile' component={Profile} />
        <Route exact path='/beers/:id' component={ProductPage} />
        <Route exact path='/cooler' component={Cooler} />
        <Route exact path='/cooler/review' component={ReviewOrder} />
      </Switch>
    </section>
  );
};
