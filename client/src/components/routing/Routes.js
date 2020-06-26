import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from './PrivateRoute';
import ProductList from '../ProductList';
import ProductPage from '../ProductPage';
import Cooler from '../cooler/Cooler';
import Checkout from '../cooler/Checkout';
import ReviewOrder from '../cooler/ReviewOrder';
import OrderComplete from '../order/OrderComplete';
import Signup from '../Signup';
import Login from '../Login';
import ForgotPassword from '../profile/forgotPassword/ForgotPassword';
import ResetPassword from '../profile/forgotPassword/ResetPassword';
import Profile from '../profile/Profile';
import OrderHistory from '../order/OrderHistory';
import Spinner from '../layout/Spinner';

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
        <PrivateRoute exact path='/my-orders' component={OrderHistory} />
        <Route exact path='/beers/:id' component={ProductPage} />
        <Route exact path='/cooler' component={Cooler} />
        <Route exact path='/checkout' component={Checkout} />
        <Route exact path='/review-order' component={ReviewOrder} />
        <Route exact path='/my-orders/:id' component={OrderComplete} />
        <Route exact path='/spinner' component={Spinner} />
      </Switch>
    </section>
  );
};
