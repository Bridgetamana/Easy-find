"use client";

import React from "react";
import ProtectedRoute from "@/utils/protectedRoute";
import CompanyLayout from "../../../layout";
import EditJobForm from "../../../../../components/authorized/CompanyComponents/EditJobForm";

const EditJobsPage = () => {
  return (
    <ProtectedRoute>
      <CompanyLayout>
      <EditJobForm />
      </CompanyLayout>
    </ProtectedRoute>
  );
};

export default EditJobsPage;
