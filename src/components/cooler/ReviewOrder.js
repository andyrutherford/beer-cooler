import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

export const ReviewOrder = ({ checkout }) => {
  const history = useHistory();

  useEffect(() => {
    if (!checkout) {
      history.push('/cooler');
    }
  }, [checkout]);

  return <div>Review order</div>;
};

const mapStateToProps = (state) => ({
  checkout: state.cooler.checkout,
});

export default connect(mapStateToProps)(ReviewOrder);
