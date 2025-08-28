"use client";
import { useState } from "react";
import React from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaChevronDown } from "react-icons/fa";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const LabTestBooking = () => {
  const router = useRouter();
  const { user } = useUser();

  const [selectedTest, setSelectedTest] = useState("");
  const [preferredDate, setPreferredDate] = useState<Date | undefined>(
    new Date()
  );
  const [patientName, setPatientName] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);

  const [open, setOpen] = useState(false);

  async function handleSubmit() {
    try {
      const email = user?.primaryEmailAddress?.emailAddress;

      if (!email) {
        toast.error("User email not found.", { position: "bottom-right" });
        return;
      }

      if (
        !patientName ||
        !contactNumber ||
        !address ||
        !selectedTest ||
        !preferredDate
      ) {
        toast.error("Please fill all the fields", { position: "bottom-right" });
        return;
      }

      const response = await fetch("/api/labtest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientName,
          contactNumber,
          address,
          selectedTest,
          preferredDate,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error(
          "There is some error while storing the lab test data into the database"
        );
      }

      router.push(`/labTestReview?labTest=${selectedTest}`);

      console.log("L:abtest Booking Successfull!");
    } catch (err) {
      console.error("Error booking lab test:", err);
    }
  }

  const labTests = [
    "Blood Test",
    "COVID-19 RT-PCR",
    "Diabetes Panel",
    "Thyroid Function Test",
    "Lipid Profile",
    "Liver Function Test",
    "Urine Analysis",
  ];

  return (
    <>
      <SignedIn>
        <div className="grid grid-cols-1 lg:grid-cols-2 min-w-full min-h-screen">
          <div className=" relative min-w-full lg:flex flex-col items-center justify-center gap-9 md:hidden lg:visible hidden">
            <div className=" mt-24 lg:w-[300px] lg:h-[300px] md:w-[200px] md:h-[200px] w-[250px] h-[250px] rounded-full bg-gray-700 relative">
              <Image
                src={"/images/hospital3.jpg"}
                fill={true}
                className="rounded-full"
                alt="Hospital Image"
              ></Image>
            </div>

            <h2 className="text-xl font-semibold text-teal-700 italic">
              {"Your Health, Our Priority — Seamless Care At Your Fingertips"}
            </h2>
          </div>

          <div className="flex items-center justify-center min-w-full min-h-screen bg-gray-50">
            <Card className="w-[400px] p-6 bg-white shadow-2xl mt-28 mb-5">
              <CardHeader>
                <CardTitle className="text-teal-600 font-bold text-xl pb-3">
                  Book Lab Tests in Seconds
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="w-full flex flex-col gap-2 pb-3">
                  <Label>Enter the name of Patient</Label>
                  <Input
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter Name"
                  />
                </div>

                <div className="w-full flex flex-col gap-2 pb-3">
                  <Label>Enter Contact Number</Label>
                  <Input
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="Enter Contact Number"
                  />
                </div>

                <div className="w-full flex flex-col gap-2 pb-3">
                  <Label>Enter the Address of patient</Label>
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter Address"
                  />
                </div>

                <div className="w-full flex flex-col gap-2 pb-3">
                  <Label>Select Type of Test</Label>
                  <select
                    value={selectedTest}
                    onChange={(e) => setSelectedTest(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">-- Choose a test --</option>
                    {labTests.map((test) => (
                      <option key={test} value={test}>
                        {test}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full flex flex-col gap-2 pb-1">
                  <Label htmlFor="preferredDate" className="px-1">
                    Preferred Test Date
                  </Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="preferredDate"
                        className="w-full justify-between font-normal"
                      >
                        {preferredDate
                          ? preferredDate.toLocaleDateString()
                          : "Select date"}
                        <FaChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={preferredDate}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          setPreferredDate(date);
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </CardContent>

              <CardFooter>
                <motion.button
                  onClick={() => {
                    setOpenDialog(true);
                  }}
                  whileHover={{
                    scale: 1.1,
                    color: "white",
                    backgroundColor: "teal",
                  }}
                  className="px-3 py-2 bg-black text-white font-bold rounded-xl cursor-pointer"
                >
                  Submit
                </motion.button>
              </CardFooter>
            </Card>
          </div>
          {openDialog && (
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Do you confirm for the booking of Labtest{" "}
                  </DialogTitle>
                </DialogHeader>
                <DialogFooter>
                  <motion.button
                    onClick={() => {
                      handleSubmit();
                      setOpenDialog(false);
                    }}
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "green",
                      color: "white",
                    }}
                    className="px-3 py-2 bg-black text-white font-bold rounded-xl cursor-pointer"
                  >
                    Confirm
                  </motion.button>
                  <motion.button
                    onClick={() => setOpenDialog(false)}
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "red",
                      color: "white",
                    }}
                    className="px-3 py-2 bg-black text-white font-bold rounded-xl cursor-pointer ml-2"
                  >
                    Cancel
                  </motion.button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default LabTestBooking;
