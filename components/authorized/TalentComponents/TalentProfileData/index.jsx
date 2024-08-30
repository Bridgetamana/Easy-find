import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineEnvironment } from "react-icons/ai";
require("dotenv").config();
import styles from "./style.module.scss";

export default function TalentProfileData({ handleEditClick }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [isLoading, setIsLoading] = useState(false);
  const initialFormData = {
    id: "",
    username: "",
    email: "",
    bio: "",
    photo: null,
    dob: "",
    gender: "",
    pronouns: "",
    jobTitle: "",
    minSalary: "",
    maxSalary: "",
    linkedin: "",
    portfolio: "",
    address: "",
    phone: "",
    mobile: "",
    resume: null,
    skills: "",
    institute: "",
    degree: "",
    company: "",
    position: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    // Fetch the user ID first, then use it to fetch user data
    const fetchInitialUserId = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(`${apiUrl}/users/me`, { headers });
        const userId = response.data.id;
        // Now that we have the userId, fetch the user data
        if (userId) {
          fetchUserData(userId);
        }
      } catch (error) {
        console.error("An error occurred while fetching user ID:", error);
      }
    };
    
    fetchInitialUserId();
  }, []);
  
  const fetchUserData = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return;
      }
      
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      
      const response = await axios.get(`${apiUrl}/talents/${userId}`, { headers });
      const fetchedUserData = response.data.data.attributes;
      setFormData((fetchedUserData) => ({
        ...fetchedUserData,
        id: fetchedUserData.id,
        username: fetchedUserData.username,
        email: fetchedUserData.email,
        bio: fetchedUserData.bio,
        photo: fetchedUserData.photo,
        dob: fetchedUserData.dob,
        gender: fetchedUserData.gender,
        pronouns: fetchedUserData.pronouns,
        jobTitle: fetchedUserData.jobTitle,
        minSalary: fetchedUserData.minSalary,
        maxSalary: fetchedUserData.maxSalary,
        linkedin: fetchedUserData.linkedin,
        portfolio: fetchedUserData.portfolio,
        address: fetchedUserData.address,
        phone: fetchedUserData.phone,
        mobile: fetchedUserData.mobile,
        resume: fetchedUserData.resume,
        skills: fetchedUserData.skills,
        institute: fetchedUserData.institute,
        degree: fetchedUserData.degree,
        company: fetchedUserData.company,
        position: fetchedUserData.position,

      }));
      console.log(fetchUserData.photo)
      if (!fetchedUserData) {
        console.log("No user data returned from API");
        return;
      }
  
      // Update your state with the fetched user data
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...fetchedUserData
      }));
  
    } catch (error) {
      console.error("An error occurred while fetching user data:", error);
    }
  };
  
  return (
    <div className={styles.profile__page}>
      <div className={styles.profile__details}>
        <h4 className={styles.note}>
          This is a preview of your profile. Please review all your information
          and make needed changes.
        </h4>
        <div className={styles.profile__top}>
          <div className={styles.profile__column}>
            {formData.photo && (
              <img
                src={formData.photo}
                alt="Profile"
                className={styles.profile__image}
              />
            )}

            <div className={styles.profile__row}>
              <h4 className={styles.user__name}>{formData.username}</h4>
              <p className={styles.user__address}>
                <AiOutlineEnvironment />
                {formData.address}
              </p>
            </div>
            <p className={styles.user__title}>{formData.jobTitle}</p>
          </div>
        </div>

        <div className={styles.profile__bottom}>
          <div className={styles.profile__box}>
            <h4 className={styles.title}>Personal Details</h4>
            <p className={styles.text}>
              <strong>Pronouns:</strong> {formData.pronouns}
            </p>
            <p className={styles.text}>
              <strong>Gender:</strong> {formData.gender}
            </p>
            <p className={styles.text}>
              <strong>DOB:</strong> {formData.dob}
            </p>
          </div>

          <div className={styles.profile__box}>
            <h4 className={styles.title}>About</h4>
            <p className={styles.text}>{formData.bio}</p>
          </div>

          <div className={styles.profile__box}>
            <h4 className={styles.title}>Skills</h4>
            <p className={styles.text}>{formData.skills}</p>
          </div>

          <div className={styles.profile__box}>
            <h4 className={styles.title}>Education</h4>
            <p className={styles.text}>
              <strong>Institution: </strong>
              {formData.institute}
            </p>
            <p className={styles.text}>
              <strong>Degree: </strong>
              {formData.degree}
            </p>
          </div>

          <div className={styles.profile__box}>
            <h4 className={styles.title}>Experience</h4>
            <p className={styles.text}>
              <strong>Company: </strong>
              {formData.company}
            </p>
            <p className={styles.text}>
              <strong>Position: </strong>
              {formData.position}
            </p>
          </div>

          <div className={styles.profile__box}>
            <h4 className={styles.title}>Contact</h4>
            <p className={styles.text}>
              <strong>Email: </strong>
              {formData.email}
            </p>
            <p className={styles.text}>
              <strong>Phone: </strong>
              {formData.phone}
            </p>
            <p className={styles.text}>
              <strong>Mobile: </strong>
              {formData.mobile}
            </p>
          </div>

          <div className={styles.profile__box}>
            <h4 className={styles.title}>Social Links</h4>
            <p className={styles.text}>
              <strong>LinkedIn:</strong> {formData.linkedInLink}
            </p>
            <p className={styles.text}>
              <strong>Portfolio:</strong> {formData.portfolioLink}
            </p>
          </div>

          <div className={styles.profile__box}>
            <h4 className={styles.title}>Resume*</h4>
            {formData.resume === null ? (
              <p className={styles.text}>No resume uploaded</p>
            ) : (
              <a
                href={formData.resume}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.text}
              >
                View Resume
              </a>
            )}
          </div>

          <div className={styles.profile__box}>
            <h4 className={styles.title}>Additional Information</h4>
            <p className={styles.text}>
              <strong>Desired Salary:</strong> ${formData.minSalary} - $
              {formData.maxSalary}
            </p>
          </div>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <button onClick={handleEditClick} className={styles.edit__button}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
