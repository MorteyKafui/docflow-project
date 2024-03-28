"use client";

import { Loader } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <Loader className="animate-spin h-screen w-20 text-center" />
    </div>
  );
};

export default LoadingSpinner;
