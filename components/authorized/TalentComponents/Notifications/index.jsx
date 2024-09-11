import React, { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import styles from "./style.module.scss";
import { MdClose } from "react-icons/md";

const notificationsData = [
  // {
  //   id: 1,
  //   type: 'save',
  //   talentName: 'John Doe',
  //   jobTitle: 'Software Engineer',
  //   date: '2023-08-03',
  // },
  // {
  //   id: 2,
  //   type: 'apply',
  //   talentName: 'Jane Smith',
  //   jobTitle: 'Web Developer',
  //   date: '2023-09-15',
  // },
];

export default function NotificationTab({ closeNotifications }) {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'notifications'), (snapshot) => {
      const newNotifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotifications(newNotifications);
      setIsLoading(false); 
    }, (error) => {
      console.error("Error fetching notifications:", error);
      setIsLoading(false);
    });

    return () => unsubscribe(); 
  }, [db]);

  return (
    <div className={styles.notifications__page}>
      <div className={styles.section__header}>
        <h1 className={styles.section__title}>Notifications</h1>
        <button className={styles.close__button} onClick={closeNotifications}>
          <MdClose fill="#827f7f" size={24} />
        </button>
      </div>
      <div className={styles.notifications__list}>
        {isLoading ? (
          <div className={styles.loader}></div>
        ) : notifications.length === 0 ? (
          <p className={styles.no_notifications}>
            Nothing right now. Check back later!
          </p>
        ) : (
          notifications.map(notification => (
            <div key={notification.id} className={styles.notification__item}>
              <div className={styles.notification__content}>
                <h2 className={styles.notification__title}>
                  {notification.type === "save"
                    ? `You saved a job post`
                    : `You applied to a job post`}
                </h2>
                <p className={styles.notification__description}>
                  {notification.type === "save"
                    ? `You saved the job post`
                    : `You applied to the job post`}
                </p>
              </div>
              <p className={styles.notification__date}>{new Date(notification.date).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
