import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import CoolerItem from './CoolerItem';
import {
  coolerGetProducts,
  coolerGetQuantity,
  coolerRemoveProduct,
  coolerRemoveAll,
} from '../../actions/cooler-action';

export const CoolerList = ({
  coolerGetProducts,
  coolerGetQuantity,
  coolerRemoveAll,
  cooler: { cooler, quantity, loading },
}) => {
  useEffect(() => {
    coolerGetProducts();
    coolerGetQuantity();
  }, [coolerGetProducts, coolerGetQuantity]);

  if (cooler.length === 0) {
    return <p>Your cooler is empty.</p>;
  }

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div>
      Quantity: {quantity}
      <button className='btn btn-danger' onClick={() => coolerRemoveAll()}>
        Remove All
      </button>
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
  coolerRemoveAll,
})(CoolerList);
