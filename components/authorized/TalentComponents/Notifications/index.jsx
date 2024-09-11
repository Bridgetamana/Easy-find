import React, { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import styles from "./style.module.scss";
import { MdClose } from "react-icons/md";

export default function NotificationTab({ closeNotifications }) {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const db = getFirestore();
  const auth = getAuth();
  const TALENT = "talentCollection"; 

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, [auth]);

  useEffect(() => {
    if (!user) {
      setNotifications([]);
      setIsLoading(false);
      return;
    }

    const notificationsRef = collection(db, TALENT, user.uid, "notifications"); 
    const unsubscribeNotifications = onSnapshot(
      notificationsRef,
      (snapshot) => {
        if (snapshot.empty) {
          setNotifications([]);
        } else {
      const newNotifications = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotifications(newNotifications);
        }
      setIsLoading(false); 
    }, (error) => {
      console.error("Error fetching notifications:", error);
      setIsLoading(false);
    });

    return () => unsubscribeNotifications(); 
  }, [db, user]);

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
          notifications.map((notification) => (
            <div key={notification.id} className={styles.notification__item}>
              <div className={styles.notification__content}>
                <h2 className={styles.notification__title}>
                  {notification.type === "save"
                    ? `You saved a job post`
                    : `You applied to a job post`}
                </h2>
                <p className={styles.notification__description}>
                  {notification.type === "save"
                    ? `You saved the job post for ${notification.jobTitle}.`
                    : `You applied to the job post for ${notification.jobTitle}.`}
                </p>
              </div>
              <p className={styles.notification__date}>
                {new Date(notification.date).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
