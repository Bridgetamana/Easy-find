import React from "react";
import CompanyLayout from "./layout";
import ProtectedRoute from "@/utils/ProtectedRoute";
import Hero from "@/components/authorized/Hero";

const HomePage = () => {
  return (
    <ProtectedRoute>
      <CompanyLayout>
        <Hero />
      </CompanyLayout>
    </ProtectedRoute>
  );
};

export default HomePage;
