import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPhe.css";

function LoginPage() {
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  const [loginStatus, setLoginStatus] = useState("");
  const [loading, setLoading] = useState(false);

  function handleRegister(key, value) {
    setLoginUser((prevUser) => ({ ...prevUser, [key]: value }));
  }

  function handleLogin(e) {
    e.preventDefault();
    if (!loginUser.email || !loginUser.password) {
      setLoginStatus("Please enter email and password");
      return;
    }

    setLoading(true);
    fetch("https://resumebuilder-backend-ooq9.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginUser.email,
        password: loginUser.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.message === "Login successful") {
          setLoginStatus("Login successful!");
          sessionStorage.setItem("userEmail", loginUser.email);
          window.location.href = "/create";
        } else {
          setLoginStatus(data.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        setLoginStatus("Server error");
        console.error("error", error);
      });
  }

  return (
    <>
      <div className="bg-img flex items-center justify-center w-full h-screen">
        <div className="xs:w-[65%] xs:h-[75%] md:w-[80%] lg:w-[75%] xl:w-[65%] sm:h-[80%] rounded xs:rounded-xl overflow-hidden flex text-center justify-center items-center">
          <div className="border-black border-r-2 bg-slate-400 w-full h-full flex flex-col items-center justify-center gap-[1rem] sm:gap-y-[1.5rem]">
            <div className="xs:h-[70%] py-[2rem] xs:py-0 flex flex-col justify-center items-center sm:justify-normal gap-[1rem] sm:gap-[1.5rem]">
              <h1 className="welcome font-bold text-white sm:text-2xl">
                WELCOME USER
              </h1>

              <p className="cursor-pointer w-[13rem] xs:w-[15rem] sm:w-[20rem] md:w-[16rem] lg:w-[20rem] custom-shadow bg-white px-2 py-1 flex items-center rounded sm:font-bold text-[.9rem] xs:text-[1rem] font-medium">
                <img
                  src="./google.jpeg"
                  className="w-[2rem] h-[2rem] mr-4 xs:mr-10"
                  alt=""
                />
                Log in with Google
              </p>

              <div className="flex items-center">
                <p className="hidden sm:visible w-[5.1rem] h-[2px] bg-white"></p>
                <p className="text-black text-sm font-medium px-1">
                  OR LOGIN WITH EMAIL
                </p>
                <p className="hidden sm:visible w-[5.1rem] h-[2px] bg-white"></p>
              </div>
              <form
                onSubmit={handleLogin}
                className="flex flex-col gap-[1rem] sm:gap-[1.55rem] justify-center items-center"
              >
                <input
                  type="text"
                  placeholder="Email"
                  value={loginUser.email}
                  onChange={(e) => {
                    handleRegister("email", e.target.value);
                  }}
                  className="outline-none custom-shadow w-[13rem] xs:w-[15rem] sm:w-[20rem] md:w-[16rem] lg:w-[20rem] px-2 py-2 flex items-center rounded"
                />
                <input
                  type="password"
                  value={loginUser.password}
                  onChange={(e) => {
                    handleRegister("password", e.target.value);
                  }}
                  placeholder="Password"
                  className="outline-none custom-shadow w-[13rem] xs:w-[15rem] sm:w-[20rem] md:w-[16rem] lg:w-[20rem] px-2 py-2 flex items-center rounded"
                />
                <div className="flex flex-col sm:flex-row justify-center items-center sm:justify-between w-[20rem] px-2 gap-[.4rem] sm:gap-0">
                  <div>
                    <input type="checkbox" /> <span>Keep me logged in</span>
                  </div>
                  <p>Forgot password</p>
                </div>
                {/* <button
                  type="submit"
                  className="bg-white w-[13rem] xs:w-[15rem] sm:w-[20rem] md:w-[16rem] lg:w-[20rem] py-[6px] rounded font-medium"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Log In"}
                </button> */}
                 <button
                  type="submit"
                  className={`bg-white w-[13rem] xs:w-[15rem] sm:w-[20rem] md:w-[16rem] lg:w-[20rem] py-[6px] rounded font-medium ${
                    loading ? "" : "hover:bg-gray-500"
                  }`}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Log In"}
                </button>
                <Link to="/register">
                  <button
                    type="button"
                    className="bg-white w-[13rem] xs:w-[15rem] sm:w-[20rem] md:w-[16rem] lg:w-[20rem] py-[6px] rounded font-medium"
                  >
                    Register
                  </button>
                </Link>
              </form>
              {loginStatus && (
                <p
                  className={`font-bold text-2xl ${
                    loginStatus === "Login successful!"
                      ? "text-green-800"
                      : "text-red-500"
                  }`}
                >
                  {loginStatus}
                </p>
              )}
            </div>
          </div>
          <div className="bg-right-img w-full h-full flex justify-center items-center">
            <img
              src="./registration-img-4.jpg"
              className="object-cover h-[100%] w-[100%] overflow-hidden"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;

