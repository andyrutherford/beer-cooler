import React from 'react';
import CoolerList from './CoolerList';

const Cooler = () => {
  return (
    <section className='card'>
      <h1>My Cooler</h1>

      <div>
        <CoolerList />
      </div>
    </section>
  );
};

export default Cooler;
