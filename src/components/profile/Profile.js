import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import ProfileAddress from './ProfileAddress';
import { getCurrentProfile } from '../../actions/profile-action';

export const Profile = ({ getCurrentProfile, auth }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  const createdDate = () => {
    const date = auth.user.date.split('-');
    return `${date[2].slice(0, 2)}-${date[1]}-${date[0]}`;
  };

  return (
    <div>
      <h1 className='large '>
        <i className='fas fa-user' /> My Profile
      </h1>

      <form>
        <div className='form-group'>
          <label htmlFor='text'>Name</label>
          <input
            className='form-control'
            type='text'
            value={auth.user.name}
            disabled
          />
        </div>

        <div className='form-group'>
          <label htmlFor='text'>Email</label>
          <input
            className='form-control'
            type='text'
            value={auth.user.email}
            disabled
          />
        </div>
        {auth && <p>Account created on {createdDate()}</p>}
      </form>

      <ProfileAddress />

      <h3 className='mt-4 mb-3'>
        <span>
          <i className='fas fa-unlock-alt'></i> Change Your Password
        </span>
      </h3>
      <form
      // onSubmit={onSubmit}
      >
        <div className='form-group'>
          <label htmlFor='text'>Old Password</label>
          <input
            className='form-control'
            type='password'
            name='oldPassword'
            // value={oldPassword}
            // onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='text'>New Password</label>
          <input
            className='form-control'
            type='password'
            name='newPassword'
            // value={newPassword}
            // onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='text'>Confirm New Password</label>
          <input
            className='form-control'
            type='password'
            name='confirmNewPassword'
            // value={confirmNewPassword}
            // onChange={onChange}
          />
        </div>
        <div className='d-flex justify-content-between'>
          <button className='btn'>
            <i className='fas fa-save'></i> Save
          </button>
          <button className='btn btn-danger mr-0'>
            <i className='fas fa-user-times'></i> Delete Account
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
