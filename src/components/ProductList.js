import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { ProductItem } from './ProductItem';

export const ProductList = () => {
  const [beers, setBeers] = useState();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://api.punkapi.com/v2/beers');
      setBeers(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section>
      <ul className='product-list'>
        {beers &&
          beers
            .map((beer) => <ProductItem beer={beer} />)
            .slice(0, beers.length - 1)}
      </ul>
    </section>
  );
};
