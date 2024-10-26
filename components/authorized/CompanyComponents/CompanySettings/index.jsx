import React, { useState } from "react";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { companyStore } from "../../../../firebaseConfig/companyStore";
import { IoEye, IoEyeOff } from "react-icons/io5";
import CustomModal from "../../../utils/CustomModal/index";
import showAlert from "../../../utils/AlertBox/CustomAlert";
import styles from "./style.module.scss";
import Spinner from "@/components/utils/Loaders/Spinner";

export default function SecuritySettings() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [deleteConfirmationPassword, setDeleteConfirmationPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState({ new: "", confirm: "" });
  const [alert, setAlert] = useState(null);

  const router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!password) {
      setErrorMsg((prev) => ({
        ...prev,
        current: "Current password is required.",
      }));
      return;
    }

    if (!validateCurrentPassword(password)) {
      setErrorMsg((prev) => ({
        ...prev,
        current: "Current password is incorrect.",
      }));
      return;
    }

    const validationError = validatePassword(newPassword);
    if (validationError) {
      setErrorMsg((prev) => ({ ...prev, new: validationError }));
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg((prev) => ({ ...prev, confirm: "Passwords do not match." }));
      return;
    }

    try {
      await companyStore.updateCompanyPassword(user, password, newPassword);
      showAlert(
        {
          type: "success",
          title: "Success!",
          message: "Password updated successfully.",
          showCloseButton: false,
          handleClose: () => setAlert(null),
          timeout: 3000,
        },
        setAlert
      );
      setErrorMsg({ new: "", confirm: "", current: "" }); 
    } catch (error) {
      handlePasswordChangeError(error);
    }
  };

  const handlePasswordChangeError = (error) => {
    if (error.code === "auth/invalid-credential") {
      showAlert(
        {
          type: "error",
          title: "Error!",
          message: "Wrong current password, please try again.",
          showCloseButton: false,
          handleClose: () => setAlert(null),
          timeout: 2000,
        },
        setAlert
      );
    } else {
      setErrorMsg((prev) => ({
        ...prev,
        current: "Failed to update password. Please try again.",
      }));
    }
  };

  const handleDeleteAccount = () => {
    setIsModalOpen(true);
  };

  const confirmDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      setIsModalOpen(false);
      await companyStore.deleteCompanyAccount(user, deleteConfirmationPassword);
      showAlert(
        {
          type: "success",
          title: "Success!",
          message: "Account deleted successfully.",
          showCloseButton: false,
          handleClose: () => setAlert(null),
          timeout: 3000,
        },
        setAlert
      );
      router.push("/");
    } catch (error) {
      handleDeleteAccountError(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteAccountError = (error) => {
    showAlert(
      {
        type: "error",
        title: "Error!",
        message:
          "Failed to delete account. Please check your password and try again.",
        showCloseButton: false,
        handleClose: () => setAlert(null),
        timeout: 2000,
      },
      setAlert
    );
  };

  const validatePassword = (password) => {
    if (password.length == 0) {
      return "Please enter new password";
    }
    if (!/\d/.test(password)) {
      return "Password must contain at least one number.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return null;
  };

  const validateCurrentPassword = (password) => {
    return password; 
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    const error = validatePassword(value);
    setErrorMsg((prev) => ({ ...prev, new: error || "" }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrorMsg((prev) => ({ ...prev, current: password.length == 0 ? "Current password is required." : "" }));
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setErrorMsg((prev) => ({
      ...prev,
      confirm: newPassword !== value ? "Passwords do not match." : "",
    }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <section className={styles.settings__section}>
      {alert && alert.component}

      <div className={styles.settings__container}>
        <h2 className={styles.settings__title}>Settings</h2>

        <div className={styles.changePassword__section}>
          <h3 className={styles.section__title}>Change Password</h3>
          <div className={styles.form__group}>
            <label htmlFor="currentPassword">Current Password:</label>
            <div className={styles.password_field}>
              <input
                type={showPassword ? "text" : "password"}
                id="currentPassword"
                value={password}
                className={styles.pass_field}
                onChange={handlePasswordChange}
                required
                autoFocus
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
            {errorMsg.current && (
              <p className={styles.error}>{errorMsg.current}</p>
            )}
          </div>

          <div className={styles.form__group}>
            <label htmlFor="newPassword">New Password:</label>
            <div className={styles.password_field}>
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                className={styles.pass_field}
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
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
            {errorMsg.new && <p className={styles.error}>{errorMsg.new}</p>}
          </div>

          <div className={styles.form__group}>
            <label htmlFor="confirmPassword">Confirm New Password:</label>
            <div className={styles.password_field}>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                className={styles.pass_field}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
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
            {errorMsg.confirm && (
              <p className={styles.error}>{errorMsg.confirm}</p>
            )}
          </div>

          <button
            className={styles.settings__button}
            onClick={handleChangePassword}
          >
            Change Password
          </button>
        </div>

        <div className={styles.deleteAccount__section}>
          <h3 className={styles.section__title}>Delete Account</h3>
          <div className={styles.form__group}>
            <label htmlFor="deleteConfirmation">Type Password:</label>
            <input
              type="text"
              id="deleteConfirmationPassword"
              className={styles.deleteAccount__input}
              value={deleteConfirmationPassword}
              onChange={(e) => setDeleteConfirmationPassword(e.target.value)}
              required
            />
          </div>

          <button
            className={styles.settings__button}
            onClick={handleDeleteAccount}
            disabled={isDeleting}
          >
            {isDeleting ? <Spinner /> : "Delete Account"}
          </button>
        </div>
      </div>

      <CustomModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Delete"
        description="Are you sure you want to delete your account? This action cannot be undone."
        confirmButtonText="Confirm"
        cancelButtonText="Cancel"
        confirmButtonBgColor="bg-[#ff0000]"
        confirmButtonTextColor="text-white"
        cancelButtonBgColor="bg-gray-200"
        cancelButtonTextColor="text-gray-700"
        onConfirm={confirmDeleteAccount}
        onCancel={() => setIsModalOpen(false)}
        loading={isDeleting}
        showConfirmButton={true}
      />
    </section>
  );
}
