import React from "react";
import "./style.scss";
import { ArrowUpOnSquareIcon, DocumentCheckIcon, DocumentTextIcon } from "@heroicons/react/20/solid";

const features = [
  {
    description: "Sign up and create your talent account.",
    name: "Step 1",
    icon: DocumentCheckIcon,
  },
  {
    description: "Upload your resume to showcase your skills and experience.",
    name: "Step 2",
    icon: ArrowUpOnSquareIcon,
  },
  {
    description: "Browse through job listings and find your dream job.",
    name: "Step 3",
    icon: DocumentTextIcon,
  },
];

export default function TalentFeatures() {
  return (
    // <section className="talentFeatures__section">
    //   <div className="features__container">
    //     <div className="section__header">
    //       <h2 className="section__title">How EasyFind Works</h2>
    //       <h3 className="section__subtitle">Explore what you can do as a new talent in the rising.</h3>
    //     </div>
    //     {/* <div className="features__cards">
    //         <div className="card">
    //       <div className="features__card">
    //           <div className="title">
    //             <span className="text__title">Step</span>
    //             <h4 className="number__title">1</h4>
    //           </div>
    //           <p className="card__description">
    //             Sign up and create your talent account.
    //           </p>
    //         </div>
    //       </div>
    //         <div className="card">
    //       <div className="features__card">
    //           <div className="title">
    //             <span className="text__title">Step</span>
    //             <h4 className="number__title">2</h4>
    //           </div>
    //           <p className="card__description">
    //             Upload your resume to showcase your skills and experience.
    //           </p>
    //         </div>
    //       </div>
    //         <div className="card">
    //       <div className="features__card">
    //           <div className="title">
    //             <span className="text__title">Step</span>
    //             <h4 className="number__title">3</h4>
    //           </div>
    //           <p className="card__description">
    //             Browse through job listings and find your dream job.
    //           </p>
    //         </div>
    //       </div>
    //     </div> */}
    //     <div className="features__card">
    //       <div className="features-grid">
    //         {features.map((feature) => (
    //           <div key={feature.title} className="feature">
    //             <div className="card">
    //               <div className="feature-icon-wrapper">
    //                 <span className="icon-circle">
    //                   <p className="icon">{feature.icon}</p>

    //                 </span>
    //               </div>
    //               {/* <h3 className="feature-title">{feature.title}</h3> */}
    //               <p className="feature-description">{feature.description}</p>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </section>

    <div className="overflow-hidden bg-white py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
          <div className="px-6 md:px-0 lg:pr-4 lg:pt-4">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-blue-600">
         How it works
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Explore what you can do as a new talent in the rising.
        </p>
        <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <feature.icon
                  className="absolute left-1 top-1 h-5 w-5 text-blue-600"
                  aria-hidden="true"
                />
                {feature.name}
              </dt>{" "}
              <dd className="inline">{feature.description}</dd>
            </div>
          ))}
        </dl>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
