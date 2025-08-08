"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { PiUploadSimpleBold } from "react-icons/pi";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";


const AiPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  }

  async function handleClear() {
    setImage(null);
    setPreviewURL("");
    setQuestion("");
    setResult("");
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64Data = (reader.result as string).split(",")[1];
        const mimeType = image?.type;

        const response = await fetch("/api/gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageBase64: base64Data,
            mimeType,
            prompt: question,
          }),
        });

        const data = await response.json();
        if (data) {
          setResult(data.output);
        }
        setLoading(false);
      };

      reader.readAsDataURL(image!);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="min-w-full min-h-screen grid lg:grid-cols-2 grid-cols-1">
      <div className="flex flex-col items-center justify-center w-full gap-10 mt-16">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-teal-900 via-teal-400 to-teal-500 font-bold text-2xl pb-6">
          Upload Medical Image for AI Diagnosis
        </h1>

        <div className="w-[250px] h-[250px] relative flex items-center justify-center rounded-xl shadow-2xl border-4 border-dashed border-gray-300 bg-white">
          {previewURL ? (
            <Image
              src={previewURL as string}
              alt="picture-input"
              fill={true}
            ></Image>
          ) : (
            <span className="absolute">
              <PiUploadSimpleBold className="text-5xl text-teal-600" />
            </span>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>

        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-md lg:w-xl"
          placeholder="Enter the question you want to ask?...."
        ></Input>

        <div className="flex items-center justify-center  gap-9">
          <motion.button
            onClick={handleSubmit}
            whileHover={{
              scale: 1.1,
              backgroundColor: "teal",
              color: "white",
            }}
            className="bg-black text-white px-3 py-2  font-bold rounded-xl shadow-2xl cursor-pointer"
          >
            Submit
          </motion.button>
          <motion.button
            onClick={handleClear}
            whileHover={{
              scale: 1.1,
              backgroundColor: "teal",
              color: "white",
            }}
            className="bg-black text-white px-3 py-2 font-bold rounded-xl shadow-2xl cursor-pointer"
          >
            Clear
          </motion.button>
        </div>
      </div>

      <div className="flex items-center justify-center w-full">
        <div className="max-w-2xl mt-5 p-5 border border-gray-300 rounded-lg shadow-md bg-gray-100 overflow-hidden">
          <p className="text-black text-center">
            {result === "" ? (
              <span className="text-gray-500">Response will be shown here</span>
            ) : (
              result
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AiPage;
