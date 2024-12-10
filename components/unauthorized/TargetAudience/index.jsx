import Image from "next/image";
import React from "react";

export default function TargetAudience() {
  return (
    <div className="mx-auto max-w-[90%] px-6 my-16 sm:my-24 lg:my-24">
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center">
          <div className="relative block w-full overflow-hidden p-8 rounded-2xl bg-blue-50 hover:ring-blue-500 shadow-sm">
            <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
              <span>
                <h1 className="block text-base font-semibold text-blue-500 sm:text-lg lg:text-base xl:text-lg">
                  Easy find
                  <p className="mt-1 block text-4xl font-bold tracking-tight sm:text-4xl">
                    <span className="block text-gray-900">For Companies</span>
                  </p>
                </h1>
              </span>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Find professionals from around the world and from around all
                skills.
              </p>
            </div>
          </div>
        </div>
        <div className="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center">
          <div className="relative block w-full overflow-hidden p-8 rounded-2xl bg-cyan-50 hover:ring-blue-500 shadow-sm">
            <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
              <h1>
                <span className="block text-base font-semibold text-blue-500 sm:text-lg lg:text-base xl:text-lg">
                  Easy find
                </span>
                <p className="mt-1 block text-4xl font-bold tracking-tight sm:text-4xl">
                  <span className="block text-gray-900">For Candidates</span>
                </p>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Build your professional profile, find job new opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
