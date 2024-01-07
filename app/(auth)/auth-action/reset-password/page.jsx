"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Spinner from "@/components/utils/Loaders/Spinner";

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
  }, [ dispatch, ACTIONS]);

  return (
    <section className="resetPassword__form">
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
              // value={state.password}
              onChange={(e) =>
                dispatch({
                  type: ACTIONS.PASSWORD_CHANGE,
                  field: "password",
                  value: e.target.value,
                })
              }
              required
              // disabled={isLoading}
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
            // value={state.confirmPassword}
            onChange={(e) =>
              dispatch({
                type: ACTIONS.PASSWORD_CHANGE,
                field: "confirmPassword",
                value: e.target.value,
              })
            }
            required
          />

          {/* {state.error && <p className="error_msg">{state.error}</p>}
          <button className="reset-password__btn" type="submit">
            {state.loading ? <Spinner /> : "Submit"}
          </button> */}

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
