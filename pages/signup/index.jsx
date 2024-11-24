"use client";
import React, { useState } from "react";
import Link from "next/link";
import { registerTalent } from "@/firebaseConfig/talentStore";
import Spinner from "@/components/utils/Loaders/Spinner";
import { IoEye, IoEyeOff } from "react-icons/io5";
import ErrorMessage from "@/components/utils/Responses/Error";
import { useRouter } from "next/navigation";
import showAlert from "@/components/utils/AlertBox/CustomAlert";
import { registerCompany } from "@/firebaseConfig/companyStore";
import styles from "./style.module.scss";

export default function Signup() {
  const [activeTab, setActiveTab] = useState("talents");
  const [alert, setAlert] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // State for talent
  const [talentFormData, setTalentFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // State for companies
  const [companyFormData, setCompanyFormData] = useState({
    companyName: "",
    companyEmail: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (activeTab === "talents") {
      await handleTalentSub(talentFormData);
    } else if (activeTab === "companies") {
      await handleCompanySub(companyFormData);
    }
  };

  //handle talent submit
  const handleTalentSub = async (talentFormData) => {
    if (!validateForm(talentFormData)) return;
    setIsLoading(true);

    const fullName = talentFormData.firstName + " " + talentFormData.lastName;
    const email = talentFormData.email;
    const password = talentFormData.password;

    try {
      const result = await registerTalent(fullName, email, password);
      if (result) {
        setTalentFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        await showAlert(
          {
            type: "success",
            title: "Success!",
            message: "Registration completed successfully! Please check your email for verification.",
            showCloseButton: false,
            handleClose: () => setAlert(null),
            timeout: 2000,
          },
          setAlert
        );
        router.push("/signin");
      }
    } catch (error) {
      const errorMessage = error.message || "An error occurred";
      await showAlert(
        {
          type: "error",
          title: "Error",
          message: errorMessage,
          showCloseButton: false,
          timeout: 2000,
          handleClose: () => setAlert(null),
        },
        setAlert
      );
    } finally {
      setIsLoading(false);
    }
  };

  //handle company submit
  const handleCompanySub = async (companyFormData) => {
    if (!validateForm(companyFormData)) return;
    setIsLoading(true);

    const companyName = companyFormData.companyName;
    const companyEmail = companyFormData.companyEmail;
    const password = companyFormData.password;

    try {
      const result = await registerCompany(companyName, companyEmail, password);
      if (result) {
        setCompanyFormData({
          companyName: "",
          companyEmail: "",
          password: "",
          confirmPassword: "",
        });
        await showAlert(
          {
            type: "success",
            title: "Success!",
            message: "Registration completed successfully! Please check your email for verification.",
            showCloseButton: false,
            handleClose: () => setAlert(null),
            timeout: 3000,
          },
          setAlert
        );
        router.push("/signin");
      }
    } catch (error) {
      const errorMessage = error.message || "An error occurred";
      await showAlert(
        {
          type: "error",
          title: "Error",
          message: errorMessage,
          showCloseButton: false,
          timeout: 4000,
          handleClose: () => setAlert(null),
        },
        setAlert
      );
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = (formData) => {
    
    const password = formData.password;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isLengthValid = password.length >= 6;
    const passwordsMatch = password === formData.confirmPassword;

    if (!hasUppercase || !hasNumber || !isLengthValid || !passwordsMatch) {
      setPasswordMatch(false);
      return false;
    }

    return true;
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPasswordMatch(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    if (activeTab === "talents") {
      setTalentFormData((prevTalentFormData) => ({
        ...prevTalentFormData,
        [name]: fieldValue,
      }));
    } else if (activeTab === "companies") {
      setCompanyFormData((prevCompanyFormData) => ({
        ...prevCompanyFormData,
        [name]: fieldValue,
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    if (activeTab === "talents") {
      setTalentFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setCompanyFormData(prev => ({ ...prev, [name]: value }));
    }

    const currentFormData = activeTab === "talents" ? talentFormData : companyFormData;
    const updatedFormData = { ...currentFormData, [name]: value };
    
    const hasUppercase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const isLengthValid = value.length >= 6;
    const passwordsMatch = !updatedFormData.confirmPassword || 
                         value === updatedFormData.confirmPassword;

    setPasswordMatch(hasUppercase && hasNumber && isLengthValid && passwordsMatch);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <section className={styles.registeration__form}>
      {alert && alert.component}
      <div className={styles.registeration__form_container}>
        <div className={styles.registeration__signin}>
          <h1 className={styles.title}>Welcome To EasyFind!</h1>
          <p className={styles.subtitle}>
            Become our member and get access to over{" "}
            {activeTab === "talents" ? "a 100 companies" : "3,000 talents"} in
            Malta.
          </p>
          <Link href={"/signin"} className={styles.signin__btn}>
            Sign In
          </Link>
        </div>

        <div className={styles.registeration__signup}>
          <div className={styles.registeration__tabs}>
            <div
              className={`${styles.tab} ${
                activeTab === "talents" ? styles.active : ""
              }`}
              onClick={() => handleTabChange("talents")}
            >
              For Talents
            </div>
            <div
              className={`${styles.tab} ${
                activeTab === "companies" ? styles.active : ""
              }`}
              onClick={() => handleTabChange("companies")}
            >
              For Companies
            </div>
          </div>
          <div className={styles.signup__form}>
            <div className={styles.header}>
              <h1 className={styles.title}>
                Sign Up
                {/* {activeTab === "talents" ? "Talent Sign Up" : "Company Sign Up"} */}
              </h1>
              <p className={styles.subtitle}>
                To join us as{" "}
                {activeTab === "talents" ? "a talent" : "a company"}, kindly
                fill in your info below.
              </p>
            </div>
            {activeTab === "talents" && (
              <form className={styles.form__wrap} onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className={styles.input__field}
                  value={talentFormData.firstName}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className={styles.input__field}
                  value={talentFormData.lastName}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={styles.input__field}
                  value={talentFormData.email}
                  onChange={handleChange}
                />
                <div className={styles.password_field}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className={styles.pass_field}
                    value={talentFormData.password}
                    onChange={handlePasswordChange}
                    required
                    disabled={isLoading}
                  />
                  {showPassword ? (
                    <IoEye
                      className={styles.password_icon}
                      onClick={handleTogglePasswordVisibility}
                    />
                  ) : (
                    <IoEyeOff
                      className={styles.password_icon}
                      onClick={handleTogglePasswordVisibility}
                    />
                  )}
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className={styles.input__field}
                  value={talentFormData.confirmPassword}
                  onChange={handlePasswordChange}
                />
                {!passwordMatch && (
                  <>
                    {(talentFormData.password.length < 6 ||
                      !/[A-Z]/.test(talentFormData.password) ||
                      !/\d/.test(talentFormData.password) ||
                      (talentFormData.confirmPassword &&
                        talentFormData.password !==
                          talentFormData.confirmPassword)) && (
                      <ErrorMessage
                        text={
                          talentFormData.password.length < 6
                            ? "Password must be at least 6 characters long. "
                            : !/[A-Z]/.test(talentFormData.password)
                            ? "Password must contain an uppercase letter. "
                            : !/\d/.test(talentFormData.password)
                            ? "Password must contain a number. "
                            : talentFormData.confirmPassword &&
                              talentFormData.password !==
                                talentFormData.confirmPassword
                            ? "Password does not match. "
                            : ""
                        }
                      />
                    )}
                  </>
                )}
                <button
                  className={styles.signup__btn}
                  type="submit"
                  disabled={!passwordMatch}
                >
                  {isLoading ? <Spinner /> : "Sign Up as Talent"}
                </button>
                <div className={styles.signin__info}>
                  <p className={styles.text}>Already have an account?</p>{" "}
                  <Link href={"/signin"} className={styles.signin__text}>
                    Sign In
                  </Link>
                </div>
              </form>
            )}
            {/* company form */}
            {activeTab === "companies" && (
              <form className={styles.form__wrap} onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  className={styles.input__field}
                  value={companyFormData.companyName}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="companyEmail"
                  placeholder="Company Email"
                  className={styles.input__field}
                  value={companyFormData.companyEmail}
                  onChange={handleChange}
                />
                <div className={styles.password_field}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className={styles.pass_field}
                    value={companyFormData.password}
                    onChange={handlePasswordChange}
                    required
                    disabled={isLoading}
                  />
                  {showPassword ? (
                    <IoEye
                      className={styles.password_icon}
                      onClick={handleTogglePasswordVisibility}
                    />
                  ) : (
                    <IoEyeOff
                      className={styles.password_icon}
                      onClick={handleTogglePasswordVisibility}
                    />
                  )}
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className={styles.input__field}
                  value={companyFormData.confirmPassword}
                  onChange={handlePasswordChange}
                />
                {!passwordMatch && (
                  <>
                    {(companyFormData.password.length < 6 ||
                      !/[A-Z]/.test(companyFormData.password) ||
                      !/\d/.test(companyFormData.password) ||
                      (companyFormData.confirmPassword &&
                        companyFormData.password !==
                          companyFormData.confirmPassword)) && (
                      <ErrorMessage
                        text={
                          companyFormData.password.length < 6
                            ? "Password must be at least 6 characters long. "
                            : !/[A-Z]/.test(companyFormData.password)
                            ? "Password must contain an uppercase letter. "
                            : !/\d/.test(companyFormData.password)
                            ? "Password must contain a number. "
                            : companyFormData.confirmPassword &&
                              companyFormData.password !==
                                companyFormData.confirmPassword
                            ? "Password does not match. "
                            : ""
                        }
                      />
                    )}
                  </>
                )}
                <button
                  className={styles.signup__btn}
                  type="submit"
                  disabled={!passwordMatch}
                >
                  {isLoading ? <Spinner /> : "Sign Up as Company"}
                </button>
                <div className={styles.signin__info}>
                  <p className={styles.text}>Already have an account?</p>{" "}
                  <Link href="/signin" className={styles.signin__text}>
                    Sign In
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
