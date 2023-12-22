import React from 'react';
import './style.scss';

const Button = ({ type, title, icon, variant, onClick }) => {
  return (
    <button
      type={type}
      className={variant}
      onClick={onClick}
      >
      <span className="label">{title}</span>
      {icon}
    </button>
  );
};

export default Button
