'use client';

import React from 'react';
import ProtectedRoute from '@/utils/ProtectedRoute';
import Hero from '@/components/authorized/Hero';
import AppliedJobs from '@/components/authorized/TalentComponents/AppliedJobs';
import ExpectationSection from '@/components/authorized/TalentComponents/ExpectationSection';
import SavedJobs from '@/components/authorized/TalentComponents/SavedJobs';
import UserName from '@/components/authorized/TalentComponents/UserName';

const HomePage = () => {
  return (
    <ProtectedRoute>
    <div className='main'>
      <UserName />
      <Hero />
      <ExpectationSection/>
      <SavedJobs/>
      <AppliedJobs/>
    </div>
    </ProtectedRoute>
  );
}

export default HomePage;