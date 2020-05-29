import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

const Navbar = ({ cooler }) => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-beer'></i> BeerCooler{' '}
        </Link>
      </h1>
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
    </nav>
  );
};

const mapStateToProps = (state) => ({
  cooler: state.cooler.cooler.length,
});

export default connect(mapStateToProps)(Navbar);
