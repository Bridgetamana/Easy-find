import React from 'react'
import BrowseJobs from '../../components/unauthorized/Jobs'
import UnauthorizedHeader from '@/components/unauthorized/Header'

export default function page() {
  return (
    <div>
      <UnauthorizedHeader />
      <BrowseJobs />
    </div>
  )
}
