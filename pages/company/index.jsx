import React from "react";
import CompanyLayout from "./layout";
import Hero from "@/components/authorized/Hero";
import CompanyService from '@/components/authorized/CompanyComponents/CompanyService';
import ProtectedRoute from "@/utils/protectedRoute";

const HomePage = () => {
  return (
    <ProtectedRoute>
      <CompanyLayout>
        <Hero />
        <CompanyService />
      </CompanyLayout>
    </ProtectedRoute>
  );
};

export default HomePage;
