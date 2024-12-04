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
  where,
  onSnapshot,
  orderBy,
  query,
  arrayUnion ,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "./firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  setPersistence,
  verifyPasswordResetCode,
  confirmPasswordReset,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  deleteUser,
  browserLocalPersistence,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

const TALENT = "talentCollection";

async function reauthenticateUser(user, currentPassword) {
  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential);
};

export const talentStore = {
  // Talent Store
  async getTalentStore() {
    const q = query(collection(db, TALENT), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const talentStore = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return talentStore;
  },

  async getTalentStoreById(id) {
    const docRef = doc(db, TALENT, id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  },

  async deleteTalentAccount(user, password) {
    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);

      const userDocRef = doc(db, TALENT, user.uid);
      await deleteDoc(userDocRef);

      await deleteUser(user);

      console.log("Account successfully deleted.");
    } catch (error) {
      console.error("Error deleting account:", error);
      throw error;
    }
  },

  async updateTalentPassword(user, currentPassword, newPassword) {
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

//Add New Talent
export const registerTalent = async (fullName, email, password) => {
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
    await setDoc(doc(db, TALENT, newUserId), {
      fullName: fullName,
      email: email,
      user: "talent",
      emailVerified: false,
    });
    return newUserId;
  } catch (error) {
    throw error;
  }
};

//Handle Login Talent
export const loginUser = async (email, password, setUser) => {
  const auth = getAuth();

  try {
    await setPersistence(auth, browserLocalPersistence); 
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    if (!user.emailVerified) {
      await auth.signOut();
      return {
        success: false,
        message: "Please verify your email before logging in. Check your inbox for the verification link.",
        code: "auth/email-not-verified"
      };
    }
    
    // Step 1: Fetch the user's document from Firestore using the user's UID
    const userDocRef = doc(db, TALENT, user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      await setDoc(userDocRef, {
        email: user.email,
        uid: user.uid,
        emailVerified: user.emailVerified,
        createdAt: new Date(),
      });
    }

    const userData = userDocSnap.data();
    setUser({
      username: userData.fullName,
      email: user.email,
      uid: user.uid,
      emailVerified: user.emailVerified
    });

    return {
      success: true,
      user: user
    };
  } catch (error) {
    switch (error.code) {
      case 'auth/invalid-credential':
        return {
          success: false,
          message: "Invalid email or password. Please check and try again.",
          code: 'auth/invalid-credential'
        };
      case 'auth/user-not-found':
        return {
          success: false,
          message: "No account found with this email. Please sign up.",
          code: 'auth/user-not-found'
        };
      default:
        return {
          success: false,
          message: "An unexpected error occurred. Please try again.",
          code: error.code || 'auth/unknown-error'
        };
    }
  }
};

//Handle Password Reset
export const resetPassword = async (oobCode, newPassword) => {
  try {
    await verifyPasswordResetCode(auth, oobCode, newPassword);

    await confirmPasswordReset(auth, oobCode, newPassword);

    return true; // Password reset successful
  } catch (error) {
    console.error('Error resetting password:', error.message);
    return false; // Password reset failed
  }
};

//Update Talent
export const updateTalent = async (talent, payload) => {
  try {
    const docRef = doc(db, "talentCollection", talent.id);

    let photoUrl = payload.photo; 
    let resumeUrl = payload.resume;

    if (payload.photo instanceof File) {
      const photoStorageRef = ref(storage, `talents/${talent.id}/profilePhoto`);
      const photoSnapshot = await uploadBytes(photoStorageRef, payload.photo);
      photoUrl = await getDownloadURL(photoSnapshot.ref); 
    }

    if (payload.resume instanceof File) {
      const resumeStorageRef = ref(storage, `talents/${talent.id}/resume`);
      const resumeSnapshot = await uploadBytes(resumeStorageRef, payload.resume);
      resumeUrl = await getDownloadURL(resumeSnapshot.ref); 
    }

    const updateData = {
      username: payload.username,
      email: payload.email,
      bio: payload.bio,
      photo: photoUrl,
      resume: resumeUrl,
      dob: payload.dob,
      gender: payload.gender,
      pronouns: payload.pronouns,
      jobTitle: payload.jobTitle,
      minSalary: payload.minSalary,
      maxSalary: payload.maxSalary,
      linkedin: payload.linkedin,
      portfolio: payload.portfolio,
      address: payload.address,
      phone: payload.phone,
      mobile: payload.mobile,
      skills: payload.skills,
      institute: payload.institute,
      degree: payload.degree,
      company: payload.company,
      position: payload.position,
    };

    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error("Error updating talent:", error);
    throw error;
  }
};

const COMPANIES = "companyCollection";

// Fetch jobs from all companies
export const getJobs = async () => {
  try {
    const companiesSnapshot = await getDocs(collection(db, COMPANIES));
    const activeJobs = [];

    for (const companyDoc of companiesSnapshot.docs) {
      const jobsRef = collection(db, COMPANIES, companyDoc.id, "jobs");
      const jobsQuery = query(jobsRef, where("active", "==", true));
      
      const jobsSnapshot = await getDocs(jobsQuery);

      jobsSnapshot.forEach(jobDoc => {
        const jobData = jobDoc.data();
        const createdAt = jobData.createdAt?.toDate ? jobData.createdAt.toDate() : new Date(jobData.createdAt);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        if (createdAt >= thirtyDaysAgo) {
          activeJobs.push({
            jobId: jobDoc.id,
            companyId: companyDoc.id,
            ...jobData
          });
        } else {
          updateDoc(jobDoc.ref, { active: false });
        }
      });
    }

    return activeJobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};

//Fetch jobs by id
export const getJobById = async (jobId, companyId) => {
  try {
    const jobRef = doc(db, `companyCollection/${companyId}/jobs/${jobId}`);
    const jobDoc = await getDoc(jobRef);

    if (jobDoc.exists()) {
      return { id: jobDoc.id, ...jobDoc.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching job:", error);
    throw error;
  }
};

// get jobs based on search input
export const searchJobs = (searchInput, setJobs, setNoResults, userId) => {
  if (!searchInput.trim()) return;

  const q = query(
    collection(db, `companyCollection/${userId}/jobs`), 
    where("title", ">=", searchInput),
    where("title", "<=", searchInput + "\uf8ff")
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      if (snapshot.empty) {
        setNoResults(true);
        setJobs([]);
      } else {
        const matchingJobs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNoResults(false);
        setJobs(matchingJobs);
      }
    },
    (error) => {
      console.error("Error fetching jobs:", error);
      setJobs([]);
      setNoResults(true);
    }
  );

  return unsubscribe;
};

// Readable Timestamp
export function convertTimestamp(timestamp) {
  if (!timestamp) {
    return 'Invalid timestamp';
  }

  let timestampDate;

  if (typeof timestamp.toDate === 'function') {
    timestampDate = timestamp.toDate(); 
  } else if (typeof timestamp === 'string' || typeof timestamp === 'number') {
    timestampDate = new Date(timestamp); 
  } else {
    return 'Invalid timestamp';
  }

  const now = new Date();
  const diff = now - timestampDate;
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));

  if (days >= 2) {
    return `${days} days ago`;
  } else if (days === 1) {
    return 'Yesterday';
  } else {
    return 'Today';
  }
}

export function convertFutureTimestamp(timestamp) {
  if (!timestamp) {
    return 'Invalid timestamp';
  }

  let timestampDate;
  if (typeof timestamp.toDate === 'function') {
    timestampDate = timestamp.toDate(); 
  } else if (typeof timestamp === 'string' || typeof timestamp === 'number') {
    timestampDate = new Date(timestamp); 
  } else {
    return 'Invalid timestamp';
  }

  const now = new Date();
  const diff = timestampDate - now; 
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days >= 2) {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return timestampDate.toLocaleDateString(undefined, options);
  } else if (days === 1) {
    return 'Tomorrow';
  } else if (days === 0) {
    return 'Today';
  } else {
    return `${-days} ${days === -1 ? 'day' : 'days'} ago`;
  }
}


export const saveJob = async (jobId, jobTitle) => {
  const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }

  try {
    const userDocRef = doc(db, TALENT, user.uid);

    const userDocSnapshot = await getDoc(userDocRef);
    if (!userDocSnapshot.exists()) {
      await setDoc(userDocRef, { jobs: { saved: [] } });
    } else {
      const userDocData = userDocSnapshot.data();
      if (!userDocData.jobs) {
        await updateDoc(userDocRef, { jobs: { saved: [] } });
      }
    }

    await updateDoc(userDocRef, {
      'jobs.saved': arrayUnion(jobId),
    });

    const notificationsRef = collection(userDocRef, 'notifications');
    const notificationDocRef = await addDoc(notificationsRef, {
      type: 'save',
      jobTitle: jobTitle,
      date: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error saving job:', error.message);
    throw error;
  }
};

// Function to fetch notifications
export const fetchNotifications = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return;
  }

  try {
    const notificationsRef = collection(db, TALENT, user.uid, 'notifications');
    const querySnapshot = await getDocs(notificationsRef);
    
    // Map over documents to extract notification data
    const notifications = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return notifications;
  } catch (error) {
    console.error('Error fetching notifications:', error.message);
  }
};

// Function to delete notification from talent collection
export const deleteNotification = async (notificationId) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return;
  }

  try {
    const notificationsRef = collection(db, TALENT, user.uid, 'notifications');
    const notificationDocRef = doc(notificationsRef, notificationId);

    await deleteDoc(notificationDocRef);
  } catch (error) {
    console.error("Error deleting notification:", error.message);
  }
};

// Function to unsave a job ID from the user's saved jobs array
export const unsaveJob = async (jobId) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }

    const userDocRef = db.collection('users').doc(user.uid);

    await userDocRef.update({
      saved: db.FieldValue.arrayRemove(jobId),
    });
  } catch (error) {
    console.error('Error unsaving job:', error.message);
    throw error;
  }
};



