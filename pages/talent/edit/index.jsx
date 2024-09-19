import React from "react";
import ProtectedRoute from "@/utils/protectedRoute";
import TalentProfileForm from "@/components/authorized/TalentComponents/ProfileForm";
import TalentLayout from "../layout";

export default function TalentProfileFormPage() {
  return (
    <ProtectedRoute>
    <TalentLayout>
      <TalentProfileForm />
    </TalentLayout>
    </ProtectedRoute>
  );
}
