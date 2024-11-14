"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineClockCircle, AiOutlineEnvironment } from "react-icons/ai";
import { MdKeyboardBackspace } from "react-icons/md";
import {
  getJobById,
  convertFutureTimestamp,
  convertTimestamp,
  unsaveJob,
  saveJob,
} from "@/firebaseConfig/talentStore";
import { companyStore } from "../../../../../../firebaseConfig/companyStore";
import { db, auth } from "../../../../../../firebaseConfig/firebase";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { BiBadgeCheck } from "react-icons/bi";
import Button from "@/components/utils/Button";
import { BsCheck2Circle, BsHeart, BsHeartFill } from "react-icons/bs";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import LoadingScreen from "@/components/utils/Loaders/Loader";
import ProtectedRoute from "@/utils/protectedRoute";
import Link from "next/link";
import styles from "./style.module.scss";
import showAlert from "@/components/utils/AlertBox/CustomAlert";
import TalentLayout from "../../../../layout";
import { submitJobApplication } from "@/firebaseConfig/companyStore";
import JobApplicationForm from "../../../../../../components/authorized/CompanyComponents/JobApplicationForm";

const JobDetails = () => {
  const router = useRouter();
  const { companyId, jobId } = router.query;
  const [isSaved, setIsSaved] = useState(false);
  const [jobDetails, setJobDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [JobApplicationModal, setJobApllicationModal] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const fetchJobDetailsAndCompanies = async () => {
    if (!jobId || !companyId) return; 
    setIsLoading(true);
    try {
      const jobData = await getJobById(jobId, companyId);
      
      if (jobData) {
        const companyInfo = await companyStore.getCompanyStoreById(companyId);
        
        const jobWithCompanyInfo = {
          ...jobData,
          companyInfo: companyInfo || {}
        };
        
        setJobDetails(jobWithCompanyInfo);
      } else {
        console.error("Job not found");
      }
    } catch (error) {
      console.error("Error fetching job and company info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (jobId && companyId) {
      fetchJobDetailsAndCompanies();
    }
  }, [jobId, companyId]); 

  useEffect(() => {
    const checkIfApplied = async () => {
      const userId = auth.currentUser?.uid;
    
      if (!userId || !companyId) return; 
    
      try {
        const appliedJobRef = doc(db, `companyCollection/${companyId}/jobs/${jobId}/applied`, userId);
        const appliedJobDoc = await getDoc(appliedJobRef);
    
        if (appliedJobDoc.exists()) {
          setApplicationSubmitted(true);
        } else {
          setApplicationSubmitted(false); 
        }
      } catch (error) {
        console.error("Error checking applied job status:", error);
      }
    };
    if (jobId) {
      checkIfApplied();
    }
    
  }, [jobId]);
  
  
  const togglejobApplicationModal = () => {
    setJobApllicationModal(!JobApplicationModal);
  };

  const closeApplicationForm = () => {
    setJobApllicationModal(false);
  };

  const handleApplicationSuccess = async (applicationData) => {
    const userId = auth.currentUser?.uid;
  
    if (!userId || !jobId || !companyId) return;
  
    try {
      const result = await submitJobApplication(companyId, jobId, {
        ...applicationData,
        userId: userId,
        title: jobDetails.title,
        appliedAt: new Date(),
      });
  
      setApplicationSubmitted(true);  
      togglejobApplicationModal();
      showAlert(
        {
          type: "success",
          message: "Job application successfully submitted!",
          timeout: 3000,
        },
        setAlert
      );
    } catch (error) {
      console.error("Error submitting application:", error);
      showAlert(
        {
          type: "error",
          message: "Error applying for job, Please try again",
          timeout: 3000,
        },
        setAlert
      );
    }
  };
  
  const handleSaveJob = async (jobId, jobDetails) => {
    const userId = auth.currentUser?.uid;

    if (!userId) {
      console.error("User is not logged in");
      return;
    }

    try {
      const savedJobRef = doc(db, `companyCollection/${companyId}/jobs/${jobId}/savedForLater`, userId);

      if (isSaved) {
        await deleteDoc(savedJobRef);
        showAlert(
          {
            type: "warning", 
            message: "Job removed from your saved list.",
            timeout: 3000, 
          },
          setAlert
        );
      } else {
        await setDoc(savedJobRef, {
          userId: userId,
          jobId: jobId,
          title: jobDetails.title,
          savedAt: new Date(),
        });
        showAlert(
          {
            type: "success",
            message: "Job successfully saved.",
            timeout: 3000,
          },
          setAlert
        );
      }

      setIsSaved(!isSaved);
    } catch (error) {
      showAlert(
        {
          type: "error",
          title: "Error",
          message: "An error occurred while saving the job.",
          timeout: 3000,
        },
        setAlert
      );
    }
  };

  useEffect(() => {
    const checkIfJobIsSaved = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId || !companyId) return;

      try {
        const savedJobRef = doc(
          db,
          `companyCollection/${companyId}/jobs/${jobId}/savedForLater`,
          userId
        );
        const docSnap = await getDoc(savedJobRef);

        if (docSnap.exists()) {
          setIsSaved(true);
        } else {
          setIsSaved(false);
        }
      } catch (error) {
        console.error("Error checking if job is saved:", error.message);
      }
    };

    if (jobId) {
      checkIfJobIsSaved();
    }
  }, [jobId]);

  const notSpecified = (
    <span className={styles.not__specified}>Not Specified</span>
  );


  return (
    <ProtectedRoute>
      <TalentLayout>
        {jobDetails && (
          <div className={styles.jobDetails__section}>
            <div className={styles.details__header}>
              <Link href="/talent/jobs">
                <Button
                  type="button"
                  title="Back to Jobs"
                  icon={<MdKeyboardBackspace fill="#fff" />}
                  variant="details__back"
                />
              </Link>
              {isLoading && <LoadingScreen />}
              {alert && alert.component}
              <h2 className={styles.details__title}>{jobDetails.title}</h2>
              <div className={styles.details__flex}>
                <p className={styles.details__type}>
                  <AiOutlineEnvironment fill="#9d9d9d" />
                  Full-time
                </p>
                <p className={styles.details__posted}>
                  <AiOutlineClockCircle fill="#9d9d9d" />
                  {convertTimestamp(jobDetails.createdAt)}
                </p>
              </div>
              <button
                className={styles.save__button}
                onClick={() => handleSaveJob(jobId, jobDetails)}
              >
                {isSaved ? (
                  <BsHeartFill fill="#ff0000" />
                ) : (
                  <BsHeart fill="#e0e6f7" />
                )}
                Save Job
              </button>
            </div>

            {/* <JobOverview/> */}
            <section className={styles.employmentInfo__section}>
              <div className={styles.info__header}>
                <p className={styles.info__title}>Employment Information</p>
              </div>

              <div className={styles.info__content}>
                <div className={styles.info__item}>
                  <div className={styles.info__left}>
                    <span className={styles.info__icon}>
                      <HiOutlineBuildingOffice2 />
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
                      <HiOutlineBuildingOffice2 />
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
                      <HiOutlineBuildingOffice2 />
                    </span>
                    <p className={styles.info__title}>Qualification</p>
                  </div>
                  <div className={styles.info__right}>
                    <div className={styles.info__text}>
                      {jobDetails.qualifications || notSpecified}
                    </div>
                  </div>
                </div>

                <div className={styles.info__item}>
                  <div className={styles.info__left}>
                    <span className={styles.info__icon}>
                      <HiOutlineBuildingOffice2 />
                    </span>
                    <p className={styles.info__title}>Salary</p>
                  </div>
                  <div className={styles.info__right}>
                    <div className={styles.info__text}>
                      {jobDetails.minSalary} - {jobDetails.maxSalary}
                    </div>
                  </div>
                </div>

                <div className={styles.info__item}>
                  <div className={styles.info__left}>
                    <span className={styles.info__icon}>
                      <HiOutlineBuildingOffice2 />
                    </span>
                    <p className={styles.info__title}>Experience</p>
                  </div>
                  <div className={styles.info__right}>
                    <div className={styles.info__text}>1 year</div>
                  </div>
                </div>

                <div className={styles.info__item}>
                  <div className={styles.info__left}>
                    <span className={styles.info__icon}>
                      <HiOutlineBuildingOffice2 />
                    </span>
                    <p className={styles.info__title}>Job type</p>
                  </div>
                  <div className={styles.info__right}>
                    <div className={styles.info__text}>
                      {jobDetails.jobType}
                    </div>
                  </div>
                </div>

                <div className={styles.info__item}>
                  <div className={styles.info__left}>
                    <span className={styles.info__icon}>
                      <HiOutlineBuildingOffice2 />
                    </span>
                    <p className={styles.info__title}>Deadline</p>
                  </div>
                  <div className={styles.info__right}>
                    <div className={styles.info__text}>
                      {convertFutureTimestamp(jobDetails.deadline)}
                    </div>
                  </div>
                </div>

                <div className={styles.info__item}>
                  <div className={styles.info__left}>
                    <span className={styles.info__icon}>
                      <HiOutlineBuildingOffice2 />
                    </span>
                    <p className={styles.info__title}>Location</p>
                  </div>
                  <div className={styles.info__right}>
                    <div className={styles.info__text}>
                      {jobDetails.location}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* <CompanyDescription/> */}
            <section className={styles.companyDescription__section}>
              <div className={styles.description__header}>
                <h2 className={styles.description__title}>About Company</h2>
              </div>
              <p className={styles.description__text}>
                {jobDetails.companyInfo?.bio}
              </p>
            </section>

            {/* <JobDescription/> */}
            <section className={styles.companyDescription__section}>
              <div className={styles.description__header}>
                <h2 className={styles.description__title}>Job Description</h2>
              </div>
              <p className={styles.description__text}>
                {jobDetails.description || notSpecified}
              </p>
            </section>

            {/* <RequiredSkills/> */}
            <section className={styles.requiredSkills__section}>
              <div className={styles.skills__header}>
                <h2 className={styles.skills__title}>Requirements</h2>
              </div>
              <div className={styles.skills__content}>
                <ul className={styles.skills__list}>
                {jobDetails?.skills?.length > 0 ? (
                  jobDetails.skills.map((skill, index) => (
                    <li className={styles.skills__item} key={index}>
                      <p className={styles.skills__text}>
                        <BsCheck2Circle fill="#66789c" />
                        {skill}
                      </p>
                    </li>
                  ))
                ) : (
                  <p>No skills listed</p> 
                )}
                </ul>
              </div>
            </section>


            {/* <JobBenefits/> */}
            <section className={styles.requiredSkills__section}>
              <div className={styles.skills__header}>
                <h2 className={styles.skills__title}>Job Benefits</h2>
              </div>
              <div className={styles.skills__content}>
              <ul className={styles.skills__list}>
                {Array.isArray(jobDetails?.benefits) && jobDetails.benefits.length > 0 ? (
                  jobDetails.benefits.map((benefit, index) => (
                    <li className={styles.skills__item} key={index}>
                      <p className={styles.skills__text}>
                        <BsCheck2Circle fill="#66789c" />
                        {benefit}
                      </p>
                    </li>
                  ))
                ) : (
                  <p>No benefits listed</p>
                )}
              </ul>
              </div>
            </section>

            {/* Application Button */}
            <button
              className={`${styles.apply__button} ${
                applicationSubmitted ? styles.disabledButton : ""
              }`}
              onClick={togglejobApplicationModal}
              disabled={applicationSubmitted}  
            >
              <BiBadgeCheck fill="#fff" />
              {applicationSubmitted ? "Applied" : "Apply"}
            </button>
            {JobApplicationModal && (
              <div>
                <JobApplicationForm
                  closeApplicationForm={closeApplicationForm}
                  onSuccess={handleApplicationSuccess}
                  jobId={jobId}
                  companyId={companyId}  
                  jobDetails={jobDetails}
                />
              </div>
            )}
          </div>
        )}
      </TalentLayout>
    </ProtectedRoute>
  );
};

export default JobDetails;
