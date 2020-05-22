import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { CoolerItem } from './CoolerItem';
import { coolerGetProducts, coolerGetQuantity } from '../../actions/cooler';

export const CoolerList = ({
  coolerGetProducts,
  coolerGetQuantity,
  cooler: { cooler, quantity, loading },
}) => {
  useEffect(() => {
    coolerGetProducts();
    coolerGetQuantity();
  }, [coolerGetProducts]);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div>
      Quantity: {quantity}
      <ul className='cooler-items-list'>
        {cooler.map((item) => (
          <CoolerItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cooler: state.cooler,
  quantity: state.quantity,
  loading: state.loading,
});

export default connect(mapStateToProps, {
  coolerGetProducts,
  coolerGetQuantity,
})(CoolerList);
