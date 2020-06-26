import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ product }) => {
  return (
    <div>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/'>Home</Link>
          </li>
          <li className='breadcrumb-item'>
            <Link to='/beers'>Beers</Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            {product && product.name}
          </li>
        </ol>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => ({
  product: state.products.selectedProduct,
});

export default connect(mapStateToProps)(Breadcrumb);
