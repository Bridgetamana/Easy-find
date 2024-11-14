import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getApplicantsByJobId, updateApplicantStatusInFirestore } from "../../../../../firebaseConfig/companyStore";
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
  const [selectedApplicantStatus, setSelectedApplicantStatus] = useState(null);
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

  const handleMenuClick = (applicantId) => {
    setActiveDropdown(activeDropdown === applicantId ? false : applicantId);
  };

  const handleStatusChange = async (applicantId, newStatus) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const companyId = user.uid;
        await updateApplicantStatusInFirestore(companyId, jobId, applicantId, newStatus);
        setApplicants((prevApplicants) =>
          prevApplicants.map((applicant) =>
            applicant.id === applicantId ? { ...applicant, status: newStatus } : applicant
          )
        );
        setSelectedApplicantStatus(null);
      }
    } catch (err) {
      setError(err.message);
    }
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
          <h3 className={styles.title}>Applicants for </h3>
          <table className={styles.applicantsTable}>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Applied At</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentApplicants.map((applicant) => (
                <tr key={applicant.id} className={styles.applicantRow}>
                  <td>
                    <Link href={`/company/jobs/${jobId}/applicants/${applicant.id}`}>
                      {applicant.fullName}
                    </Link>
                  </td>
                  <td>{applicant.email}</td>
                  <td>{applicant.appliedAt.toLocaleDateString()}</td>
                  <td>
                    <select
                      value={selectedApplicantStatus || applicant.status}
                      onChange={(e) => setSelectedApplicantStatus(e.target.value)}
                      onBlur={() => handleStatusChange(applicant.id, selectedApplicantStatus)}
                    >
                      <option value="pending">Pending</option>
                      <option value="interviewed">Interviewed</option>
                      <option value="rejected">Rejected</option>
                      <option value="hired">Hired</option>
                    </select>
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
