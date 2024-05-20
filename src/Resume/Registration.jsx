import React, { useState, useContext } from "react";
import "./LoginPhe.css";
import { NavLink } from "react-router-dom";
import { inputContext } from "./Main";
import './css/registration.css';

function Registration() {
  const { user, setUser } = useContext(inputContext);
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleRegister(key, value) {
    setUser((prevUser) => ({ ...prevUser, [key]: value }));
  }

  function handleSubmitRegister(e) {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      alert("Password and confirm password do not match");
      return;
    }
    fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Email already exist");
        }
        return response.json();
      })
      // .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setRegistrationMessage("Registration successful");
        setErrorMessage("");
      })                        
      .catch((error) => {
        console.error("Registration error", error.message);
        setErrorMessage(error.message);
        setRegistrationMessage("");
      });
  }

  return (
    <>
      <div className="bg-img-registration flex items-center justify-center  w-full h-screen ">
        <div
          className="h-[74%] w-[80%] md:w-[80%] md:h-[80%] sm:w-[65%] sm:h-[75%] lg:w-[70%] xl:w-[60%] bg-white rounded-xl 
     flex flex-col md:flex-row text-center overflow-hidden"
        >
          <div className="w-full h-full border-r-2 flex justify-center items-center  border-slate-700 bg-gradient-to-b from-amber-100 to-green-100">
            <div className="h-[70%] flex flex-col gap-[1.55rem] ">
              <h1 className="registration font-bold text-black text-2xl">
              
                USER REGISTRATION
              </h1>

              <form
                action=""
                onSubmit={handleSubmitRegister}
                className="flex flex-col gap-[2rem]"
              >
                <input
                  type="text"
                  placeholder="Name"
                  value={user.name}
                  onChange={(e) => {
                    handleRegister("name", e.target.value);
                  }}
                  className="outline-none w-[15rem] sm:w-[20rem] md:w-[16rem] lg:w-[20rem]  px-2 py-2 flex items-center rounded  custom-shadow"
                />
                <input
                  type="text"
                  placeholder="Email"
                  value={user.email}
                  onChange={(e) => {
                    handleRegister("email", e.target.value);
                  }}
                  className="outline-none w-[15rem] sm:w-[20rem] md:w-[16rem] lg:w-[20rem] px-2 py-2 flex items-center rounded custom-shadow"
                />
                {errorMessage && <p className="font-medium text-xl ">{errorMessage}</p>}
                <input
                  type="password"
                  value={user.password}
                  onChange={(e) => {
                    handleRegister("password", e.target.value);
                  }}
                  placeholder="Create Password"
                  className="outline-none w-[15rem] sm:w-[20rem] md:w-[16rem] lg:w-[20rem]  px-2 py-2 flex items-center rounded custom-shadow"
                />
                <input
                  type="password"
                  value={user.confirmPassword}
                  onChange={(e) => {
                    handleRegister("confirmPassword", e.target.value);
                  }}
                  placeholder="Confirm Password"
                  className="outline-none w-[15rem] sm:w-[20rem] md:w-[16rem] lg:w-[20rem]  px-2 py-2 flex items-center rounded custom-shadow"
                />
               
                <button className="text-black bg-gradient-to-r from-emerald-700 to-slate-400 w-[15rem] sm:w-[20rem] md:w-[16rem] lg:w-[20rem] py-[8px] rounded font-medium custom-shadow transition-colors duration-600 ease-in-out hover:from-orange-500 hover:to-orange-500 hover:text-white">
                  Register
                </button>
               
              </form>
              {registrationMessage && (
                <p className="text-green-800 font-medium text-xl">
                  {registrationMessage}
                </p>
              )}
              {registrationMessage && (
                <NavLink to="/login">
                  <button className="font-sm text-xl bg-white  px-6 py-1 rounded-full">
                    Next
                  </button>
                </NavLink>
              )}
            </div>
          </div>
          <div className="registration-image w-full h-full md:flex flex-col items-center justify-center gap-y-[1.5rem] bg-gradient-to-b from-yellow-100 to-red-100">
            <img
              src="./registration-img.png"
              className=" h-[100%] w-[100%] object-cover"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;
