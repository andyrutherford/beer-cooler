import React, { Fragment } from 'react';
import spinner from './spinner.gif';

export default ({ message = '' }) => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    />
    <p className='text-center'>{message}</p>
  </Fragment>
);
