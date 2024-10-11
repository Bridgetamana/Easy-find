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
import { db, auth } from '../../../../../firebaseConfig/firebase'; 
import { doc, setDoc, getDoc, deleteDoc} from 'firebase/firestore';
import { BiBadgeCheck } from "react-icons/bi";
import Button from "@/components/utils/Button";
import { BsCheck2Circle, BsHeart, BsHeartFill } from "react-icons/bs";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import LoadingScreen from "@/components/utils/Loaders/Loader";
import ProtectedRoute from "@/utils/protectedRoute";
import Link from "next/link";
import styles from "./style.module.scss";
import TalentLayout from "../../../layout";
import JobApplicationForm from "../../../../../components/authorized/CompanyComponents/JobApplicationForm";

const JobDetails = () => {
  const router = useRouter();
  const { detailsId } = router.query;
  const jobId = detailsId;
  const [isSaved, setIsSaved] = useState(false);
  const [jobDetails, setJobDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [JobApplicationModal, setJobApllicationModal] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const togglejobApplicationModal = () => {
    setJobApllicationModal(!JobApplicationModal);
  };

  const closeApplicationForm = () => {
    setJobApllicationModal(false);
  };

  const handleApplicationSuccess = () => {
    setApplicationSubmitted(true);  // Mark the application as submitted
    togglejobApplicationModal();  // Close the modal after submission
  };

  const fetchJobDetails = async () => {
    if (!jobId) return;
    setIsLoading(true);
    try {
      const response = await getJobById(jobId);
      setJobDetails(response);
    } catch (error) {
      console.error("Error fetching job details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);


  const handleSaveJob = async (jobId, jobDetails) => {
    const userId = auth.currentUser?.uid; 
  
    if (!userId) {
      console.error("User is not logged in");
      return;
    }
  
    try {
      const savedJobRef = doc(db, `jobListings/${jobId}/savedForLater`, userId);
  
      if (isSaved) {
        await deleteDoc(savedJobRef);
        console.log("Job unsaved successfully.");
      } else {
        await setDoc(savedJobRef, {
          userId: userId,
          jobId: jobId,
          title: jobDetails.title,
          company: jobDetails.companyName,
          savedAt: new Date(),
        });
        console.log("Job saved successfully.");
      }
  
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Error saving or unsaving job:", error.message);
    }
  };

  useEffect(() => {
    const checkIfJobIsSaved = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId) return;
  
      try {
        const savedJobRef = doc(db, `jobListings/${jobId}/savedForLater`, userId);
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
              <h2 className={styles.details__title}>{jobDetails.title}</h2>
              <div className={styles.details__flex}>
                <p className={styles.details__type}>
                  <AiOutlineEnvironment fill="#9d9d9d" />
                  Full-time
                </p>
                <p className={styles.details__posted}>
                  <AiOutlineClockCircle fill="#9d9d9d" />
                  {convertTimestamp(jobDetails.datePosted)}
                </p>
              </div>
              <button className={styles.save__button}  onClick={() => handleSaveJob(jobId, jobDetails)}>
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
                One of the main areas that I work on with my clients is shedding
                these non-supportive beliefs and replacing them with beliefs
                that will help them to accomplish their desires. It is truly
                amazing the damage that we, as parents, can inflict on our
                children. So why do we do it? For the most part, we don’t do it
                intentionally or with malice. In the majority of cases, the
                cause is a well-meaning but unskilled or un-thinking parent, who
                says the wrong thing at the wrong time, and the message sticks –
                as simple as that!
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
                  {jobDetails.skills.map((skill, index) => (
                    <li className={styles.skills__item} key={index}>
                      <p className={styles.skills__text}>
                        <BsCheck2Circle fill="#66789c" />
                        {skill}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* <section className={styles.requiredSkills__section">
        <div className={styles.skills__header">
          <h2 className={styles.skills__title">Education + Experience</h2>
        </div>
        <div className={styles.skills__content">
          <ul className={styles.skills__list">
            <li className={styles.skills__item">
              <p className={styles.skills__text">
                <BsCheck2Circle fill="#66789c" />
                You will sail along until you collide with an immovable object,
                after which you will sink to the bottom.
              </p>
            </li>
          </ul>
        </div>
      </section> */}

            {/* <JobBenefits/> */}
            <section className={styles.requiredSkills__section}>
              <div className={styles.skills__header}>
                <h2 className={styles.skills__title}>Job Benefits</h2>
              </div>
              <div className={styles.skills__content}>
                <ul className={styles.skills__list}>
                  {jobDetails.benefits.map((benefit, index) => (
                    <li className={styles.skills__item} key={index}>
                      <p className={styles.skills__text}>
                        <BsCheck2Circle fill="#66789c" />
                        {benefit}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Application Button */}
            {/* <Link href={`/apply/${job.id}`}> */}
            <button
              className={styles.apply__button}
              onClick={togglejobApplicationModal}
              disabled={applicationSubmitted}
            >
              <BiBadgeCheck fill="#fff" />
              {applicationSubmitted ? "Applied" : "Apply"}
            </button>
            {JobApplicationModal && (
              <div>
                <JobApplicationForm closeApplicationForm={closeApplicationForm}/>
              </div>
            )}
          </div>
        )}
      </TalentLayout>
    </ProtectedRoute>
  );
};

export default JobDetails;
