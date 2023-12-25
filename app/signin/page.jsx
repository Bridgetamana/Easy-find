"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
require('dotenv').config();
import "./style.scss";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Debugging
    console.log(`Attempting to login with email: ${email} and password: ${password}`);
    
    try {
      setIsLoading(true);
      
      const response = await axios.post(
        `${apiUrl}/auth/local`,
        {
          identifier: email,
          password: password,
        }
      );
      
      const token = response.data.jwt;
      setToken(token);
      localStorage.setItem("token", token);
      window.location.href = "/talent/profile-form";
      console.log("Logged in successfully!");
    } catch (error) {
      setIsLoading(false);
      
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        setError(errorMessage);
        setTimeout(() => {
          setError("");
        }, 4000);
        console.error("Login failed:", errorMessage);
      } else {
        setError("An error occurred during login");
        setTimeout(() => {
          setError("");
        }, 4000);
        console.error("Login failed:", error);
      }
    }
  };
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <section className="login__form">
      <div className="login__form__container">
        <div className="login__signin">
          <div className="header">
            <h1 className="title">Sign In</h1>
            <p className="subtitle">
              To keep connected with us please login with your personal info.
            </p>
          </div>
          <form className="form__wrap" onSubmit={handleLogin}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="input__field"
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input__field"
              value={password}
              onChange={handleInputChange}
            />
            <div className="flex">
              <div className="remember__me">
                <input type="checkbox" name="remember" id="remember" />
                <label htmlFor="remember" className="remember__me__text">
                  Remember Me
                </label>
              </div>
              <Link href="/forgot-password" className="forgot__password">
                Forgot your password?
              </Link>
            </div>
            {error && <p className="error">{error}</p>}
            {isLoading ? (
              <button className="signin__btn" type="submit">
                <div className="spinner"></div>
              </button>
            ) : (
              <button className="signin__btn" type="submit">
                Sign In
              </button>
            )}
            <div className="signup__info">
              <p className="text">Do not have an account?</p>{" "}
              <Link href={"/signup"} className="signup__text">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
        <div className="login__signup">
          <h1 className="title">Hello Friend!</h1>
          <p className="subtitle">
            Discover new talents, become a talent, and connect with the
            community.
          </p>
        </div>
      </div>
    </section>
  );
}
