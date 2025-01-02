import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { LoginForm } from "./auth/LoginForm";

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
            Welcome to our community platform. Please login with your member number.
          </p>
          <div className="flex flex-col items-center justify-center space-y-6">
            <LoginForm />
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white/10"
              asChild
            >
              <Link to="/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};