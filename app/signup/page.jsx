"use client";
import React, { useState } from "react";
import "./style.scss";
import Link from "next/link";
import { registerTalent } from "@/firebaseConfig/talentStore";
import Spinner from "@/components/utils/Loaders/Spinner";
import { IoEye, IoEyeOff } from "react-icons/io5";
import ErrorMessage from "@/components/utils/Responses/Error";
import { useRouter } from "next/navigation";
import showAlert from "@/components/utils/AlertBox/CustomAlert";
import { registerCompany } from "@/firebaseConfig/companyStore";
// import { sendEmailVerification } from "firebase/auth";

export default function Signup() {
  const [activeTab, setActiveTab] = useState("talents");
  const [alert, setAlert] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // State for talent
  const [talentFormData, setTalentFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // State for companies
  const [companyFormData, setCompanyFormData] = useState({
    companyName: "",
    companyEmail: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (activeTab === "talents") {
      handleTalentSub(talentFormData);
    } else if (activeTab === "companies") {
      handleCompanySub(companyFormData);
    }
  };

  //handle talent submit
  const handleTalentSub = async (talentFormData) => {
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
        await showAlert({
            type: "success",
            title: "Success!",
            message: "Operation completed successfully!",
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
      await showAlert({
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

  //handle company submit
  const handleCompanySub = async (companyFormData) => {
    setIsLoading(true);

    const companyName = companyFormData.companyName;
    const companyEmail = companyFormData.companyEmail;
    const password = companyFormData.password;

    try {
      const result = await registerCompany(
        companyName,
        companyEmail,
        password
      );
      if (result) {
        setCompanyFormData({
          companyName: "",
          companyEmail: "",
          password: "",
          confirmPassword: "",
        });
        await showAlert({
            type: "success",
            title: "Success!",
            message: "Registeration completed successfully!",
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
      await showAlert({
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
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
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
      setTalentFormData((prevTalentFormData) => ({
        ...prevTalentFormData,
        [name]: value,
      }));
      setPasswordMatch(validatePassword(value));
    } else if (activeTab === "companies") {
      setCompanyFormData((prevCompanyFormData) => ({
        ...prevCompanyFormData,
        [name]: value,
      }));
      setPasswordMatch(validatePassword(value));
    }
  };

  //validate password
  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isLengthValid = password.length >= 6;

    return hasUppercase && hasNumber && isLengthValid;
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <section className="registeration__form">
      {alert && alert.component}
      <div className="registeration__form_container">
        <div className="registeration__signin">
          <h1 className="title">Welcome To EasyFind!</h1>
          <p className="subtitle">
            Become our member and get access to over{" "}
            {activeTab === "talents" ? "a 100 companies" : "3,000 talents"} in
            Malta.
          </p>
          <Link href={"/signin"} className="signin__btn">
            Sign In
          </Link>
        </div>

        <div className="registeration__signup">
          <div className="registeration__tabs">
            <div
              className={`tab ${activeTab === "talents" ? "active" : ""}`}
              onClick={() => handleTabChange("talents")}
            >
              For Talents
            </div>
            <div
              className={`tab ${activeTab === "companies" ? "active" : ""}`}
              onClick={() => handleTabChange("companies")}
            >
              For Companies
            </div>
          </div>
          <div className="signup__form">
            <div className="header">
              <h1 className="title">
                Sign Up
                {/* {activeTab === "talents" ? "Talent Sign Up" : "Company Sign Up"} */}
              </h1>
              <p className="subtitle">
                To join us as{" "}
                {activeTab === "talents" ? "a talent" : "a company"}, kindly
                fill in your info below.
              </p>
            </div>
            {activeTab === "talents" && (
              <form className="form__wrap" onSubmit={handleSubmit}>
                <div className="input__group">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="input__field"
                    value={talentFormData.firstName}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="input__field"
                    value={talentFormData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input__field"
                  value={talentFormData.email}
                  onChange={handleChange}
                />
                <div className="password_field">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="pass_field"
                    value={talentFormData.password}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                  {showPassword ? (
                    <IoEye
                      className="password_icon"
                      onClick={handleTogglePasswordVisibility}
                    />
                  ) : (
                    <IoEyeOff
                      className="password_icon"
                      onClick={handleTogglePasswordVisibility}
                    />
                  )}
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="input__field"
                  value={talentFormData.confirmPassword}
                  onChange={handlePasswordChange}
                />
                {!passwordMatch && (
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

                <button
                  className="signup__btn"
                  type="submit"
                  disabled={!passwordMatch}
                >
                  {isLoading ? <Spinner /> : "Sign Up as Talent"}
                </button>
                <div className="signin__info">
                  <p className="text">Already have an account?</p>{" "}
                  <Link href={"/login"} className="signin__text">
                    Sign In
                  </Link>
                </div>
              </form>
            )}
            {/* company form */}
            {activeTab === "companies" && (
              <form className="form__wrap" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  className="input__field"
                  value={companyFormData.companyName}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="companyEmail"
                  placeholder="Company Email"
                  className="input__field"
                  value={companyFormData.companyEmail}
                  onChange={handleChange}
                />
                <div className="password_field">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="pass_field"
                    value={companyFormData.password}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                  {showPassword ? (
                    <IoEye
                      className="password_icon"
                      onClick={handleTogglePasswordVisibility}
                    />
                  ) : (
                    <IoEyeOff
                      className="password_icon"
                      onClick={handleTogglePasswordVisibility}
                    />
                  )}
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="input__field"
                  value={companyFormData.confirmPassword}
                  onChange={handlePasswordChange}
                />
                {!passwordMatch && (
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
                <button
                  className="signup__btn"
                  type="submit"
                  disabled={!passwordMatch}
                >
                 {isLoading ? <Spinner /> : "Sign Up as Company"}
                </button>
                <div className="signin__info">
                  <p className="text">Already have an account?</p>{" "}
                  <Link href={"/signin"} className="signin__text">
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
