import React, { useState } from 'react';
import { connect } from 'react-redux';

import { changePassword, deleteUser } from '../../actions/auth-action';
import { setAlert } from '../../actions/alert-action';

export const ProfilePassword = ({ changePassword, deleteUser, setAlert }) => {
  const [userData, setUserData] = useState({
    oldPassword: '',
    password1: '',
    password2: '',
  });

  const onChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // All fields are required
    if (
      userData.oldPassword === '' ||
      userData.password1 === '' ||
      userData.password2 === ''
    ) {
      return setAlert('All fields are required.');
    }
    if (userData.password1 !== userData.password2) {
      return setAlert('The new passwords do not match');
    }
    if (userData.password1.length < 6) {
      return setAlert('Your password must be a minimum of 6 characters.');
    }
    if (userData.oldPassword === userData.password1) {
      return setAlert(
        'The new password must be different from the old password.'
      );
    }
    changePassword({
      oldPassword: userData.oldPassword,
      newPassword: userData.password1,
    });
  };

  return (
    <div>
      <h2 className='mt-4'>
        <i className='fas fa-key'></i> Change Your Password
      </h2>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Old Password</label>
          <input
            className='form-control'
            type='password'
            name='oldPassword'
            value={userData.oldPassword}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='text'>New Password</label>
          <input
            className='form-control'
            type='password'
            name='password1'
            value={userData.password1}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='text'>Confirm New Password</label>
          <input
            className='form-control'
            type='password'
            name='password2'
            value={userData.password2}
            onChange={onChange}
          />
        </div>
        <div className='d-flex justify-content-between'>
          <button className='btn btn-primary'>
            <i className='fas fa-save'></i> Save
          </button>
        </div>
      </form>{' '}
      <button
        className='btn btn-danger mr-0 mt-4'
        name='delete-account'
        onClick={() => deleteUser()}
      >
        <i className='fas fa-user-times'></i> Delete Account
      </button>
    </div>
  );
};

export default connect(null, { changePassword, setAlert, deleteUser })(
  ProfilePassword
);
