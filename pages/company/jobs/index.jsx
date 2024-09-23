import React from "react";
import ProtectedRoute from "@/utils/protectedRoute";
import CompanyJobPage from "@/components/authorized/CompanyComponents/CompanyJobPage";
import CompanyLayout from "../layout";

export default function CompanyProfileFormPage() {
  return (
    <ProtectedRoute>
      <CompanyLayout>
        <CompanyJobPage />
      </CompanyLayout>
    </ProtectedRoute>
  );
}
