import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { CoolerItem } from './CoolerItem';
import { coolerGetProducts } from '../../actions/cooler';

export const CoolerList = ({ coolerGetProducts, cooler: { cooler } }) => {
  useEffect(() => {
    coolerGetProducts();
  }, [coolerGetProducts]);

  return (
    <ul className='cooler-items-list'>
      {cooler.map((item) => (
        <CoolerItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

const mapStateToProps = (state) => ({
  cooler: state.cooler,
});

export default connect(mapStateToProps, { coolerGetProducts })(CoolerList);
