import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { coolerGetProducts } from '../actions/cooler';

const Cooler = ({ coolerGetProducts, cooler: { cooler } }) => {
  useEffect(() => {
    coolerGetProducts();
  }, [coolerGetProducts]);

  return (
    <section>
      <h1>My Cooler</h1>
      {cooler.length} items
      <div>
        <ul>
          {cooler.map((p) => (
            <p>{p.name}</p>
          ))}
        </ul>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  cooler: state.cooler,
});

export default connect(mapStateToProps, { coolerGetProducts })(Cooler);
