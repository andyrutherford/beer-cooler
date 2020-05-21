import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-beer'></i> BeerCooler
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/cooler'>My Cooler</Link>
        </li>
      </ul>
    </nav>
  );
};
