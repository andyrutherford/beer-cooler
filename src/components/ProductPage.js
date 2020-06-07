import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { getProductById } from '../actions/products-action';
import { coolerAddProduct } from '../actions/cooler-action';
import Breadcrumb from '../components/layout/Breadcrumb';

export const ProductPage = ({
  isAuthenticated,
  getProductById,
  coolerAddProduct,
  match,
  item,
}) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getProductById(parseInt(match.params.id));
  }, [getProductById, match.params.id]);

  const addToCoolerHandler = (e) => {
    e.preventDefault();
    coolerAddProduct(item, parseInt(quantity), isAuthenticated);
    setQuantity(1);
  };

  return (
    <>
      <Breadcrumb />
      {item && (
        <section className=' card product-page'>
          <img src={item.image_url} alt={item.name} />
          <div>
            {' '}
            <h1 className='card-title'>{item.name}</h1>
            <h6 className='card-subtitle mb-2 text-muted font-weight-light font-italic'>
              {item.tagline}
            </h6>
            <p className='mt-5'>{item.description}</p>
            <p>{item.brewers_tips}</p>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item'>
                First Brewed {item.first_brewed}
              </li>
              <li className='list-group-item'>{item.abv} ABV</li>
              <li className='list-group-item'>{item.ibu} IBU</li>
              <li className='list-group-item'>
                Food Pairings:
                <ul className='list-group list-group'>
                  {item.food_pairing.map((item, index) => (
                    <li className='list-group-item' key={index}>
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            <form
              className='mt-5 input-group input-group-lg'
              onSubmit={addToCoolerHandler}
            >
              <div className='form-row'>
                <div className='col'>
                  <input
                    value={quantity}
                    min={1}
                    onChange={(e) => setQuantity(e.target.value)}
                    type='number'
                    className='form-control'
                    placeholder='Quantity'
                  />
                </div>
                <div className='col'>
                  <input
                    className='btn btn-primary'
                    type='submit'
                    value='Add to Cooler'
                  />
                </div>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  item: state.products.selectedProduct,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getProductById, coolerAddProduct })(
  ProductPage
);
