"use client";
import React from "react";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import { useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";

import { motion } from "motion/react";

import Link from "next/link";

import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isServicesOpen, setIsServicesOpen] = useState<boolean>(false);

  function handleDropdown(): boolean | void {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <nav className="min-w-full p-5 bg-white shadow-2xl flex items-center justify-between fixed z-20 top-0 ">
        <Link href={"/"}>
          <div className="flex items-center justify-center gap-2 cursor-pointer">
            <div className="relative w-10 h-10 rounded-full bg-black">
              <Image
                fill={true}
                src={"/images/doctorIcon.jpg"}
                alt="doctor icon"
              ></Image>
            </div>
            <h2 className="text-xl font-bold text-teal-800">TeleMedX</h2>
          </div>
        </Link>

        <ul className="lg:flex lg:items-center lg:justify-center lg:gap-9 lg:list-none lg:text-md lg:font-semibold lg:text-gray-600 hidden">
          <Link href="/">
            <motion.li
              whileHover={{
                scale: 1.1,
                backgroundColor: "teal",
                color: "white",
              }}
              className="px-3 py-2 rounded-xl cursor-pointer"
            >
              Home
            </motion.li>
          </Link>
          <Link href={"/userDashboard"}>
            <motion.li
              whileHover={{
                scale: 1.1,
                backgroundColor: "teal",
                color: "white",
              }}
              className="px-3 py-2 rounded-xl cursor-pointer"
            >
              Dashboard
            </motion.li>
          </Link>
          <motion.li
            whileHover={{ scale: 1.1, backgroundColor: "teal", color: "white" }}
            className="px-3 py-2 rounded-xl cursor-pointer"
          >
            Contact Us
          </motion.li>
          <motion.div
            onHoverStart={() => setIsServicesOpen(true)}
            onHoverEnd={() => setIsServicesOpen(false)}
            className="relative"
          >
            <motion.li
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              whileHover={{
                scale: 1.1,
                backgroundColor: "teal",
                color: "white",
              }}
              className="relative px-3 py-2 rounded-xl cursor-pointer"
            >
              Services
            </motion.li>

            {isServicesOpen && (
              <div className="absolute top-10 bg-white shadow-lg w-[200px] rounded-lg p-4">
                <ul className="flex flex-col gap-2">
                  <Link href={"/labTestBooking"}>
                    <li className="cursor-pointer hover:bg-teal-500 hover:text-white px-3 py-2 rounded-lg">
                      Lab Test Booking
                    </li>
                  </Link>
                  <Link href={"/bookAppointment"}>
                    <li className="cursor-pointer hover:bg-teal-500 hover:text-white px-3 py-2 rounded-lg">
                      Doctor Consultation
                    </li>
                  </Link>
                  <Link href={"/ai"}>
                    <li className="cursor-pointer hover:bg-teal-500 hover:text-white px-3 py-2 rounded-lg">
                      AI Image Analysis
                    </li>
                  </Link>
                </ul>
              </div>
            )}
          </motion.div>
        </ul>

        <ul className="flex items-center gap-4 text-md font-semibold list-none">
          {/* Show when NOT signed in */}
          <SignedOut>
            <li className="text-xl lg:hidden not-first:text-black cursor-pointer relative">
              <GiHamburgerMenu onClick={handleDropdown} />
            </li>
            {isOpen && (
              <div className="absolute  w-[250px] top-20 right-7 bg-white text-gray-800 font-bold shadow-2xl p-6 rounded-2xl">
                <ul className="flex flex-col items-center gap-9">
                  <motion.li
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "teal",
                      color: "white",
                    }}
                    className="cursor-pointer w-full text-center px-2 rounded-2xl"
                  >
                    Home
                  </motion.li>
                  <motion.li
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "teal",
                      color: "white",
                    }}
                    className="cursor-pointer w-full text-center px-2 rounded-2xl"
                  >
                    About Us
                  </motion.li>
                  <motion.li
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "teal",
                      color: "white",
                    }}
                    className="cursor-pointer w-full text-center px-2 rounded-2xl"
                  >
                    Contact Us
                  </motion.li>

                  <motion.li
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "teal",
                      color: "white",
                    }}
                    className="cursor-pointer w-full text-center px-2 rounded-2xl"
                  >
                    Services
                  </motion.li>
                </ul>
              </div>
            )}
            <li>
              <SignInButton>
                <button
                  type="button"
                  className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Sign In
                </button>
              </SignInButton>
            </li>
          </SignedOut>

          {/* Show when signed in */}
          <SignedIn>
            <li className="text-xl lg:hidden not-first:text-black cursor-pointer">
              <GiHamburgerMenu />
            </li>
            <li>
              <UserButton />
            </li>
            <li>
              <SignOutButton>
                <button
                  type="button"
                  className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Sign Out
                </button>
              </SignOutButton>
            </li>
          </SignedIn>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
