import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logoutUser } from '../../actions/auth-action';

const Navbar = ({ cooler, logoutUser, isAuthenticated, history }) => {
  const logoutHandler = () => {
    logoutUser();
  };

  const authLinks = (
    <ul>
      <li>
        <NavLink to='/my-profile'>My Profile</NavLink>
      </li>

      <li>
        <Link to='/' onClick={logoutHandler}>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </Link>
      </li>
      <li>
        {cooler === 0 ? (
          <NavLink to='/cooler'>My Cooler</NavLink>
        ) : (
          <NavLink to='/cooler'>My Cooler ({cooler})</NavLink>
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
