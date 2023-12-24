import React from 'react';
import { BiSolidError } from "react-icons/bi";
import { FaCircleCheck } from "react-icons/fa6";
import { MdError } from "react-icons/md";
import './style.scss';

const CustomAlert = ({ type, title, message, showCloseButton }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCircleCheck />; 
      case 'error':
        return <MdError/>; 
      case 'warning':
        return <BiSolidError/>; 
      default:
        return '';
    }
  };

  return (
    <div className={`custom__alert ${type}`}>
      <div className="alert__icon">{getIcon()}</div>
      <div className="alert__content">
        <div className="alert__title">{title}</div>
        <div className="alert__message">{message}</div>
      </div>
      {showCloseButton && <button className="alert-close-button">Close</button>}
    </div>
  );
};

export default CustomAlert;
