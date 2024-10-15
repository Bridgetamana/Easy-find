import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { MdClose } from "react-icons/md";
import { InboxIcon } from '@heroicons/react/24/outline';
import { fetchNotifications } from "../../../../firebaseConfig/talentStore"; 

export default function NotificationTab({ closeNotifications }) {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = () => {
    console.log("deleted")
  };

  useEffect(() => {
    const loadNotifications = async () => {
      setIsLoading(true);
      try {
        const fetchedNotifications = await fetchNotifications();
        setNotifications(fetchedNotifications);
      } catch (error) {
        console.error('Error loading notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotifications();
  }, []); 

  return (
    <div className={styles.notification__dropdown}>
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
                  {notification.type === "save" ? "Job Saved" : "Job Applied"}
                </p>
                <p className={styles.notification__description}>
                  {notification.type === "save"
                    ? `You saved the job post for ${notification.jobTitle}.`
                    : `You applied to the job post for ${notification.jobTitle}.`}
                </p>
                <button
                  onClick={() => handleDelete()}
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
