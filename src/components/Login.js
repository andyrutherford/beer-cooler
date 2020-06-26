import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../actions/auth-action';
import { setAlert } from '../actions/alert-action';
import { coolerCheckoutAsGuest } from '../actions/cooler-action';

const Login = ({
  loginUser,
  setAlert,
  isAuthenticated,
  location,
  coolerCheckoutAsGuest,
}) => {
  let history = useHistory();
  const { checkout } = location;

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  // If isAuthenticated, redirect to '/beers'
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/beers');
      setAlert('You have successfully logged in.');
    }
  }, [isAuthenticated, history, setAlert]);

  const testAccount = () => {
    setUserData({
      email: 'john@gmail.com',
      password: '123456',
    });
  };

  const onChangeHandler = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (userData.email === '' || userData.password === '') {
      return setAlert('Please enter a valid email and password.');
    }

    if (userData.password.length < 6) {
      return setAlert('The password must be at least 6 characters.');
    }

    loginUser({
      email: userData.email,
      password: userData.password,
    });
  };

  return (
    <div className='login-form'>
      <h1>
        <i className='fas fa-sign-in-alt'></i> Login{' '}
      </h1>
      Just testing?{' '}
      <button className='btn btn-link p-0' onClick={testAccount}>
        Login to a test account
      </button>
      <form onSubmit={onSubmitHandler} className='mt-4 mb-2'>
        <div className='form-group'>
          <input
            type='email'
            className='form-control mb-4'
            name='email'
            placeholder='Email'
            onChange={onChangeHandler}
            value={userData.email}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            className='form-control'
            name='password'
            placeholder='Password'
            onChange={onChangeHandler}
            value={userData.password}
          />
          <small className='form-text text-muted'>
            Your password must contain a minimum of 6 characters.
          </small>
        </div>
        <div className='form-actions d-flex justify-content-between'>
          <Link
            to='/forgot_password'
            className='btn pull-left btn-link text-muted pl-0'
          >
            Forgot password?
          </Link>
          <div>
            <Link to='/signup' className='btn btn-link text-muted mr-4'>
              Sign Up
            </Link>
            <button type='submit' className='btn btn-primary mb-1'>
              Submit
            </button>
          </div>
        </div>
        {checkout && (
          <div>
            <hr />
            <Link to='/checkout' onClick={() => coolerCheckoutAsGuest()}>
              Checkout as a Guest
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  loginUser,
  setAlert,
  coolerCheckoutAsGuest,
})(Login);
