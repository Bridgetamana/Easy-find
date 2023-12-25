"use client";
import React, { useState } from "react";
import Link from "next/link";
import "./style.scss";
import showAlert from "@/components/utils/AlertBox/CustomAlert";
import { loginTalent } from "@/firebaseConfig/talentStore";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await loginTalent(
        email,
        password
      );
      const user = userCredential.user;
      const userUID = user.uid;

      // Fetch the user's details from Firestore
      const userRef = doc(db, "users", userUID);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await showAlert(
          {
            type: "error",
            title: "Error",
            message: "User not found. Please sign up.",
            showCloseButton: false,
            timeout: 4000,
            handleClose: () => setAlert(null),
          },
          setAlert
        );
        setIsLoading(false);
        return;
      }

      const userData = userDoc.data();
      const nameParts = userData.fullName;

      // Store the user's first name in secure storage
      secureLocalStorage.setItem("user_firstName", nameParts);
      setIsLoading(false);
      navigate("/talent");
    } catch (error) {
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <section className="login__form">
      <div className="login__form__container">
        <div className="login__signin">
          <div className="header">
            <h1 className="title">Sign In</h1>
            <p className="subtitle">
              To keep connected with us please login with your personal info.
            </p>
          </div>
          <form className="form__wrap" onSubmit={handleLogin}>
            
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="input__field"
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input__field"
              value={password}
              onChange={handleInputChange}
            />
            <div className="flex">
              <div className="remember__me">
                <input type="checkbox" name="remember" id="remember" />
                <label htmlFor="remember" className="remember__me__text">
                  Remember Me
                </label>
              </div>
              <Link href="/forgot-password" className="forgot__password">
                Forgot your password?
              </Link>
            </div>
            {error && <p className="error">{error}</p>}
            {isLoading ? (
              <button className="signin__btn" type="submit">
                <div className="spinner"></div>
              </button>
            ) : (
              <button className="signin__btn" type="submit">
                Sign In
              </button>
            )}
            <div className="signup__info">
              <p className="text">Do not have an account?</p>{" "}
              <Link href={"/signup"} className="signup__text">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
        <div className="login__signup">
          <h1 className="title">Hello Friend!</h1>
          <p className="subtitle">
            Discover new talents, become a talent, and connect with the
            community.
          </p>
        </div>
      </div>
    </section>
  );
}
