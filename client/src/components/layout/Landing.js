import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import video from '../../img/video2.mp4';

const Landing2 = ({ isAuthenticated }) => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <div className='video-container'>
            <video autoPlay muted loop>
              <source src={video}></source>
            </video>
          </div>
          <div className='content'>
            <h1 className='x-large'>The Beer Cooler</h1>
            <p className='lead'>
              Browse our extensive selection of beers from all around the world
            </p>
            <div className='buttons'>
              <Link to='/beers' className='btn btn-primary mr-3'>
                Browse <i className='fas fa-chevron-right'></i>
              </Link>
              {!isAuthenticated && (
                <Link to='/login' className='btn btn-light'>
                  <i className='fas fa-sign-in-alt'></i> Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing2);
