"use client";

import React from 'react';
import JobHero from '@/components/authorized/JobHero';
import JobGrid from '@/components/authorized/JobGrid';
import ProtectedRoute from '@/utils/ProtectedRoute';
import './style.scss';

const JobListingsPage = () => {

  return (
    <div className="job__page">
      <JobHero/>
        <JobGrid/>
    </div>
  );
}

export default ProtectedRoute(JobListingsPage);