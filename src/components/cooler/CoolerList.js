import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import CoolerItem from './CoolerItem';
import { getCooler } from '../../actions/cooler-action';

export const CoolerList = ({
  isAuthenticated,
  getCooler,
  coolerRemoveAll,
  cooler: { cooler },
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      getCooler(isAuthenticated);
    }
  }, [getCooler, isAuthenticated]);

  if (cooler.length === 0) {
    return (
      <h3>
        <i className='fas fa-exclamation-circle'></i> Your cooler is empty.
      </h3>
    );
  }

  return (
    <div>
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
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  getCooler,
})(CoolerList);
