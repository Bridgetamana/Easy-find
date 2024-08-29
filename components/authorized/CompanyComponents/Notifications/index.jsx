import React, { useState } from 'react';
import style from './style.module.scss';
import { MdNotifications } from 'react-icons/md';

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
  // Add more notifications here as needed
];

export default function NotificationTab() {
  const [notifications, setNotifications] = useState(notificationsData);

  return (
    <div className={style.notifications__page}>
      <div className={style.section__header}>
        <h2 className={style.section__title}>
          Notifications
          <MdNotifications />
        </h2>
      </div>
      {notifications.map((notification) => (
        <div key={notification.id} className={style.notification__item}>
          <h2 className={style.notification__title}>
            {notification.type === "save"
              ? `${notification.talentName} saved a job post`
              : `${notification.talentName} applied to a job post`}
          </h2>
          <p className={style.notification__description}>
            {notification.type === "save"
              ? `${notification.talentName} saved the job post for ${notification.jobTitle}.`
              : `${notification.talentName} applied to the job post for ${notification.jobTitle}.`}
          </p>
          <p className={style.notification__date}>Date: {notification.date}</p>
        </div>
      ))}
    </div>
  );
}
