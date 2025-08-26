import React from "react";

const SignInWarning = () => {
  return (
    <div className="min-w-full min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-bold text-gray-600">OOPS!! 😬</h1>
        <h2 className="text-lg text-teal-700 font-semibold">
          You need to be signed in to access the Dashboard.
        </h2>
      </div>
    </div>
  );
};

export default SignInWarning;
