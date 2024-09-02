import React from 'react';
import styles from './style.module.scss'

const WarningMessage = ({ text }) => {
  return (
    <div className={styles.warningMsg}>
      {text}
    </div>
  );
};

export default WarningMessage;