'use client'
import ActiveJobs from "@components/authorized/Company/ActiveJobs";
import InactiveJobs from "@components/authorized/Company/InactiveJobs";
import JobPostForm from "@components/authorized/Company/JobPostForm";
import React, { useState } from "react";
import PostTestimonial from "@components/authorized/PostTestimonial";
import NotificationTab from "../Notifications";
import style from "./style.module.scss";

const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState("activeJobs");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={style.dashboard__layout}>
      <div className={style.sidebar}>
        <ul className={style.sidebar__menu}>
          <li
            className={`${style.sidebar__item} ${
              activeTab === style.activeJobs ? style.active : ""
            }`}
            onClick={() => handleTabClick("activeJobs")}
          >
            Active Jobs
          </li>
          <li
            className={`${style.sidebar__item} ${
              activeTab === style.inactiveJobs ? style.active : ""
            }`}
            onClick={() => handleTabClick("inactiveJobs")}
          >
            Inactive Jobs
          </li>
          <li
            className={`${style.sidebar__item} ${
              activeTab === style.postJob ? style.active : ""
            }`}
            onClick={() => handleTabClick("postJob")}
          >
            Post Job
          </li>
          <li
            className={`${style.sidebar__item} ${
              activeTab === style.postTestimonial ? style.active : ""
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
            className={`${style.sidebar__item} ${
              activeTab === style.notifications ? style.active : ""
            }`}
            onClick={() => handleTabClick("notifications")}
          >
            Notifications
          </li>
        </ul>
      </div>

      <div className={style.content__area}>
        {activeTab === style.activeJobs && <ActiveJobsTab />}
        {activeTab === style.inactiveJobs && <InactiveJobsTab />}
        {activeTab === style.postJob && <PostJobTab />}
        {activeTab === style.postTestimonial && <PostTestimonialTab />}
        {/* {activeTab === "candidates" && <CandidatesTab />} */}
        {activeTab === style.notifications && <NotificationsTab />}
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
