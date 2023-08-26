import React from 'react';
import { withRouter } from 'react-router-dom';

const SignUpButton = ({ history }) => {
  const handleClick = () => {
    history.push('./register');
  };

  return (
    <button type="button" onClick={handleClick}>
      You don't have an account? SIGN UP
    </button>
  );
};

export default (SignUpButton);