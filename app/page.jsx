'use client';
import React from "react";
import "./global.scss";
import LandingPage from "./landing-page";
import { AuthProvider } from "../utils/authContext";

export default function Home() {
  return (
    <AuthProvider>
    <div className="app">
       <LandingPage/>
    </div>
    </AuthProvider>
  );
}
