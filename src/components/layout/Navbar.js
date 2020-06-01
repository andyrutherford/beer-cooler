import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logoutUser } from '../../actions/auth-action';

const Navbar = ({ cooler, logoutUser, isAuthenticated }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/my-profile'>My Profile</Link>
      </li>

      <li>
        <a onClick={logoutUser} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
      <li>
        {cooler === 0 ? (
          <Link to='/cooler'>My Cooler</Link>
        ) : (
          <Link to='/cooler'>My Cooler ({cooler})</Link>
        )}
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <NavLink to='/login'>Login</NavLink>
      </li>
      <li>
        <NavLink to='/signup'>Signup</NavLink>
      </li>
      <li>
        {cooler === 0 ? (
          <Link to='/cooler'>My Cooler</Link>
        ) : (
          <Link to='/cooler'>My Cooler ({cooler})</Link>
        )}
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-beer'></i> BeerCooler{' '}
        </Link>
      </h1>
      {isAuthenticated ? authLinks : guestLinks}
    </nav>
  );
};

const mapStateToProps = (state) => ({
  cooler: state.cooler.cooler.length,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
