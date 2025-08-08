"use client";
import React from "react";
import { useParams } from "next/navigation";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { motion } from "motion/react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaChevronDown } from "react-icons/fa";

import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

const ConfirmationBooking = () => {
  const params = useParams();
  const doctorParam = params?.doctor;
  const doctor =
    typeof doctorParam === "string" ? decodeURIComponent(doctorParam) : "";
  const { user } = useUser();
  const [preferredDate, setPreferredDate] = useState<Date | undefined>(
    new Date()
  );

  const [patientName, setPatientName] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [open, setOpen] = useState(false);

  async function handleSubmit() {
    try {
      const email = user?.primaryEmailAddress?.emailAddress;

      if (!email) {
        toast.error("User email not found.", { position: "bottom-right" });
        return;
      }

      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientName,
          contactNumber,
          address,
          doctor,
          preferredDate,
          email,
        }),
      });

      if (response.ok) {
        toast.success("Your Appointment has been booked successfully!", {
          position: "bottom-right",
        });
      }

      const data = await response.json();

      console.log(data);
    } catch (err) {
      console.error(
        "There is some error while fetching the data from FrontEnd!"
      );
    }
  }

  return (
    <div className="min-w-full min-h-screen">
      <div className="container mx-auto mt-36">
        <div className="flex flex-col items-center justify-center  gap-3">
          <h1 className="text-teal-800 font-bold lg:text-4xl md:text-2xl text-2xl text-center mb-3">
            Comfirm your Appointment
          </h1>
          <h2 className="text-xl font-bold text-black">
            Confirm your booking with{" "}
            <span className="text-red-800">{doctor}</span>
          </h2>
        </div>
        <div className="w-full flex items-center justify-center">
          <Card className="w-[400px] p-6 bg-white shadow-2xl mt-10 mb-5">
            <CardHeader>
              <CardTitle className="text-teal-600 font-bold text-xl pb-3">
                See Your Doctor Instantly
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
                onClick={handleSubmit}
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
      </div>
    </div>
  );
};

export default ConfirmationBooking;
