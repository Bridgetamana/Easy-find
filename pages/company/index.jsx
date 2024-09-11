import React from "react";
import CompanyLayout from "./layout";
import Hero from "@/components/authorized/Hero";
import CompanyService from '@/components/authorized/CompanyComponents/CompanyService';
import CompanyDescription from '@/components/authorized/CompanyDescription';
import ActiveJobs from '@/components/authorized/CompanyComponents/ActiveJobs';
import ProtectedRoute from "@/utils/protectedRoute";

const HomePage = () => {
  return (
    <ProtectedRoute>
      <CompanyLayout>
        <CompanyDescription />
        <CompanyService />
        <ActiveJobs />
      </CompanyLayout>
    </ProtectedRoute>
  );
};

export default HomePage;
