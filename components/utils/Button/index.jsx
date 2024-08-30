import React from 'react';
import styles from './style.module.scss';

const Button = ({ type, title, icon, variant, onClick }) => {
  return (
    <button
      type={type}
      className={variant}
      onClick={onClick}
      id='button'
      >
      <span className="label">{title}</span>
      {icon}
    </button>
  );
};

export default Button
