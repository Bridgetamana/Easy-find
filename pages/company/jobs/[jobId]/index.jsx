import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getJobDetailsById } from "../../../../firebaseConfig/companyStore";
import styles from "./style.module.scss";
import { AiOutlineEnvironment } from "react-icons/ai";
import Link from "next/link";
import Button from "@/components/utils/Button";
import CompanyLayout from "../../layout";
import { BiBuilding, BiEdit } from "react-icons/bi";

const JobDetailsPage = () => {
  const router = useRouter();
  const { jobId } = router.query;
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  const fetchJobDetails = async () => {
    try {
      const job = await getJobDetailsById(jobId);
      setJobDetails(job);
    } catch (error) {
      console.error("Error fetching job details:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <CompanyLayout>
      <div className={styles.jobDetails__section}>
        <div className={styles.details__header}>
          <Link href="/company/jobs">
            <Button
              type="button"
              title="Back to Jobs"
              variant="details__back"
            />
          </Link>
          <h2 className={styles.details__title}>{jobDetails.title}</h2>
          <div className={styles.details__flex}>
            <p className={styles.details__type}>
              <AiOutlineEnvironment fill="#9d9d9d" />
              Full-time
            </p>
          </div>
          <Link href={`/company/jobs/editjob/${jobId}`}>
            <button className={styles.edit__button}>
              <BiEdit /> Edit Job
            </button>
          </Link>
        </div>

        <section className={styles.employmentInfo__section}>
          <div className={styles.info__header}>
            <p className={styles.info__title}>Employment Information</p>
          </div>

          <div className={styles.info__content}>
            <div className={styles.info__item}>
              <div className={styles.info__left}>
                <span className={styles.info__icon}>
                  <BiBuilding />
                </span>
                <p className={styles.info__title}>Industry</p>
              </div>
              <div className={styles.info__right}>
                <div className={styles.info__text}>
                  {jobDetails?.industry || notSpecified}
                </div>
              </div>
            </div>
            <div className={styles.info__item}>
              <div className={styles.info__left}>
                <span className={styles.info__icon}>
                  <BiBuilding />
                </span>
                <p className={styles.info__title}>Job level</p>
              </div>
              <div className={styles.info__right}>
                <div className={styles.info__text}>
                  {jobDetails.jobLevel || notSpecified}
                </div>
              </div>
            </div>
            <div className={styles.info__item}>
              <div className={styles.info__left}>
                <span className={styles.info__icon}>
                  <BiBuilding />
                </span>
                <p className={styles.info__title}>Salary</p>
              </div>
              <div className={styles.info__right}>
                <div className={styles.info__text}>
                  {jobDetails?.salaryMin} - {jobDetails?.salaryMax}
                </div>
              </div>
            </div>
            <div className={styles.info__item}>
              <div className={styles.info__left}>
                <span className={styles.info__icon}>
                  <BiBuilding />
                </span>
                <p className={styles.info__title}>Experience</p>
              </div>
              <div className={styles.info__right}>
                <div className={styles.info__text}>
                  {jobDetails?.experience}
                </div>
              </div>
            </div>
            <div className={styles.info__item}>
              <div className={styles.info__left}>
                <span className={styles.info__icon}>
                  <BiBuilding />
                </span>
                <p className={styles.info__title}>Location</p>
              </div>
              <div className={styles.info__right}>
                <div className={styles.info__text}>{jobDetails.location}</div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.jobInfo__section}>
          <div className={styles.description__header}>
            <h2 className={styles.description__title}>Job Description</h2>
          </div>
          <p className={styles.description__text}>
            {jobDetails.description || notSpecified}
          </p>
        </section>
        <section className={styles.jobInfo__section}>
          <div className={styles.description__header}>
            <h2 className={styles.description__title}>Requirements</h2>
          </div>
          <div className={styles.description__content}>
            {jobDetails.requirements}
          </div>
        </section>
        <section className={styles.jobInfo__section}>
          <div className={styles.description__header}>
            <h2 className={styles.description__title}>Job Benefits</h2>
          </div>
          <div className={styles.description__content}>
            {jobDetails.benefits}
          </div>
        </section>

        <div className={styles.candidatesSection}>
          <h2>Candidates That Applied</h2>
          <p>No candidates have applied yet.</p>
        </div>

        <div className={styles.candidatesSection}>
          <h2>Candidates That Saved the Job</h2>
          <p>No candidates have saved this job yet.</p>
        </div>
      </div>
    </CompanyLayout>
  );
};

export default JobDetailsPage;
