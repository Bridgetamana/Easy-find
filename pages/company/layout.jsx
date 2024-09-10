import React from "react";
import Footer from "@/components/authorized/Footer";
import CompanyHeader from "@/components/authorized/CompanyComponents/CompanyHeader";

const metadata = {
  title: "EasyFind",
  description: "Hire the best talent or get hired for your dream job",
  keywords: "hire, talents, jobs, remote, nigeria, africa, easyfind, easy, find",
};

export default function CompanyLayout({ children }) {
  return (
    <div className="app">
      <CompanyHeader />
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
}
