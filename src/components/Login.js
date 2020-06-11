import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../actions/auth-action';
import { setAlert } from '../actions/alert-action';

const Login = ({ loginUser, setAlert, isAuthenticated }) => {
  let history = useHistory();
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

  const fill = () => {
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
        <button onClick={fill}>Fill</button>
      </h1>
      <form onSubmit={onSubmitHandler} className='mb-2'>
        <div className='form-group'>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            className='form-control'
            name='email'
            onChange={onChangeHandler}
            value={userData.email}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password1'>Password</label>
          <input
            type='password'
            className='form-control'
            name='password'
            onChange={onChangeHandler}
            value={userData.password}
          />
          <small className='form-text text-muted'>
            Your password must contain a minimum of 6 characters.
          </small>
        </div>
        <button type='submit' className='btn btn-primary mb-1'>
          Submit
        </button>
      </form>
      <p>
        Don't have an account? <Link to='/signup'>Create one</Link>
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginUser, setAlert })(Login);
