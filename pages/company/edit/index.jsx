import React from "react";
import ProtectedRoute from "@/utils/protectedRoute";
import CompanyProfileForm from "@/components/authorized/CompanyComponents/ProfileForm";
import CompanyLayout from "../layout";

export default function CompanyProfileFormPage() {
  return (
    <ProtectedRoute>
        <CompanyLayout>
        <CompanyProfileForm />
        </CompanyLayout>
    </ProtectedRoute>
  );
}
