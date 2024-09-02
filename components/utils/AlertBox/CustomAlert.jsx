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
      const timeoutId = setTimeout(() => {
        handleClose(); // Close the alert after the specified time
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
            <button className={styles.alert-close-button} onClick={handleClose}>
              Close
            </button>
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
      resolve(true); // Resolving with true when the close button is clicked
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
