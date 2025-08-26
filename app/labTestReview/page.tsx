"use client";
import React from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";

const LabTestReviewPage = () => {
  useEffect(() => {
    toast.success("Booking Successfull 🥳", {
      position: "bottom-right",
      duration: 4000,
    });
  }, []);

  const searchParams = useSearchParams();
  const labTest = searchParams.get("labTest");

  return (
    <div className="min-w-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-5">
        <p className="text-xl text-teal-600">
          You have successfully booked a lab test for:{" "}
          <span className="font-semibold">{labTest}</span>
        </p>
        <p className="text-md text-gray-500 pb-6">
          You can check all your request on your personal Dashboard💉.
        </p>

        <Link href={"/"}>
          <motion.button
            whileHover={{
              scale: 1.1,
              backgroundColor: "green",
              color: "white",
            }}
            className="px-3 py-2 bg-black text-lg font-bold rounded-lg shadow-2xl text-white cursor-pointer"
          >
            Return Home
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default LabTestReviewPage;
