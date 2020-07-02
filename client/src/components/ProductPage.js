import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { getProductById } from '../actions/products-action';
import { coolerAddProduct } from '../actions/cooler-action';
import Breadcrumb from '../components/layout/Breadcrumb';
import Spinner from './layout/Spinner';

export const ProductPage = ({
  isAuthenticated,
  getProductById,
  coolerAddProduct,
  match,
  item,
  loading,
}) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getProductById(parseInt(match.params.id));
  }, [getProductById, match.params.id]);

  if (loading) {
    return <Spinner />;
  }

  const addToCoolerHandler = (e) => {
    e.preventDefault();
    coolerAddProduct(item, parseInt(quantity), isAuthenticated);
    setQuantity(1);
  };

  return (
    <>
      <Breadcrumb />
      {item && (
        <section className='card'>
          <div className='product-page card-body align-items-center'>
            <div className='mb-3'>
              <img
                className='d-block m-auto'
                src={item.image_url}
                alt={item.name}
              />
            </div>
            <div>
              <h1 className='card-title'>{item.name}</h1>
              <h6 className='card-subtitle mb-2 text-muted font-weight-light font-italic'>
                {item.tagline}
              </h6>
              <div>
                <h4 className='d-inline-block mr-2'>
                  <span class='badge badge-info font-weight-light'>
                    {item.abv} ABV
                  </span>
                </h4>
                <h4 className='d-inline-block mr-2'>
                  <span class='badge badge-info font-weight-light'>
                    {item.ibu} IBU
                  </span>
                </h4>
                <h4 className='d-inline-block mr-2'>
                  <span class='badge badge-info font-weight-light'>
                    {item.ph} PH
                  </span>
                </h4>
              </div>
              <p className='mt-3'>{item.description}</p>
              <p>{item.brewers_tips}</p>
              <ul className='list-group list-group-flush'>
                <li className='list-group-item'>
                  First Brewed {item.first_brewed}
                </li>

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
                className='mt-4 input-group input-group-lg'
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
                    <button className='btn btn-primary'>
                      <i className='fas fa-cart-plus'></i> Add to Cooler
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  item: state.products.selectedProduct,
  loading: state.products.loading,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getProductById, coolerAddProduct })(
  ProductPage
);
