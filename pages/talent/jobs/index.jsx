"use client";

import React, { useState } from "react";
import JobHero from "@/components/authorized/JobHero";
import JobGrid from "@/components/authorized/JobGrid";
import ProtectedRoute from "@/utils/protectedRoute";
import styles from "./style.module.scss";
import TalentLayout from "../layout";

const JobListingsPage = () => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <ProtectedRoute>
      <TalentLayout>
      <div className={styles.job__page}>
        <JobHero setSearchInput={setSearchInput}/>
        <JobGrid  searchInput={searchInput}/>
      </div>
      </TalentLayout>
    </ProtectedRoute>
  );
};

export default JobListingsPage;
