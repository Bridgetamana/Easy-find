import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import styles from "./style.module.scss";
import { useRouter } from "next/router";
import {
  companyStore,
  updateCompany,
} from "../../../../firebaseConfig/companyStore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { storage } from "../../../../firebaseConfig/firebase";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import LoadingScreen from "../../../utils/Loaders/Loader";
import showAlert from "../../../utils/AlertBox/CustomAlert";
import Spinner from "@/components/utils/Loaders/Spinner";

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
    others: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [alert, setAlert] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState({
    fullName: "",
    email: "",
    bio: "",
    location: "",
    phone: "",
    website: "",
    linkedin: "",
    photo: null,
    industry: "",
    size: "",
    others: "",
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

  const handleInputChange = async (e, value) => {
    // Handle PhoneInput
    if (value !== undefined) {
      setFormData((prevData) => ({
        ...prevData,
        phone: value, 
      }));
      return;
    }
  
    // Handle other form inputs
    if (e && e.target) {
      const { name, value, files } = e.target;

      if (files && files.length > 0) {
        const file = files[0];
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: file,
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
      photo: "",
    });

    let hasError = false;

    if (!formData.fullName) {
      setErrorMsg((prev) => ({ ...prev, fullName: "Full Name is required." }));
      hasError = true;
    } else if (formData.fullName.length < 2) {
      setErrorMsg((prev) => ({
        ...prev,
        fullName: "Full Name must be at least 2 characters long.",
      }));
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
      setErrorMsg((prev) => ({
        ...prev,
        bio: "Bio must be at least 10 characters long.",
      }));
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

    if (!formData.website) {
      setErrorMsg((prev) => ({ ...prev, website: "Website is required." }));
      hasError = true;
    }

    if (!formData.linkedin) {
      setErrorMsg((prev) => ({ ...prev, linkedin: "Linkedin is required." }));
      hasError = true;
    }

    if (!formData.photo) {
      setErrorMsg((prev) => ({ ...prev, photo: "Profile photo is required." }));
      hasError = true;
    } else if (formData.photo.size > 2 * 1024 * 1024) {
      setErrorMsg((prev) => ({
        ...prev,
        photo: "Image size must be under 2MB.",
      }));
      hasError = true;
    }

    if (hasError) {
      showAlert(
        {
          type: "error",
          title: "Error!",
          message: "Please fix the errors before submitting.",
          showCloseButton: false,
          handleClose: () => setAlert(null),
          timeout: 3000,
        },
        setAlert
      );
      return;
    }

    try {
      setIsUpdating(true);
      let imageUrl = formData.photo;

      if (formData.photo instanceof File) {
        imageUrl = await handleImageUpload(formData.photo);
      }

      const payload = {
        ...formData,
        photo: imageUrl,
        id,
      };
      await updateCompany(payload);
      showAlert(
        {
          type: "success",
          title: "Success!",
          message: "Profile updated successfully.",
          showCloseButton: false,
          handleClose: () => setAlert(null),
          timeout: 3000,
        },
        setAlert
      );
      router.push("/company/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      showAlert(
        {
          type: "error",
          title: "Error!",
          message: "Error updating profile, please try again.",
          showCloseButton: false,
          handleClose: () => setAlert(null),
          timeout: 3000,
        },
        setAlert
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error("User not authenticated");
        return;
      }

      try {
        setIsLoading(true);
        const storageRef = ref(
          storage,
          `profilePhotos/${user.uid}/${file.name}`
        );
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        setFormData((prevFormData) => ({
          ...prevFormData,
          photo: downloadURL,
        }));
        console.log("Image uploaded successfully:", downloadURL);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  if (isLoading) return <LoadingScreen />;

  return (
    <div className={styles.profile__page}>
      {alert && alert.component}

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
            <img
              src={
                formData.photo instanceof File
                  ? URL.createObjectURL(formData.photo)
                  : formData.photo
              }
              alt="Profile"
              className={styles.image}
            />
          ) : (
            <img src="/assets/images/user-icon.png" alt="Default Profile" className={styles.image} />
          )}
        </div>

        <div className={styles.form__group}>
          <label htmlFor="fullName">
            Full Name<span className={styles.required}>*</span>:
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your full name"
          />
          {errorMsg.fullName && (
            <p className={styles.error}>{errorMsg.fullName}</p>
          )}
        </div>

        <div className={styles.form__group}>
          <label htmlFor="email">
            Email<span className={styles.required}>*</span>:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your email address"
          />
          {errorMsg.email && <p className={styles.error}>{errorMsg.email}</p>}
        </div>

        <div className={styles.form__group}>
          <label htmlFor="bio">
            Bio<span className={styles.required}>*</span>:
          </label>
          <input
            type="text"
            name="bio"
            value={formData.bio || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your bio"
          />
          {errorMsg.bio && <p className={styles.error}>{errorMsg.bio}</p>}
        </div>

        <div className={styles.form__group}>
          <label htmlFor="location">
            Location<span className={styles.required}>*</span>:
          </label>
          <input
            type="text"
            name="location"
            value={formData.location || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your location"
          />
          {errorMsg.location && (
            <p className={styles.error}>{errorMsg.location}</p>
          )}
        </div>

        <div className={styles.form__group}>
          <label htmlFor="phone">
            Phone <span className={styles.required}>*</span>:</label>
          <PhoneInput
            id="phone"
            name="phone"
            defaultCountry="US"
            value={formData.phone}
            onChange={(value) => handleInputChange(null, value)}
            className={styles.form__input}
            placeholder="Enter your mobile number"
            required
          />
          {errorMsg.phone && <p className={styles.error}>{errorMsg.phone}</p>}
        </div>

        <div className={styles.form__group}>
          <label htmlFor="website">
            Website <span className={styles.required}>*</span>:</label>
          <input
            type="text"
            name="website"
            value={formData.website || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your website link"
            required
          />
          {errorMsg.website && (
            <p className={styles.error}>{errorMsg.website}</p>
          )}
        </div>
        <div className={styles.form__group}>
          <label htmlFor="linkedin">
            LinkedIn <span className={styles.required}>*</span>:</label>
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your company's LinkedIn"
            required
          />
          {errorMsg.linkedin && (
            <p className={styles.error}>{errorMsg.linkedin}</p>
          )}
        </div>
        <div className={styles.form__group}>
          <label htmlFor="industry">
            Industry <span className={styles.required}>*</span>:</label>
          <input
            type="text"
            name="industry"
            value={formData.industry || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your industry"
            required
          />
          {errorMsg.industry && (
            <p className={styles.error}>{errorMsg.industry}</p>
          )}
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

        <div className={styles.form__group}>
          <label htmlFor="others">Others (Optional):</label>
          <input
            type="text"
            name="others"
            value={formData.others || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Additional info"
          />
        </div>

        {errorMsg.general && <p className={styles.error}>{errorMsg.general}</p>}
        {successMsg && <p className={styles.success}>{successMsg}</p>}
        <button onClick={handleSaveClick} className={styles.save__button}>
          {isUpdating ? <Spinner /> : "Save"}
        </button>
      </div>
    </div>
  );
}
