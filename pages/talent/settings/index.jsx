import React from 'react'
import ProtectedRoute from "@/utils/protectedRoute";
import TalentLayout from '../layout'
import TalentSettings from '@/components/authorized/Settings'

export default function Settings() {
  return (
    <ProtectedRoute>
    <TalentLayout>
      <TalentSettings />
    </TalentLayout>

    </ProtectedRoute>
  )
}
