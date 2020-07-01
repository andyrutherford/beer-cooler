import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logoutUser } from '../../actions/auth-action';

const Navbar = ({ cooler, logoutUser, isAuthenticated, user, loading }) => {
  const logoutHandler = () => {
    logoutUser();
  };

  const authLinks = (
    <ul>
      <li>
        <NavLink to='/my-profile'>
          <i className='fas fa-lg fa-user' />{' '}
          <span className='nav-link-text'>{user && user.name}</span>
        </NavLink>
      </li>
      <li>
        {cooler === 0 ? (
          <NavLink to='/cooler'>
            <i className='fas fa-lg fa-shopping-basket'></i>{' '}
            <span className='nav-link-text'>My Cooler</span>
          </NavLink>
        ) : (
          <NavLink to='/cooler'>
            <i className='fas fa-lg fa-shopping-basket'></i>{' '}
            <span className='nav-link-text'>My Cooler</span> ({cooler})
          </NavLink>
        )}
      </li>
      <li>
        <Link to='/' onClick={logoutHandler}>
          <i className='fas fa-lg fa-sign-out-alt' />{' '}
          <span className='nav-link-text'>Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <NavLink to='/login'>
          <i className='fas fa-sign-in-alt'></i>{' '}
          <span className='nav-link-text'>Login</span>
        </NavLink>
      </li>
      <li>
        <NavLink to='/signup'>
          <i className='fas fa-user-plus'></i>{' '}
          <span className='nav-link-text'>Signup</span>
        </NavLink>
      </li>
      <li>
        {cooler === 0 ? (
          <Link to='/cooler'>
            <i className='fas fa-lg fa-shopping-basket'></i>{' '}
            <span className='nav-link-text'>My Cooler</span>
          </Link>
        ) : (
          <Link to='/cooler'>
            <i className='fas fa-lg fa-shopping-basket'></i>{' '}
            <span className='nav-link-text'>My Cooler</span> ({cooler})
          </Link>
        )}
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h2>
        <Link to='/beers'>
          <i className='fas fa-beer'></i> BeerCooler{' '}
        </Link>
      </h2>
      {isAuthenticated ? authLinks : !loading && guestLinks}
    </nav>
  );
};

const mapStateToProps = (state) => ({
  cooler: state.cooler.cooler.length,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
