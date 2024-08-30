import React from 'react';
import styles from './style.module.scss'

const SuccessMessage = ({ text }) => {
  return (
    <div className={styles.successMsg}>
      {text}
    </div>
  );
};

export default SuccessMessage;