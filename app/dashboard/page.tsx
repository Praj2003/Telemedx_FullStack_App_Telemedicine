"use client";

import { useUser } from "@clerk/nextjs";

import React from "react";

const Dashboard = () => {
    const {user} = useUser();
  return (
    <div className="bg-black text-white min-w-full min-h-screen flex items-center justify-center">
      <h1>Welcome, {user?.firstName || user?.username}!</h1>
      <p>Your email: {user?.primaryEmailAddress?.emailAddress}</p>
    </div>
  );
};

export default Dashboard;
