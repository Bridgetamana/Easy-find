import React from 'react'
import ProtectedRoute from "@/utils/protectedRoute";
import TalentLayout from '../layout'
import TalentTerms from '@/components/authorized/TalentComponents/Terms'

export default function Settings() {
  return (
    <ProtectedRoute>
    <TalentLayout>
      <TalentTerms />
    </TalentLayout>

    </ProtectedRoute>
  )
}
