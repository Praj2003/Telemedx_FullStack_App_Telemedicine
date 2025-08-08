"use client";
import React from "react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type User = {
  id: string;
  email: string;
};

const AdminDashboard = () => {
  const [data, setData] = useState<User[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [appointmentCount, setAppointmentCount] = useState<number>(0);
  const [labTestCount, setLabTestCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        if (result) {
          setData(result.users);

          setCount(result.count);

          setAppointmentCount(result.appointments);
          setLabTestCount(result.labtests);
        }

        console.log("Fetched users:", data);
        console.log("Total count of users:", count);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Updated users:", data);
  }, [data]);

  useEffect(() => {
    console.log("Updated count:", count);
  }, [count]);

  return (
    <div className="min-w-full min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4 place-items-center">
      <div className="w-full flex flex-col items-center justify-center gap-6 mt-24">
        <h1 className="text-teal-700 font-bold text-2xl text-center pb-10">
          Users
        </h1>

        {data.map((user, idx) => {
          return (
            <div className="grid lg:grid-cols-2 grid-cols-1 w-full gap-6 bg-white shadow-2xl rounded-lg p-4 lg:mx-0 md:mx-0 mx-2">
              <div
                key={idx}
                className="flex flex-col justify-start gap-6"
              >
                <p className="text-md font-bold text-teal-600">ID: {user.id}</p>

                <h1 className="text-xl font-bold text-black">
                  Email: {user.email}
                </h1>
              </div>

              <div className="flex items-center justify-center">
                <motion.button whileHover={{scale:1.1, backgroundColor:"red", color:"white"}} className="bg-black text-white font-bold px-3 py-2 rounded-lg cursor-pointer">Remove Account</motion.button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full flex flex-col items-center justify-center gap-3 mt-10 lg:mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 w-full place-items-center">
          <Card className="w-[300px] h-[250px] max-w-md bg-white shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-teal-700">Total Users</CardTitle>
              <CardDescription>
                Total number of users registered in the system.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <h1 className="text-4xl font-bold text-teal-600">{count}</h1>
            </CardContent>
            <CardFooter className="flex items-center justify-center">
              <p className="text-sm text-gray-500">As of today</p>
            </CardFooter>
          </Card>

          <Card className="w-[300px] h-[250px] max-w-md bg-white shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-teal-700">Appointments</CardTitle>
              <CardDescription>
                Total number of appointments booked.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <h1 className="text-4xl font-bold text-teal-600">
                {appointmentCount}
              </h1>
            </CardContent>
            <CardFooter className="flex items-center justify-center">
              <p className="text-sm text-gray-500">As of today</p>
            </CardFooter>
          </Card>
        </div>

        <Card className="w-[300px] h-[250px] max-w-md bg-white shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-teal-700">Lab Tests</CardTitle>
            <CardDescription>Total number of lab tests booked.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <h1 className="text-4xl font-bold text-teal-600">{labTestCount}</h1>
          </CardContent>
          <CardFooter className="flex items-center justify-center">
            <p className="text-sm text-gray-500">As of today</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
