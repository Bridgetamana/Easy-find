"use client";

import React, { useState } from "react";
import ProtectedRoute from "@/utils/protectedRoute";
import styles from "./style.module.scss";
import CompanyLayout from "../../layout";
import JobPostForm from "../../../../components/authorized/CompanyComponents/JobPostForm";

const PostJobsPage = () => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <ProtectedRoute>
      <CompanyLayout>
      <div className={styles.job__page}>
        <JobPostForm></JobPostForm>
      </div>
      </CompanyLayout>
    </ProtectedRoute>
  );
};

export default PostJobsPage;
