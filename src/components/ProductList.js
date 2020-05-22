import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProductItem from './ProductItem';

import { getProducts, clearSelectedProduct } from '../actions/products';

const ProductList = ({
  getProducts,
  clearSelectedProduct,
  products: { products },
}) => {
  useEffect(() => {
    clearSelectedProduct();
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
  clearSelectedProduct: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, { getProducts, clearSelectedProduct })(
  ProductList
);
