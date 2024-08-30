'use client'
import ActiveJobs from "@components/authorized/Company/ActiveJobs";
import InactiveJobs from "@components/authorized/Company/InactiveJobs";
import JobPostForm from "@components/authorized/Company/JobPostForm";
import React, { useState } from "react";
import PostTestimonial from "@components/authorized/PostTestimonial";
import NotificationTab from "../Notifications";
import styles from "./style.module.scss";

const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState("activeJobs");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.dashboard__layout}>
      <div className={styles.sidebar}>
        <ul className={styles.sidebar__menu}>
          <li
            className={`${styles.sidebar__item} ${
              activeTab === styles.activeJobs ? styles.active : ""
            }`}
            onClick={() => handleTabClick("activeJobs")}
          >
            Active Jobs
          </li>
          <li
            className={`${styles.sidebar__item} ${
              activeTab === styles.inactiveJobs ? styles.active : ""
            }`}
            onClick={() => handleTabClick("inactiveJobs")}
          >
            Inactive Jobs
          </li>
          <li
            className={`${styles.sidebar__item} ${
              activeTab === styles.postJob ? styles.active : ""
            }`}
            onClick={() => handleTabClick("postJob")}
          >
            Post Job
          </li>
          <li
            className={`${styles.sidebar__item} ${
              activeTab === styles.postTestimonial ? styles.active : ""
            }`}
            onClick={() => handleTabClick("postTestimonial")}
          >
            Post Testimonial
          </li>
          {/* <li
            className={`sidebar__item ${
              activeTab === "candidates" ? "active" : ""
            }`}
            onClick={() => handleTabClick("candidates")}
          >
            Candidates
          </li> */}
          <li
            className={`${styles.sidebar__item} ${
              activeTab === styles.notifications ? styles.active : ""
            }`}
            onClick={() => handleTabClick("notifications")}
          >
            Notifications
          </li>
        </ul>
      </div>

      <div className={styles.content__area}>
        {activeTab === styles.activeJobs && <ActiveJobsTab />}
        {activeTab === styles.inactiveJobs && <InactiveJobsTab />}
        {activeTab === styles.postJob && <PostJobTab />}
        {activeTab === styles.postTestimonial && <PostTestimonialTab />}
        {/* {activeTab === "candidates" && <CandidatesTab />} */}
        {activeTab === styles.notifications && <NotificationsTab />}
      </div>
    </div>
  );
};

// Individual Tab Components

const ActiveJobsTab = () => {
  return <ActiveJobs/>;
};

const InactiveJobsTab = () => {
  return <InactiveJobs/>;
};

const PostJobTab = () => {
  return <JobPostForm/>;
};
const PostTestimonialTab = () => {
  return <PostTestimonial/>;
};

// const CandidatesTab = () => {
//   return <div>Candidates Tab Content</div>;
// };


const NotificationsTab = () => {
  return <NotificationTab/>;
};

export default DashboardLayout;
