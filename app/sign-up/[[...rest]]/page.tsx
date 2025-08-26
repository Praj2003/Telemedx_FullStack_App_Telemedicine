"use client";
import React from "react";
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="bg-white flex items-center justify-center min-w-full min-h-screen">
      <div className="mt-28 mb-10">
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          forceRedirectUrl={"/"}
        />
      </div>
    </div>
  );
};

export default SignUpPage;
