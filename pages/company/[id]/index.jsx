import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { companyStore } from "../../../firebaseConfig/companyStore";
import { getActiveJobCount } from "../../../firebaseConfig/companyStore";
import LoadingScreen from "../../../components/utils/Loaders/Loader";
import Button from "@/components/utils/Button";
import styles from "./style.module.scss";
import CompaniesLayout from "./layout";
import { AiOutlineMail } from "react-icons/ai";
import { BiBuilding, BiPhone } from "react-icons/bi";
import { MdOutlineLocationOn } from "react-icons/md";
import { BsBriefcase } from "react-icons/bs";

const CompanyDetail = () => {
  const router = useRouter();
  const { id } = router.query; 
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openJobsCount, setOpenJobsCount] = useState(0);

  useEffect(() => {
    if (id) {
      const fetchCompanyData = async () => {
        try {
          const companyData = await companyStore.getCompanyStoreById(id);
          setCompany(companyData);

          const activeJobs = await getActiveJobCount(id);

          setOpenJobsCount(activeJobs);
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
          <Button
            type="button"
            title="Go back"
            variant="details__back"
            onClick={() => window.history.back()}
          />
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
            <p className={styles.description__text}>
              "Incoming"
            </p>
          </section>
        </div>
      )}
    </CompaniesLayout>
  );
};

export default CompanyDetail;
