import React, {useEffect, useState} from 'react'
import { getAuth } from "firebase/auth";
import { talentStore } from '@/firebaseConfig/talentStore';
import { db, auth } from "../../../../firebaseConfig/firebase"; 
import { collection, query, where, getDocs } from "firebase/firestore";
import styles from "./style.module.scss"


export default function FeaturedJobs() {
    const [featuredJobs, setFeaturedJobs] = useState([]);
    const [userProfile, setUserProfile] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 

   
    useEffect(() => {
        const fetchUserProfile = async () => {
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                const userId = user.uid;
                const profile = await talentStore.getTalentStoreById(userId);
                setUserProfile(profile || {}); 
            } else {
                setUserProfile({}); 
            }
        };

        fetchUserProfile();
    }, []);

    useEffect(() => {
        if (userProfile && userProfile.jobTitleKeywords) {
            fetchFeaturedJobs();
        }
    }, [userProfile]);

    useEffect(() => {
        if (userProfile && userProfile.jobTitleKeywords?.length > 0) {
            fetchFeaturedJobs();
        } else {
            setIsLoading(false);
        }
    }, [userProfile]);

    const fetchFeaturedJobs = async () => {
        setIsLoading(true);
        try {
            const companiesRef = collection(db, 'companyCollection');
            const companiesSnapshot = await getDocs(companiesRef);
    
            const jobs = []; 
    
            for (const companyDoc of companiesSnapshot.docs) {
                const companyId = companyDoc.id; 
                const jobsRef = collection(companyDoc.ref, 'jobs');
    
                const filters = [];
                if (userProfile.jobTitleKeywords && userProfile.jobTitleKeywords.length > 0) {
                    filters.push(where('titleKeywords', 'array-contains-any', userProfile.jobTitleKeywords));
                }
                if (userProfile.minSalary != null) {
                    filters.push(where('salaryMin', '>=', userProfile.minSalary));
                }
                if (userProfile.maxSalary != null) {
                    filters.push(where('salaryMax', '<=', userProfile.maxSalary));
                }
    
                const q = query(jobsRef, ...filters);
    
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach(doc => {
                    jobs.push({
                        id: doc.id,
                        ...doc.data(),
                        companyId 
                    });
                });
            }
    
            setFeaturedJobs(jobs); 
        } catch (error) {
            console.error("Error fetching jobs:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    
    
  return (
    <div className='bg-white w-[90%] p-[3rem] my-[3rem] mx-auto rounded-2xl flex flex-col items-start'>
      <h1 className='text-[28px] md:text-[32px] text-black font-medium'>Featured Jobs</h1>

        {isLoading ? (
          <p>Loading featured jobs ....</p>
        ) : featuredJobs.length > 0 ? (
            <ul className={styles.featuredJobs__list}>
                {featuredJobs.map((job, index) => (
                <li key={index} className={styles.featuredJobs__item}>
                    <div className={styles.item__header}>
                    <div className={styles.companyLogo}>
                        <img
                        src="https://static.otta.com/uploads/images/company-favicons/5996-iQnDzA7rv2dBoZXhl3l357RZDToiw5971gg7F-ba6ME.jpg"
                        alt="Company Logo"
                        />
                    </div>
                    <div className={styles.companyNames}>
                        <h3 className={styles.companyName}>{job.company}</h3>
                        <p className={styles.jobTitle}>{job.title}</p>
                    </div>
                    </div>
                    <div className={styles.item__buttons}>
                    <Link href={`/talent/jobs/details/${job.companyId}/${job.jobId}`}>
                        <button className={styles.btn__link}>View</button>
                    </Link>
                    <Link href={`/talent/jobs/details/${job.companyId}/${job.jobId}`}>
                        <button className={styles.btn__link}>Apply</button>
                    </Link>
                    </div>
                </li>
                ))}
            </ul>
        ) : (
            <p className={styles.no__featuredJobs}>
                {userProfile && userProfile.jobTitleKeywords
                ? "No featured jobs available at the moment."
                : "Please complete your profile to view relevant jobs."}
            </p>
        )}
    </div>
  )
}
