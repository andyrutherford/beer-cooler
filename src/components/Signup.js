import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signupUser } from '../actions/auth-action';
import { setAlert } from '../actions/alert-action';

const Signup = ({ signupUser, setAlert, isAuthenticated }) => {
  let history = useHistory();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  // If isAuthenticated, redirect to '/'
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
      setAlert('Your account has been created successfully.');
    }
  }, [isAuthenticated, history, setAlert]);

  const fill = () => {
    setUserData({
      name: 'John',
      email: 'john@gmail.com',
      password: '123456',
      password2: '123456',
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
    if (
      userData.name === '' ||
      userData.email === '' ||
      userData.password === '' ||
      userData.password2 === ''
    ) {
      return setAlert('All fields must be filled in.');
    }

    if (userData.password.length < 6) {
      return setAlert('The password is too short.');
    }

    if (userData.password !== userData.password2) {
      return setAlert('The passwords do not match.');
    }

    signupUser({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });
  };

  return (
    <div className='signup-form'>
      <h1>
        <i className='fas fa-user-plus'></i> Create an account{' '}
        <button onClick={fill}>Fill</button>
      </h1>
      <form onSubmit={onSubmitHandler} className='mt-4 mb-2'>
        <div className='form-group'>
          <input
            type='string'
            className='form-control mb-4'
            name='name'
            onChange={onChangeHandler}
            value={userData.name}
            placeholder='Name'
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            className='form-control mb-4'
            name='email'
            onChange={onChangeHandler}
            value={userData.email}
            placeholder='Email'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            className='form-control'
            name='password'
            onChange={onChangeHandler}
            value={userData.password}
            placeholder='Password'
          />
          <small className='form-text text-muted'>
            Your password must contain a minimum of 6 characters.
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            className='form-control mt-3 mb-4'
            name='password2'
            onChange={onChangeHandler}
            value={userData.password2}
            placeholder='Confirm Password'
          />
        </div>
        <div className='form-actions d-flex justify-content-between'>
          <Link
            to='/forgot_password'
            className='btn pull-left btn-link text-muted pl-0'
          >
            Forgot password?
          </Link>
          <div>
            <Link to='/login' className='btn btn-link text-muted mr-4'>
              Log in
            </Link>
            <button type='submit' className='btn btn-primary mb-1'>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signupUser, setAlert })(Signup);
