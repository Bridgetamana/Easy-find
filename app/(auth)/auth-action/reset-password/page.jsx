"use client";
import React, { useState } from "react";
import Link from "next/link";
import Spinner from "@/components/utils/Loaders/Spinner";
import showAlert from "@/components/utils/AlertBox/CustomAlert";

import { IoEye, IoEyeOff } from "react-icons/io5";
import "./style.scss";

export default function ResetPasswordForm({
  state,
  dispatch,
  handleChangePassword,
  ACTIONS,
}) {
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (state.error) {
      const clearErrorTimeout = setTimeout(() => {
        dispatch({ type: ACTIONS.SHOW_ERROR, error: "" });
      }, 3000);
      return () => clearTimeout(clearErrorTimeout);
    }
  }, [state.error, dispatch, ACTIONS]);

  return (
    <section className="resetPassword__form">
      {alert && alert.component}
      <div className="resetPassword-form__container">
        <div className="header">
          <h1 className="title">Reset Password</h1>
          <p className="subtitle">Enter your new password.</p>
        </div>
        <form className="form__wrap" onSubmit={handleChangePassword}>
          <div className="password__field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="pass__field"
              value={password}
              onChange={handleInputChange}
              required
              disabled={isLoading}
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
