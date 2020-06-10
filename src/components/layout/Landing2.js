import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import video from '../../img/video3.mp4';

const Landing2 = () => {
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
              <Link to='/beers' className='btn btn-primary'>
                Browse
              </Link>
              <Link to='/login' className='btn btn-light'>
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default connect()(Landing2);
