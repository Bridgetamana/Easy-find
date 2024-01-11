'use client';
import React, { useEffect, useReducer } from "react";
import { useRouter, useLocation } from "next/navigation";
import {
  getAuth,
  applyActionCode,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";
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
      console.log(action.error)
      return { ...state, stage: "form", error: action.error, loading: false };
    case ACTIONS.LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
}

function validatePassword(pass, isStrongPolicy) {
    if (isStrongPolicy) {
      const regex = /^(?=.*\d)(?=.*[\W_]).{8,}$/;
      return regex.test(pass);
    } else {
      return pass.length >= 6;
    }
  }

export default function AuthAction() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [message, setMessage] = useState("Verifying your email... ");
  const [showTooltip, setShowTooltip] = useState(false);
  const router = useRouter();
  const auth = getAuth();
  const location = useLocation();
  const [action, setAction] = useState("");
  const [oobCode, setOobCode] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const urlParams = new URLSearchParams(location.search);
    const mode = urlParams.get("mode");
    const actionCode = urlParams.get("oobCode");
    setOobCode(actionCode);

    switch (mode) {
      case "verifyEmail":
        setAction("verifyEmail");
        handleVerifyEmail(auth, actionCode);
        break;
      case "resetPassword":
        setAction("resetPassword");
        handleResetPassword(auth, actionCode)
          .then(() => setMessage("Please enter your new password."))
          .catch((error) =>
          // setMessage("Invalid or expired link for password reset.")
          console.log(error)
          // dispatch({
          //   type: ACTIONS.SHOW_ERROR,
          //   error: "Invalid or expired link for password reset.",
          // })
          );
        break;
      default:
        console.error("No action specified.");
        break;
    }
  }, [router, location.search, auth]);

  const handleVerifyEmail = async (auth, actionCode) => {
    try {
      await applyActionCode(auth, actionCode);
      setMessage("Your email has been verified. You can now log in.");
      setTimeout(() => router.push("/"), 3000);
    } catch (error) {
      setMessage("Error verifying email. Please try again.");
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

      {state.stage && (
        <ResetPasswordSuccess state={state} navigate={router} />
      )}
    </>
  );
}
