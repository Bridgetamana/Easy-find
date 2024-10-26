import React from 'react'
import ProtectedRoute from "@/utils/protectedRoute";
import CompanyLayout from '../layout'
import CompanyTerms from '@/components/authorized/CompanyComponents/Terms'

export default function Settings() {
  return (
    <ProtectedRoute>
    <CompanyLayout>
      <CompanyTerms />
    </CompanyLayout>

    </ProtectedRoute>
  )
}
