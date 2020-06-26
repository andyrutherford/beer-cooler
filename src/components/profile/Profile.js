import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ProfileAddress from './ProfileAddress';
import ProfilePassword from './ProfilePassword';
import { getCurrentProfile } from '../../actions/profile-action';

import { formatDate } from '../../utils/formatDate';

export const Profile = ({ getCurrentProfile, auth, address }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <div>
      <div className='d-flex justify-content-between align-items-center'>
        <h1 className='large'>
          <i className='fas fa-user-circle'></i> My Profile
        </h1>
        <Link to='/my-orders'>My Order History</Link>
      </div>

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
        {auth && <p>Account created on {formatDate(auth.user.date)}</p>}
      </form>

      <ProfileAddress />
      <ProfilePassword />
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  address: state.profile.address,
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
