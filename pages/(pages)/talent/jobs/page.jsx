"use client";

import React from 'react';
import JobHero from '@/components/authorized/JobHero';
import JobGrid from '@/components/authorized/JobGrid';
import ProtectedRoute from '@/utils/ProtectedRoute';
import styles from './style.module.scss';

const JobListingsPage = () => {

  return (
    <ProtectedRoute>
    <div className="job__page">
      <JobHero/>
        <JobGrid/>
    </div>
    </ProtectedRoute>
  );
}

export default JobListingsPage;