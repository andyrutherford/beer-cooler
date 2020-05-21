import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { coolerGetProducts } from '../actions/cooler';

const Cooler = ({ coolerGetProducts, cooler }) => {
  useEffect(() => {
    coolerGetProducts();
  }, [coolerGetProducts]);

  return <div>My cooler</div>;
};

const mapStateToProps = (state) => ({
  cooler: state.cooler,
});

export default connect(mapStateToProps, { coolerGetProducts })(Cooler);
