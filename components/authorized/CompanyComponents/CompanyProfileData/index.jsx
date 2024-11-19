import { useEffect, useState } from "react";
import { useRouter } from "next/router"; 
import styles from "./style.module.scss"; 
import { getAuth } from "firebase/auth";
import { companyStore } from "../../../../firebaseConfig/companyStore";
import { AiOutlineEnvironment } from "react-icons/ai";
import LoadingScreen from "../../../utils/Loaders/Loader";

export default function CompanyProfileData() {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: "",
    fullName: "",
    bio: "",
    address: "",
    email: "",
    linkedin: "",
    phone: "",
    teamSize: "", 
    industry: "",
    website: "",
    photo: null, 
    others: "",
  });

  const router = useRouter();
  const [companyId, setCompanyId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setIsLoading(false); 
      return;
    }

    const fetchCompanyData = async () => {
      try {
        const companyId = user.uid;
        setCompanyId(companyId);
        const companyProfile = await companyStore.getCompanyStoreById(companyId);

        if (companyProfile) {
          setFormData({
            id: companyId,
            fullName: companyProfile.fullName || "",
            bio: companyProfile.bio || "",
            address: companyProfile.address || "",
            industry: companyProfile.industry || "",
            website: companyProfile.website || "",
            email: companyProfile.email || "",
            linkedin: companyProfile.linkedin || "",
            phone: companyProfile.phone || "",
            size: companyProfile.size || "",
            photo: companyProfile.photo || null,
          });
        }
      } catch (error) {
        console.error("An error occurred while fetching company data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  const handleEditClick = () => {
    if (!companyId) {
      return;
    }
    router.push(`/company/edit/${companyId}`);
  };

  if (isLoading) return <LoadingScreen />;
  return (
    <div className={styles.profile__page}>
      <div className={styles.profile__details}>
        <h4 className={styles.note}>
          This is a preview of your profile. Please review all your information
          and make needed changes.
        </h4>
        <div className={styles.profile__top}>
          <div className={styles.profile__column}>
            {formData.photo ? (
              <img
                src={formData.photo}
                alt="Company Logo"
                className={styles.profile__image}
              />
            ) : (
              <img
                src="/assets/images/user-icon.png"
                alt="Default Company Logo"
                className={styles.profile__image}
              />
            )}

            <div className={styles.profile__row}>
              <h4 className={styles.user__name}>{formData.fullName}</h4>
            </div>
            <p className={styles.user__location}>{formData.address}</p>
          </div>
        </div>

        <div className={styles.profile__bottom}>
          <div className={styles.profile__box}>
            <h4 className={styles.title}>About</h4>
            <p className={styles.text}>{formData.bio}</p>
          </div>

          <div className={styles.profile__box}>
            <h4 className={styles.title}>Contact Information</h4>
            <p className={styles.text}>
              <strong>Email: </strong> {formData.email}
            </p>
            <p className={styles.text}>
              <strong>Phone: </strong> {formData.phone}
            </p>
          </div>

          <div className={styles.profile__box}>
            <h4 className={styles.title}>Company Size</h4>
            <p className={styles.text}>
              <strong>Team Size: </strong> {formData.size}
            </p>
          </div>

          <div className={styles.profile__box}>
            <h4 className={styles.title}>Industry</h4>
            <p className={styles.text}>
              <strong>Industry: </strong> {formData.industry}
            </p>
          </div>

          <div className={styles.profile__box}>
            <h4 className={styles.title}>Social Links</h4>
            <p className={styles.text}>
              <strong>LinkedIn:</strong>{" "}
              <a
                href={formData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                {formData.linkedin}
              </a>
            </p>
            <p className={styles.text}>
              <strong>Website:</strong>{" "}
              <a
                href={formData.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {formData.website}
              </a>
            </p>
          </div>

          <div className={styles.profile__box}>
            <h4 className={styles.title}>Others</h4>
            <p className={styles.text}>
              <strong>Others: </strong> {formData.others}
            </p>
          </div>
          
        </div>

        <button onClick={handleEditClick} className={styles.edit__button}>
          Edit
        </button>
      </div>
    </div>
  );
}
