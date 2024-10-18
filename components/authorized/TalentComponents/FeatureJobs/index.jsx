import React, {useEffect, useState} from 'react'
import { getAuth } from "firebase/auth";
import { talentStore } from '@/firebaseConfig/talentStore';
import { db } from "../../../../firebaseConfig/firebase"; 
import { collection, query, where, getDocs } from "firebase/firestore";
import Spinner from '@/components/utils/Loaders/Spinner';
import styles from "./style.module.scss"

export default function FeaturedJobs() {
    const [featuredJobs, setFeaturedJobs] = useState([]);
    const [userProfile, setUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        const fetchUserProfile = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
    
            if (user) {
                const userId = user.uid;
                const userProfile = await talentStore.getTalentStoreById(userId);
                setUserProfile(userProfile); 
            }
        };
    
        fetchUserProfile();
    }, []);

    const fetchFeaturedJobs = async () => {
        setIsLoading(true); 
        try {
            const jobsRef = collection(db, 'companyCollection/${companyId}/jobs'); 
           
            const q = query(
                jobsRef, 
                where('titleKeywords', 'array-contains-any', userProfile.jobTitleKeywords),
                where('SalaryMin', '>=', userProfile.minSalary), 
                where('SalaryMax', '<=', userProfile.maxSalary)
            );
    
            const querySnapshot = await getDocs(q);
            const jobs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFeaturedJobs(jobs); 
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }finally {
            setIsLoading(false); 
        }
    };
    
    useEffect(() => {
        if (userProfile) {
            fetchFeaturedJobs();
        }
    }, [userProfile]);
    
    
  return (
    <div className='bg-white w-[90%] p-[3rem] my-[3rem] mx-auto rounded-2xl flex flex-col items-start'>
      <h1 className='text-[28px] md:text-[32px] text-black font-medium'>Featured Jobs</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
        {isLoading ? (
          <div><Spinner/></div>
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
            <p className={styles.no__featuredJobs}>No featured jobs available at the moment.</p>  
        )}
      </div>
    </div>
  )
}
