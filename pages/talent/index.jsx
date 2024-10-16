"use client";

import React from "react";
import ProtectedRoute from "@/utils/protectedRoute";
import Hero from "@/components/authorized/TalentComponents/TalentHero";
import AppliedJobs from "@/components/authorized/TalentComponents/AppliedJobs";
import ExpectationSection from "@/components/authorized/TalentComponents/ExpectationSection";
import SavedJobs from "@/components/authorized/TalentComponents/SavedJobs";
import UserName from "@/components/authorized/TalentComponents/UserName";
import TalentLayout from "./layout";
import TalentHero from "@/components/authorized/TalentComponents/TalentHero";

const HomePage = () => {
  return (
    <ProtectedRoute>
      <TalentLayout>
        <UserName />
        <TalentHero />
        {/* <ExpectationSection /> */}
        <SavedJobs />
        <AppliedJobs />
      </TalentLayout>
    </ProtectedRoute>
  );
};

export default HomePage;
