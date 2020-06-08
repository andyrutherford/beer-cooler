import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import ProfileAddress from './ProfileAddress';
import ProfilePassword from './ProfilePassword';
import { getCurrentProfile } from '../../actions/profile-action';

export const Profile = ({ getCurrentProfile, auth, profile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

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
      <ProfilePassword />
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
