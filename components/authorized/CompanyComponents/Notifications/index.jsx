import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { InboxIcon } from '@heroicons/react/24/outline';
import showAlert from "@/components/utils/AlertBox/CustomAlert";
import styles from "./style.module.scss";
import { fetchNotifications, deleteNotification } from "@/firebaseConfig/companyStore"; 

export default function NotificationTab({ closeNotifications }) {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState(null); 

  const handleDelete = async (notificationId) => {
    try {
      await deleteNotification(notificationId);
      
      setNotifications(notifications.filter((notification) => notification.id !== notificationId));
      await showAlert(
        {
          type: "success",
          title: "Success",
          message: "Notification deleted successfully!",
          showCloseButton: false,
          timeout: 2000,
        },
        setAlert
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
      await showAlert(
        {
          type: "error",
          title: "Error",
          message: "Failed to delete notification. Please try again.",
          showCloseButton: true,
          timeout: 2000,
        },
        setAlert
      );
    }
  };

  useEffect(() => {
    const loadNotifications = async () => {
      setIsLoading(true);
      try {
        const fetchedNotifications = await fetchNotifications();
        setNotifications(fetchedNotifications || []);
      } catch (error) {
        console.error('Error loading notifications:', error);
        setNotifications([]); 
      } finally {
        setIsLoading(false);
      }
    };

    loadNotifications(); 
  }, []);

  
  return (
    <div className={styles.notification__dropdown}>
      {alert && alert.component}
      <div className={styles.notification__page}>
        <div className={styles.notification__header}>
          <h1 className={styles.notification__title}>Notifications</h1>
          <button onClick={closeNotifications} className={styles.close__button}>
            <MdClose fill="#827f7f" size={24} />
          </button>
        </div>

        {isLoading ? (
          <div className={styles.loader}></div>
        ) : notifications.length === 0 ? (
          <div className={styles.no__notifications}>No Notifications!</div>
        ) : (
          notifications.map((notification) => (
            <div key={notification.id} className={styles.notification__item}>
              <div className={styles.notification__icon}>
                <InboxIcon aria-hidden="true" className={styles.icon} />
              </div>
              <div className={styles.notification__content}>
                <p className={styles.notification__heading}>
                  {notification.type === "application" ? "New Job Application" : notification.message}
                </p>
                <p className={styles.notification__description}>
                  {notification.message}
                </p>
                <button
                  onClick={() => handleDelete(notification.id)}
                  className={styles.delete__button}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
