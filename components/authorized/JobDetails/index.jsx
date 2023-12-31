import React, { useEffect, useState } from "react";
import { AiOutlineClockCircle, AiOutlineEnvironment } from "react-icons/ai";
import { BiBadgeCheck } from "react-icons/bi";
import { BsCheck2Circle, BsHeart } from "react-icons/bs";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import Link from "next/link";
import LoadingScreen from "@/components/utils/Loaders/Loader";
import { getJobById } from "@/firebaseConfig/talentStore";
import "./style.scss";
import { convertFutureTimestamp, convertTimestamp } from "../../../firebaseConfig/talentStore";
import { useRouter } from "next/router";

export default function JobDetails() {
  const [isSaved, setIsSaved] = useState(false);
  const [jobDetails, setJobDetails] = useState(null);
  const router = useRouter();
  const {jobId} = router.query.id;
  console.log('jobId', jobId);

    const fetchJobDetails = async () => {
      try {
        const response = await getJobById(jobId);
        setJobDetails(response);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };
    
  const handleSaveJob = () => {
    setIsSaved(!isSaved);
  };

  useEffect(() => {
    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  if (!jobDetails) {
    return <LoadingScreen />;
  }

  const notSpecified = <span className="not__specified">Not Specified</span>

  return (
    <div className="jobDetails__section">
      <div className="details__header">
        <h2 className="details__title">{jobDetails.title}</h2>
        <div className="details__flex">
          <p className="details__type">
            <AiOutlineEnvironment fill="#9d9d9d" />
            Full-time
          </p>
          <p className="details__posted">
            <AiOutlineClockCircle fill="#9d9d9d" />{convertTimestamp(jobDetails.datePosted)}
          </p>
        </div>
        <button className="save__button" onClick={handleSaveJob}>
          {isSaved ? (
            <BsHeartFill fill="#ff0000" />
          ) : (
            <BsHeart fill="#e0e6f7" />
          )}
          Save Job
        </button>
      </div>

      {/* <JobOverview/> */}
      <section className="employmentInfo__section">
        <div className="info__header">
          <p className="info__title">Employment Information</p>
        </div>

        <div className="info__content">
          <div className="info__item">
            <div className="info__left">
              <span className="info__icon">
                <HiOutlineBuildingOffice2 />
              </span>
              <p className="info__title">Industry</p>
            </div>
            <div className="info__right">
              <div className="info__text">
                {jobDetails?.industry || notSpecified}
              </div>
            </div>
          </div>

          <div className="info__item">
            <div className="info__left">
              <span className="info__icon">
                <HiOutlineBuildingOffice2 />
              </span>
              <p className="info__title">Job level</p>
            </div>
            <div className="info__right">
              <div className="info__text">{jobDetails.jobLevel || notSpecified}</div>
            </div>
          </div>

          <div className="info__item">
            <div className="info__left">
              <span className="info__icon">
                <HiOutlineBuildingOffice2 />
              </span>
              <p className="info__title">Qualification</p>
            </div>
            <div className="info__right">
              <div className="info__text">{jobDetails.qualifications || notSpecified}</div>
            </div>
          </div>

          <div className="info__item">
            <div className="info__left">
              <span className="info__icon">
                <HiOutlineBuildingOffice2 />
              </span>
              <p className="info__title">Salary</p>
            </div>
            <div className="info__right">
              <div className="info__text">{jobDetails.minSalary} - {jobDetails.maxSalary}</div>
            </div>
          </div>

          <div className="info__item">
            <div className="info__left">
              <span className="info__icon">
                <HiOutlineBuildingOffice2 />
              </span>
              <p className="info__title">Experience</p>
            </div>
            <div className="info__right">
              <div className="info__text">1 year</div>
            </div>
          </div>

          <div className="info__item">
            <div className="info__left">
              <span className="info__icon">
                <HiOutlineBuildingOffice2 />
              </span>
              <p className="info__title">Job type</p>
            </div>
            <div className="info__right">
              <div className="info__text">{jobDetails.jobType}</div>
            </div>
          </div>

          <div className="info__item">
            <div className="info__left">
              <span className="info__icon">
                <HiOutlineBuildingOffice2 />
              </span>
              <p className="info__title">Deadline</p>
            </div>
            <div className="info__right">
              <div className="info__text">{convertFutureTimestamp(jobDetails.deadline)}</div>
            </div>
          </div>

          <div className="info__item">
            <div className="info__left">
              <span className="info__icon">
                <HiOutlineBuildingOffice2 />
              </span>
              <p className="info__title">Location</p>
            </div>
            <div className="info__right">
              <div className="info__text">{jobDetails.location}</div>
            </div>
          </div>
        </div>
      </section>

      {/* <CompanyDescription/> */}
      <section className="companyDescription__section">
        <div className="description__header">
          <h2 className="description__title">About Company</h2>
        </div>
        <p className="description__text">
          One of the main areas that I work on with my clients is shedding these
          non-supportive beliefs and replacing them with beliefs that will help
          them to accomplish their desires. It is truly amazing the damage that
          we, as parents, can inflict on our children. So why do we do it? For
          the most part, we don’t do it intentionally or with malice. In the
          majority of cases, the cause is a well-meaning but unskilled or
          un-thinking parent, who says the wrong thing at the wrong time, and
          the message sticks – as simple as that!
        </p>
      </section>

      {/* <JobDescription/> */}
      <section className="companyDescription__section">
        <div className="description__header">
          <h2 className="description__title">Job Description</h2>
        </div>
        <p className="description__text">
          {jobDetails.description || notSpecified}
        </p>
      </section>

      {/* <RequiredSkills/> */}
      <section className="requiredSkills__section">
        <div className="skills__header">
          <h2 className="skills__title">
            Requirements
          </h2>
        </div>
        <div className="skills__content">
          <ul className="skills__list">
            {
              jobDetails.skills.map((skill, index) => (
              <li className="skills__item" key={index}>
                <p className="skills__text">
                  <BsCheck2Circle fill="#66789c" />
                  {skill}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* <section className="requiredSkills__section">
        <div className="skills__header">
          <h2 className="skills__title">Education + Experience</h2>
        </div>
        <div className="skills__content">
          <ul className="skills__list">
            <li className="skills__item">
              <p className="skills__text">
                <BsCheck2Circle fill="#66789c" />
                You will sail along until you collide with an immovable object,
                after which you will sink to the bottom.
              </p>
            </li>
          </ul>
        </div>
      </section> */}

      {/* <JobBenefits/> */}
      <section className="requiredSkills__section">
        <div className="skills__header">
          <h2 className="skills__title">Job Benefits</h2>
        </div>
        <div className="skills__content">
          <ul className="skills__list">
            {
              jobDetails.benefits.map((benefit, index) => (
              <li className="skills__item" key={index}>
                <p className="skills__text">
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
      <Link href="/application">
        <button className="apply__button">
          <BiBadgeCheck fill="#fff" />
          Apply Now
        </button>
      </Link>
    </div>
  );
}

// export async function getServerSideProps({ params }) {
//   try {
//     const jobId = generateJobHash(params.jobIdHash);
//     const response = await getJobById(jobId);

//     return {
//       props: {
//         jobDetail: response,
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching job details:', error);

//     return {
//       notFound: true,
//     };
//   }
// }
