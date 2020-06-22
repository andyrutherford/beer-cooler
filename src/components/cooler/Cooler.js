import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CoolerList from './CoolerList';

import { coolerRemoveAll } from '../../actions/cooler-action';
import { getCurrentProfile } from '../../actions/profile-action';

const Cooler = ({
  coolerRemoveAll,
  getCurrentProfile,
  cooler,
  isAuthenticated,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return (
    <section>
      <h1 className='large '>
        <i className='fas fa-shopping-cart'></i> My Cooler
      </h1>

      <div>
        <CoolerList />
        {cooler.length > 0 && (
          <div className='mt-3 d-flex justify-content-between'>
            <button
              className='btn btn-danger'
              onClick={() => coolerRemoveAll()}
            >
              <i className='fas fa-times'></i> Remove All
            </button>
            {isAuthenticated ? (
              <Link to='/checkout'>
                <button className='btn btn-primary'>
                  Checkout <i className='fas fa-chevron-right'></i>
                </button>
              </Link>
            ) : (
              <Link to={{ pathname: '/login', checkout: true }}>
                <button className='btn btn-primary'>
                  Checkout <i className='fas fa-chevron-right'></i>
                </button>
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  cooler: state.cooler.cooler,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { coolerRemoveAll, getCurrentProfile })(
  Cooler
);
