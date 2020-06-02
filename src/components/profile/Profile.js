import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getCurrentProfile } from '../../actions/profile-action';

export const Profile = ({ getCurrentProfile, auth: { user }, profile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  useEffect(() => {
    console.log('profile has been loaded');
  }, [profile]);

  return (
    <div>
      <h1 className='large text-primary'>My Profile</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user.name}
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
