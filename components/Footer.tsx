"use client";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { motion } from "motion/react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="min-w-full p-3 bg-black grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 ">
      <div className="flex flex-col items-center gap-5 font-bold">
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "teal", color: "white" }}
          className="text-white bg-black px-3 py-2 rounded-lg cursor-pointer"
        >
          Home
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "teal", color: "white" }}
          className="text-white bg-black px-3 py-2 rounded-lg cursor-pointer"
        >
          About Us
        </motion.button>
        <Link href={"/bookAppointment"}>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "teal", color: "white" }}
            className="text-white bg-black px-3 py-2 rounded-lg cursor-pointer"
          >
            Book Appointment
          </motion.button>
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center gap-5 text-white font-bold">
        <div className="flex items-center justify-between w-3/4">
          <span>Email:</span>
          <span>info@telemedx.com</span>
        </div>
        <div className="flex items-center justify-between w-3/4">
          <span>Phone:</span>
          <span>+91 12345 67890</span>
        </div>

        <div className="flex items-center justify-between w-3/4">
          <span>Address:</span>
          <span>T-29 Green Park Main, New Delhi</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-5 font-bold">
        <span className="text-white text-xl">Follow Us</span>
        <div className="flex items-center justify-center gap-4">
          <motion.div whileHover={{ scale: 1.1, color: "teal" }} className="">
            <Link
              href={"https://www.linkedin.com/in/prajval-kanda-831759237/"}
              className="text-4xl font-bold text-white"
            >
              <FaFacebook />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, color: "teal" }} className="">
            <Link
              href={"https://www.linkedin.com/in/prajval-kanda-831759237/"}
              className="text-4xl font-bold  text-white"
            >
              <FaLinkedin />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
