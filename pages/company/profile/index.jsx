import React from "react";
import ProtectedRoute from "@/utils/protectedRoute";
import CompanyProfileData from "@/components/authorized/CompanyComponents/CompanyProfileData";
import CompanyLayout from "../layout";

export default function CompanyProfile() {
  return (
    <ProtectedRoute>
      <CompanyLayout>
        <CompanyProfileData />
      </CompanyLayout>
    </ProtectedRoute>
  );
}
