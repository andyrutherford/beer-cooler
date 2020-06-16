import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

export const ReviewOrder = ({ checkout, address, payment, cooler }) => {
  const history = useHistory();

  useEffect(() => {
    if (!checkout) {
      history.push('/cooler');
    }
  }, [checkout, history]);

  return (
    <div>
      <h1 className='large '>
        <i className='fas fa-shopping-cart'></i> Review Your Order
      </h1>
      <div className='d-flex justify-content-between'>
        <div>
          <div class='card'>
            <div class='card-body'>
              <h2 className='mb-2'>
                <i className='fas fa-shipping-fast'></i> Shipping Address
              </h2>
              <h6 className='card-subtitle mb-3 text-muted'>
                Your order will be delivered to:
              </h6>
              <ul>
                <li>{address.fullName}</li>
                <li>
                  {address.address1} {address.address2}
                </li>
                <li>
                  {address.city}, {address.state}
                </li>
                <li>{address.postCode}</li>
                <li>{address.country}</li>
                <Link to='/checkout' class='card-link float-right'>
                  Edit
                </Link>
              </ul>
            </div>
          </div>
          <div class='card'>
            <div class='card-body'>
              <h2 className='mb-2'>
                <i className='fas fa-wallet'></i> Payment
              </h2>
              <h6 class='card-subtitle mb-3 text-muted'>
                Your payment method:
              </h6>
              <ul>
                <li>{payment.cardName}</li>
                <li>{payment.cardNumber}</li>
                <li>
                  Exp. {payment.expMonth}/{payment.expYear}
                </li>
                <Link to='/checkout' class='card-link float-right'>
                  Edit
                </Link>
              </ul>
            </div>
          </div>
        </div>
        <div className='card'>
          <h2 className='mb-2'>
            <i className='fas fa-beer'></i> My Order
          </h2>
          <h6 class='card-subtitle mb-3 text-muted'>
            The following items will be delivered to you:
          </h6>
          <ul>
            {cooler.map((i, index) => (
              <li key={index}>
                {i.quantity}x {i.name}{' '}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='form-actions d-flex justify-content-between'>
        <Link to='/cooler' className='btn pull-left btn-link text-muted pl-0'>
          Back
        </Link>

        <Link to='/review_order'>
          <button type='submit' className='btn btn-primary mb-1'>
            Place Your Order <i className='fas fa-chevron-right'></i>
          </button>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  checkout: state.cooler.checkout,
  address: state.profile.address,
  payment: state.profile.payment,
  cooler: state.cooler.cooler,
});

export default connect(mapStateToProps)(ReviewOrder);
