"use client";

import React from "react";
import JobHero from "@/components/authorized/JobHero";
import JobGrid from "@/components/authorized/JobGrid";
import ProtectedRoute from "@/utils/protectedRoute";
import styles from "./style.module.scss";
import TalentLayout from "../layout";

const JobListingsPage = () => {
  return (
    <ProtectedRoute>
      <TalentLayout>
      <div className={styles.job__page}>
        <JobHero />
        <JobGrid />
      </div>
      </TalentLayout>
    </ProtectedRoute>
  );
};

export default JobListingsPage;
