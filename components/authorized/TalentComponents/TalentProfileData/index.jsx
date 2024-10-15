import { useEffect, useState } from "react";
import { useRouter } from "next/router"; 
import styles from "./style.module.scss"; 
import { getAuth } from "firebase/auth";
import { getStorage, ref, getMetadata, getDownloadURL } from "firebase/storage";
import { talentStore } from "../../../../firebaseConfig/talentStore";
import { AiOutlineEnvironment } from "react-icons/ai";
import LoadingScreen from "@/components/utils/Loaders/Loader";
require("dotenv").config();
 

export default function TalentProfileData() {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
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
  });

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            console.error("No user is logged in");
            return;
        }

        const userId = user.uid;

        const userProfile = await talentStore.getTalentStoreById(userId);

        if (userProfile) {
          let photoURL = null;

          if (userProfile.photo) {
            const storage = getStorage();
            const photoPath = userProfile.photo; 
            const photoRef = ref(storage, photoPath);
      
            photoURL = await getDownloadURL(photoRef);
          }

          let resumeFilename = null;
            if (userProfile.resume) {
                const storage = getStorage();
                const resumeRef = ref(storage, userProfile.resume);
                const metadata = await getMetadata(resumeRef);
                resumeFilename = metadata.name; 
            }
            setFormData({
                id: userId,
                username: userProfile.username || "",
                email: userProfile.email || "",
                bio: userProfile.bio || "",
                photo: photoURL,
                dob: userProfile.dob || "",
                gender: userProfile.gender || "",
                pronouns: userProfile.pronouns || "",
                jobTitle: userProfile.jobTitle || "",
                minSalary: userProfile.minSalary || "",
                maxSalary: userProfile.maxSalary || "",
                linkedin: userProfile.linkedin || "",
                portfolio: userProfile.portfolio || "",
                address: userProfile.address || "",
                phone: userProfile.phone || "",
                mobile: userProfile.mobile || "",
                resume: {
                  url: userProfile.resume,
                  filename: resumeFilename, 
                },
                skills: userProfile.skills || "",
                institute: userProfile.institute || "",
                degree: userProfile.degree || "",
                company: userProfile.company || "",
                position: userProfile.position || "",
            });
        } else {
            console.error("User profile not found");
        }
      } catch (error) {
          console.error("An error occurred while fetching user data:", error);
      } finally {
          setIsLoading(false);
      }
    };

    fetchUserData();
}, []);

  const handleEditClick = () => {
    router.push(`/talent/edit`); 
  };

  if (isLoading) return <div><LoadingScreen /></div>;

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
              <strong>LinkedIn:</strong> {formData.linkedin}
            </p>
            <p className={styles.text}>
              <strong>Portfolio:</strong> {formData.portfolio}
            </p>
          </div>

          <div className={styles.profile__box}>
            <h4 className={styles.title}>Resume*</h4>
            {formData.resume === null ? (
                <p className={styles.text}>No resume uploaded</p>
            ) : (
                <div>
                    <p className={styles.text}>
                        {formData.resume.filename || "Resume"} 
                    </p>
                    <a
                        href={formData.resume.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.text__button}
                        style={{ marginRight: '10px' }}
                    >
                        View Resume
                    </a>
                </div>
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
