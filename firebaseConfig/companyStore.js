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
  } from "firebase/auth";
  import showAlert from "@/components/utils/AlertBox/CustomAlert";
  
  const COMPANY = "companyCollection";
  
  export const companyStore = {
    // Company Store
    async getCompanyStore() {
      const q = query(collection(db, COMPANY), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const companyStore = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return companyStore;
    },
  
    async getCompanyStoreById(id) {
      const docRef = doc(db, COMPANY, id);
      const docSnap = await getDoc(docRef);
      return docSnap.data();
    },
  };
  
  //Add New Company
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
  export const loginCompany = async (email, password) => {
    const auth = getAuth();
    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      return user;
    } catch (error) {
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
    try {
      const companyQuerySnapshot = await getDocs(collection(db, COMPANY));
      
      const jobIds = [];
  
      for (const companyDoc of companyQuerySnapshot.docs) {
        const companyId = companyDoc.id;
  
        const jobsCollectionRef = collection(db, COMPANY, companyId, "jobs");
  
        const jobsQuerySnapshot = await getDocs(jobsCollectionRef);
  
        jobsQuerySnapshot.forEach((jobDoc) => {
          jobIds.push({
            companyId: companyId,
            jobId: jobDoc.id,
            ...jobDoc.data() 
          });
        });
      }
      return jobIds;
    } catch (error) {
      console.error("Error fetching job IDs from company collection:", error);
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
      console.log("Job details updated successfully");
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
