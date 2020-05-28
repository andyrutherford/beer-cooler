import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signupUser } from '../actions/user';

const Signup = ({ signupUser }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

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
    console.log('submit new user form');

    if (
      userData.name === '' ||
      userData.email === '' ||
      userData.password === '' ||
      userData.password2 === ''
    ) {
      return console.log('all fields must be filled in');
    }

    if (userData.password.length < 6) {
      return console.log('password is too short');
    }

    if (userData.password !== userData.password2) {
      return console.log('passwords do not match');
    }

    console.log('new user form data validated');

    signupUser({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });
  };

  return (
    <div>
      <h1>
        Create an account <button onClick={fill}>Fill</button>
      </h1>
      <form onSubmit={onSubmitHandler}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='string'
            className='form-control'
            placeholder='James'
            name='name'
            onChange={onChangeHandler}
            value={userData.name}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            className='form-control'
            placeholder='james@beercooler.com'
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
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            className='form-control'
            name='password2'
            onChange={onChangeHandler}
            value={userData.password2}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default connect(null, { signupUser })(Signup);
