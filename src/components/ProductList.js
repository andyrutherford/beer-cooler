import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ProductItem } from './ProductItem';

import { getProducts } from '../actions/products';

const ProductList = ({ getProducts }) => {
  const [beers, setBeers] = useState();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section>
      <ul className='product-list'>
        {beers &&
          beers
            .map((beer) => <ProductItem key={beer.id} beer={beer} />)
            .slice(0, beers.length - 1)}
      </ul>
    </section>
  );
};

ProductList.propTypes = {
  getProducts: PropTypes.func.isRequired,
};

export default connect(null, { getProducts })(ProductList);
