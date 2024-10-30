import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { getApplicantsByJobId } from "../../../../../../firebaseConfig/companyStore";
import CompanyLayout from "../../../../layout";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import styles from "./style.module.scss";
import LoadingScreen from "../../../../../../components/utils/Loaders/Loader";

const ApplicantDetailsPage = () => {
  const router = useRouter();
  const { jobId, applicantId } = router.query;
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplicantDetails = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user && jobId && applicantId) {
        const companyId = user.uid;
        try {
          const applicantsData = await getApplicantsByJobId(jobId, companyId);
          const selectedApplicant = applicantsData.find(
            (applicant) => applicant.id === applicantId
          );

          if (selectedApplicant) {
            setApplicant(selectedApplicant);
          } else {
            setError("Applicant not found.");
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchApplicantDetails();
  }, [jobId, applicantId]);

  if (error) return <div>{error}</div>;

  return (
    <CompanyLayout>
      {loading && <LoadingScreen />}
      {error && <error />}
      {applicant ? (
        <div className={styles.applicantDetailContainer}>
          <div className={styles.header}>
            <h3 className={styles.title}>
              Applicant Information for {applicant.name}
            </h3>
          </div>
          <div className={styles.applicantList}>
            <dl className={styles.detailsList}>
              <div className={styles.detailItem}>
                <dt className={styles.detailLabel}>Full Name</dt>
                <dd className={styles.detailValue}>{applicant.name}</dd>
              </div>
              <div className={styles.detailItem}>
                <dt className={styles.detailLabel}>Position</dt>
                <dd className={styles.detailValue}>{applicant.position}</dd>
              </div>
              <div className={styles.detailItem}>
                <dt className={styles.detailLabel}>Email</dt>
                <dd className={styles.detailValue}>{applicant.email}</dd>
              </div>
              <div className={styles.detailItem}>
                <dt className={styles.detailLabel}>Salary Expectation</dt>
                <dd className={styles.detailValue}>
                  ${applicant.salaryExpectation}
                </dd>
              </div>
              <div className={styles.detailItem}>
                <dt className={styles.detailLabel}>About</dt>
                <dd className={styles.detailValue}>
                  {applicant.about || "No details provided."}
                </dd>
              </div>
              <div className={styles.detailItem}>
                <dt className={styles.detailLabel}>Attachments</dt>
                <dd className={styles.detailAttachments}>
                  {applicant.attachment && applicant.attachment.length > 0 ? (
                    <ul className={styles.attachmentList}>
                      {applicant.attachment.map((attachment) => (
                        <li
                          key={attachment.id}
                          className={styles.attachmentItem}
                        >
                          <div className={styles.attachmentContent}>
                            <PaperClipIcon
                              aria-hidden="true"
                              className={styles.attachmentIcon}
                            />
                            <div className={styles.attachmentInfo}>
                              <span className={styles.attachmentName}>
                                {attachment.name}
                              </span>
                            </div>
                          </div>
                          <div className={styles.attachmentDownload}>
                            <a
                              href={attachment.url}
                              className={styles.downloadLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Download
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>No attachments found.</div>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      ) : (
        <div>No applicant details available.</div>
      )}
    </CompanyLayout>
  );
};

export default ApplicantDetailsPage;
