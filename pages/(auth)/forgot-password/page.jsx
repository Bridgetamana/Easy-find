'use client';
import React, { useState } from "react";
import Link from "next/link";
import Spinner from "@/components/utils/Loaders/Spinner";
import showAlert from "@/components/utils/AlertBox/CustomAlert";
import { sendPasswordResetEmail } from "firebase/auth"; 
// import { auth } from "firebase/auth";
import { auth } from "@/firebaseConfig/firebase";
import styles from "./style.module.scss";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      await sendPasswordResetEmail(auth, email);
  
      await showAlert({
        type: "success",
        title: "Success",
        message: "Password reset email sent. Check your inbox.",
        showCloseButton: false,
        timeout: 4000,
        handleClose: () => setAlert(null),
      }, setAlert);
      
      setEmail("");
    } catch (error) {
      console.error("Password reset error:", error);
  
      // Show an error alert
      await showAlert({
        type: "error",
        title: "Error",
        message: error.message,
        showCloseButton: false,
        timeout: 14000,
        handleClose: () => setAlert(null),
      }, setAlert);
    } finally {
      setIsLoading(false);
    }
  }; 

  const handleInputChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  return (
    <section className={styles.forgotPassword__form}>
      {alert && alert.component}
      <div className={styles.forgotPassword-form__container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Forgot Password</h1>
          <p className={styles.subtitle}>
            Enter your email address to reset your password.
          </p>
        </div>
        <form className={styles.form__wrap} onSubmit={handleResetPassword}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            className={styles.input__field}
            value={email}
            onChange={handleInputChange}
          />

          <button className={styles.reset-password__btn} type="submit">
            {isLoading ? <Spinner /> : "Reset Password"}
          </button>

          <div className={styles.login__info}>
            <p className={styles.text}>
              Remember your password?{" "}
              <Link href={"/signin"} className={styles.signin__text}>
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
