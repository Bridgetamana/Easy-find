import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getApplicantsByJobId } from "../../../../../firebaseConfig/companyStore";
import { getAuth } from "firebase/auth";
import CompanyLayout from "../../../layout";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import styles from "./style.module.scss";
import Link from "next/link";
import Button from "@/components/utils/Button";


const ApplicantsPage = () => {
  const router = useRouter();
  const { jobId } = router.query;
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplicants = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user && jobId) {
        const companyId = user.uid;
        try {
          const applicantsData = await getApplicantsByJobId(jobId, companyId);
          setApplicants(applicantsData);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchApplicants();
  }, [jobId]);

  if (loading) return <div>Loading..</div>;
  if (error)
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorText}>
          Error fetching applicants: {error}
        </div>
      </div>
    );

  if (!applicants.length)
    return (
      <div className={styles.noApplicantsContainer}>
        <div>No applicants found for this job.</div>
        
        <Link href="/company/jobs/postjobs" className={styles.postJobButton}>
          Post Job
        </Link>
      </div>
    );

  return (
    <CompanyLayout>
      <div className={styles.applicantsContainer}>
        <div className={styles.header}>
        <Link href="/company/jobs">
            <Button
              type="button"
              title="Back to Jobs"
              variant="details__back"
            />
          </Link>
          <h3 className={styles.title}>Applicants for Job ID: {jobId}</h3>
        </div>
        <div className={styles.applicantsList}>
          {applicants.map((applicant) => (
            <div key={applicant.id} className={styles.applicantInfo}>
              <div className={styles.applicantCard}>
                <div className={styles.applicantHeader}>
                  <h3 className={styles.applicantTitle}>
                    Applicant Information
                  </h3>
                  <p className={styles.applicantSubtitle}>
                    Personal details and application.
                  </p>
                </div>
                <div className={styles.applicantDetails}>
                  <dl className={styles.detailsList}>
                    <div className={styles.detailItem}>
                      <dt className={styles.detailLabel}>Full name</dt>
                      <dd className={styles.detailValue}>{jobId}</dd>
                    </div>
                    <div className={styles.detailItem}>
                      <dt className={styles.detailLabel}>Application for</dt>
                      <dd className={styles.detailValue}>
                        {applicant.position}
                      </dd>
                    </div>
                    <div className={styles.detailItem}>
                      <dt className={styles.detailLabel}>Email address</dt>
                      <dd className={styles.detailValue}>{applicant.email}</dd>
                    </div>
                    <div className={styles.detailItem}>
                      <dt className={styles.detailLabel}>Salary expectation</dt>
                      <dd className={styles.detailValue}>
                        ${applicant.salaryExpectation}
                      </dd>
                    </div>
                    <div className={styles.detailItem}>
                      <dt className={styles.detailLabel}>About</dt>
                      <dd className={styles.detailValue}>
                        Fugiat ipsum ipsum deserunt culpa aute sint do nostrud
                        anim incididunt cillum culpa consequat. Excepteur qui
                        ipsum aliquip consequat sint. Sit id mollit nulla mollit
                        nostrud in ea officia proident. Irure nostrud pariatur
                        mollit ad adipisicing reprehenderit deserunt qui eu.
                      </dd>
                    </div>
                    <div className={styles.detailItem}>
                      <dt className={styles.detailLabel}>Attachments</dt>
                      <dd className={styles.detailAttachments}>
                        <ul role="list" className={styles.attachmentList}>
                          <li className={styles.attachmentItem}>
                            <div className={styles.attachmentContent}>
                              <PaperClipIcon
                                aria-hidden="true"
                                className={styles.attachmentIcon}
                              />
                              <div className={styles.attachmentInfo}>
                                <span >
                                  resume_back_end_developer.pdf
                                </span>
                              </div>
                            </div>
                            <div className={styles.attachmentDownload}>
                              <a
                                href="#"
                              >
                                Download
                              </a>
                            </div>
                          </li>
                          
                        </ul>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CompanyLayout>
  );
};

export default ApplicantsPage;
