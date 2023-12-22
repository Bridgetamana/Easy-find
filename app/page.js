'use client';
import React from "react";
import "./global.scss";
import LandingPage from "./landing-page";
// require("dotenv").config();
// import LandingPage from "./landing-page.jsx/page";

export default function Home() {
  return (
    <div className="app">
       <LandingPage/>
    </div>
  );
}
