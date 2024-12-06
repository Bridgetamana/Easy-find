import React from 'react'
import BrowseJobs from '@/components/unauthorized/Jobs'
import UnauthorizedHeader from '@/components/unauthorized/Header'
import UnauthorizedFooter from '@/components/unauthorized/Footer'
import styles from "./style.module.scss"; 

export default function page() {
  return (
    <div className={styles.app}>
      <UnauthorizedHeader />
      <main className={styles.main}><BrowseJobs /></main>
      <UnauthorizedFooter />
    </div>
  )
}
