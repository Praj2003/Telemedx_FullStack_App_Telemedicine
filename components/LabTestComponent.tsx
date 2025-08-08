"use client"
import React from "react";
import { motion } from "motion/react";

interface LabTest {
  patientName: string;
  contactNumber: string;
  address: string;
  testType: string;
  preferredDate: Date;
  userEmail: string;
}

interface propsComponent {
  props: LabTest[];
}

const LabTestDataComponent = ({ props }: propsComponent) => {
  return (
    <>
      <div className="w-full text-center mt-6 mb-5">
        <h1 className="text-black font-semibold text-2xl">Current Lab Requests</h1>
      </div>
      {props.map((item, index) => {
        return (
          <div
            key={index}
            className="lg:w-5xl md:w-3xl w-lg grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 bg-gray-100 rounded-lg shadow-2xl mb-5 lg:gap-4 md:gap-4 gap-2 "
          >
            <div className="w-full flex items-center justify-center p-4 flex-col gap-5">
                <div className="w-full flex items-center justify-between">
                    <strong>Patient's Name</strong>
                    <p>{item.patientName}</p>
                </div>

                <div className="w-full flex items-center justify-between">
                    <strong>Patient's address</strong>
                    <p>{item.address}</p>
                </div>
            </div>

            <div className="w-full flex items-center justify-center p-4 flex-col gap-5">
                <div className="w-full flex items-center justify-between">
                    <strong>Patient's Contact</strong>
                    <p>{item.contactNumber}</p>
                </div>

                <div className="w-full flex items-center justify-between">
                    <strong>Test Type</strong>
                    <p>{item.testType}</p>
                </div>

                 <div className="w-full flex items-center justify-between">
                    <strong>Test Date</strong>
                    <p>{new Date(item.preferredDate).toDateString()}</p>
                </div>
            </div>

            <div className="w-full h-full flex justify-center items-center mb-6 lg:mb-0 md:mb-6">
                <motion.div whileHover={{scale : 1.1, backgroundColor: "red", color: "white"}} className="px-3 py-2 bg-black text-white font-bold text-md shadow-2xl rounded-lg cursor-pointer">Revoke Request</motion.div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default LabTestDataComponent;
