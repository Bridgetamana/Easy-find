import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import styles from "./style.module.scss";
import { useRouter } from "next/router";
import {
  companyStore,
  updateCompany,
} from "../../../../firebaseConfig/companyStore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import LoadingScreen from "../../../utils/Loaders/Loader";

export default function CompanyProfileForm() {
  const initialFormData = {
    id: null,
    fullName: "",
    email: "",
    bio: "",
    linkedin: "",
    photo: null,
    location: "",
    phone: "",
    website: "",
    industry: "",
    size: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState({
    fullName: "",
    email: "",
    bio: "",
    location: "",
    phone: "",
    website: "",
    linkedin: "",
    industry: "",
    size: "",
  });

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!id) {
        return;
      }

      try {
        setIsLoading(true);
        const data = await companyStore.getCompanyStoreById(id);

        if (data) {
          setFormData((prevState) => ({
            ...prevState,
            ...data,
          }));
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: file,
        photo: imageUrl,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
      setErrorMsg((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    setErrorMsg({
      fullName: "",
      email: "",
      bio: "",
      location: "",
      phone: "",
      website: "",
      linkedin: "",
      industry: "",
      size: "",
    });

    let hasError = false;

    if (!formData.fullName) {
      setErrorMsg((prev) => ({ ...prev, fullName: "Full Name is required." }));
      hasError = true;
    } else if (formData.fullName.length < 2) {
      setErrorMsg((prev) => ({ ...prev, fullName: "Full Name must be at least 2 characters long." }));
      hasError = true;
    }

    if (!formData.email) {
      setErrorMsg((prev) => ({ ...prev, email: "Email is required." }));
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMsg((prev) => ({ ...prev, email: "Email address is invalid." }));
      hasError = true;
    }

    if (!formData.bio) {
      setErrorMsg((prev) => ({ ...prev, bio: "Bio is required." }));
      hasError = true;
    } else if (formData.bio.length < 10) {
      setErrorMsg((prev) => ({ ...prev, bio: "Bio must be at least 10 characters long." }));
      hasError = true;
    }

    if (!formData.location) {
      setErrorMsg((prev) => ({ ...prev, location: "Location is required." }));
      hasError = true;
    }

    if (!formData.phone) {
      setErrorMsg((prev) => ({ ...prev, phone: "Phone number is required." }));
      hasError = true;
    }

    if (hasError) return;

    try {
      setIsLoading(true);

      const payload = {
        ...formData,
        id,
      };
      await updateCompany(payload);

      setSuccessMsg("Profile updated successfully.");
      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);

      router.push("/company/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMsg((prev) => ({ ...prev, general: error.message }));
      setTimeout(() => {
        setErrorMsg((prev) => ({ ...prev, general: "" }));
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prevFormData) => ({
        ...prevFormData,
        photo: imageUrl,
        file,
      }));
    }
  };

  if (isLoading) return <LoadingScreen/>;

  return (
    <div className={styles.profile__page}>
      <div className={styles.profile__form}>
        <div className={styles.profile__image}>
          <div className={styles.edit__image}>
            <MdEdit size={20} fill="#2563eb" />
            <input
              type="file"
              accept="image/*"
              name="photo"
              onChange={handleImageUpload}
              className={styles.form__input}
            />
          </div>
          {formData.photo ? (
            <img src={formData.photo} alt="Profile" className={styles.image} />
          ) : (
            <img src="" alt="Default Profile" className={styles.image} />
          )}
        </div>

        <div className={styles.form__group}>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your full name"
            required
          />
          {errorMsg.fullName && <p className={styles.error}>{errorMsg.fullName}</p>}
        </div>

        <div className={styles.form__group}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your email address"
            required
          />
          {errorMsg.email && <p className={styles.error}>{errorMsg.email}</p>}
        </div>

        <div className={styles.form__group}>
          <label htmlFor="bio">Bio:</label>
          <input
            type="text"
            name="bio"
            value={formData.bio || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your bio"
            required
          />
          {errorMsg.bio && <p className={styles.error}>{errorMsg.bio}</p>}
        </div>

        <div className={styles.form__group}>
          <label htmlFor="address">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your address"
            required
          />
          {errorMsg.location && <p className={styles.error}>{errorMsg.location}</p>}
        </div>

        <div className={styles.form__group}>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your phone number"
            required
          />
          {errorMsg.phone && <p className={styles.error}>{errorMsg.phone}</p>}
        </div>

        <div className={styles.form__group}>
          <label htmlFor="website">Website:</label>
          <input
            type="text"
            name="website"
            value={formData.website || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your website link"
            required
          />
          {errorMsg.website && <p className={styles.error}>{errorMsg.website}</p>}
        </div>

        <div className={styles.form__group}>
          <label htmlFor="linkedin">LinkedIn:</label>
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your company's LinkedIn"
            required
          />
          {errorMsg.linkedin && <p className={styles.error}>{errorMsg.linkedin}</p>}
        </div>

        <div className={styles.form__group}>
          <label htmlFor="industry">Industry:</label>
          <input
            type="text"
            name="industry"
            value={formData.industry || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your industry"
            required
          />
          {errorMsg.industry && <p className={styles.error}>{errorMsg.industry}</p>}
        </div>

        <div className={styles.form__group}>
          <label htmlFor="size">Company Size:</label>
          <select
            name="size"
            value={formData.size || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            required
          >
            <option value="" disabled>
              Select your company size
            </option>
            <option value="2-10">2-10 employees</option>
            <option value="10-50">10-50 employees</option>
            <option value="50-200">50-200 employees</option>
            <option value="200-500">200-500 employees</option>
            <option value="500+">500+ employees</option>
          </select>
          {errorMsg.size && <p className={styles.error}>{errorMsg.size}</p>}
        </div>

        {errorMsg.general && <p className={styles.error}>{errorMsg.general}</p>}
        {successMsg && <p className={styles.success}>{successMsg}</p>}
        <button onClick={handleSaveClick} className={styles.save__button}>
          {isLoading ? <div className={styles.spinner}></div> : "Save"}
        </button>
      </div>
    </div>
  );
}
