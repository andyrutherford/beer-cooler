import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState();
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError();

    if (email === '') {
      setLoading(false);
      return setError('Please enter a valid email.');
    } else {
      try {
        console.log(email);
        const res = await axios.post('http://localhost:3000/password/forgot', {
          email,
        });
        console.log(res.data);

        if (res.data === 'no user found') {
          setShowError(true);
          setLoading(false);
          setError('An account was not found with the provided email.');
        } else if (res.data === 'recovery email sent') {
          setShowError(false);
          setLoading(false);
          setSuccess(true);
        }
      } catch (error) {
        setLoading(false);
        console.log(error.data);
      }
    }
  };

  return (
    <div className='login-form'>
      <h1>
        <i className='fas fa-unlock'></i> Reset your password{' '}
      </h1>
      <hr />
      {success ? (
        <p>
          Please check your email for further instructions on how to reset your
          password.
        </p>
      ) : (
        <form onSubmit={onSubmit} className='mb-2'>
          <div className='form-group'>
            <label>
              We will send you an email with instructions on how to reset your
              password.
            </label>

            <input
              type='email'
              className='form-control mb-2'
              name='email'
              onChange={onChange}
              value={email}
              placeholder='name@example.com'
            />
            {error && <p className='text-danger'>{error}</p>}
            {loading && <p>Please wait...</p>}
          </div>
          <button type='submit' className='btn btn-primary mb-1'>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default connect()(ForgotPassword);
