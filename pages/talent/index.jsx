'use client';

import React from 'react';
import ProtectedRoute from '@/utils/ProtectedRoute';
import TalentHeader from '@/components/authorized/TalentComponents/TalentHeader';
import Hero from '@/components/authorized/Hero';
import AppliedJobs from '@/components/authorized/TalentComponents/AppliedJobs';
import ExpectationSection from '@/components/authorized/TalentComponents/ExpectationSection';
import SavedJobs from '@/components/authorized/TalentComponents/SavedJobs';
import UserName from '@/components/authorized/TalentComponents/UserName';
import Footer from '@/components/authorized/Footer';

const HomePage = () => {
  return (
    <ProtectedRoute>
    <div className='main'>
      <TalentHeader />
      <UserName />
      <Hero />
      <ExpectationSection/>
      <SavedJobs/>
      <AppliedJobs/>
      <Footer />
    </div>
    </ProtectedRoute>
  );
}

export default HomePage;