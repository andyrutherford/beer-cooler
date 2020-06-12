import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CoolerList from './CoolerList';

import { coolerRemoveAll } from '../../actions/cooler-action';

const Cooler = ({ coolerRemoveAll, cooler }) => {
  return (
    <section>
      <h1>My Cooler</h1>

      <div>
        <CoolerList />
        {cooler.length > 0 && (
          <div className='mt-3 d-flex justify-content-between'>
            <button
              className='btn btn-danger'
              onClick={() => coolerRemoveAll()}
            >
              <i className='fas fa-times'></i> Remove All
            </button>
            <Link to="/cooler/review"><button className='btn btn-primary'>
              Review your order <i className='fas fa-chevron-right'></i>
            </button></Link>
          </div>
        )}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  cooler: state.cooler.cooler,
});

export default connect(mapStateToProps, { coolerRemoveAll })(Cooler);
