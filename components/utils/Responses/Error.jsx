import React from 'react';
import './style.scss';

const ErrorMessage = ({ text }) => {
  return (
    <div className="errorMsg">
      {text}
    </div>
  );
};

export default ErrorMessage;
