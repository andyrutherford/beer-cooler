import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getProductById } from '../actions/products';
import { coolerAddProduct } from '../actions/cooler';

export const ProductPage = ({
  getProductById,
  coolerAddProduct,
  match,
  product,
}) => {
  useEffect(() => {
    getProductById(parseInt(match.params.id));
  }, [getProductById]);

  const addToCoolerHandler = (e) => {
    coolerAddProduct(product);
  };

  return (
    <>
      {product && (
        <section className='product-page'>
          <img src={product.image_url} />
          <div>
            {' '}
            <h1>{product.name}</h1>
            <p>ABV: {product.abv}</p>
            <p>{product.description}</p>
            <p>{product.brewers_tips}</p>
            <button onClick={addToCoolerHandler}>Add to Cooler</button>
          </div>
        </section>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  product: state.products.selectedProduct,
});

export default connect(mapStateToProps, { getProductById, coolerAddProduct })(
  ProductPage
);
