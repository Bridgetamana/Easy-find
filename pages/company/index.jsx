import React from "react";
import CompanyLayout from "./layout";
import Hero from "@/components/authorized/Hero";
import ProtectedRoute from "@/utils/protectedRoute";

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
