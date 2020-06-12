import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const ResetPassword = ({ match }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    updated: false,
    isLoading: true,
    tokenError: false,
    error: '',
  });

  useEffect(() => {
    const requestReset = async () => {
      try {
        const res = await axios.get('http://localhost:3000/password/reset', {
          params: {
            resetPasswordToken: match.params.token,
          },
        });

        if (res.data.message === 'password reset successful') {
          setFormData({
            ...formData,
            email: res.data.email,
            updated: false,
            isLoading: false,
            error: false,
          });
        } else {
          setFormData({
            ...formData,
            updated: false,
            isLoading: false,
            error: true,
          });
        }
      } catch (error) {
        console.log(error.data);
      }
    };
    requestReset();
  }, []);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      error: '',
    });
    if (formData.password === '' || formData.confirmPassword === '') {
      return setFormData({
        ...formData,
        error: 'Both password fields are required.',
      });
    }

    if (formData.password !== formData.confirmPassword) {
      return setFormData({
        ...formData,
        error: 'The passwords do not match.',
      });
    }

    try {
      const res = await axios.put('http://localhost:3000/password/update', {
        email: formData.email,
        password: formData.password,
      });

      if (res.data.message === 'password updated') {
        setFormData({
          ...formData,
          updated: true,
          error: false,
        });
      } else {
        setFormData({
          ...formData,
          updated: false,
          error: true,
        });
      }
    } catch (error) {
      console.log(error.data);
    }
  };

  return (
    <div className='login-form'>
      <h1>
        <i className='fas fa-unlock'></i> Reset your password{' '}
      </h1>
      <hr />
      {formData.tokenError || formData.error ? (
        <p>
          A problem occurred. Please request a new password{' '}
          <Link to='/forgot_password'>here</Link>.
        </p>
      ) : formData.updated ? (
        <p>Your password has been reset.</p>
      ) : (
        <form onSubmit={updatePassword} className='mb-2'>
          <div className='form-group'>
            <label>Please create a new password:</label>

            <input
              type='password'
              className='form-control mb-2'
              name='password'
              onChange={onChange}
              value={formData.password}
            />
            <small className='form-text text-muted'>
              Your password must contain a minimum of 6 characters.
            </small>
            <label className='mt-2'>Confirm password:</label>
            <input
              type='password'
              className='form-control mb-2'
              name='confirmPassword'
              onChange={onChange}
              value={formData.confirmPassword}
            />
          </div>
          {formData.error && <p className='text-danger'>{formData.error}</p>}
          <button type='submit' className='btn btn-primary mb-1'>
            Submit
          </button>
          <button
            type='reset'
            className='btn btn-default mb-1 ml-3'
            onClick={() => setFormData({ ...formData, error: '' })}
          >
            Reset
          </button>
        </form>
      )}
    </div>
  );

  if (formData.error) {
    return (
      <div>
        <h4>Problem. Please try again.</h4>
      </div>
    );
  } else if (formData.isLoading) {
    return <div>Loading user data...</div>;
  } else {
    return (
      <div>
        <form onSubmit={updatePassword}>
          <input
            label='password'
            onChange={onChange}
            name='password'
            value={formData.password}
            type='password'
          />
          <input type='submit' label='Submit' />
        </form>
      </div>
    );
  }
};

export default ResetPassword;
