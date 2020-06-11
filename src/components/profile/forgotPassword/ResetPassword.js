import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const ResetPassword = ({ match }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    updated: false,
    isLoading: true,
    error: false,
  });

  useEffect(() => {
    const requestReset = async () => {
      try {
        const res = await axios.get('http://localhost:3000/password/reset', {
          params: {
            resetPasswordToken: match.params.token,
          },
        });

        console.log(res.data);

        if (res.data.message === 'password reset successful') {
          setFormData({
            ...formData,
            email: res.data.email,
            update: false,
            isLoading: false,
            error: false,
          });
        } else {
          setFormData({
            ...formData,
            update: false,
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
    try {
      const res = await axios.put('http://localhost:3000/password/update', {
        email: formData.email,
        password: formData.password,
      });

      console.log(res.data);

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
