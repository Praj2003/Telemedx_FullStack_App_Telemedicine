"use client";
import { Typewriter } from "react-simple-typewriter";

import { useUser } from "@clerk/nextjs";

import { motion } from "motion/react";

import { IoShieldCheckmark } from "react-icons/io5";

import { FaCheckCircle } from "react-icons/fa";

import { SlScreenSmartphone } from "react-icons/sl";

import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { qnaData } from "@/qna";

import goalsData from "@/goalsData";

import Image from "next/image";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  async function handleSignUpButtonClick() {
    router.push("/sign-up");
  }

  return (
    <div className="min-w-full min-h-screen">
      <div className="Poster text-black min-w-full lg:min-h-[90vh] min-h-[100vh]  grid lg:grid-cols-2 grid-cols-1">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center gap-7 lg:mt-16  md:mt-16 mt-32">
            <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-900 via-teal-600 to-teal-500">
              Welcome to TeleMedX
            </h2>

            <div className="flex items-center justify-center gap-4  mb-11">
              <div className="flex items-center gap-2 text-teal-700 font-medium">
                <IoShieldCheckmark className="text-2xl text-teal-500" />
                Verified Doctors
              </div>

              <div className="flex items-center gap-2 text-teal-700 font-medium">
                <FaCheckCircle className="text-2xl text-teal-500" />
                24/7 Consultations
              </div>

              <div className="flex items-center gap-2 text-teal-700 font-medium">
                <SlScreenSmartphone className="text-2xl text-teal-500" />
                Mobile Friendly
              </div>
            </div>

            <p className="text-xl text-teal-700 font-bold">
              <Typewriter
                words={["Simplifying your healthcare experience"]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </p>

            <div className="flex items-center justify-center mt-7 gap-9">
              <motion.button
                onClick={() => handleSignUpButtonClick()}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "teal",
                  color: "white",
                }}
                className="bg-black text-white px-3 py-2  font-bold rounded-xl shadow-2xl cursor-pointer"
              >
                Sign Up
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "teal",
                  color: "white",
                }}
                className="bg-black text-white px-3 py-2 font-bold rounded-xl shadow-2xl cursor-pointer"
              >
                About Us
              </motion.button>
            </div>
          </div>
        </div>

        <div className="HospitalImage flex items-center justify-center">
          <div className=" mt-6 lg:w-[400px] lg:h-[400px] md:w-[200px] md:h-[200px] w-[250px] h-[250px] rounded-full bg-gray-700 relative">
            <Image
              src={"/images/hospital3.jpg"}
              fill={true}
              className="rounded-full"
              alt="Hospital Image"
            ></Image>
          </div>
        </div>
      </div>

      <div className=" GoalsSection w-full bg-white p-3">
        <p className="text-center text-3xl font-bold text-teal-700 pt-3 pb-10">
          What You Can Expect from TeleMedX
        </p>

        <div className="container mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-9 place-items-center">
          {goalsData.map((goal, index) => {
            return (
              <Card
                key={index}
                className="p-6 w-sm h-[300px] shadow-2xl border border-teal-400"
              >
                <CardHeader>
                  <CardTitle className="text-xl text-teal-700 font-bold">
                    {goal.title}
                  </CardTitle>
                  <CardDescription className="text-black font-semibold text-sm">
                    {goal.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="text-teal-500 font-bold">
                  {goal.content}
                </CardContent>

                <CardFooter>{goal.footer}</CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center mt-6 mb-12">
        <h1 className="text-center text-3xl font-bold text-teal-700 pt-3 pb-10">
          Frequently Asked Questions
        </h1>
        {qnaData.map((item, index) => {
          return (
            <Accordion type="single" collapsible className="lg:w-[40vw] md:w-[40vw] sm:w-[20px] " key={index}>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-teal-700 font-bold text-xl">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-black font-semibold text-lg">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
}
