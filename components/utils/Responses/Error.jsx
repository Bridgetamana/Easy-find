import React from 'react';
import styles from './style.module.scss';

const ErrorMessage = ({ text }) => {
  return (
    <div className={styles.errorMsg}>
      {text}
    </div>
  );
};

export default ErrorMessage;
