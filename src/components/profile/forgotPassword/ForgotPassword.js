import React, { useState } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [showError, setShowError] = useState();
  const [serverMessage, setServerMessage] = useState();

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (email === '') {
      setEmail();
    } else {
      try {
        console.log(email);
        const res = await axios.post('http://localhost:3000/password/forgot', {
          email,
        });
        console.log(res.data);

        if (res.data === 'no user found') {
          setShowError(true);
          setServerMessage('An account was not found with the provided email.');
        } else if (res.data === 'recovery email sent') {
          setShowError(false);
          setServerMessage('Recovery email sent.');
        }
      } catch (error) {
        console.log(error.data);
      }
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Your email:</label>
        <input type='text' name='email' onChange={onChange} />
        <input type='submit' label='Submit' />
      </form>
    </div>
  );
};

export default connect()(ForgotPassword);
