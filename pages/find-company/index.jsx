"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { companyStore } from "../../firebaseConfig/companyStore";
import styles from "./styles.module.scss";
import { AiOutlineEnvironment } from "react-icons/ai";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { CgBriefcase } from "react-icons/cg";
import FindCompaniesLayout from "./layout";
import LoadingScreen from "../../components/utils/Loaders/Loader";

const FindCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 10;

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const fetchedCompanies = await companyStore.getCompanyStore();
        setCompanies(fetchedCompanies);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching companies:", error);
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);
    setCurrentPage(1);
  };

  const filteredCompanies = companies.filter((company) =>
    company.fullName.toLowerCase().includes(searchValue.toLowerCase())
  );

  const indexOfLastCompanies = currentPage * companiesPerPage;
  const indexOfFirstCompanies = indexOfLastCompanies - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(
    indexOfFirstCompanies,
    indexOfLastCompanies
  );

  const pageNumbers = Math.ceil(filteredCompanies.length / companiesPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextClick = () => {
    if (currentPage < pageNumbers) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <FindCompaniesLayout>
      {loading ? (
        <LoadingScreen />
      ) : (
        <section className={styles.findCompanies}>
          <div className={styles.jobs__container}>
            <div className={styles.section__header}>
              <h3 className={styles.section__subtitle}>
                {" "}
                Search and find Companies.
              </h3>
            </div>
            <div className={styles.hero__searchBar}>
              <input
                type="search"
                name="search-bar"
                className={styles.search__bar}
                placeholder="Search for Company..."
                value={searchValue}
                onChange={handleSearch}
              />
              <button className={styles.hero__button}>
                <HiOutlineArrowNarrowRight className={styles.search__icon} />
                <p>Find Company</p>
              </button>
            </div>
          </div>

          <div className="mx-auto max-w-xl text-center mt-24">
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Explore the latest job openings
            </p>
            <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">
              Discover jobs most relevant to you
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 w-[90%] mx-auto">
            {currentCompanies.length > 0 ? (
              currentCompanies.map((company) => (
                <div
                  className={`${styles.jobs__card} overflow-hidden rounded-xl border border-gray-200`}
                  key={company.id}
                >
                  <div className={styles.card__info}>
                    <div className={styles.card__company}>
                      <div className={styles.card__logo}>
                        <img src={company.photo} alt={company.fullName} />
                        <div className={styles.company__info}>
                          <h5 className={styles.company__name}>
                            {company.fullName}
                          </h5>
                          <p className={styles.company__location}>
                            <AiOutlineEnvironment />
                            Location: {company.location || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className={styles.card__flex}>
                      <p className={styles.card__flex}>
                        <CgBriefcase />
                        {company.industry || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className={styles.card__flex}>
                    <Link href={`/company/${company.companyId}`}>
                      <button className={styles.apply__button}>
                        View More
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.no__company}>No companies found.</p>
            )}
          </div>

          <div className={styles.pagination}>
            <button
              className={styles.pagination__button}
              onClick={handlePreviousClick}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {Array.from({ length: pageNumbers }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  className={`pagination__button ${
                    currentPage === pageNumber ? "pagination__active" : ""
                  }`}
                  key={pageNumber}
                  onClick={() => handleClick(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
            )}

            <button
              className={styles.pagination__button}
              onClick={handleNextClick}
              disabled={currentPage >= pageNumbers}
            >
              Next
            </button>
          </div>
        </section>
      )}
    </FindCompaniesLayout>
  );
};

export default FindCompanies;
