import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logoutUser } from '../../actions/auth-action';

const Navbar = ({ cooler, logoutUser, isAuthenticated, user }) => {
  const logoutHandler = () => {
    logoutUser();
  };

  const authLinks = (
    <ul>
      <li>
        <i className='fas fa-lg fa-user'></i>
        <NavLink to='/my-profile'>{user && user.name}</NavLink>
      </li>

      <li>
        {' '}
        <i className='fas fa-lg fa-sign-out-alt' />{' '}
        <Link to='/' onClick={logoutHandler}>
          Logout
        </Link>
      </li>
      <li>
        <i class='fas fa-lg fa-shopping-basket'></i>
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
  user: state.auth.user,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
