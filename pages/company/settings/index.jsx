import React from "react";
import ProtectedRoute from "@/utils/protectedRoute";
import CompanySettings from "@/components/authorized/CompanyComponents/CompanySettings";
import CompanyLayout from "../layout";

export default function CompanyProfile() {
  return (
    <ProtectedRoute>
      <CompanyLayout>
        <CompanySettings />
      </CompanyLayout>
    </ProtectedRoute>
  );
}
