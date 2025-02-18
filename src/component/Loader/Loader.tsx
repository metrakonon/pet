import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
    </div>
  );
}
