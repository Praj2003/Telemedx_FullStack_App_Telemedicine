"use client";
import React from "react";
import doctors from "@/doctorData";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

const AppointmentPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  async function handleBook(doctor: any) {
    router.push(`booking/${encodeURIComponent(doctor)}`);
  }

  const filteredOutput = doctors.filter((doctor) => {
    return (
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  return (
    <>
      <SignedIn>
        <div className="min-w-full min-h-screen">
          <div className="container mx-auto">
            <div className="text-center">
              <h1 className="text-teal-800 font-bold text-2xl mt-28">
                Book an Appointment with Our Doctors
              </h1>
            </div>

            <div className="flex items-center justify-center mt-9">
              <Input
                className="w-md md:w-xl lg:w-3xl p-5 bg-white shadow-2xl text-teal-600 font-bold"
                placeholder="Enter the name of Doctor or Department...."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              ></Input>
            </div>

            <div className="w-full grid lg:grid-cols-2 grid-col-1 gap-10 mt-10 mb-7">
              {filteredOutput.map((doctor) => {
                return (
                  <div
                    key={doctor.id}
                    className="grid bg-white shadow-2xl rounded-xl p-5 grid-cols-2"
                  >
                    <div className="flex items-center justify-center">
                      <div className="flex flex-col gap-3">
                        <h2 className="text-xl text-teal-600 font-bold">
                          {doctor.name}
                        </h2>
                        <p className="text-md font-semibold text-black">
                          {doctor.department}
                        </p>

                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 text-yellow-300 me-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            className="w-4 h-4 text-yellow-300 me-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            className="w-4 h-4 text-yellow-300 me-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            className="w-4 h-4 text-yellow-300 me-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                            4.95
                          </p>
                          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                            out of
                          </p>
                          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                            5
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <motion.button
                        onClick={() => handleBook(doctor.name)}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "teal",
                          color: "white",
                        }}
                        className="bg-black p-3 text-white rounded-xl cursor-pointer"
                      >
                        Book Now
                      </motion.button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default AppointmentPage;
