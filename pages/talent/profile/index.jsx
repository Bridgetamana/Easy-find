import React from "react";
import ProtectedRoute from "@/utils/protectedRoute";
import TalentProfileData from "@/components/authorized/TalentComponents/TalentProfileData";
import TalentLayout from "../layout";

export default function TalentProfile() {
  return (
    <ProtectedRoute>
      <TalentLayout>
        <TalentProfileData />
      </TalentLayout>
    </ProtectedRoute>
  );
}
