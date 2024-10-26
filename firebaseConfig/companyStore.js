/*
* @license
* Copyright 2022 Google LLC
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signOut,
  signInWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  deleteUser,
} from "firebase/auth";
import showAlert from "@/components/utils/AlertBox/CustomAlert";

const COMPANY = "companyCollection";

const reauthenticateUser = async (user, currentPassword) => {
  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential);
};

export const companyStore = {
  // Company Store

  async getCompanyStore() {
    try {
      const q = collection(db, COMPANY);
      const querySnapshot = await getDocs(q);

      const companyIds = querySnapshot.docs.map((doc) => ({
        companyId: doc.id, 
        ...doc.data()
      }));

      return companyIds;
    } catch (error) {
      console.error("Error fetching company IDs:", error);
      return [];
    }
  },

  async getCompanyStoreById(companyId) {
    try {
      const docRef = doc(db, COMPANY, companyId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        return { id: docSnapshot.id, ...docSnapshot.data() };
      } else {
        console.error("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching company data by ID:", error);
      return null;
    }
  },

  async deleteCompanyAccount(user, password) {
    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);

      const userDocRef = doc(db, COMPANY, user.uid);
      await deleteDoc(userDocRef);

      await deleteUser(user);

      console.log("Account successfully deleted.");
    } catch (error) {
      console.error("Error deleting account:", error);
      throw error;
    }
  },

  async updateCompanyPassword(user, currentPassword, newPassword) {
    try {
      await reauthenticateUser(user, currentPassword);
      await updatePassword(user, newPassword); 
      return "Password updated successfully.";
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  },
};

export const registerCompany = async (fullName, email, password) => {
  const auth = getAuth();
  try {
    // Step 1: Create the user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // Step 2: Send email verification
    await sendEmailVerification(user);

    // Step 3: Create the user in Firestore
    const newUserId = userCredential.user.uid;
    await setDoc(doc(db, COMPANY, newUserId), {
      fullName: fullName,
      email: email,
      user: "company",
    });
    return newUserId;
  } catch (error) {
    throw error;
  }
};

//Handle Login Company
export const loginCompany = async (email, password, selectedRole) => {
  console.log("loginCompany function triggered"); // Check if function is running
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "companyCollection", user.uid));
    const userData = userDoc.data();

    console.log("Firestore user role:", userData.user);
    console.log("Selected role on sign-in:", selectedRole);

    if (userData.user !== selectedRole) {
      throw new Error(`You checked the wrong box. Please select '${userData.user}' as your role.`);
    }

    return user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};


//Update Company
export const updateCompany = async (company) => {
  const docRef = doc(db, COMPANY, company.id);
  await updateDoc(docRef, company);
};

//Delete Company
export const deleteCompany = async (id) => {
  const docRef = doc(db, COMPANY, id);
  await deleteDoc(docRef);
};

// Function to add a job to the companycollection
const stripHtmlTags = (htmlString) => {
  return htmlString.replace(/<\/?[^>]+(>|$)/g, "");
};

export const addJobPost = async (companyId, jobData) => {
  try {
    const companyRef = doc(db, COMPANY, companyId);
    const jobsCollectionRef = collection(companyRef, "jobs");

    const convertEditorStateToHtml = (editorState) => {
      if (!editorState) {
        return "";
      }
      const contentState = editorState.getCurrentContent();
      if (!contentState.hasText()) {
        return "";
      }
      const htmlContent = draftToHtml(convertToRaw(contentState));
      const plainTextContent = stripHtmlTags(htmlContent);
      return plainTextContent;
    };

    const cleanJobData = {
      ...jobData,
      requirements: convertEditorStateToHtml(jobData.requirements),
      benefits: convertEditorStateToHtml(jobData.benefits),
      educationExperience: convertEditorStateToHtml(jobData.educationExperience),
      createdAt: new Date(),
    };

    await addDoc(jobsCollectionRef, cleanJobData);
  } catch (error) {
    console.error("Error adding job to company's collection:", error);
    throw error;
  }
};


// Function to get a jobID from the companycollection
export const getJobIdsFromCompany = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated.");
  }

  const companyId = user.uid;
  try {
    const jobsCollectionRef = collection(db, COMPANY, companyId, "jobs");
    const jobsQuerySnapshot = await getDocs(jobsCollectionRef);

    const jobIds = [];
    jobsQuerySnapshot.forEach((jobDoc) => {
      jobIds.push({
        companyId: companyId,
        jobId: jobDoc.id,
        ...jobDoc.data(),
      });
    });

    return jobIds;
  } catch (error) {
    console.error("Error fetching job IDs from company:", error);
    throw error;
  }
};

// Function to delete a job from the companycollection
export const deleteJob = async (jobId) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User not authenticated.');
  }

  try {
    const companyId = user.uid;
    if (!companyId || !jobId) {
      throw new Error('Company ID and Job ID are required.');
    }

    const jobRef = doc(db, COMPANY, companyId, 'jobs', jobId);

    // Delete the job document
    await deleteDoc(jobRef);
  } catch (error) {
    console.error('Error deleting job:', error.message);
    throw error;
  }
};

// Function to update job details
export const updateJobDetails = async (jobId, updatedData) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated.");
  }

  try {
    const companyId = user.uid;
    const jobRef = doc(db, COMPANY, companyId, "jobs", jobId);
    await updateDoc(jobRef, updatedData);
  } catch (error) {
    console.error("Error updating job details:", error);
    throw error;
  }
};

// Function to get job details
export const getJobDetailsById = async (jobId) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated.");
  }

  try {
    const companyId = user.uid;
    const jobRef = doc(db, COMPANY, companyId, "jobs", jobId);
    const jobSnapshot = await getDoc(jobRef);

    if (!jobSnapshot.exists()) {
      throw new Error("Job not found.");
    }

    return jobSnapshot.data();
  } catch (error) {
    console.error("Error fetching job details:", error);
    throw error;
  }
};

// Function to update job status
export const updateJobStatus = async (jobId, isActive) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated.");
  }

  try {
    const companyId = user.uid;
    const jobRef = doc(db, COMPANY, companyId, "jobs", jobId);

    await updateDoc(jobRef, {
      active: !isActive
    });

    // Send notification for job status update
    const notificationMessage = `Job ID: ${jobId} status has been updated.`;
    await sendNotification(companyId, 'jobStatusUpdate', notificationMessage, { jobId });

  } catch (error) {
    console.error("Error updating job status:", error);
    throw error;
  }
};

// Function to get total number of applicants
export const getApplicantCount = async (jobId, companyId) => {
  try {
    const applicantsRef = collection(db, COMPANY, companyId, "jobs", jobId, "applications");
    const applicantSnapshot = await getDocs(applicantsRef);

    return applicantSnapshot.size;
  } catch (error) {
    console.error("Error fetching applicant count:", error);
    return 0;
  }
};

//Function to get Applicants details
export const getApplicantsByJobId = async (jobId, companyId) => {
  try {
    const applicantsRef = collection(db, COMPANY, companyId, "jobs", jobId, "applications");
    const applicantSnapshot = await getDocs(applicantsRef);

    if (applicantSnapshot.empty) {
      return [];
    }

    const applicants = applicantSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return applicants;
  } catch (error) {
    console.error("Error fetching applicants:", error);
    return [];
  }
};

// Function to send Notification
export const sendNotification = async (companyId, notificationType, message, additionalData) => {

  const notificationsRef = collection(doc(db, COMPANY, companyId), "notifications");

  const notificationData = {
    type: notificationType,
    message: message,
    date: new Date().toISOString(),
    ...additionalData
  };

  await addDoc(notificationsRef, notificationData);
};

// Function to fetch notifications
export const fetchNotifications = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated.");
  }

  try {
    const companyId = user.uid;
    const notificationsRef = collection(db, COMPANY, companyId, 'notifications');
    const notificationsQuery = query(notificationsRef, orderBy('date', 'desc'));
    const querySnapshot = await getDocs(notificationsQuery);

    const notifications = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return notifications;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

// Function to delete notification from company collection
export const deleteNotification = async (notificationId) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User not authenticated");
    }

    const companyId = user.uid;
    const notificationDocRef = doc(db, COMPANY, companyId, "notifications", notificationId);

    await deleteDoc(notificationDocRef);
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error;
  }
};

