"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Spinner from "@/components/utils/Loaders/Spinner";
import showAlert from "@/components/utils/AlertBox/CustomAlert";
import { resetPassword } from "@/firebaseConfig/talentStore";
import { IoEye, IoEyeOff } from "react-icons/io5";
import "./style.scss";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [oobCode, setOobCode] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const actionCode = urlParams.get("oobCode");
    setOobCode(actionCode);
  }, [oobCode, password]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (pass) => {
    const regex = /^(?=.*\d)[\w]{8,}$/;
    return regex.test(pass);
  };
  
  const validatePasswords = () => {
    if (password !== confirmPassword) {
      showAlert(
        {
          type: "error",
          title: "Error",
          message: "Password and confirm password don't match.",
          showCloseButton: false,
          timeout: 4000,
          handleClose: () => setAlert(null),
        },
        setAlert
      );
      return false;
    }
    return true;
  };
  
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    if (!validatePasswords() || !validatePassword(password)) {
      setIsLoading(false);
      return;
    }
  
    if (oobCode) {
      try {
        const success = await resetPassword(oobCode, password);
  
        if (success) {
          // Show a success alert
          await showAlert(
            {
              type: "success",
              title: "Success",
              message: "Password reset was successful.",
              showCloseButton: false,
              timeout: 3000,
              handleClose: () => setAlert(null),
            },
            setAlert
          );
        } else {
          // Show an error alert if password reset fails
          await showAlert(
            {
              type: "error",
              title: "Error",
              message: "Password reset failed. Try again.",
              showCloseButton: false,
              timeout: 4000,
              handleClose: () => setAlert(null),
            },
            setAlert
          );
        }
      } catch (error) {
        // Show an error alert for any unexpected errors
        await showAlert(
          {
            type: "error",
            title: "Error",
            message: error.message,
            showCloseButton: false,
            timeout: 4000,
            handleClose: () => setAlert(null),
          },
          setAlert
        );
        console.error("Error during password reset confirmation:", error.message);
      } finally {
        setIsLoading(false);
        setPassword("");
        setConfirmPassword("");
      }
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirm-password") {
      setConfirmPassword(value);
    }
  };

  return (
    <section className="resetPassword__form">
      {alert && alert.component}
      <div className="resetPassword-form__container">
        <div className="header">
          <h1 className="title">Reset Password</h1>
          <p className="subtitle">Enter your new password.</p>
        </div>
        <form className="form__wrap" onSubmit={handleResetPassword}>
          <div className="password__field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="pass__field"
              value={password}
              onChange={handleInputChange}
              required
            />
            {showPassword ? (
              <IoEye
                className="password__icon"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <IoEyeOff
                className="password__icon"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>

          <input
            type="text"
            name="confirm-password"
            placeholder="Confirm Password"
            className="input__field"
            value={confirmPassword}
            onChange={handleInputChange}
            required
          />

          <button className="reset-password__btn" type="submit">
            {isLoading ? <Spinner /> : "Submit"}
          </button>

          <div className="login__info">
            <p className="text">
              Remember your password?{" "}
              <Link href={"/signin"} className="signin__text">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
