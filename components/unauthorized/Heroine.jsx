import React from "react";
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import jobSeeker from "../../public/assets/images/job_seekers.jpg";

export default function Heroine() {
  return (
    <main className="mx-auto mt-16 max-w-7xl px-4 sm:mt-24 lg:mt-32 min-h-[calc(100vh_-80px_)]">
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
          <h1>
            <span className="block text-base font-semibold text-gray-500 sm:text-lg lg:text-base xl:text-lg">
              Coming soon
            </span>
            <h1 className="mt-1 block text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
              <span className="block text-gray-900">Hire a rising talent</span>
              <span className="block text-blue-600">Find your dream job</span>
            </h1>
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
            Looking for a new role? Create a profile on Hired to connect
            directly with growing tech teams. Hiring? We're the go-to platform
            for sourcing the best tech talent out there.
          </p>
          <div className="mt-8 sm:mx-auto sm:max-w-lg sm:text-center lg:mx-0 lg:text-left">
            <form action="#" method="POST" className="mt-3 sm:flex">
              <label htmlFor="email" className="sr-only">
                Search
              </label>

              <input
                type="search"
                name="search"
                id=""
                className="block w-full rounded-md border border-gray-300 px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                placeholder="Job Title, Skill or Company"
              />
              <button
                type="submit"
                className="mt-3 w-full rounded-md border border-transparent bg-gray-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:inline-flex sm:w-auto sm:flex-shrink-0 sm:items-center"
              >
                Find jobs
              </button>
            </form>
            <p className="mt-3 text-sm text-gray-500">
              We care about the protection of your data. Read our{" "}
              <a href="#" className="font-medium text-gray-900 underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
        <div className="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center">
          <svg
            className="absolute left-1/2 top-0 origin-top -translate-x-1/2 -translate-y-8 scale-75 transform sm:scale-100 lg:hidden"
            width={640}
            height={784}
            fill="none"
            viewBox="0 0 640 784"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e"
                x={118}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              y={72}
              width={640}
              height={640}
              className="text-gray-50"
              fill="currentColor"
            />
            <rect
              x={118}
              width={404}
              height={784}
              fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)"
            />
          </svg>
          <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
            <div className="relative block w-full overflow-hidden rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <Image
                src="/assets/images/job_seekers.jpg"
                alt="Job seekers"
                width={640} 
                height={360} 
                layout="responsive"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
