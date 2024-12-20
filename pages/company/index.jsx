import React from "react";
import CompanyLayout from "./layout";
import CompanyHero from "@/components/authorized/CompanyComponents/CompanyHero";
import ActiveJobs from '@/components/authorized/CompanyComponents/ActiveJobs';
import InActiveJobs from '@/components/authorized/CompanyComponents/InactiveJobs';
import ProtectedRoute from "@/utils/protectedRoute";
import UserName from "../../components/authorized/CompanyComponents/UserName";

const HomePage = () => {
  return (
    <ProtectedRoute>
      <CompanyLayout>
        <UserName />
        <CompanyHero />
        <ActiveJobs />
        <InActiveJobs />
      </CompanyLayout>
    </ProtectedRoute>
  );
};

export default HomePage;
