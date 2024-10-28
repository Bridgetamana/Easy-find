import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getApplicantsByJobId } from "../../../../../firebaseConfig/companyStore";
import { getAuth } from "firebase/auth";
import CompanyLayout from "../../../layout";
import styles from "./style.module.scss";
import Link from "next/link";
import { CiMenuKebab } from "react-icons/ci";
import LoadingScreen from "../../../../../components/utils/Loaders/Loader";

const ApplicantsPage = () => {
  const router = useRouter();
  const { jobId } = router.query;
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(false);
  const applicantsPerPage = 10;

  useEffect(() => {
    if (!jobId) return;

    const fetchApplicants = async () => {
      setLoading(true);
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const companyId = user.uid;
        try {
          const applicantsData = await getApplicantsByJobId(jobId, companyId);
          setApplicants(applicantsData);
        } catch (err) {
          setError(err.message || "An error occurred while fetching applicants.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchApplicants();
  }, [jobId]);

  const handleMenuClick = (jobId) => {
    setActiveDropdown(activeDropdown === jobId ? false : jobId);
  };

  const indexOfLastApplicant = currentPage * applicantsPerPage;
  const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage;
  const currentApplicants = applicants.slice(indexOfFirstApplicant, indexOfLastApplicant);
  const pageNumbers = Math.ceil(applicants.length / applicantsPerPage);

  const handleClick = (pageNumber) => setCurrentPage(pageNumber);
  const handleNextClick = () => currentPage < pageNumbers && setCurrentPage(currentPage + 1);
  const handlePreviousClick = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <CompanyLayout>
      {loading && <LoadingScreen />}
      {error && <div className={styles.errorMessage}>{error}</div>}

      {!loading && !error && applicants.length === 0 && (
        <div className={styles.noApplicantsContainer}>
          <p className={styles.noApplicantsMessage}>No applicants found for this job.</p>
        </div>
      )}

      {!loading && !error && applicants.length > 0 && (
        <div className={styles.table__container}>
          <h3 className={styles.title}>Applicants for Job ID: {jobId}</h3>
          <table className={styles.applicantsTable}>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Position</th>
                <th>Email</th>
                <th>Salary Expectation</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentApplicants.map((applicant) => (
                <tr key={applicant.id} className={styles.applicantRow}>
                  <td>
                    <Link href={`/company/jobs/${jobId}/applicants/${applicant.id}`}>
                      {applicant.name}
                    </Link>
                  </td>
                  <td>{applicant.position}</td>
                  <td>{applicant.email}</td>
                  <td>${applicant.salaryExpectation}</td>
                  <td className="text-right">
                    <div className={styles.dropdown}>
                      <button
                        onClick={() => handleMenuClick(job.jobId)}
                        className={styles.dropdown__button}
                      >
                        <CiMenuKebab />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className={styles.pagination}>
            <button
              className={styles.pagination__button}
              onClick={handlePreviousClick}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: pageNumbers }, (_, index) => index + 1).map((pageNumber) => (
              <button
                className={`${styles.pagination__number} ${
                  currentPage === pageNumber ? styles.pagination__number__active : ""
                }`}
                key={pageNumber}
                onClick={() => handleClick(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
            <button
              className={styles.pagination__button}
              onClick={handleNextClick}
              disabled={currentPage === pageNumbers}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </CompanyLayout>
  );
};

export default ApplicantsPage;
