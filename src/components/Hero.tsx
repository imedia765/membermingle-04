import React from "react";
import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#1a1f2c] to-[#2a3040] py-16 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1f2c]/50" />
      <div className="container mx-auto relative z-10">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#4a9eed] to-[#63b3ff] text-transparent bg-clip-text">
            Pakistan Welfare Association
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Welcome to our community platform. Stay updated with the latest news and information.
          </p>
          <Button variant="default" className="bg-gradient-to-r from-[#4a9eed] to-[#3a8edd] hover:from-[#3a8edd] hover:to-[#2a7ecd] text-white font-semibold px-8 py-3">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};