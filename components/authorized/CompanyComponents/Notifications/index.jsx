import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { InboxIcon } from '@heroicons/react/24/outline';
import styles from "./style.module.scss";

const notificationsData = [
  {
    id: 1,
    type: 'save',
    talentName: 'John Doe',
    jobTitle: 'Software Engineer',
    date: '2023-08-03',
  },
  {
    id: 2,
    type: 'apply',
    talentName: 'Jane Smith',
    jobTitle: 'Web Developer',
    date: '2023-09-15',
  },
  {
    id: 3,
    type: 'apply',
    talentName: 'Jane Doe',
    jobTitle: 'UX Designer',
    date: '2023-09-20',
  },
  {
    id: 4,
    type: 'apply',
    talentName: 'Jane Doe',
    jobTitle: 'UX Designer',
    date: '2023-09-20',
  }
];

export default function NotificationTab({ closeNotifications }) {
  const [notifications, setNotifications] = useState(notificationsData);

  const handleDelete = () => {
    console.log("deleted")
  };

  return (
    <div className={styles.notification__dropdown}>
      <div className={styles.notification__page}>
        <div className={styles.notification__header}>
          <h1 className={styles.notification__title}>Notifications</h1>
          <button onClick={closeNotifications} className={styles.close__button}>
            <MdClose fill="#827f7f" size={24} />
          </button>
        </div>

        {notifications.length > 0 ? (
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
                  {notification.talentName} {notification.type === "save" ? "saved" : "applied to"} the job post for {notification.jobTitle}.
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
        ) : (
          <div className={styles.no__notifications}>No Notifications!</div>
        )}
      </div>
    </div>
  );
}
