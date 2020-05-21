import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ProductItem } from './ProductItem';

import { getProducts } from '../actions/products';

const ProductList = ({ getProducts, products: { products } }) => {
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <section>
      <ul className='product-list'>
        {products.map((p) => (
          <ProductItem key={p.id} beer={p} />
        ))}
      </ul>
    </section>
  );
};

ProductList.propTypes = {
  getProducts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, { getProducts })(ProductList);
