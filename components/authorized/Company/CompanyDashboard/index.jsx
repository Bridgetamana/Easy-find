'use client'
import ActiveJobs from "@components/authorized/Company/ActiveJobs";
import InactiveJobs from "@components/authorized/Company/InactiveJobs";
import JobPostForm from "@components/authorized/Company/JobPostForm";
import React, { useState } from "react";
import PostTestimonial from "@components/authorized/PostTestimonial";
import NotificationTab from "../Notifications";
import "./style.scss";

const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState("activeJobs");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="dashboard__layout">
      <div className="sidebar">
        <ul className="sidebar__menu">
          <li
            className={`sidebar__item ${
              activeTab === "activeJobs" ? "active" : ""
            }`}
            onClick={() => handleTabClick("activeJobs")}
          >
            Active Jobs
          </li>
          <li
            className={`sidebar__item ${
              activeTab === "inactiveJobs" ? "active" : ""
            }`}
            onClick={() => handleTabClick("inactiveJobs")}
          >
            Inactive Jobs
          </li>
          <li
            className={`sidebar__item ${
              activeTab === "postJob" ? "active" : ""
            }`}
            onClick={() => handleTabClick("postJob")}
          >
            Post Job
          </li>
          <li
            className={`sidebar__item ${
              activeTab === "postTestimonial" ? "active" : ""
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
            className={`sidebar__item ${
              activeTab === "notifications" ? "active" : ""
            }`}
            onClick={() => handleTabClick("notifications")}
          >
            Notifications
          </li>
        </ul>
      </div>

      <div className="content__area">
        {activeTab === "activeJobs" && <ActiveJobsTab />}
        {activeTab === "inactiveJobs" && <InactiveJobsTab />}
        {activeTab === "postJob" && <PostJobTab />}
        {activeTab === "postTestimonial" && <PostTestimonialTab />}
        {/* {activeTab === "candidates" && <CandidatesTab />} */}
        {activeTab === "notifications" && <NotificationsTab />}
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
