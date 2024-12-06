import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { convertTimestamp } from "@/firebaseConfig/talentStore";
import {
  getActiveJobCount,
  getActiveJobIdsFromCompany,
  companyStore
} from "@/firebaseConfig/companyStore";
import LoadingScreen from "@/components/utils/Loaders/Loader";
import Button from "@/components/utils/Button";
import styles from "./style.module.scss";
import CompaniesLayout from "./layout";
import {
  AiOutlineClockCircle,
  AiOutlineEnvironment,
  AiOutlineMail,
} from "react-icons/ai";
import { CgBriefcase } from "react-icons/cg";
import Link from "next/link";
import { BiBuilding, BiPhone, BiArrowBack } from "react-icons/bi";
import { MdOutlineLocationOn } from "react-icons/md";
import { BsBriefcase } from "react-icons/bs";

const CompanyDetail = () => {
  const router = useRouter();
  const { id } = router.query; 
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openJobsCount, setOpenJobsCount] = useState(0);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchCompanyData = async () => {
        try {
          const companyData = await companyStore.getCompanyStoreById(id);
          setCompany(companyData);

          const activeJobs = await getActiveJobCount(id);
          setOpenJobsCount(activeJobs);

          const jobData = await getActiveJobIdsFromCompany(id);
          setJobs(jobData);
        } catch (error) {
          console.error("Error fetching company details or job count:", error);
          setError("Could not fetch company data.");
        } finally {
          setLoading(false);
        }
      };
      fetchCompanyData();
    }
  }, [id]);

  return (
    <CompaniesLayout>
      {loading && <LoadingScreen />}
      {error && <div>Error: {error}</div>}

      {!loading && !error && company && (
        <div className={styles.companyDetails__section}>
          <button onClick={() => window.history.back()} className="flex items-center gap-1">
            <BiArrowBack />
            <Button type="button" title="Go back" variant="details__back" />
          </button>
          <div className={styles.details__header}>
            <div className={styles.profile__image}>
              {company.photo && (
                <img
                  className={styles.company__photo}
                  src={company.photo}
                  alt={`${company.fullName} logo`}
                />
              )}
            </div>
            <span>
              <h2 className={styles.details__title}>{company.fullName}</h2>
              <div className={styles.details__flex}>
                <p className={styles.details__location}>
                  <MdOutlineLocationOn />{" "}
                  {company.location || "Location not specified"}
                </p>
              </div>
            </span>
          </div>

          <section className={styles.about__section}>
            <div className={styles.info__header}>
              <p className={styles.info__title}>Company Information</p>
            </div>
            <div className={styles.info__content}>
              <div className={styles.info__item}>
                <div className={styles.info__left}>
                  <span className={styles.info__icon}>
                    <BsBriefcase />
                  </span>
                </div>
                <div className={styles.info__right}>
                  <div className={styles.info__text}>
                    {company.industry || "Not specified"}
                  </div>
                </div>
              </div>
              <div className={styles.info__item}>
                <div className={styles.info__left}>
                  <span className={styles.info__icon}>
                    <AiOutlineMail />
                  </span>
                </div>
                <div className={styles.info__right}>
                  <div className={styles.info__text}>{company.email}</div>
                </div>
              </div>
              <div className={styles.info__item}>
                <div className={styles.info__left}>
                  <span className={styles.info__icon}>
                    <BiBuilding />
                  </span>
                </div>
                <div className={styles.info__right}>
                  <div className={styles.info__text}>{company.size}</div>
                </div>
              </div>
              <div className={styles.info__item}>
                <div className={styles.info__left}>
                  <span className={styles.info__icon}>
                    <BiBuilding />
                  </span>
                </div>
                <div className={styles.info__right}>
                  <div className={styles.info__text}>{company.linkedin}</div>
                </div>
              </div>
              <div className={styles.info__item}>
                <div className={styles.info__left}>
                  <span className={styles.info__icon}>
                    <BiPhone />
                  </span>
                </div>
                <div className={styles.info__right}>
                  <div className={styles.info__text}>{company.phone}</div>
                </div>
              </div>
              <div className="">
                <div className={styles.info__left}>
                  <p className={styles.info__pill}>
                    Open Jobs - {openJobsCount}
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className={styles.companyInfo__section}>
            <div className={styles.description__header}>
              <h2 className={styles.description__title}>About</h2>
            </div>
            <p className={styles.description__text}>
              {company.bio || "No description available."}
            </p>
          </section>
          <section className={styles.companyInfo__section}>
            <div className={styles.description__header}>
              <h2 className={styles.description__title}>Jobs available</h2>
            </div>
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 xl:grid-cols-3 xl:gap-x-8`}
            >
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <div
                    key={job.jobId}
                    className={`${styles.jobs__card} overflow-hidden rounded-xl border border-gray-200`}
                  >
                    <div className={styles.card__info}>
                      <div className={styles.card__company}>
                        <div className={styles.card__logo}>
                          <div className={styles.company__info}></div>
                        </div>
                      </div>
                      <h4 className={styles.card__title}>{job.title}</h4>
                      <div className={styles.card__flex}>
                        <p className={styles.card__location}>
                          <CgBriefcase />
                          {job.jobType}
                        </p>
                        <p className={styles.card__time}>
                          <AiOutlineClockCircle />
                          {convertTimestamp(job.createdAt)}
                        </p>
                        <p className={styles.card__location}>
                          <AiOutlineEnvironment />
                          {job.location}
                        </p>
                      </div>
                    </div>
                    <div className={styles.card__flex}>
                      <p className={styles.company__pay}>
                        NGN{job.salaryMin} - NGN{job.salaryMax}
                      </p>
                      <Link href={`/signin`}>
                        <button className={styles.apply__button}>
                          View More
                        </button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p>No open jobs.</p>
              )}
            </div>
          </section>
        </div>
      )}
    </CompaniesLayout>
  );
};

export default CompanyDetail;
