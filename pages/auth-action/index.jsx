'use client';

import React, { useEffect, useReducer } from "react";
import { useRouter, useLocation } from "next/navigation";
import {
  getAuth,
  applyActionCode,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";
import ResetPassword from "./password-set/index";
import VerifyEmail from "../verify-email/page";


export default function AuthAction() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const auth = getAuth();
  const location = useLocation();

  useEffect(() => {
    const auth = getAuth();
    const urlParams = new URLSearchParams(location.search);
    const mode = urlParams.get("mode");
    const actionCode = urlParams.get("oobCode");
    setOobCode(actionCode);

    switch (mode) {
      case "verifyEmail":
       
        break;
      case "resetPassword":
       
        break;
      default:
        console.error("No action specified.");
        break;
    }
  }, [router, location.search, auth]);


  return (
    <>
      {state.stage === "form" && (
        <ResetPassword state={state} navigate={router} />
      )}

      {
        state.stage === "verify" && (
          <VerifyEmail />
        )
      }

      {state.stage && (
        <ResetPassword state={state} navigate={router} />
      )}
    </>
  );
}
