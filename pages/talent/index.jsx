'use client';

import React from 'react';
import ProtectedRoute from '@/utils/ProtectedRoute';
import Hero from '@/components/authorized/Hero';
import AppliedJobs from '@/components/authorized/TalentComponents/AppliedJobs';
import ExpectationSection from '@/components/authorized/TalentComponents/ExpectationSection';
import SavedJobs from '@/components/authorized/TalentComponents/SavedJobs';
import UserName from '@/components/authorized/TalentComponents/UserName';
import TalentLayout from './layout';

const HomePage = () => {
  return (
    <ProtectedRoute>
    <TalentLayout>
      <UserName />
      <Hero />
      <ExpectationSection/>
      <SavedJobs/>
      <AppliedJobs/>
    </TalentLayout>
    </ProtectedRoute>
  );
}

export default HomePage;