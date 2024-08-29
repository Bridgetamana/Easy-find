// import React, { useEffect, useState } from "react";
// import { AiOutlineClockCircle, AiOutlineEnvironment } from "react-icons/ai";
// import { BiBadgeCheck } from "react-icons/bi";
// import { BsCheck2Circle, BsHeart } from "react-icons/bs";
// import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
// import Link from "next/link";
// import LoadingScreen from "@/components/utils/Loaders/Loader";
// import { getJobById } from "@/firebaseConfig/talentStore";
// import "./style.module.scss";
// import { convertFutureTimestamp, convertTimestamp } from "../../../firebaseConfig/talentStore";
// import { useRouter } from "next/router";



// export async function getServerSideProps({ params }) {
//   try {
//     const jobId = generateJobHash(params.jobIdHash);
//     const response = await getJobById(jobId);

//     return {
//       props: {
//         jobDetail: response,
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching job details:', error);

//     return {
//       notFound: true,
//     };
//   }
// }
