import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getCurrentProfile } from '../../actions/profile-action';

export const Profile = ({ getCurrentProfile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return <div>profile</div>;
};

export default connect(null, { getCurrentProfile })(Profile);
