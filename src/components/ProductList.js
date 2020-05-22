import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProductItem from './ProductItem';

import { getProducts, clearSelectedProduct } from '../actions/products';

const ProductList = ({
  getProducts,
  clearSelectedProduct,
  products: { products, loading },
}) => {
  useEffect(() => {
    clearSelectedProduct();
    getProducts(1);
  }, [getProducts]);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <section>
      <ul className='product-list'>
        {products.map((p) => (
          <ProductItem key={p.id} beer={p} />
        ))}
      </ul>
      <nav>
        <ul className='pagination'>
          <li onClick={() => getProducts(1)} className='page-item'>
            <a href='#' className='page-link'>
              {1}
            </a>
          </li>
          <li onClick={() => getProducts(2)} className='page-item'>
            <a href='#' className='page-link'>
              {2}
            </a>
          </li>
          <li className='page-item'>
            <a onClick={() => getProducts(3)} href='#' className='page-link'>
              {3}
            </a>
          </li>
          <li className='page-item'>
            <a onClick={() => getProducts(4)} href='#' className='page-link'>
              {4}
            </a>
          </li>
          <li className='page-item'>
            <a onClick={() => getProducts(5)} href='#' className='page-link'>
              {5}
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
};

ProductList.propTypes = {
  getProducts: PropTypes.func.isRequired,
  clearSelectedProduct: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
  loading: state.products.loading,
});

export default connect(mapStateToProps, { getProducts, clearSelectedProduct })(
  ProductList
);
