"use client";
import React from "react";
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/nextjs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState, useEffect } from "react";

import LabTestDataComponent from "@/components/LabTestComponent";

import AppointmentComponent from "@/components/AppointmentComponent";

interface Appointment {
  patientName: string;
  contactNumber: string;
  address: string;
  doctorAttending: string;
  preferredDate: Date;
  userEmail: string;
}

interface LabTest {
  patientName: string;
  contactNumber: string;
  address: string;
  testType: string;
  preferredDate: Date;
  userEmail: string;
}

const UserDashboard = () => {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [appointmentData, setAppointmentData] = useState<Appointment[] | null>(
    null
  );

  const [labTestData, setLabTestData] = useState<LabTest[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();

  useEffect(() => {
    async function fetchData() {
      const email = user?.primaryEmailAddress?.emailAddress;
      if(!email || !category) return;
      if (category === undefined) return;
      try {
        setLoading(true);
        let response;
        if (category === "LabTest") {
          response = await fetch(`/api/labtest?email=${email}`, {
            method: "GET",
            headers: {
              "Content-Type": "Application/json",
            },
          });

          const result = await response.json();
          if (result?.data) {
            setLabTestData(result?.data);
            setAppointmentData(null);
          }
        }

        if (category === "AppointmentBooking") {
          response = await fetch(`/api/appointment?email=${email}`, {
            method: "GET",
            headers: {
              "Content-Type": "Application/json",
            },
          });

          const result = await response.json();
          if (result?.data) {
            setAppointmentData(result?.data);
            setLabTestData(null);
          }
        }

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(
          "There is some error while fetching the information from the database",
          err
        );
      }
    }

    fetchData();
  }, [category,user]);

  useEffect(() => {
    console.log("Updated Lab Test Data:", labTestData);
  }, [labTestData]);

  useEffect(() => {
    console.log("Updated Appointment Data:", appointmentData);
  }, [appointmentData]);

  if (loading) {
    return (
      <div className="min-w-full min-h-screen flex items-center justify-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <SignedIn>
        <div className="min-w-full min-h-screen">
          <div className="relative MainHeading w-full text-center mt-36">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-teal-400 to-teal-700">
              Welcome, {user?.username}!
            </h1>

            <div className="absolute right-0 bottom-7 p-4">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[90px] md:w-[190px] lg:w-[240px] font-bold  rounded-lg">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LabTest">Lab tests</SelectItem>
                  <SelectItem value="AppointmentBooking">
                    Doctor Appointment Booking
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {category === undefined && (
            <div className="min-w-full mt-16">
              <h1 className="text-center text-2xl font-semibold text-gray-600 mt-10">
                Please select a category to view your requests.
              </h1>
            </div>
          )}

          {labTestData !== null && (
            <div className="min-w-full place-items-center">
              <LabTestDataComponent data={labTestData} />
            </div>
          )}

          {appointmentData !== null && (
            <div className="min-w-full place-items-center">
              <AppointmentComponent data={appointmentData} />
            </div>
          )}
        </div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default UserDashboard;
