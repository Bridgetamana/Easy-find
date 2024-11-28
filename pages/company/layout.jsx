import React from "react";
import Footer from "@/components/authorized/Footer";
import CompanyHeader from "@/components/authorized/CompanyComponents/CompanyHeader";
import styles from "./style.module.scss"; 

const metadata = {
  title: "EasyFind",
  description: "Hire the best talent or get hired for your dream job",
  keywords: "hire, talents, jobs, remote, nigeria, africa, easyfind, easy, find",
};

export default function CompanyLayout({ children }) {
  return (
    <div className={styles.app}>
      <CompanyHeader />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
