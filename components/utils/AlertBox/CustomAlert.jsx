import React, { useEffect, useState } from "react";
import { BiSolidError } from "react-icons/bi";
import { FaCircleCheck } from "react-icons/fa6";
import { MdError } from "react-icons/md";
import styles from "./style.module.scss";

export const CustomAlert = ({
  type,
  title,
  message,
  showCloseButton,
  handleClose,
  timeout,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const getIcon = () => {
    switch (type) {
      case "error":
        return <MdError fill="#c30a0a" />;
      case "success":
        return <FaCircleCheck fill="#0a810a" />;
      case "warning":
        return <BiSolidError fill="#e4b002" />;
      default:
        return "";
    }
  };

 useEffect(() => {
    if (timeout) {
      setIsLoading(true); 
      const timeoutId = setTimeout(() => {
        setIsLoading(false); 
        handleClose(); 
      }, timeout);
      return () => clearTimeout(timeoutId);
    }
  }, [handleClose, timeout]);

  return (
    <div className={`${styles.custom__alert} ${styles[type] || ''}`}
>
      <div className={styles.alert}>
        <div className={styles.alert__wrap}>
          <div className={styles.alert__icon}>{getIcon()}</div>
          <div className={styles.alert__content}>
            <div className={styles.alert__title}>{title}</div>
            <div className={styles.alert__message}>{message}</div>
          </div>
          {showCloseButton && (
            <button className={styles.alert__close__button} onClick={handleClose}>
              Close
            </button>
          )}
          {isLoading && (
            <div className={styles.loading__bar}>
              <div className={styles.loading__barfill} style={{ animationDuration: `${timeout}ms` }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function showAlert(
  { type, title, message, showCloseButton = false, timeout },
  setAlert
) {
  return new Promise((resolve) => {
    const handleClose = () => {
      setAlert(null);
      resolve(true); 
    };

    const alertComponent = (
      <CustomAlert
        type={type}
        title={title}
        message={message}
        showCloseButton={showCloseButton}
        handleClose={handleClose}
        timeout={timeout}
      />
    );

    setAlert({ component: alertComponent, handleClose });
  });
}
