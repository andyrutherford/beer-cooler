import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ProductItem from './ProductItem';

import { getProducts, clearSelectedProduct } from '../actions/products-action';

const ProductList = ({
  getProducts,
  clearSelectedProduct,
  products: { products, loading },
}) => {
  useEffect(() => {
    clearSelectedProduct();
    getProducts(1);
  }, [getProducts, clearSelectedProduct]);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <section>
      <ul className='product-list card-deck'>
        {products.map((p) => (
          <ProductItem key={p.id} item={p} />
        ))}
      </ul>

      <nav className='pagination-nav'>
        <ul className='pagination'>
          <li onClick={() => getProducts(1)} className='page-item'>
            <Link className='page-link'>{1}</Link>
          </li>
          <li onClick={() => getProducts(2)} className='page-item'>
            <Link className='page-link'>{2}</Link>
          </li>
          <li className='page-item'>
            <Link onClick={() => getProducts(3)} className='page-link'>
              {3}
            </Link>
          </li>
          <li className='page-item'>
            <Link onClick={() => getProducts(4)} className='page-link'>
              {4}
            </Link>
          </li>
          <li className='page-item'>
            <Link onClick={() => getProducts(5)} className='page-link'>
              {5}
            </Link>
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
