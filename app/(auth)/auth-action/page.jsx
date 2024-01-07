import React, { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, applyActionCode, verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import ResetPasswordForm from "./ResetPasswordForm";
import ResetPasswordSuccess from "./ResetPasswordSuccess";

// Define action types
const ACTIONS = {
  PASSWORD_CHANGE: "PASSWORD_CHANGE",
  RESET_FORM: "RESET_FORM",
  SHOW_MESSAGE: "SHOW_MESSAGE",
  SHOW_ERROR: "SHOW_ERROR",
  LOADING: "LOADING",
};

const initialState = {
  password: "",
  confirmPassword: "",
  message: "",
  error: "",
  stage: "form",
  loading: false,
};

function reducer(state, action) {
    switch (action.type) {
      case ACTIONS.PASSWORD_CHANGE:
        return { ...state, [action.field]: action.value };
      case ACTIONS.RESET_FORM:
        return { ...initialState, stage: "form", loading: false };
      case ACTIONS.SHOW_MESSAGE:
        return {
          ...state,
          stage: "success",
          message: action.message,
          loading: false,
        };
      case ACTIONS.SHOW_ERROR:
        return { ...state, stage: "form", error: action.error, loading: false };
      case ACTIONS.LOADING:
        return { ...state, loading: true };
      default:
        return state;
    }
  }

export default function AuthAction() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const { mode, oobCode } = router.query;
  
    const handleNoActionSpecified = async () => {
      console.error("No action specified.");
      await showAlert({
        type: "error",
        title: "Error",
        message: "No action specified.",
        showCloseButton: false,
        timeout: 4000,
        handleClose: () => setAlert(null),
      }, setAlert);
    };
  
    switch (mode) {
      case "verifyEmail":
        handleVerifyEmail(auth, oobCode);
        break;
      case "resetPassword":
        handleResetPassword(auth, oobCode)
          .then(() => dispatch({ type: ACTIONS.SHOW_MESSAGE, message: "Please enter your new password." }))
          .catch(() => dispatch({ type: ACTIONS.SHOW_ERROR, error: "Invalid or expired link for password reset." }));
        break;
      default:
        handleNoActionSpecified();
        break;
    }
  }, [router.query]);
  
  const handleVerifyEmail = async (auth, actionCode) => {
    try {
      await applyActionCode(auth, actionCode);
      await showAlert({
        type: "success",
        title: "Success",
        message: "Email verified successfully. Proceed to login.",
        showCloseButton: false,
        timeout: 3000,
        handleClose: () => setAlert(null),
        }, setAlert);
        navigate("/");
    } catch (error) {
      await showAlert({
        type: "error",
        title: "Error",
        message: "Error verifying email. Please try again.",
        showCloseButton: false,
        timeout: 4000,
        handleClose: () => setAlert(null),
        }, setAlert);
    }
  };

  async function handleResetPassword(auth, actionCode) {
    try {
      const userEmail = await verifyPasswordResetCode(auth, actionCode);
      return userEmail;
    } catch (error) {
      dispatch({
        type: ACTIONS.SHOW_ERROR,
        error: "Error verifying the password reset token.",
      });
      console.error("Error verifying the password reset token:", error);
      return null;
    }
  }

  async function updatePasswordForUser(code, newPassword) {
    try {
      await confirmPasswordReset(auth, code, newPassword);
      dispatch({
        type: ACTIONS.SHOW_MESSAGE,
        message: "Password updated successfully.",
      });
    } catch (error) {
      dispatch({
        type: ACTIONS.SHOW_ERROR,
        error: "Error updating the password. Please try again.",
      });
      console.error("Error updating password:", error);
    }
  }

  const validatePasswords = () => {
    if (state.password !== state.confirmPassword) {
      dispatch({
        type: ACTIONS.SHOW_ERROR,
        error: "New password and confirm password do not match.",
      });
      return false;
    }
    if (!validatePassword(state.password, isStrongPasswordPolicy)) {
      dispatch({
        type: ACTIONS.SHOW_ERROR,
        error: isStrongPasswordPolicy
          ? "Password must be at least 8 characters long, must contain at least one number and a special character."
          : "Password must be at least 6 digits long.",
      });
      return false;
    }
    return true;
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.LOADING });

    if (!validatePasswords()) {
      return;
    }

    const resetPasswordToken = new URLSearchParams(window.location.search).get(
      "oobCode"
    );

    if (!resetPasswordToken) {
      dispatch({
        type: ACTIONS.SHOW_ERROR,
        error: "Password reset token is missing or invalid.",
      });
      return;
    }
    // Assuming 'state.password' is the new password entered by the user
    try {
      await updatePasswordForUser(resetPasswordToken, state.password);
    } catch (error) {
      console.error("Error during password reset:", error);
    }
  };

  return (
    <>
      {state.stage === "form" && (
        <ResetPasswordForm
          state={state}
          dispatch={dispatch}
          handleChangePassword={handleChangePassword}
          showTooltip={showTooltip}
          setShowTooltip={setShowTooltip}
          ACTIONS={ACTIONS}
        />
      )}

      {state.stage === "success" && (
        <ResetPasswordSuccess state={state} navigate={navigate} />
      )}
    </>
  );
}