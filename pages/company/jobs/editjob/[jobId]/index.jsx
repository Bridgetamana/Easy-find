"use client";

import React, { useState } from "react";
import ProtectedRoute from "@/utils/protectedRoute";
import CompanyLayout from "../../../layout";
import EditJobForm from "../../../../../components/authorized/CompanyComponents/EditJobForm";

const PostJobsPage = () => {
  return (
    <ProtectedRoute>
      <CompanyLayout>
      <EditJobForm />
      </CompanyLayout>
    </ProtectedRoute>
  );
};

export default PostJobsPage;
